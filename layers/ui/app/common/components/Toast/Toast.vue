<script setup lang="ts">
import { Toaster, toast } from 'vue-sonner'

function showToast() {
	toast('Event has been created', {
		description: 'Sunday, December 03, 2023 at 9:00 AM',
		action: {
			label: 'Undo',
			onClick: () => toast.info('Action cancelled'),
		},
	})
}
</script>

<template>
	<slot
		name="trigger"
		:show-toast="showToast"
	/>
	<ClientOnly>
		<Toaster
			class="ui-sonner"
			position="bottom-right"
			:toast-options="{
				class: 'ui-sonner__toast',
				descriptionClass: 'ui-sonner__description',
				classes: {
					title: 'ui-sonner__title',
					actionButton: 'ui-sonner__action',
				},
			}"
		/>
	</ClientOnly>
</template>

<style scoped lang="scss">
.ui-sonner {
	--normal-bg: var(--background, #ffffff);
	--normal-border: var(--grey, #e2e2e2);
	--normal-text: var(--text, #000000);
	--success-bg: var(--background, #ffffff);
	--success-border: var(--grey, #e2e2e2);
	--success-text: var(--text, #000000);
	--info-bg: var(--background, #ffffff);
	--info-border: var(--grey, #e2e2e2);
	--info-text: var(--text, #000000);
	--warning-bg: var(--background, #ffffff);
	--warning-border: var(--grey, #e2e2e2);
	--warning-text: var(--text, #000000);
	--error-bg: var(--background, #ffffff);
	--error-border: var(--red, #ff001f);
	--error-text: var(--red, #ff001f);
}

:global(.ui-sonner__toast) {
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 8px;
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);
	box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--text, #000000) 10%, transparent), 0 4px 6px -4px color-mix(in srgb, var(--text, #000000) 10%, transparent);
}

:global(.ui-sonner__title) {
	color: var(--text, #000000);
	font-size: 14px;
	font-weight: 600;
}

:global(.ui-sonner__description) {
	color: var(--additional-2, #6b5b72);
	font-size: 13px;
	line-height: 1.4;
}

:global(.ui-sonner__action) {
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 6px;
	color: var(--text, #000000);
	background-color: var(--background, #ffffff);
	font-size: 13px;
	font-weight: 500;
	transition: background-color 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		background-color: var(--grey, #e2e2e2);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}
}
</style>
