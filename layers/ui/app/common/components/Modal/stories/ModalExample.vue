<script setup lang="ts">
import Modal from '../Modal.vue'
import CallbackForm from '../../../../../../../app/modules/callback/components/form/CallbackForm.vue'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
</script>

<template>
	<Modal title="Заказать звонок">
		<template #trigger>
			<slot>
				<Button>Позвоните мне</Button>
			</slot>
		</template>

		<template #content>
			<CallbackForm />
		</template>
	</Modal>
</template>
