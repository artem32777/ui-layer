import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from '../../Button/Button.vue'
import Checkbox from '../../Checkbox/Checkbox.vue'
import Input from '../../Input/Input.vue'
import Modal from '../../Modal/Modal.vue'
import Icon from '../../../../modules/svg-icon/components/Icon.vue'
import { iconNameList, iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'

const meta = {
	title: 'Design System/Examples',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const TypographyScale: Story = {
	render: () => ({
		setup() {
			return {
				items: [
					{ token: 'hero', size: '36 / 36 / 64', weight: '400', line: '1.1', text: 'Hero заголовок' },
					{ token: 'h1', size: '32 / 32 / 56', weight: '400', line: '1.1', text: 'H1 заголовок страницы' },
					{ token: 'h2', size: '28 / 28 / 48', weight: '400', line: '1.1', text: 'H2 раздел страницы' },
					{ token: 'h3', size: '24 / 24 / 40', weight: '400', line: '1.2', text: 'H3 крупный блок' },
					{ token: 'h4', size: '22 / 22 / 32', weight: '400', line: '1.2', text: 'H4 карточка или секция' },
					{ token: 'lead', size: '18 / 18 / 22', weight: '400', line: '1.5', text: 'Lead текст для вводного описания' },
					{ token: 'p1-regular', size: '16 / 16 / 18', weight: '400', line: '1.5', text: 'Основной текст интерфейса' },
					{ token: 'p2-regular', size: '14 / 14 / 16', weight: '400', line: '1.5', text: 'Подписи, вспомогательный текст' },
					{ token: 'p3-regular', size: '12 / 12 / 14', weight: '400', line: '1.5', text: 'Микротекст, системные подписи' },
				],
			}
		},
		template: `
			<div style="display: grid; gap: 12px;">
				<div
					v-for="item in items"
					:key="item.token"
					style="display: grid; grid-template-columns: minmax(140px, 220px) 1fr; gap: 20px; align-items: center; padding: 16px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);"
				>
					<div style="display: grid; gap: 4px; color: var(--additional-2); font-size: 13px;">
						<strong style="color: var(--text);">{{ item.token }}</strong>
						<span>{{ item.size }}px</span>
						<span>weight {{ item.weight }} / line {{ item.line }}</span>
					</div>
					<div :style="{ color: 'var(--text)', fontSize: item.size.split(' / ')[2] + 'px', fontWeight: item.weight, lineHeight: item.line }">
						{{ item.text }}
					</div>
				</div>
			</div>
		`,
	}),
}

export const GridBreakpoints: Story = {
	render: () => ({
		setup() {
			return {
				breakpoints: [
					{ name: '$xxxs', value: '320px' },
					{ name: '$xxs', value: '360px' },
					{ name: '$xs', value: '480px' },
					{ name: '$sm', value: '768px' },
					{ name: '$md', value: '960px' },
					{ name: '$lg', value: '1280px' },
					{ name: '$xl', value: '1440px' },
					{ name: '$xxl', value: '1920px' },
					{ name: '$xxxl', value: '2560px' },
				],
			}
		},
		template: `
			<div style="display: grid; gap: 20px;">
				<div style="display: grid; grid-template-columns: repeat(36, 1fr); gap: 2px; padding: 12px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);">
					<div
						v-for="index in 36"
						:key="index"
						style="height: 48px; border-radius: 4px; background: color-mix(in srgb, var(--brand) 18%, transparent);"
					/>
				</div>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px;">
					<div
						v-for="breakpoint in breakpoints"
						:key="breakpoint.name"
						style="padding: 12px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);"
					>
						<strong style="display: block; color: var(--text);">{{ breakpoint.name }}</strong>
						<span style="color: var(--additional-2); font-size: 13px;">{{ breakpoint.value }}</span>
					</div>
				</div>
			</div>
		`,
	}),
}

export const IconsGallery: Story = {
	render: () => ({
		components: { SvgIcon: Icon },
		setup() {
			return { iconNameList }
		},
		template: `
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
				<div
					v-for="iconName in iconNameList"
					:key="iconName"
					style="display: grid; gap: 10px; justify-items: center; padding: 18px 12px; border: 1px solid var(--grey); border-radius: 8px; color: var(--text); background: var(--background);"
				>
					<SvgIcon :name="iconName" :size="28" />
					<code style="color: var(--additional-2); font-size: 12px;">{{ iconName }}</code>
				</div>
			</div>
		`,
	}),
}

export const ButtonsRules: Story = {
	render: () => ({
		components: { Button },
		setup() {
			return { iconNames }
		},
		template: `
			<div style="display: grid; gap: 20px;">
				<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
					<Button variant="base" size="l">Сохранить</Button>
					<Button variant="outline" size="l">Подробнее</Button>
					<Button variant="ghost" size="l">Отмена</Button>
					<Button :icon-left="iconNames.plus" aria-label="Добавить" />
				</div>
				<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
					<Button state="hovered">Hovered</Button>
					<Button state="focused">Focused</Button>
					<Button state="pressed">Pressed</Button>
					<Button state="disabled">Disabled</Button>
				</div>
			</div>
		`,
	}),
}

export const FormsRules: Story = {
	render: () => ({
		components: { Checkbox, Input },
		template: `
			<div style="display: grid; gap: 16px; max-width: 520px;">
				<label style="display: grid; gap: 8px; color: var(--text);">
					<span style="font-size: 14px; font-weight: 600;">Email</span>
					<Input placeholder="name@example.com" type="email" />
				</label>
				<label style="display: grid; gap: 8px; color: var(--text);">
					<span style="font-size: 14px; font-weight: 600;">Поле с ошибкой</span>
					<Input placeholder="Введите значение" aria-invalid="true" />
					<span style="color: var(--red); font-size: 12px;">Поле обязательно для заполнения</span>
				</label>
				<Checkbox>Согласен с условиями</Checkbox>
				<Checkbox invalid>Состояние ошибки</Checkbox>
			</div>
		`,
	}),
}

export const ModalRules: Story = {
	render: () => ({
		components: { Button, Modal },
		template: `
			<Modal>
				<template #trigger>
					<Button>Открыть модалку</Button>
				</template>
				<template #title>
					Подтверждение действия
				</template>
				<template #description>
					Коротко объясните, что произойдёт после подтверждения.
				</template>
				<div style="display: flex; gap: 12px; justify-content: flex-end;">
					<Button variant="outline">Отмена</Button>
					<Button>Подтвердить</Button>
				</div>
			</Modal>
		`,
	}),
}

export const StatePatterns: Story = {
	render: () => ({
		components: { Button },
		setup() {
			return { iconNames }
		},
		template: `
			<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
				<div style="display: grid; gap: 10px; padding: 18px; border: 1px solid var(--grey); border-radius: 8px; background: var(--background);">
					<strong style="color: var(--text);">Пустое состояние</strong>
					<p style="margin: 0; color: var(--additional-2); line-height: 1.5;">Покажите причину пустоты и одно понятное действие.</p>
					<div>
						<Button :icon-left="iconNames.plus">Добавить</Button>
					</div>
				</div>
				<div style="display: grid; gap: 10px; padding: 18px; border: 1px solid var(--red); border-radius: 8px; background: color-mix(in srgb, var(--red) 6%, var(--background));">
					<strong style="color: var(--red);">Ошибка</strong>
					<p style="margin: 0; color: var(--text); line-height: 1.5;">Опишите проблему человеческим языком и предложите следующий шаг.</p>
					<div>
						<Button variant="outline">Повторить</Button>
					</div>
				</div>
			</div>
		`,
	}),
}
