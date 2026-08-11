import type { Swiper } from 'swiper/vue'

export interface SliderProps {
	slides: Record<string, any>
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
