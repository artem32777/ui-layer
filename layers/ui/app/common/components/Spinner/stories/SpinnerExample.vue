<script setup lang="ts">
import Spinner from '../Spinner.vue'
import { useApiFetch } from '~/common/composables/useApiFetch.ts'
import Button from '#layers/ui/app/common/components/Button/Button.vue'

const { data, pending, execute } = useApiFetch('/some-data')
</script>

<template>
	<div>
		<Button @click="execute">
			load new data
		</Button>

		<div>
			<Spinner v-if="pending" />
			{{ data }}
		</div>
	</div>
</template>
