<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import SvgIcon from '#layers/ui/app/modules/svg-icon/components/SvgIcon.vue'

const {
	variant = 'base',
} = defineProps<{
	isNext?: boolean
	variant?: 'base' | 'secondary'
}>()
</script>

<template>
	<Button
		class="slider-nav-button"
		:class="`slider-nav-button_${variant}`"
		:aria-label="`${isNext ? 'Следующий' : 'Предыдущий'} слайд`"
	>
		<SvgIcon :name="isNext ? 'plus' : 'download'" />
	</Button>
</template>

<style scoped lang="scss">
.slider-nav-button {

}
</style>
