<script setup lang="ts" generic="T extends string | Record<string, unknown>">
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import SliderPagination from './pagination/SliderPagination.vue'
import {
	SliderNavClass, type SliderOptions,
	type SliderProps,
	type SwiperVueOptions,
} from './types'
import SliderNav from './navigation/SliderNav.vue'

import 'swiper/css'

const { slides, swiperOptions, options } = defineProps<SliderProps<T>>()

const emit = defineEmits<{
	'swiper': [swiper: SwiperInstance]
	'slide-change': [index: number]
}>()

const defaultOptions: SliderOptions = {
	hasNav: true,
	hasPagination: true,
}

const mergedOptions = { ...defaultOptions, ...options }

const defaultSwiperOptions: SwiperVueOptions = {
	modules: [Autoplay, Navigation, Pagination, EffectFade],
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

const swiperInstance = ref<SwiperInstance | null>(null)

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
					>
						{{ slide }}
					</slot>
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
