#!/usr/bin/env node
/**
 * Export SVG icons from a Figma frame via local Dev Mode MCP.
 * Usage:
 *   node export-frame-icons.mjs --node-id=47:3887
 *   node export-frame-icons.mjs --node-id=47:3887 --all --out=layers/ui/app/modules/svg-icon/icon-source
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '../../../..')
const defaultOut = join(repoRoot, 'layers/ui/app/modules/svg-icon/icon-source')
const defaultOverrides = join(__dirname, 'name-overrides.json')
const defaultMcp = 'http://127.0.0.1:3845/mcp'
const curlBin = process.platform === 'win32' ? 'curl.exe' : 'curl'

const args = Object.fromEntries(
	process.argv.slice(2).map((arg) => {
		const m = arg.match(/^--([^=]+)(?:=(.*))?$/)
		if (!m) return [arg, true]
		return [m[1], m[2] === undefined ? true : m[2]]
	}),
)

const nodeId = args['node-id']
if (!nodeId || typeof nodeId !== 'string') {
	console.error('Required: --node-id=47:3887')
	process.exit(1)
}

const outDir = resolve(repoRoot, args.out ? String(args.out) : defaultOut)
const mcpUrl = String(args.mcp || defaultMcp)
const rewriteAll = Boolean(args.all)
const overridesPath = args.overrides
	? (isAbsolute(String(args.overrides)) ? String(args.overrides) : resolve(process.cwd(), String(args.overrides)))
	: defaultOverrides

const tmp = join(repoRoot, '.tmp-icons-export')
mkdirSync(tmp, { recursive: true })
mkdirSync(outDir, { recursive: true })

const nameOverrides = existsSync(overridesPath)
	? JSON.parse(readFileSync(overridesPath, 'utf8'))
	: {}

function curlPost(session, body, outFile) {
	const reqPath = join(tmp, 'req.json')
	writeFileSync(reqPath, JSON.stringify(body))
	const argv = [
		'-s', '-X', 'POST', mcpUrl,
		'-H', 'Content-Type: application/json',
		'-H', 'Accept: application/json, text/event-stream',
		'--data-binary', `@${reqPath}`,
		'-o', outFile,
	]
	if (session) {
		argv.splice(argv.length - 2, 0, '-H', `mcp-session-id: ${session}`)
	}
	execFileSync(curlBin, argv, { stdio: ['ignore', 'inherit', 'inherit'] })
	return readFileSync(outFile, 'utf8')
}

function parseSseJson(raw) {
	const line = raw.split(/\r?\n/).find((l) => l.startsWith('data: '))
	if (!line) {
		throw new Error(`No SSE data in MCP response: ${raw.slice(0, 300)}`)
	}
	return JSON.parse(line.slice(6))
}

function initSession() {
	const hdrFile = join(tmp, 'hdr.txt')
	writeFileSync(join(tmp, 'init.json'), JSON.stringify({
		jsonrpc: '2.0',
		id: 1,
		method: 'initialize',
		params: {
			protocolVersion: '2024-11-05',
			capabilities: {},
			clientInfo: { name: 'figma-icons-export', version: '1.0' },
		},
	}))
	execFileSync(curlBin, [
		'-s', '-D', hdrFile, '-o', join(tmp, 'init-out.txt'),
		'-X', 'POST', mcpUrl,
		'-H', 'Content-Type: application/json',
		'-H', 'Accept: application/json, text/event-stream',
		'--data-binary', `@${join(tmp, 'init.json')}`,
	], { stdio: ['ignore', 'inherit', 'inherit'] })

	const hdr = readFileSync(hdrFile, 'utf8')
	const session = hdr.match(/mcp-session-id:\s*(.+)/i)?.[1]?.trim()
	if (!session) {
		throw new Error(`No mcp-session-id from ${mcpUrl}. Is Figma Dev Mode MCP running?`)
	}

	curlPost(session, { jsonrpc: '2.0', method: 'notifications/initialized' }, join(tmp, 'notif.txt'))
	return session
}

function listSymbols(session) {
	const raw = curlPost(session, {
		jsonrpc: '2.0',
		id: 2,
		method: 'tools/call',
		params: {
			name: 'get_metadata',
			arguments: {
				nodeId,
				clientLanguages: 'typescript',
				clientFrameworks: 'vue',
			},
		},
	}, join(tmp, 'meta.txt'))

	const meta = parseSseJson(raw)
	const xml = (meta.result?.content || []).map((c) => c.text).join('\n')
	if (meta.result?.isError || /rate limit exceeded/i.test(xml)) {
		throw new Error(`Figma MCP rate limit: ${xml.trim() || 'try again later'}`)
	}
	const symbols = [...xml.matchAll(/<symbol id="([^"]+)" name="([^"]+)"/g)].map((m) => ({
		id: m[1],
		name: nameOverrides[m[1]] || m[2],
	}))

	if (symbols.length === 0) {
		throw new Error(`No <symbol> nodes in frame ${nodeId}`)
	}
	return symbols
}

function downloadIcon(session, icon, index) {
	const raw = curlPost(session, {
		jsonrpc: '2.0',
		id: 100 + index,
		method: 'tools/call',
		params: {
			name: 'get_design_context',
			arguments: {
				nodeId: icon.id,
				clientLanguages: 'typescript',
				clientFrameworks: 'vue',
				artifactType: 'REUSABLE_COMPONENT',
			},
		},
	}, join(tmp, `gdc-${index}.txt`))

	const parsed = parseSseJson(raw)
	const text = (parsed.result?.content || []).map((c) => c.text).join('\n')
	if (parsed.result?.isError || /rate limit exceeded/i.test(text)) {
		throw new Error(`Figma MCP rate limit while exporting ${icon.name}`)
	}
	const urlMatch = text.match(/https?:\/\/localhost:3845\/assets\/[a-f0-9]+\.svg/)
	if (!urlMatch) {
		throw new Error(`No asset URL for ${icon.name} (${icon.id})`)
	}

	const svgPath = join(outDir, `${icon.name}.svg`)
	execFileSync(curlBin, ['-sL', '-o', svgPath, urlMatch[0]], {
		stdio: ['ignore', 'inherit', 'inherit'],
	})
	const content = readFileSync(svgPath, 'utf8')
	if (!content.includes('<svg')) {
		throw new Error(`Downloaded file is not SVG: ${icon.name}`)
	}
}

const session = initSession()
console.log(`session=${session}`)
console.log(`frame=${nodeId}`)
console.log(`out=${outDir}`)

const symbols = listSymbols(session)
const existing = new Set(
	readdirSync(outDir)
		.filter((f) => f.toLowerCase().endsWith('.svg'))
		.map((f) => f.replace(/\.svg$/i, '')),
)

const targets = rewriteAll
	? symbols
	: symbols.filter((s) => !existing.has(s.name))

console.log(`symbols=${symbols.length} existing=${existing.size} toExport=${targets.length}`)

let ok = 0
let fail = 0
const errors = []

for (let i = 0; i < targets.length; i++) {
	const icon = targets[i]
	try {
		downloadIcon(session, icon, i)
		ok++
		if ((i + 1) % 10 === 0 || i === targets.length - 1) {
			console.log(`progress ${i + 1}/${targets.length} ok=${ok} fail=${fail}`)
		}
	} catch (e) {
		fail++
		errors.push(`${icon.name}: ${e.message}`)
		console.error(`FAIL ${icon.name}`, e.message)
	}
}

const finalCount = readdirSync(outDir).filter((f) => f.toLowerCase().endsWith('.svg')).length
console.log(JSON.stringify({ ok, fail, requested: targets.length, finalCount, errors }, null, 2))

try {
	rmSync(tmp, { recursive: true, force: true })
} catch {
	// ignore cleanup errors
}

process.exit(fail > 0 ? 1 : 0)
