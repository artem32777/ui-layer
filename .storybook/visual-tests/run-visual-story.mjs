import { spawnSync } from 'node:child_process'

const updateSnapshots = process.argv[2] === '--update-snapshots'
const storyId = process.argv[updateSnapshots ? 3 : 2]

if (!storyId) {
	console.error(`Укажите Storybook ID: npm run test:visual:story${updateSnapshots ? ':update' : ''} -- ui-button--base`)
	process.exit(1)
}

const result = spawnSync(process.execPath, [
	'node_modules/@playwright/test/cli.js',
	'test',
	'--config',
	'.storybook/playwright.config.ts',
	'storybook.spec.ts',
	...(updateSnapshots ? ['--update-snapshots'] : []),
], {
	env: { ...process.env, STORY_ID: storyId },
	stdio: 'inherit',
})

if (result.error) {
	throw result.error
}

process.exit(result.status ?? 1)
