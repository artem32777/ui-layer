<script setup lang="ts">
import type { BulletsProps } from './Bullets.types.ts'

withDefaults(defineProps<BulletsProps>(), {
	variant: 'circle',
	size: 'medium',
})

/** Индекс активного буллета (с нуля). */
const activeBullet = defineModel<number>({ default: 0 })
</script>

<template>
	<nav
		class="bullets"
		:class="[
			`bullets--variant-${variant}`,
			`bullets--size-${size}`,
		]"
		aria-label="Навигация"
	>
		<button
			v-for="index in bulletsLength"
			:key="index"
			type="button"
			class="bullets__item"
			:class="{ 'bullets__item--active': activeBullet === index - 1 }"
			:aria-current="activeBullet === index - 1 ? 'true' : undefined"
			:aria-label="`Слайд ${index}`"
			@click="activeBullet = index - 1"
		/>
	</nav>
</template>

<style scoped lang="scss">
.bullets {
	display: inline-flex;
}

.bullets__item {
	border-radius: 20px;
	background-color: var(--graphics-dark);
  opacity: 0.3;
	transition: width 0.2s ease, background-color 0.2s ease;

	&.bullets__item--active {
    opacity: 1;
		cursor: default;
	}
}

.bullets--size-medium {
	gap: 6px;

	.bullets__item {
		width: 4px;
		height: 4px;
	}

	&.bullets--variant-long {
		.bullets__item--active {
			width: 18px;
		}
	}
}

.bullets--size-big {
	gap: 8px;

	.bullets__item {
		width: 6px;
		height: 6px;
	}

	&.bullets--variant-long {
		.bullets__item--active {
			width: 24px;
		}
	}
}
</style>
