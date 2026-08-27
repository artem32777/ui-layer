#!/usr/bin/env node
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const mcpUrl = 'http://127.0.0.1:3845/mcp'
const curlBin = process.platform === 'win32' ? 'curl.exe' : 'curl'
const tmp = join(process.cwd(), '.tmp-tabs-figma')
mkdirSync(tmp, { recursive: true })

const nodeId = process.argv[2] || '33:372'
const tool = process.argv[3] || 'get_metadata'

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
	if (session) argv.splice(argv.length - 2, 0, '-H', `mcp-session-id: ${session}`)
	execFileSync(curlBin, argv, { stdio: ['ignore', 'inherit', 'inherit'] })
	return readFileSync(outFile, 'utf8')
}

function parseSseJson(raw) {
	const line = raw.split(/\r?\n/).find((l) => l.startsWith('data: '))
	if (!line) throw new Error(`No SSE data: ${raw.slice(0, 400)}`)
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
			clientInfo: { name: 'tabs-figma', version: '1.0' },
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
	if (!session) throw new Error('No mcp-session-id')
	curlPost(session, { jsonrpc: '2.0', method: 'notifications/initialized' }, join(tmp, 'notif.txt'))
	return session
}

const session = initSession()
const raw = curlPost(session, {
	jsonrpc: '2.0',
	id: 2,
	method: 'tools/call',
	params: {
		name: tool,
		arguments: {
			nodeId,
			clientLanguages: 'typescript,scss',
			clientFrameworks: 'vue,nuxt',
			...(tool === 'get_design_context' ? { skillNames: 'figma-design-to-code' } : {}),
		},
	},
}, join(tmp, `${tool}-out.txt`))

const parsed = parseSseJson(raw)
writeFileSync(join(tmp, `${tool}-parsed.json`), JSON.stringify(parsed, null, 2))
const texts = (parsed.result?.content || []).filter((c) => c.type === 'text').map((c) => c.text)
writeFileSync(join(tmp, `${tool}-text.md`), texts.join('\n\n---\n\n'))
console.log(`OK tool=${tool} node=${nodeId} texts=${texts.length} chars=${texts.join('').length}`)
if (tool === 'get_metadata') {
	const xml = texts.join('\n')
	const tabs = [...xml.matchAll(/name="([^"]*[Tt]ab[^"]*)"[^>]*id="([^"]+)"/g)]
	console.log('Tab-like nodes:', tabs.slice(0, 40).map((m) => `${m[2]} ${m[1]}`).join('\n') || '(none)')
}
