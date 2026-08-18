import type { Swiper } from 'swiper/vue'

export interface CarouselProps<T extends Record<string, any> = Record<string, any>> {
	slides: T[]
	swiperOptions?: SwiperVueOptions
	options?: CarouselOptions
}

export type CarouselOptions = {
	hasNav: boolean
	hasPagination: boolean
}

export type SwiperVueOptions = InstanceType<typeof Swiper>['$props']

export const enum CarouselNavClass {
	nextEl = 'carousel-nav-next',
	prevEl = 'carousel-nav-prev',
}
