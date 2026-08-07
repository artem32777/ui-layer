<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '../../../common/components/Tabs/Tabs.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const activeTab = ref('account' as const)
</script>

<template>
	<UiKitSection title="Tabs">
		<UiKitDemo label="Two tabs">
			<Tabs
				v-model="activeTab"
				aria-label="Manage account"
				:items="[
					{ value: 'account', label: 'Account' },
					{ value: 'password', label: 'Password' },
				]"
			>
				<template #account>
					Make changes to your account here.
				</template>

				<template #password>
					Change your password here.
				</template>
			</Tabs>
		</UiKitDemo>
	</UiKitSection>
</template>
