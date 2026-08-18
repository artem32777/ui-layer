<script setup lang="ts">
import FormFieldError from './FormFieldError.vue'
import { useField } from 'vee-validate'

const props = defineProps<{
	name: string
}>()

const { value, handleChange, errorMessage, meta } = useField(() => props.name, {}, {
	validateOnValueUpdate: false,
	validateOnMount: false,
})
</script>

<template>
	<div class="v-field">
		<slot
			:value="value"
			:handle-change="handleChange"
			:invalid="!!errorMessage"
		/>
		<FormFieldError :error-message="errorMessage" />
	</div>
</template>

<style scoped lang="scss">
.v-field {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 6px;
}
</style>
