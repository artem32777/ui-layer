import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { ComponentProps } from 'vue-component-type-helpers'
import { expect, waitFor } from 'storybook/test'
import NavigationMenu from '../NavigationMenu.vue'
import navigationMenuTypesSource from '../NavigationMenu.types.ts?raw'
import { items } from './NavigationMenu.items'

type NavigationMenuStoryArgs = ComponentProps<typeof NavigationMenu>

const meta = {
	title: 'UI/NavigationMenu',
	component: NavigationMenu,
	argTypes: {
		items: {
			control: 'object',
			description:
				'Рекурсивное дерево ссылок и раскрывающихся групп. Количество уровней вложенности не ограничено.',
			table: {
				type: {
					summary: 'NavigationMenuItem[]',
					detail: navigationMenuTypesSource.trim(),
				},
			},
		},
	},
	args: {
		items,
	} satisfies NavigationMenuStoryArgs,
	parameters: {
		a11y: { test: 'error' },
		layout: 'fullscreen',
	},
	render: (args: NavigationMenuStoryArgs) => ({
		components: { NavigationMenu },
		setup() {
			return { args }
		},
		template: `
			<div style="box-sizing: border-box; display: flex; align-items: flex-start; width: 100%; min-height: 800px; padding: 64px 16px 360px; overflow: visible;">
				<NavigationMenu :items="args.items" />
			</div>
		`,
	}),
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<NavigationMenuStoryArgs>

export const Base: Story = {}

export const Tests: Story = {
	play: async ({ canvas, canvasElement, userEvent }) => {
		const services = canvas.getByRole('button', { name: 'Услуги' })
		const company = canvas.getByRole('button', { name: 'Компания' })
		const materials = canvas.getByRole('button', { name: 'Материалы' })
		const probe = document.createElement('span')
		const topList = canvasElement.querySelector<HTMLElement>(
			'.navigation-menu__list',
		)!
		const topItems = Array.from(topList.children) as HTMLElement[]

		probe.style.color = 'var(--text)'
		canvasElement.append(probe)
		const textColor = getComputedStyle(probe).color
		probe.style.color = 'var(--brand)'
		const brandColor = getComputedStyle(probe).color
		probe.remove()

		await expect(services).toHaveAttribute('aria-expanded', 'false')
		await expect(getComputedStyle(services).color).toBe(textColor)
		await expect(getComputedStyle(company).color).toBe(textColor)
		await expect(getComputedStyle(topList).gap).toBe('44px')

		for (let index = 1; index < topItems.length; index++) {
			const previousRect = topItems[index - 1]!.getBoundingClientRect()
			const currentRect = topItems[index]!.getBoundingClientRect()

			await expect(currentRect.left - previousRect.right).toBeCloseTo(44, 1)
		}

		const closedChevronTransform = getComputedStyle(
			services.querySelector<HTMLElement>('.navigation-menu-item__chevron')!,
		).transform

		const sampleFirstOpen = async () => {
			const frames: Array<{
				left: number
				opacity: number
				transform: string
				transitionProperty: string
			}> = []
			const samplingStartedAt = performance.now()
			let firstVisibleAt: number | undefined

			await new Promise<void>((resolve) => {
				const sample = (timestamp: number) => {
					const viewport = canvasElement.querySelector<HTMLElement>(
						'.navigation-menu__viewport',
					)

					if (
						viewport
						&& viewport.dataset.state === 'open'
						&& !viewport.hidden
					) {
						const style = getComputedStyle(viewport)
						const opacity = Number.parseFloat(style.opacity)

						if (opacity > 0) {
							firstVisibleAt ??= timestamp
							frames.push({
								left: viewport.getBoundingClientRect().left,
								opacity,
								transform: style.transform,
								transitionProperty: style.transitionProperty,
							})
						}
					}

					if (
						firstVisibleAt !== undefined
						&& timestamp - firstVisibleAt >= 350
					) {
						resolve()
					} else if (timestamp - samplingStartedAt >= 1200) {
						resolve()
					} else {
						requestAnimationFrame(sample)
					}
				}

				requestAnimationFrame(sample)
			})

			return frames
		}

		for (const trigger of [services, company, materials]) {
			const targetLeft = trigger.getBoundingClientRect().left
			const sampling = sampleFirstOpen()

			await userEvent.hover(trigger)
			const frames = await sampling

			await waitFor(() =>
				expect(trigger).toHaveAttribute('aria-expanded', 'true'),
			)
			await expect(frames.length).toBeGreaterThan(0)
			await expect(Math.abs(frames[0]!.left - targetLeft)).toBeLessThanOrEqual(
				1,
			)
			await expect(
				Math.max(...frames.map((frame) => frame.left))
				- Math.min(...frames.map((frame) => frame.left)),
			).toBeLessThanOrEqual(1)
			await expect(
				frames[0]!.transitionProperty.split(',').map((value) => value.trim()),
			).not.toContain('left')
			await expect(frames[0]!.opacity).toBeLessThan(1)
			await expect(frames.at(-1)!.opacity).toBeCloseTo(1, 2)
			await expect(frames[0]!.transform).not.toBe(frames.at(-1)!.transform)

			await userEvent.unhover(trigger)
			await waitFor(() =>
				expect(trigger).toHaveAttribute('aria-expanded', 'false'),
			)
			await waitFor(() => {
				const viewport = canvasElement.querySelector<HTMLElement>(
					'.navigation-menu__viewport',
				)!

				expect(
					Number.parseFloat(getComputedStyle(viewport).opacity),
				).toBeCloseTo(0, 2)
			})
		}

		await userEvent.hover(services)
		await waitFor(() =>
			expect(services).toHaveAttribute('aria-expanded', 'true'),
		)
		await waitFor(() =>
			expect(canvas.getByRole('link', { name: 'Стратегия' })).toBeVisible(),
		)
		await waitFor(() => {
			expect(
				getComputedStyle(
					services.querySelector<HTMLElement>(
						'.navigation-menu-item__chevron',
					)!,
				).transform,
			).not.toBe(closedChevronTransform)
		})

		const development = canvas.getByRole('button', { name: 'Разработка' })
		const industries = canvas.getByRole('button', {
			name: 'Отраслевые решения',
		})

		await expect(getComputedStyle(development).color).toBe(textColor)
		await expect(getComputedStyle(industries).color).toBe(textColor)
		await expect(getComputedStyle(industries).backgroundColor).toBe(
			'rgba(0, 0, 0, 0)',
		)

		await userEvent.click(development)
		await waitFor(() =>
			expect(development).toHaveAttribute('aria-expanded', 'true'),
		)
		await expect(
			canvas.getByRole('link', { name: 'Веб-приложения' }),
		).toBeVisible()
		await expect(development).toHaveAttribute('data-state', 'open')
		await userEvent.hover(development)
		await waitFor(() =>
			expect(getComputedStyle(development).color).toBe(brandColor),
		)
		await expect(getComputedStyle(development).backgroundColor).not.toBe(
			'rgba(0, 0, 0, 0)',
		)
		await expect(getComputedStyle(industries).color).toBe(textColor)

		const topViewport = canvasElement.querySelector<HTMLElement>(
			'.navigation-menu__viewport',
		)!
		const nestedViewport = canvasElement.querySelector<HTMLElement>(
			'.navigation-menu-dropdown__viewport',
		)!
		const initialWidth = topViewport.getBoundingClientRect().width
		const submenuPanel = nestedViewport.querySelector<HTMLElement>(
			'.navigation-menu-dropdown__list',
		)!
		const submenuLinks = Array.from(
			nestedViewport.querySelectorAll<HTMLElement>(
				'.navigation-menu-dropdown-item__link',
			),
		)

		await expect(initialWidth).toBeGreaterThanOrEqual(150)
		await waitFor(() => {
			expect(
				Math.abs(
					topViewport.getBoundingClientRect().left
					- services.getBoundingClientRect().left,
				),
			).toBeLessThanOrEqual(1)
		})
		await waitFor(() => {
			expect(
				nestedViewport.getBoundingClientRect().width,
			).toBeGreaterThanOrEqual(submenuPanel.scrollWidth)
		})
		for (const link of submenuLinks)
			await expect(link.scrollWidth).toBeLessThanOrEqual(link.clientWidth)
		await expect(nestedViewport.getBoundingClientRect().left).toBeGreaterThan(
			topViewport.getBoundingClientRect().right,
		)

		const topViewportRect = topViewport.getBoundingClientRect()
		const servicesRect = services.getBoundingClientRect()
		const nestedViewportRect = nestedViewport.getBoundingClientRect()

		await expect(
			document.elementFromPoint(
				topViewportRect.left + 10,
				(servicesRect.bottom + topViewportRect.top) / 2,
			),
		).toBe(topViewport)
		await expect(
			document.elementFromPoint(
				(topViewportRect.right + nestedViewportRect.left) / 2,
				nestedViewportRect.top + 10,
			),
		).toBe(nestedViewport)

		await new Promise((resolve) => setTimeout(resolve, 450))
		await expect(topViewport.getBoundingClientRect().width).toBe(initialWidth)

		await userEvent.hover(submenuPanel)
		await new Promise((resolve) => setTimeout(resolve, 200))
		await expect(development).toHaveAttribute('aria-expanded', 'true')

		const purchaseOptions = canvas.getByRole('button', { name: 'Как купить' })

		await userEvent.hover(purchaseOptions)
		await waitFor(() =>
			expect(purchaseOptions).toHaveAttribute('aria-expanded', 'true'),
		)
		await expect(
			canvas.getByRole('link', { name: 'Ипотека' }),
		).toBeVisible()
		let deepestViewport: HTMLElement | undefined

		await waitFor(() => {
			const viewports = Array.from(
				canvasElement.querySelectorAll<HTMLElement>(
					'.navigation-menu-dropdown__viewport',
				),
			)

			deepestViewport = viewports.at(-1)!

			expect(viewports.length).toBeGreaterThanOrEqual(2)
			expect(deepestViewport!.getBoundingClientRect().left).toBeGreaterThan(
				nestedViewport.getBoundingClientRect().right,
			)
		})

		const currentNestedViewportRect = nestedViewport.getBoundingClientRect()
		const deepestViewportRect = deepestViewport!.getBoundingClientRect()

		await expect(
			document.elementFromPoint(
				(currentNestedViewportRect.right + deepestViewportRect.left) / 2,
				deepestViewportRect.top + 10,
			),
		).toBe(deepestViewport)

		const deepestPanel = deepestViewport!.querySelector<HTMLElement>(
			'.navigation-menu-dropdown__list',
		)!

		await userEvent.hover(deepestPanel)
		await new Promise((resolve) => setTimeout(resolve, 200))
		await expect(services).toHaveAttribute('aria-expanded', 'true')
		await expect(development).toHaveAttribute('aria-expanded', 'true')
		await expect(purchaseOptions).toHaveAttribute('aria-expanded', 'true')
		await expect(
			canvasElement.querySelector('.navigation-menu__viewport'),
		).toBe(topViewport)

		await userEvent.hover(canvas.getByRole('link', { name: 'Поддержка' }))
		await waitFor(() =>
			expect(development).toHaveAttribute('aria-expanded', 'false'),
		)
		await expect(services).toHaveAttribute('aria-expanded', 'true')
		await expect(
			canvasElement.querySelector('.navigation-menu__viewport'),
		).toBe(topViewport)

		await userEvent.click(industries)
		await waitFor(() =>
			expect(industries).toHaveAttribute('aria-expanded', 'true'),
		)
		await expect(
			canvas.getByRole('link', { name: 'Ритейл и e-commerce' }),
		).toBeVisible()
		await expect(services).toHaveAttribute('aria-expanded', 'true')
		await expect(
			canvasElement.querySelector('.navigation-menu__viewport'),
		).toBe(topViewport)
		await waitFor(() => {
			const customWidthViewport = canvasElement.querySelector<HTMLElement>(
				'.navigation-menu-dropdown__viewport',
			)
			const customWidthPanel = customWidthViewport?.querySelector<HTMLElement>(
				'.navigation-menu-dropdown__list',
			)

			expect(
				customWidthViewport?.getBoundingClientRect().width,
			).toBeGreaterThanOrEqual(260)
			expect(
				customWidthViewport?.getBoundingClientRect().width,
			).toBeGreaterThanOrEqual(customWidthPanel?.scrollWidth ?? 0)
		})

		const sampleViewportLeft = async () => {
			const samples: number[] = []
			const startedAt = performance.now()

			await new Promise<void>((resolve) => {
				const sample = (timestamp: number) => {
					samples.push(topViewport.getBoundingClientRect().left)

					if (timestamp - startedAt >= 350) resolve()
					else requestAnimationFrame(sample)
				}

				requestAnimationFrame(sample)
			})

			return samples
		}

		let hasAssertedPositionTransition = false

		for (const [trigger, linkName] of [
			[company, 'О компании'],
			[materials, 'Блог'],
			[company, 'О компании'],
			[services, 'Стратегия'],
		] as const) {
			const sourceLeft = topViewport.getBoundingClientRect().left
			const targetLeft = trigger.getBoundingClientRect().left

			await userEvent.hover(trigger)

			if (!hasAssertedPositionTransition) {
				const transitionStyle = getComputedStyle(topViewport)
				const transitionProperties = transitionStyle.transitionProperty
					.split(',')
					.map((value) => value.trim())
				const transitionDurations = transitionStyle.transitionDuration
					.split(',')
					.map((value) => value.trim())

				for (const property of [
					'left',
					'width',
					'height',
					'opacity',
					'transform',
				])
					await expect(transitionProperties).toContain(property)
				await expect(
					transitionDurations.every((duration) => duration === '0.3s'),
				).toBe(true)
				hasAssertedPositionTransition = true
			}

			const samples = await sampleViewportLeft()

			await waitFor(() =>
				expect(trigger).toHaveAttribute('aria-expanded', 'true'),
			)
			await waitFor(() =>
				expect(canvas.getByRole('link', { name: linkName })).toBeVisible(),
			)
			await waitFor(() => {
				const activePanel = canvas
					.getByRole('link', { name: linkName })
					.closest<HTMLElement>('.navigation-menu-dropdown')!

				expect(
					topViewport.getBoundingClientRect().width,
				).toBeGreaterThanOrEqual(150)
				expect(topViewport.getBoundingClientRect().width).toBeCloseTo(
					activePanel.getBoundingClientRect().width,
					1,
				)
				expect(
					Math.abs(topViewport.getBoundingClientRect().left - targetLeft),
				).toBeLessThanOrEqual(1)
			})

			const direction = Math.sign(targetLeft - sourceLeft)
			const firstFrameTolerance = Math.max(
				6,
				Math.abs(targetLeft - sourceLeft) * 0.08,
			)

			await expect(Math.abs(samples[0]! - sourceLeft)).toBeLessThanOrEqual(
				firstFrameTolerance,
			)
			await expect(Math.abs(samples.at(-1)! - targetLeft)).toBeLessThanOrEqual(
				1,
			)

			for (let index = 1; index < samples.length; index++)
				await expect(
					(samples[index]! - samples[index - 1]!) * direction,
				).toBeGreaterThanOrEqual(-0.75)
		}

		await userEvent.keyboard('{Escape}')
		await waitFor(() =>
			expect(services).toHaveAttribute('aria-expanded', 'false'),
		)
	},
}
