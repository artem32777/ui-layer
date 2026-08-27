import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect } from 'storybook/test'
import StoryGrid from '@@/.storybook/components/StoryGrid.vue'
import StoryGridItem from '@@/.storybook/components/StoryGridItem.vue'
import StoryGridRow from '@@/.storybook/components/StoryGridRow.vue'
import StoryGridSection from '@@/.storybook/components/StoryGridSection.vue'
import { bulletsSizes, bulletsVariants } from '../Bullets.types.ts'
import Bullets from '../Bullets.vue'

type BulletsStoryArgs = ComponentProps<typeof Bullets>

const meta = {
	title: 'UI/Bullets',
	component: Bullets,
	parameters: { a11y: { test: 'error' } },
	argTypes: {
		modelValue: {
			description: 'Индекс активного буллета (с нуля).',
			control: { type: 'number', min: 0 },
			table: { type: { summary: 'number' } },
		},
		bulletsLength: { control: { type: 'number', min: 1 } },
		variant: { control: 'select', options: bulletsVariants },
		size: { control: 'select', options: bulletsSizes },
	},
	args: {
		modelValue: 0,
		bulletsLength: 5,
		variant: 'line',
		size: 'medium',
	} satisfies BulletsStoryArgs,
	render: (args: BulletsStoryArgs) => ({
		components: { Bullets },
		setup() { return { args } },
		template: '<Bullets v-bind="args" v-model="args.modelValue" />',
	}),
} satisfies Meta<BulletsStoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const DocsExample: Story = {
	tags: ['!dev'],
}

export const States: Story = {
	parameters: {
		pseudo: {
			hover: '.bullets-story--hovered .bullets__item:not(.bullets__item--active)',
			focusVisible: '.bullets-story--focused .bullets__item:not(.bullets__item--active)',
		},
	},
	render: (args: BulletsStoryArgs) => ({
		components: { Bullets, StoryGrid, StoryGridItem, StoryGridRow, StoryGridSection },
		setup() {
			return { args, bulletsVariants, bulletsSizes }
		},
		template: `
			<StoryGrid>
				<StoryGridSection
					v-for="variant in bulletsVariants"
					:key="variant"
					:title="variant"
				>
					<StoryGridRow
						v-for="size in bulletsSizes"
						:key="size"
					>
						<StoryGridItem :title="size">
							<Bullets
								v-bind="args"
								:variant="variant"
								:size="size"
							/>
						</StoryGridItem>
						<StoryGridItem
							title="hover"
							class="bullets-story--hovered"
						>
							<Bullets
								v-bind="args"
								:variant="variant"
								:size="size"
							/>
						</StoryGridItem>
						<StoryGridItem
							title="focus"
							class="bullets-story--focused"
						>
							<Bullets
								v-bind="args"
								:variant="variant"
								:size="size"
							/>
						</StoryGridItem>
					</StoryGridRow>
				</StoryGridSection>
			</StoryGrid>
		`,
	}),
}

export const Tests: Story = {
	play: async ({ args, canvas, userEvent }) => {
		const first = canvas.getByRole('button', { name: 'Слайд 1' })
		const third = canvas.getByRole('button', { name: 'Слайд 3' })

		await expect(first).toHaveAttribute('aria-current', 'true')
		await expect(third).not.toHaveAttribute('aria-current')

		await userEvent.click(third)
		await expect(third).toHaveAttribute('aria-current', 'true')
		await expect(first).not.toHaveAttribute('aria-current')
		await expect(args.modelValue).toBe(2)
	},
}
