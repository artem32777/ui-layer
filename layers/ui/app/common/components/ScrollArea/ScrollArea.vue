<script setup lang="ts">
import type { Component } from 'vue'
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'

// https://reka-ui.com/docs/components/scroll-area

interface ScrollAreaProps {
	orientation?: 'vertical' | 'horizontal'
	/** Оборачивает viewport через as-child, например SelectViewport */
	viewportAsChild?: Component
}

defineProps<ScrollAreaProps>()

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
		<component
			:is="viewportAsChild"
			v-if="viewportAsChild"
			as-child
		>
			<ScrollAreaViewport class="custom-scroll-area__viewport">
				<slot />
			</ScrollAreaViewport>
		</component>
		<ScrollAreaViewport
			v-else
			class="custom-scroll-area__viewport"
		>
			<slot />
		</ScrollAreaViewport>
		<ScrollAreaScrollbar
			v-if="!orientation || orientation === 'vertical'"
			orientation="vertical"
			class="custom-scroll-area__scrollbar"
		>
			<ScrollAreaThumb class="custom-scroll-area__thumb" />
		</ScrollAreaScrollbar>
		<ScrollAreaScrollbar
			v-if="!orientation || orientation === 'horizontal'"
			orientation="horizontal"
			class="custom-scroll-area__scrollbar"
		>
			<ScrollAreaThumb class="custom-scroll-area__thumb" />
		</ScrollAreaScrollbar>
		<ScrollAreaCorner
			v-if="!orientation"
			class="custom-scroll-area__corner"
		/>
	</ScrollAreaRoot>
</template>

<style scoped lang="scss">
.custom-scroll-area {
  --scrollbar-size: 4px;
  height: inherit;
  max-height: inherit;
  overflow: hidden;

  &:has(:deep(.custom-scroll-area__scrollbar[data-orientation="vertical"])) {
    padding-right: 12px;
  }

  &:hover {
    .custom-scroll-area__thumb {
      background-color: var(--bg-controls-scrollthumb-hover);
    }
  }
}

:deep(.custom-scroll-area__viewport) {
  width: 100%;
  height: 100%;
  max-height: inherit;
  border-radius: inherit;
}

:deep(.custom-scroll-area__scrollbar) {
  display: flex;
  touch-action: none;
  user-select: none;
  transition: background-color 0.3s ease;

  &[data-orientation="vertical"] {
    width: var(--scrollbar-size);
  }

  &[data-orientation="horizontal"] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }
}

:deep(.custom-scroll-area__thumb) {
  position: relative;
  flex: 1;
  border-radius: var(--scrollbar-size);
  background-color: var(--bg-controls-scrollthumb);
  transition: background-color 0.3s ease 0s;

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

//:deep(.custom-scroll-area__corner) {
//  background-color: var(--neutral-500, #e2e2e2);
//}
</style>
