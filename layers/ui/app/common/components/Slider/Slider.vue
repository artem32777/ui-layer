<script setup lang="ts" generic="T extends Record<string, any>">
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { shallowRef } from 'vue'
import SliderPagination from './pagination/SliderPagination.vue'
import { SliderNavClass, type SliderOptions, type SliderProps, type SwiperVueOptions } from './types'
import SliderNav from './navigation/SliderNav.vue'

const { slides, options, swiperOptions } = defineProps<SliderProps<T>>()

defineSlots<{
	slide: (props: { slide: T, index: number }) => unknown
	nav?: () => unknown
	pagination?: (props: { count: number, swiper: SwiperInstance | null }) => unknown
}>()

const defaultOptions: SliderOptions = {
	hasNav: true,
	hasPagination: false,
}

const mergedOptions = { ...defaultOptions, ...options }

const defaultSwiperOptions: SwiperVueOptions = {
	modules: [Autoplay, Navigation, Pagination],
	// autoplay: { delay: 3000 },
	speed: 900,
	allowTouchMove: true,
	pagination: { clickable: true },
	navigation: {
		nextEl: `.${SliderNavClass.nextEl}`,
		prevEl: `.${SliderNavClass.prevEl}`,
	},
}

const swiperMergedOptions: SwiperVueOptions = { ...defaultSwiperOptions, ...swiperOptions }

const emit = defineEmits<{
	'swiper': [swiper: SwiperInstance]
	'slide-change': [index: number]
}>()

const swiperInstance = shallowRef<SwiperInstance | null>(null)

function handleSwiper(swiper: SwiperInstance) {
	swiperInstance.value = swiper
	emit('swiper', swiper)
}

function handleSlideChange(swiper: SwiperInstance) {
	emit('slide-change', swiper.realIndex)
}
</script>

<template>
	<div class="slider">
		<ClientOnly>
			<Swiper
				v-bind="swiperMergedOptions"
				class="slider__swiper"
				@swiper="handleSwiper"
				@slide-change="handleSlideChange"
			>
				<SwiperSlide
					v-for="(slide, index) in slides"
					:key="index"
					class="slider__slide"
				>
					<!-- Содержимое слайда -->
					<slot
						name="slide"
						v-bind="{ slide, index }"
					/>
				</SwiperSlide>

				<!-- Навигация -->
				<slot
					v-if="mergedOptions.hasNav"
					name="nav"
				>
					<SliderNav />
				</slot>

				<!-- Пагинация -->
				<slot
					v-if="mergedOptions.hasPagination"
					name="pagination"
					v-bind="{ count: slides.length, swiper: swiperInstance }"
				>
					<SliderPagination
						:count="slides.length"
						:swiper="swiperInstance"
					/>
				</slot>
			</Swiper>
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.slider,
.slider__slide,
.slider__swiper {
  height: 100%;
  width: 100%;
  min-width: 0;
  min-height: 100px;
}

.slider {
  //position: absolute;
  //width: 100%;
  //overflow: hidden;
}

.slider__slide {
  background-color: red;
}
</style>
