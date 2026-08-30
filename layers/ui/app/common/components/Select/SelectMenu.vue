<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, injectSelectRootContext } from 'reka-ui'
import type { SelectOption } from './Select.types.ts'
import ScrollArea from '#layers/ui/app/common/components/ScrollArea/ScrollArea.vue'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'

const props = defineProps<{
	options: SelectOption[]
	nested?: boolean
}>()

const select = injectSelectRootContext()

const open = computed({
	get: () => Boolean(select.open.value),
	set: value => select.onOpenChange(value),
})

const groupedOptions = computed(() => {
	const groups = new Map<string, SelectOption[]>()

	props.options.forEach((option) => {
		const group = option.group ?? ''
		groups.set(group, [...(groups.get(group) ?? []), option])
	})

	return Array.from(groups, ([label, items]) => ({ label, items }))
})

function isSelected(value: string) {
	const model = select.modelValue.value
	return Array.isArray(model) ? model.includes(value) : model === value
}

function choose(event: Event, value: string) {
	select.onValueChange(value)
	if (select.multiple.value) event.preventDefault()
}

function onInteractOutside(event: Event) {
	const target = (event as CustomEvent<{ originalEvent?: Event }>).detail?.originalEvent?.target
	if (target instanceof Node && select.triggerElement.value?.contains(target)) event.preventDefault()
}
</script>

<template>
	<DropdownMenuRoot
		v-if="!nested"
		v-model:open="open"
		:modal="false"
	>
		<DropdownMenuPortal>
			<DropdownMenuContent
				class="select-menu select-menu--root"
				align="start"
				:side-offset="8"
				:reference="select.triggerElement.value"
				@interact-outside="onInteractOutside"
			>
				<SelectMenu
					nested
					:options="options"
				/>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>

	<ScrollArea
		v-else
		class="select-menu__scroll"
		orientation="vertical"
	>
		<template
			v-for="(group, groupIndex) in groupedOptions"
			:key="group.label || 'default'"
		>
			<DropdownMenuLabel
				v-if="group.label"
				class="select-menu__group-label"
			>
				{{ group.label }}
			</DropdownMenuLabel>

			<template
				v-for="option in group.items"
				:key="option.value"
			>
				<DropdownMenuSub v-if="option.children?.length">
					<DropdownMenuSubTrigger
						class="select-menu__option"
						:disabled="option.disabled"
					>
						<Icon
							v-if="option.icon"
							:name="option.icon"
							:size="18"
							aria-hidden="true"
						/>
						<span class="select-menu__text">
							<span class="select-menu__label">{{ option.label }}</span>
							<span
								v-if="option.description"
								class="select-menu__description"
							>{{ option.description }}</span>
						</span>
						<Icon
							:name="iconNames['chevron-right']"
							:size="18"
							class="select-menu__chevron"
							aria-hidden="true"
						/>
					</DropdownMenuSubTrigger>

					<DropdownMenuPortal>
						<DropdownMenuSubContent
							class="select-menu"
							:side-offset="8"
						>
							<SelectMenu
								nested
								:options="option.children"
							/>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>

				<DropdownMenuItem
					v-else
					class="select-menu__option"
					:disabled="option.disabled"
					@select="choose($event, option.value)"
				>
					<Icon
						v-if="option.icon"
						:name="option.icon"
						:size="18"
						aria-hidden="true"
					/>
					<span class="select-menu__text">
						<span class="select-menu__label">{{ option.label }}</span>
						<span
							v-if="option.description"
							class="select-menu__description"
						>{{ option.description }}</span>
					</span>
					<Icon
						v-if="isSelected(option.value)"
						:name="iconNames.check"
						:size="18"
						class="select-menu__check"
						aria-hidden="true"
					/>
				</DropdownMenuItem>
			</template>

			<DropdownMenuSeparator
				v-if="group.label && groupIndex < groupedOptions.length - 1"
				class="select-menu__separator"
			/>
		</template>
	</ScrollArea>
</template>

<style scoped lang="scss">
.select-menu,
:deep(.select-menu) {
	max-height: 350px;
	padding: 8px;
	overflow: hidden;
	border-radius: 8px;
	color: var(--text-on-surface-dark);
	background-color: var(--surface-elevated);
	box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
	z-index: $z-select;
}

.select-menu--root,
:deep(.select-menu--root) {
	min-width: var(--reka-dropdown-menu-trigger-width);
}

.select-menu__scroll {
	max-height: 334px;
	padding-right: 8px;
}

.select-menu__option {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 10px;
	outline: none;
	cursor: pointer;

	@media (any-hover: hover) {
		&:hover {
			background-color: var(--bg-action-item-hover);
		}
	}

	&[data-highlighted],
	&[data-state='open'] {
		background-color: var(--bg-action-item-hover);
	}

	&[data-disabled] {
		color: var(--text-on-surface-tertiary);
		pointer-events: none;
	}
}

.select-menu__text {
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 4px;
	min-width: 0;
}

.select-menu__label {
	@include font-size(button);
	line-height: 20px;
}

.select-menu__description {
	@include font-size(p2);
	font-weight: 500;
	line-height: 1.34;
	color: var(--text-on-surface-tertiary);
}

.select-menu__check {
	color: var(--graphics-accent);
}

.select-menu__chevron {
	color: var(--icon-on-bg-secondary-muted);
}

.select-menu__group-label {
	padding: 8px 10px;
	color: var(--text-on-surface-tertiary);
	@include font-size(label);
}

.select-menu__separator {
	height: 1px;
	margin: 8px 10px;
	background-color: var(--border-neutral);
}
</style>
