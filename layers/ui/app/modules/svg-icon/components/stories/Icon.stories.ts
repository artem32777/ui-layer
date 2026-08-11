import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { useClipboard } from '@vueuse/core'
import { computed, ref } from 'vue'
import Icon from '../Icon.vue'
import { iconGroups, iconNameList, iconNames, type IconName } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'

type IconStoryArgs = ComponentProps<typeof Icon>

const meta = {
	title: 'UI/Icon',
	component: Icon,
	argTypes: {
		name: {
			control: 'select',
			options: iconNameList,
		},
		size: { control: 'text' },
		color: { control: 'color' },
	},
	args: {
		name: iconNames.plus,
		size: 24,
		color: '#4149f2',
	} satisfies IconStoryArgs,
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
	render: args => ({
		components: { Icon },
		setup() { return { args, iconNames } },
		template: '<Icon v-bind="args" :name="args.name ?? iconNames.plus" />',
	}),
}

export const Icons: Story = {
	render: () => ({
		components: { Icon },
		setup() {
			const search = ref('')
			const iconCount = Object.keys(iconNames).length
			const { copy, copied, text } = useClipboard()

			const filteredIconGroups = computed(() => {
				const query = search.value.trim().toLowerCase()

				if (!query) {
					return iconGroups
				}

				return iconGroups
					.map(group => ({
						...group,
						icons: Object.fromEntries(
							Object.entries(group.icons).filter(([name]) => name.includes(query)),
						) as Record<string, IconName>,
					}))
					.filter(group => Object.keys(group.icons).length)
			})

			const filteredIconCount = computed(() => filteredIconGroups.value
				.reduce((count, group) => count + Object.keys(group.icons).length, 0))

			return { search, iconCount, filteredIconGroups, filteredIconCount, copy, copied, text }
		},
		template: `
			<div style="display: grid; gap: 28px;">
				<div style="display: flex; gap: 24px; align-items: end; justify-content: space-between; flex-wrap: wrap;">
					<div>
						<strong style="display: block; color: var(--text); font-size: 18px;">Иконки</strong>
						<span style="color: var(--additional-2); font-size: 14px;">{{ filteredIconCount }} / {{ iconCount }}</span>
					</div>
					<label style="display: grid; gap: 8px; width: min(100%, 320px);">
						<span style="color: var(--additional-2); font-size: 13px; font-weight: 600;">Search</span>
						<input
							v-model="search"
							type="search"
							placeholder="download"
							autocomplete="off"
							style="width: 100%; height: 42px; padding: 0 14px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background); color: var(--text); font: inherit; outline: none;"
						>
					</label>
				</div>
				<div
					v-if="filteredIconCount"
					style="display: grid; gap: 28px;"
				>
					<section
						v-for="group in filteredIconGroups"
						:key="group.dir"
						style="display: grid; gap: 12px;"
					>
						<strong
							v-if="group.dir"
							style="color: var(--text); font-size: 16px;"
						>
							{{ group.title }}
						</strong>
						<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px;">
							<button
								v-for="iconName in group.icons"
								:key="iconName"
								type="button"
								:title="copied && text === iconName ? 'Скопировано' : 'Скопировать название'"
								style="display: grid; gap: 10px; justify-items: center; padding: 18px 12px; border: 1px solid var(--grey); border-radius: 8px; color: var(--text); background: var(--background); cursor: pointer; font: inherit;"
								@click="copy(iconName)"
							>
								<Icon :name="iconName" :size="28" />
								<code style="color: var(--additional-2); font-size: 12px;">{{ copied && text === iconName ? 'Скопировано' : iconName }}</code>
							</button>
						</div>
					</section>
				</div>
				<p
					v-else
					style="margin: 0; padding: 24px; border: 1px dashed var(--grey); border-radius: 8px; background: var(--background); color: var(--additional-2); text-align: center;"
				>
					Иконки не найдены
				</p>
			</div>
		`,
	}),
}
