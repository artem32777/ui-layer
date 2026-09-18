<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner'

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
		/>
	</ClientOnly>
</template>

<style lang="scss">
.sonner[data-sonner-toaster] {
  --normal-bg: var(--surface);
  --normal-border: var(--border-muted);
  --normal-text: var(--text);
  --success-text: var(--success);
  --info-text: var(--info);
  --warning-text: var(--warning);
  --error-text: var(--error);
}

.sonner__title {
	color: var(--text);
  font-weight: 400 !important;
}

.sonner__description {
	color: var(--text-muted);
	font-size: 13px;
}

.sonner__action {
	border: 1px solid var(--border-muted);
	border-radius: 6px;
	color: var(--text);
	background-color: var(--surface);
	font-size: 13px;
	font-weight: 500;
	transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover,  &:focus-visible {
    background-color: var(--surface-muted);
  }
}
</style>
