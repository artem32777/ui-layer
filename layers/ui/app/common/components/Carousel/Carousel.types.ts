import type { Swiper } from 'swiper/vue'

export interface CarouselProps<T extends Record<string, any> = Record<string, any>> {
	/** Массив слайдов. */
	slides: T[]
	/** Пропсы свайпера */
	options?: SwiperVueOptions
}

export type SwiperVueOptions = InstanceType<typeof Swiper>['$props']

export const enum CarouselNavClass {
	nextEl = 'carousel-nav-next',
	prevEl = 'carousel-nav-prev',
}
