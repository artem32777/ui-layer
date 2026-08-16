import type { Swiper } from 'swiper/vue'

export interface SliderProps<T extends Record<string, any> = Record<string, any>> {
	slides: T[]
	swiperOptions?: SwiperVueOptions
	options?: SliderOptions
}

export type SliderOptions = {
	hasNav: boolean
	hasPagination: boolean
}

export type SwiperVueOptions = InstanceType<typeof Swiper>['$props']

export const enum SliderNavClass {
	nextEl = 'slider-nav-next',
	prevEl = 'slider-nav-prev',
}
