<script setup lang="ts">
import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { SelectOption, SelectProps } from '../Select.types.ts'
import FormSelect from '../FormSelect.vue'
import type { FormFieldProps } from '#layers/ui/app/modules/form'

const props = withDefaults(defineProps<SelectProps<boolean> & FormFieldProps & {
	/** Показать состояние ошибки при монтировании (для stories). */
	showError?: boolean
}>(), {
	placeholder: 'Выберите город',
	options: () => [
		{ label: 'Москва', value: 'moscow' },
		{ label: 'Казань', value: 'kazan' },
	] satisfies SelectOption[],
})

const validationSchema = computed(() => toTypedSchema(z.object({
	city: props.multiple
		? z.array(z.string()).min(1, 'Укажите город')
		: z.string({ required_error: 'Укажите город' }).min(1, 'Укажите город'),
})))

const initialValues = computed(() => ({
	city: props.multiple
		? []
		: props.showError ? '' : undefined,
}))
</script>

<template>
	<Form
		:key="`${multiple}-${showError}`"
		:validation-schema="validationSchema"
		:initial-values="initialValues"
		:validate-on-mount="showError"
		class="form"
	>
		<FormSelect
			name="city"
			:label="label"
			:options="options"
			:placeholder="placeholder"
			:variant="variant"
			:size="size"
			:icon="icon"
			:hint="hint"
			:disabled="disabled"
			:multiple="multiple"
		/>
	</Form>
</template>

<style>
.form {
  width: 100%;
}
</style>
