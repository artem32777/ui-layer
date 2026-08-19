import type { Swiper } from 'swiper/vue'

export interface CarouselProps<T extends Record<string, any> = Record<string, any>> {
	/** Массив слайдов. */
	slides: T[]
	/** Пропсы свайпера. */
	swiperOptions?: SwiperVueOptions
	/** Общие настройки компонента. */
	options?: CarouselOptions
}

export type CarouselOptions = {
	/** Показывать стрелки навигации. */
	hasNav: boolean
	/** Показывать пагинацию. */
	hasPagination: boolean
}

export type SwiperVueOptions = InstanceType<typeof Swiper>['$props']

export const enum CarouselNavClass {
	nextEl = 'carousel-nav-next',
	prevEl = 'carousel-nav-prev',
}
