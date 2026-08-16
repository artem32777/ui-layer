<script setup lang="ts">
import FormFieldError from './FormFieldError.vue'
import { Field } from 'vee-validate'

defineProps<{
	name: string
}>()
</script>

<template>
	<Field
		v-slot="{ value, handleChange, errorMessage }"
		:name="name"
	>
		<div class="v-field">
			<slot
				:value="value"
				:error-message="errorMessage"
				:handle-change="handleChange"
				:invalid="!!errorMessage"
			/>
			<FormFieldError :error-message="errorMessage" />
		</div>
	</Field>
</template>

<style scoped lang="scss">
.v-field {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 6px;
}
</style>
