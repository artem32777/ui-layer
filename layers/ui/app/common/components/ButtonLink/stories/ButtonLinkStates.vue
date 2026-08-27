<script setup lang="ts">
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import ButtonLink from '../ButtonLink.vue'
import { buttonLinkVariants, type ButtonLinkProps } from '../ButtonLink.types.ts'
import { iconNames, type IconName } from '#layers/ui/app/modules/svg-icon'

const props = defineProps<ButtonLinkProps>()

const emit = defineEmits<{
	'update:iconLeft': [value: IconName | undefined]
	'update:iconRight': [value: IconName | undefined]
}>()

const icon = iconNames.circle
</script>

<template>
	<div class="button-link-states">
		<div class="button-link-states__icon-pickers">
			<IconPickerControl
				text="Выбрать левую иконку"
				side="left"
				:model-value="iconLeft"
				@update:model-value="emit('update:iconLeft', $event)"
			/>

			<IconPickerControl
				text="Выбрать правую иконку"
				side="right"
				:model-value="iconRight"
				@update:model-value="emit('update:iconRight', $event)"
			/>
		</div>

		<StoryGrid>
			<StoryGridSection
				v-for="variant in buttonLinkVariants"
				:key="variant"
				:title="variant"
				:class="{ 'theme-dark': variant === 'on-media' }"
			>
				<StoryGridRow>
					<StoryGridItem title="default">
						<ButtonLink
							v-bind="props"
							:variant="variant"
						/>
						<ButtonLink
							v-bind="props"
							:variant="variant"
							:icon-left="props.iconLeft ?? icon"
							:icon-right="undefined"
						/>
						<ButtonLink
							v-bind="props"
							:variant="variant"
							:icon-right="props.iconRight || icon"
							:icon-left="undefined"
						/>
					</StoryGridItem>
					<StoryGridItem title="hover">
						<ButtonLink
							v-bind="props"
							:variant="variant"
							class="button-link-story--hovered"
						/>
						<ButtonLink
							v-bind="props"
							:variant="variant"
							:icon-left="props.iconLeft ?? icon"
							:icon-right="undefined"
							class="button-link-story--hovered"
						/>
						<ButtonLink
							v-bind="props"
							:variant="variant"
							:icon-right="props.iconRight ?? icon"
							:icon-left="undefined"
							class="button-link-story--hovered"
						/>
					</StoryGridItem>
				</StoryGridRow>
			</StoryGridSection>
		</StoryGrid>
	</div>
</template>

<style scoped lang="scss">
.button-link-states {
	display: grid;
	gap: 24px;
}

.button-link-states__icon-pickers {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}
</style>
