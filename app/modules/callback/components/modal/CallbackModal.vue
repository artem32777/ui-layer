<script setup lang="ts">
import Modal from '#layers/ui/app/common/components/Modal/Modal.vue'
import CallbackForm from '../form/CallbackForm.vue'
</script>

<template>
	<Modal>
		<template #trigger>
			<slot />
		</template>
		<template #title>
			Заказать обратный звонок
		</template>
		<CallbackForm />
	</Modal>
</template>

<style scoped lang="scss">

</style>
