<script setup lang="ts">
import ContextMenu from '../../../common/components/ContextMenu/ContextMenu.vue'
import type { ContextMenuItem } from '../../../common/components/ContextMenu/ContextMenu.types'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const items: ContextMenuItem[] = [
	{ label: 'Edit' },
	{ label: 'Duplicate' },
	{
		label: 'More',
		children: [
			{ label: 'Save page' },
			{ label: 'Create shortcut' },
		],
	},
	{ label: 'Delete', disabled: true },
]
</script>

<template>
	<UiKitSection title="Context Menu">
		<UiKitDemo>
			<ContextMenu :items="items">
				<template #trigger>
					<div
						class="context-menu-section__target"
						tabindex="0"
					>
						Right-click here
					</div>
				</template>
			</ContextMenu>
		</UiKitDemo>
	</UiKitSection>
</template>

<style scoped lang="scss">
.context-menu-section__target {
	display: grid;
	place-items: center;
	width: min(100%, 420px);
	min-height: 180px;
	padding: 24px;
	border: 1px dashed var(--additional-2);
	border-radius: 8px;
	color: var(--additional-2);
	background: var(--background);
	text-align: center;
	user-select: none;
}
</style>
