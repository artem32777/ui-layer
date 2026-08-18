<script setup lang="ts">
import type { Swiper } from 'swiper'
import { computed, ref, watch } from 'vue'

const { swiper } = defineProps<{
	count: number
	swiper: Swiper | null
}>()

const activeIndex = ref(0)
const autoplayProgress = ref(0)
const progressStyle = computed(() => ({
	'--hero-progress': `${autoplayProgress.value * 100}%`,
}))

watch(() => swiper, (instance, _previousInstance, onCleanup) => {
	if (!instance) return

	activeIndex.value = instance.realIndex

	function handleSlideChange() {
		activeIndex.value = instance!.realIndex
		autoplayProgress.value = 0
	}

	function handleAutoplayTimeLeft(_swiper: Swiper, _timeLeft: number, percentage: number) {
		autoplayProgress.value = Math.min(1, Math.max(0, 1 - percentage))
	}

	instance.on('slideChange', handleSlideChange)
	instance.on('autoplayTimeLeft', handleAutoplayTimeLeft)

	onCleanup(() => {
		instance.off('slideChange', handleSlideChange)
		instance.off('autoplayTimeLeft', handleAutoplayTimeLeft)
	})
}, { immediate: true })
</script>

<template>
	<div
		class="project-hero-slider__bullets"
		role="group"
		aria-label="Слайды главного экрана"
	>
		<button
			v-for="index in count"
			:key="index"
			class="project-hero-slider__bullet"
			type="button"
			:class="{ 'is-active': activeIndex === index - 1 }"
			:style="activeIndex === index - 1 ? progressStyle : undefined"
			:aria-label="`Перейти к слайду ${index}`"
			@click="swiper?.slideToLoop(index - 1)"
		>
			<span class="project-hero-slider__bullet-progress" />
		</button>
	</div>
</template>

<style scoped lang="scss">
.project-hero-slider__bullets {
  position: absolute;
  right: max(40px, calc((100vw - var(--container)) / 2));
  bottom: 26px;
  z-index: 4;
  display: flex;
  gap: 12px;
}

.project-hero-slider__bullet {
  position: relative;
  width: 100px;
  height: 32px;
  border: 0;
  padding: 14px 0;
  background: transparent;
  cursor: pointer;

  &::before,
  .project-hero-slider__bullet-progress {
    position: absolute;
    top: 14px;
    bottom: 14px;
    left: 0;
    border-radius: 6px;
  }

  &::before {
    right: 0;
    background: color-mix(in srgb, var(--white, #ffffff) 50%, transparent);
    content: '';
    transition: background 0.2s ease;
  }

  .project-hero-slider__bullet-progress {
    width: 0;
    background: var(--white, #ffffff);
  }

  &:hover::before {
    background: color-mix(in srgb, var(--white, #ffffff) 75%, transparent);
  }

  &.is-active .project-hero-slider__bullet-progress {
    width: var(--hero-progress, 0%);
  }

  &.is-active {
    cursor: default;
  }
}

@media (max-width: $sm) {
  .project-hero-slider__bullets {
    right: 16px;
    bottom: 14px;
    left: 16px;

    .project-hero-slider__bullet {
      flex: 1;
      width: auto;
    }
  }
}
</style>
