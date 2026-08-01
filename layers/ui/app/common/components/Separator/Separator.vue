<script setup lang="ts">
import { Separator } from 'reka-ui'

// https://reka-ui.com/docs/components/separator

interface SeparatorProps {
	/** Направление разделителя. */
	orientation?: 'horizontal' | 'vertical'
	/** Исключает разделитель из семантической структуры, если он используется только для оформления. */
	decorative?: boolean
}

withDefaults(defineProps<SeparatorProps>(), {
	orientation: 'horizontal',
	decorative: false,
})
</script>

<template>
	<Separator
		class="separator"
		:orientation="orientation"
		:decorative="decorative"
	/>
</template>

<style scoped lang="scss">
.separator {
	flex-shrink: 0;
	background-color: var(--grey, #e2e2e2);

	&[data-orientation="horizontal"] {
		width: 100%;
		height: 1px;
	}

	&[data-orientation="vertical"] {
		width: 1px;
    align-self: stretch;
	}
}
</style>
