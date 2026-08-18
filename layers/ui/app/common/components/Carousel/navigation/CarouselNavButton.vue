<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { Icon } from '#layers/ui/app/modules/svg-icon'

withDefaults(defineProps<{
	isNext?: boolean
	variant?: 'base' | 'secondary'
}>(), {
	variant: 'base',
})
</script>

<template>
	<Button
		class="carousel-nav-button"
		:class="`carousel-nav-button_${variant}`"
		:aria-label="`${isNext ? 'Следующий' : 'Предыдущий'} слайд`"
	>
		<Icon :name="isNext ? 'plus' : 'download'" />
	</Button>
</template>

<style scoped lang="scss">
.carousel-nav-button {

}
</style>
