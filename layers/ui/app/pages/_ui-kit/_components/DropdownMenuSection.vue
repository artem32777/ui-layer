<script setup lang="ts">
import Button from '../../../common/components/Button/Button.vue'
import DropdownMenu from '../../../common/components/DropdownMenu/DropdownMenu.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const items = [
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
	<UiKitSection title="Dropdown Menu">
		<UiKitDemo>
			<DropdownMenu :items="items">
				<template #trigger>
					<Button text="Open menu" />
				</template>
			</DropdownMenu>
		</UiKitDemo>
	</UiKitSection>
</template>
