<script setup lang="ts">
import IconPickerControl from '@@/.storybook/components/IconPickerControl.vue'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import Button from '../Button.vue'
import { buttonVariants, type ButtonProps } from '../Button.types.ts'
import { iconNames, type IconName } from '#layers/ui/app/modules/svg-icon'

const props = defineProps<ButtonProps>()

const emit = defineEmits<{
	'update:iconLeft': [value: IconName | undefined]
	'update:iconRight': [value: IconName | undefined]
}>()

const icon = iconNames.plus
</script>

<template>
	<div class="button-states">
		<div class="button-states__icon-pickers">
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
				v-for="variant in buttonVariants"
				:key="variant"
				:title="variant"
			>
				<StoryGridRow>
					<StoryGridItem title="default">
						<!-- default -->
						<Button
							v-bind="props"
							:variant="variant"
						/>
						<!-- icon-left -->
						<Button
							v-bind="props"
							:variant="variant"
							:icon-left="props.iconLeft ?? icon"
							:icon-right="undefined"
						/>
						<!-- icon-right -->
						<Button
							v-bind="props"
							:variant="variant"
							:icon-right="props.iconRight || icon"
							:icon-left="undefined"
						/>
						<!-- icon -->
						<Button
							v-bind="props"
							:variant="variant"
							:icon-left="props.iconLeft || icon"
							:icon-right="undefined"
							text=""
							aria-label="Добавить"
						/>
					</StoryGridItem>
					<StoryGridItem title="hover">
						<!-- default -->
						<Button
							v-bind="props"
							:variant="variant"
							class="button-story--hovered"
						/>
						<!-- icon-left -->
						<Button
							v-bind="props"
							:variant="variant"
							:icon-left="props.iconLeft ?? icon"
							:icon-right="undefined"
							class="button-story--hovered"
						/>
						<!-- icon-right -->
						<Button
							v-bind="props"
							:variant="variant"
							:icon-right="props.iconRight ?? icon"
							:icon-left="undefined"
							class="button-story--hovered"
						/>
						<!-- icon -->
						<Button
							v-bind="props"
							:variant="variant"
							:icon-left="props.iconLeft || icon"
							:icon-right="undefined"
							text=""
							class="button-story--hovered"
							aria-label="Добавить"
						/>
					</StoryGridItem>
					<StoryGridItem title="disabled">
						<!-- default -->
						<Button
							v-bind="props"
							:variant="variant"
							disabled
						/>
						<!-- icon-left -->
						<Button
							v-bind="props"
							:variant="variant"
							disabled
							:icon-left="props.iconLeft ?? icon"
							:icon-right="undefined"
						/>
						<!-- icon-right -->
						<Button
							v-bind="props"
							:variant="variant"
							disabled
							:icon-right="props.iconRight ?? icon"
							:icon-left="undefined"
						/>
						<!-- icon -->
						<Button
							v-bind="props"
							:variant="variant"
							text=""
							disabled
							:icon-left="props.iconLeft || icon"
							:icon-right="undefined"
							aria-label="Добавить"
						/>
					</StoryGridItem>
				</StoryGridRow>
			</StoryGridSection>
		</StoryGrid>
	</div>
</template>

<style scoped lang="scss">
.button-states {
	display: grid;
	gap: 24px;
}

.button-states__icon-pickers {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}
</style>
