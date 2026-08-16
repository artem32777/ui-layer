<script setup lang="ts">
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { Icon } from '#layers/ui/app/modules/svg-icon'
import CallbackModal from '../../../../modules/callback/components/modal/CallbackModal.vue'
</script>

<template>
	<CallbackModal>
		<Button
			class="header-actions__callback"
			aria-label="Заказать звонок"
		>
			<span class="header-actions__callback-text">Заказать звонок</span>
			<Icon
				name="phone"
				:size="20"
				class="header-actions__callback-icon"
			/>
		</Button>
	</CallbackModal>
</template>

<style scoped lang="scss">
.header-actions__callback {
  @media (max-width: $sm) {
    width: 44px;
    min-height: 44px;
    padding: 0;
    border-radius: 50%;
    color: var(--brand);
    background-color: color-mix(in srgb, var(--brand) 10%, transparent);

    &:hover {
      color: var(--white);
      background-color: var(--brand);
    }
  }
}

.header-actions__callback-text {
  @media (max-width: $sm) {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    border: 0;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
}

.header-actions__callback-icon {
  display: none;

  @media (max-width: $sm) {
    display: block;
  }
}
</style>
