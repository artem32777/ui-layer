<script setup lang="ts">
// https://reka-ui.com/docs/components/scroll-area
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'

interface ScrollAreaProps {
	orientation?: 'vertical' | 'horizontal'
}

withDefaults(defineProps<ScrollAreaProps>(), {
	orientation: 'horizontal',
})

defineSlots<{
	/** Скролящийся контент */
	default?: any
}>()
</script>

<template>
	<ScrollAreaRoot
		class="custom-scroll-area"
		type="auto"
	>
		<ScrollAreaViewport class="custom-scroll-area__viewport">
			<slot />
		</ScrollAreaViewport>
		<ScrollAreaScrollbar
			:orientation="orientation"
			class="custom-scroll-area__scrollbar"
		>
			<ScrollAreaThumb class="custom-scroll-area__thumb" />
		</ScrollAreaScrollbar>
	</ScrollAreaRoot>
</template>

<style scoped lang="scss">
.custom-scroll-area {
  height: inherit;
  max-height: inherit;
}

:deep(.custom-scroll-area__viewport) {
  width: 100%;
  height: 100%;
  border-radius: inherit;

  &[data-orientation="vertical"] {
    padding-right: var(--scrollbar-size);
  }

  &[data-orientation="horizontal"] {
    padding-bottom: var(--scrollbar-size);
  }
}

:deep(.custom-scroll-area__scrollbar) {
	display: flex;
	touch-action: none;
	user-select: none;
	transition: background-color 0.3s ease;
  background-color: var(--grey, #e2e2e2);

	&:hover {
		background-color: color-mix(in srgb, var(--text, #000000) 6%, transparent);
	}

	&[data-orientation="vertical"] {
    width: var(--scrollbar-size);
	}

  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: var(--scrollbar-size);
	}
}

:deep(.custom-scroll-area__thumb) {
	flex: 1;
	border-radius: 999px;
	background-color: var(--brand, #4149f2);

  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
}
</style>
