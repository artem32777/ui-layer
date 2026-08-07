<script setup lang="ts">
import AccordionSection from './_components/AccordionSection.vue'
import BreadcrumbSection from './_components/BreadcrumbSection.vue'
import ButtonSection from './_components/ButtonSection.vue'
import CheckboxSection from './_components/CheckboxSection.vue'
import ColorAreaSection from './_components/ColorAreaSection.vue'
import ContextMenuSection from './_components/ContextMenuSection.vue'
import DataTableSection from './_components/DataTableSection.vue'
import DialogSection from './_components/DialogSection.vue'
import DropdownMenuSection from './_components/DropdownMenuSection.vue'
import InputSection from './_components/InputSection.vue'
import MultiSelectSection from './_components/MultiSelectSection.vue'
import NavigationMenuSection from './_components/NavigationMenuSection.vue'
import PaginationSection from './_components/PaginationSection.vue'
import PopoverSection from './_components/PopoverSection.vue'
import RadioGroupSection from './_components/RadioGroupSection.vue'
import ScrollAreaSection from './_components/ScrollAreaSection.vue'
import SelectSection from './_components/SelectSection.vue'
import SeparatorSection from './_components/SeparatorSection.vue'
import RangeSliderSection from './_components/RangeSliderSection.vue'
import SwitchSection from './_components/SwitchSection.vue'
import TabsSection from './_components/TabsSection.vue'
import ToastSection from './_components/ToastSection.vue'
import ToggleSection from './_components/ToggleSection.vue'
import TooltipSection from './_components/TooltipSection.vue'
import TextareaSection from './_components/TextareaSection.vue'
import { storeToRefs } from 'pinia'
import SliderSection from './_components/SliderSection.vue'
import { useThemeStore } from '#layers/ui/app/common/stores/themeStore'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { toggleTheme } = themeStore
</script>

<template>
	<div class="ui-kit">
		<header class="ui-kit__header">
			<div>
				<h1 class="ui-kit__title">
					UI Kit
				</h1>
				<p class="ui-kit__description">
					Обертки компонентов на Reka UI с состояниями и вариациями.
				</p>
			</div>
			<button
				class="ui-kit__theme-toggle"
				type="button"
				@click="toggleTheme"
			>
				{{ isDark ? 'Светлая тема' : 'Тёмная тема' }}
			</button>
		</header>

		<SliderSection />
		<SelectSection />
		<MultiSelectSection />
		<CheckboxSection />
		<ButtonSection />
		<InputSection />
		<TextareaSection />
		<BreadcrumbSection />
		<DataTableSection />
		<RadioGroupSection />
		<RangeSliderSection />
		<ColorAreaSection />
		<SwitchSection />
		<ToggleSection />
		<AccordionSection />
		<DialogSection />
		<DropdownMenuSection />
		<ContextMenuSection />
		<PopoverSection />
		<NavigationMenuSection />
		<PaginationSection />
		<ScrollAreaSection />
		<SeparatorSection />
		<TabsSection />
		<ToastSection />
		<TooltipSection />
	</div>
</template>

<style scoped lang="scss">
.ui-kit {
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	padding: 40px;
	color: var(--text);
	background: var(--grey);
	font-family: Arial, sans-serif;
}

.ui-kit__header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 24px;
	width: 100%;
	margin-bottom: 32px;
}

.ui-kit__theme-toggle {
	flex-shrink: 0;
	min-height: 44px;
	padding: 0 18px;
	border: 0;
	border-radius: 8px;
	color: var(--white);
	background-color: var(--brand);
	font: inherit;
	font-weight: 600;
	transition: background-color 0.3s ease;
	cursor: pointer;

	&:hover {
		background-color: var(--brand-dark);
	}
}

.ui-kit__title {
	margin: 0 0 8px;
	font-size: 40px;
	line-height: 1.1;
	font-weight: 700;
}

.ui-kit__description {
	margin: 0;
	color: var(--additional-2);
	font-size: 16px;
	line-height: 1.5;
}
</style>
