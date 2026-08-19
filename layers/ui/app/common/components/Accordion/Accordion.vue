<script setup lang="ts">
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import type { AccordionProps } from './Accordion.types.ts'

// https://reka-ui.com/docs/components/accordion

withDefaults(defineProps<AccordionProps>(), {
	type: 'multiple',
})

defineSlots<{
	/** Для кастомной иконки троггера или вставки других элементов */
	icon: any
}>()

const modelValue = defineModel<string | string[]>()
</script>

<template>
	<AccordionRoot
		v-model="modelValue"
		class="accordion"
		:type="type"
		:disabled="disabled"
		:collapsible="true"
	>
		<AccordionItem
			v-for="item in items"
			:key="item.trigger"
			:value="item.trigger"
		>
			<AccordionTrigger class="accordion__trigger">
				{{ item.trigger }}
				<slot name="icon">
					<Icon
						:name="iconNames.chevronDown"
						class="accordion__icon"
					/>
				</slot>
			</AccordionTrigger>
			<AccordionContent class="accordion__content">
				<div
					class="accordion__content-inner"
					v-html="item.content"
				/>
			</AccordionContent>
		</AccordionItem>
	</AccordionRoot>
</template>

<style scoped lang="scss">
.accordion {
  width: 100%;
	border-bottom: 1px solid var(--grey, #e2e2e2);
}

.accordion__trigger {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	min-height: 48px;
	border-top: 1px solid var(--grey, #e2e2e2);
	color: var(--text, #000000);
	cursor: pointer;

	&:hover {
		color: var(--brand, #4149f2);
	}

	&:focus-visible {
		box-shadow: 0 0 0 3px var(--brand, #4149f2);
	}

	&[data-state="open"] {
		.accordion__icon {
			transform: rotateX(180deg);
		}
	}

	&[data-disabled] {
		opacity: 0.5;
		cursor: default;
    pointer-events: none;
	}
}

.accordion__icon {
	margin-left: 16px;
	transition: transform 0.3s ease;
}

.accordion__content {
	overflow: hidden;

	&[data-state="open"] {
		animation: accordion-slide-down 0.3s ease;
	}

	&[data-state="closed"] {
		animation: accordion-slide-up 0.3s ease;
	}
}

.accordion__content-inner {
	padding: 0 0 16px;
}

@keyframes accordion-slide-down {
	from {height: 0;}
	to {height: var(--reka-accordion-content-height);}
}

@keyframes accordion-slide-up {
	from {height: var(--reka-accordion-content-height);}
	to {height: 0;}
}
</style>
