<script setup lang="ts">
import Icon from '#layers/ui/app/modules/svg-icon/components/Icon.vue'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import { toast } from 'vue-sonner'
import Tabs from '#layers/ui/app/common/components/Tabs/Tabs.vue'

const tabItems = [
	{ value: 'account', label: 'Account test' },
	{ value: 'password', label: 'Password' },
] as const
</script>

<template>
	<div>
		<Icon name="download" />

		<Button @click="toast.warning('dsds')">
			toast
		</Button>

		<Tabs :items="tabItems">
			<template #account>
				dsds
			</template>
		</Tabs>
	</div>
</template>

<style scoped lang="scss">
.test {
  @include font-size(h2);
}
</style>
