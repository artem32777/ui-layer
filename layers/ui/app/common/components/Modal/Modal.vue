<script setup lang="ts">
// https://reka-ui.com/docs/components/dialog
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from 'reka-ui'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { iconNames } from '#layers/ui/app/modules/svg-icon/runtime/iconNames'

const modelValue = defineModel<boolean>({ default: false })

interface ModalProps {
	/** Вариация стилизации */
	variant?: 'base' | 'fullscreen-mobile'
	/** Заголовок модального окна. */
	title?: string
	/** Краткое описание под заголовком. */
	subtitle?: any
	/** Убрать кнопку закрытия модального окна */
	hideCloseBtn?: boolean
}

withDefaults(defineProps<ModalProps>(), {
	variant: 'base',
})

defineSlots<{
	/** Элемент по клику на который открывает модальное окно */
	trigger: any
	/** Контент модального окна. */
	content: any
	/** Кастомное содержимое кнопки закрытия. */
	closeBtn?: any
}>()
</script>

<template>
	<DialogRoot v-model:open="modelValue">
		<DialogTrigger as-child>
			<slot name="trigger" />
		</DialogTrigger>
		<DialogPortal>
			<DialogOverlay class="modal-overlay" />
			<DialogContent
				class="modal"
				:class="`modal--${variant}`"
			>
				<DialogTitle
					v-if="title"
					class="modal__title"
				>
					{{ title }}
				</DialogTitle>

				<DialogDescription
					v-if="subtitle"
					class="modal__subtitle"
				>
					{{ subtitle }}
				</DialogDescription>

				<DialogClose
					v-if="!hideCloseBtn"
					class="modal__close"
					aria-label="Close"
					as-child
				>
					<slot name="closeBtn">
						<Button
							:icon-left="iconNames.close"
							variant="outline"
						/>
					</slot>
				</DialogClose>

				<div class="modal__content">
					<slot name="content" />
				</div>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  z-index: $z-modal-overlay;
  inset: 0;
  background-color: color-mix(in srgb, var(--text, #000000) 50%, transparent);
  animation: modal-fade-in 0.3s ease;
}

.modal {
  position: fixed;
  z-index: $z-modal;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 48px);
  padding: 22px;
  border-radius: 8px;
  background-color: var(--background, #ffffff);
  box-shadow: 0 20px 25px -5px color-mix(in srgb, var(--text, #000000) 10%, transparent), 0 8px 10px -6px color-mix(in srgb, var(--text, #000000) 10%, transparent);
  animation: modal-content-show 0.3s ease;
  width: 600px;

  &.modal--fullscreen-mobile {
    @media (max-width:$sm){
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
      border: 0;
      border-radius: 0;
      transform: none;
    }
  }
}

.modal__content {
  overflow-y: auto;
}

.modal__title {
  color: var(--text, #000000);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.modal__subtitle {
  color: var(--additional-2, #6b5b72);
  margin-bottom: 10px;
}

.modal__close {
  position: absolute;
  top: 14px;
  right: 14px;

  &:hover, &:focus-visible  {
    color: var(--text, #000000);
    background-color: var(--grey, #e2e2e2);
  }
}

@keyframes modal-fade-in {
	from {opacity: 0}
	to {opacity: 1}
}

@keyframes modal-content-show {
	from {opacity: 0;transform: translate(-50%, -48%) scale(0.96)}
	to {opacity: 1;transform: translate(-50%, -50%) scale(1)}
}
</style>
