<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner'
import { Icon } from '#layers/ui/app/modules/svg-icon'

defineProps<{
	/** Отображение тостов без их группировки. */
	expand?: boolean
	/** Количество одновременно отображаемых тостов. */
	visibleToasts?: number
}>()
</script>

<template>
	<ClientOnly>
		<Toaster
			class="sonner"
			position="bottom-right"
			rich-colors
			:expand="expand"
			:visible-toasts="visibleToasts"
			:toast-options="{
				class: 'sonner__toast',
				descriptionClass: 'sonner__description',
				classes: {
					title: 'sonner__title',
					actionButton: 'sonner__action',
				},
			}"
		>
			<template #loading-icon>
				<!-- icon -->
			</template>
			<template #success-icon>
				<!-- icon -->
			</template>
			<template #error-icon>
				<!-- icon -->
			</template>
			<template #info-icon>
				<!-- icon -->
			</template>
			<template #warning-icon>
				<!-- icon -->
			</template>
		</Toaster>
	</ClientOnly>
</template>

<style lang="scss">
.sonner[data-sonner-toaster] {
  --normal-bg: var(--background, #ffffff);
  --normal-border: var(--grey, #e2e2e2);
  --normal-text: var(--text, #000000);
  --success-text: #007526;
  --info-text: #0866c2;
  --warning-text: #a85500;
  --error-text: #cc0000;
}

.sonner__title {
	color: var(--text, #000000);
  font-weight: 400 !important;
}

.sonner__description {
	color: var(--additional-2, #6b5b72);
	font-size: 13px;
}

.sonner__action {
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 6px;
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);
	font-size: 13px;
	font-weight: 500;
	transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover,  &:focus-visible {
    background-color: var(--grey, #e2e2e2);
  }
}
</style>
