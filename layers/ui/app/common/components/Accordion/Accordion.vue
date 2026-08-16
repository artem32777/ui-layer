<script setup lang="ts">
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'
import { Icon, iconNames } from '#layers/ui/app/modules/svg-icon'
import type { AccordionPropsItem } from './Accordion.types'

// https://reka-ui.com/docs/components/accordion

interface AccordionProps {
	/** Массив айтемов аккордиона. */
	items: AccordionPropsItem[]
	/** Режим открытия: один айтем или несколько одновременно. */
	type?: 'single' | 'multiple'
	/** Закрывать айтем при клике по его контенту. */
	closeOnContentClick?: boolean
}

const props = withDefaults(defineProps<AccordionProps>(), {
	type: 'multiple',
})

defineSlots<{
	/** Для кастомной иконки троггера или вставки других элементов */
	icon: any
}>()

const modelValue = defineModel<string | string[]>({})

function handleContentClick(value: string) {
	if (!props.closeOnContentClick) return

	modelValue.value = props.type === 'multiple' && Array.isArray(modelValue.value) ? modelValue.value.filter(item => item !== value) : undefined
}
</script>

<template>
	<AccordionRoot
		v-model="modelValue"
		class="accordion"
		:type="type"
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
			<AccordionContent
				class="accordion__content"
				:style="{ 'cursor: pointer': closeOnContentClick }"
				@click="handleContentClick(item.trigger)"
			>
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
  border-bottom: 1px solid var(--grey, #e2e2e2);
}

.accordion__trigger {
  border-top: 1px solid var(--grey, #e2e2e2);
	display: flex;
  width: 100%;
	align-items: center;
	justify-content: space-between;
	min-height: 48px;
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
