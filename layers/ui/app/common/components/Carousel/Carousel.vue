<script setup lang="ts" generic="T extends Record<string, any>">
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { shallowRef } from 'vue'
import { CarouselNavClass, type CarouselProps, type SwiperVueOptions } from './Carousel.types.ts'
import CarouselNav from './navigation/CarouselNav.vue'

import 'swiper/css'

const props = defineProps<CarouselProps<T>>()

defineSlots<{
	/** Обязательный слот, содержащий вёрстку слайдов */
	slides: (props: { slide: T, index: number }) => any
	/** По умолчанию содержит дефолтную навигацию  */
	inner: any
}>()

const defaultOptions: SwiperVueOptions = {
	modules: [Autoplay, Navigation, Pagination],
	// autoplay: { delay: 3000 },
	speed: 900,
	grabCursor: true,
	allowTouchMove: true,
	pagination: { clickable: true },
	navigation: {
		nextEl: `.${CarouselNavClass.nextEl}`,
		prevEl: `.${CarouselNavClass.prevEl}`,
	},
}

const swiperMergedOptions: SwiperVueOptions = { ...defaultOptions, ...props.options }

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
	<div class="carousel">
		<ClientOnly>
			<Swiper
				v-bind="swiperMergedOptions"
				class="carousel__swiper"
				@swiper="handleSwiper"
				@slide-change="handleSlideChange"
			>
				<SwiperSlide
					v-for="(slide, index) in slides"
					:key="index"
					class="carousel__slide"
				>
					<!-- Содержимое слайда -->
					<slot
						name="slides"
						v-bind="{ slide, index }"
					/>
				</SwiperSlide>

				<slot name="inner">
					<CarouselNav />
				</slot>
			</Swiper>
		</ClientOnly>
	</div>
</template>

<style scoped lang="scss">
.carousel,
.carousel__slide,
.carousel__swiper {
  height: 100%;
  width: 100%;
  min-width: 0;
  min-height: 100px;

  > * {
    height: 100%;
  }
}

.carousel {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.carousel__slide {
  //background-color: red;
}
</style>
