<script setup lang="ts">
import FormField from './FormField.vue'
import Checkbox, { type CheckboxProps } from '#layers/ui/app/common/components/Checkbox/Checkbox.vue'

defineProps<{
	name: string
	checkboxProps?: CheckboxProps
}>()
</script>

<template>
	<FormField
		v-slot="{ value, handleChange, invalid }"
		:name="name"
	>
		<Checkbox
			v-bind="checkboxProps"
			:model-value="value"
			:invalid="invalid"
			@update:model-value="handleChange"
		>
			<slot />
		</Checkbox>
	</FormField>
</template>

<style scoped lang="scss">

</style>
