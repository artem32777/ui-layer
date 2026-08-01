<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import Button from '../../../common/components/Button/Button.vue'
import Modal from '../../../common/components/Modal/Modal.vue'
import UiKitDemo from './UiKitDemo.vue'
import UiKitSection from './UiKitSection.vue'

const Input = defineAsyncComponent(() => import('../../../common/components/Input/Input.vue'))
const dialogOpen = ref(false)
</script>

<template>
	<UiKitSection title="Dialog">
		<UiKitDemo label="Dialog content">
			<Modal
				v-model="dialogOpen"
				title="Make changes to your profile"
			>
				<template #trigger>
					<Button variant="outline">
						Open dialog
					</Button>
				</template>
				<template #content>
					Make changes to your profile here. Click close when you are done.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque debitis deleniti enim id in, ipsum laudantium natus nisi nostrum quo repellendus reprehenderit suscipit unde veniam, voluptatum? Blanditiis exercitationem nisi optio placeat saepe temporibus. Architecto, aspernatur consectetur error excepturi illum iste laudantium nam nihil nostrum quas ratione reprehenderit? Dolor, error, facere.
				</template>
				<Input
					aria-label="Profile name"
					placeholder="Profile name"
				/>
			</Modal>
		</UiKitDemo>
	</UiKitSection>
</template>
