<script setup lang="ts">
import { ref } from 'vue'
import Button from '#layers/ui/app/common/components/Button/Button.vue'
import Input from '#layers/ui/app/common/components/Input/Input.vue'
import Popover from '../Popover.vue'

const link = ref('https://example.com/docs/share/abc123')
</script>

<template>
	<Popover>
		<Button text="Поделиться" />

		<template #content="{ close }">
			<div class="popover-example">
				<div class="popover-example__header">
					<p class="popover-example__title">
						Поделиться документом
					</p>
					<p class="popover-example__description">
						Ссылка даёт доступ на просмотр. Скопируйте её или отправьте коллегам.
					</p>
				</div>

				<div class="popover-example__field">
					<label class="popover-example__label">
						Ссылка
						<Input
							v-model="link"
							size="sm"
						/>
					</label>
				</div>

				<div class="popover-example__actions">
					<Button
						text="Скопировать"
						variant="secondary"
					/>
					<Button
						text="Готово"
						@click="close"
					/>
				</div>
			</div>
		</template>
	</Popover>
</template>

<style scoped lang="scss">
.popover-example {
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 280px;
}

.popover-example__header {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.popover-example__title {
	margin: 0;
	font-weight: 600;
}

.popover-example__description {
	margin: 0;
	font-size: 14px;
	line-height: 1.4;
	color: color-mix(in srgb, var(--text, #000000) 65%, transparent);
}

.popover-example__field {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.popover-example__label {
	display: flex;
	flex-direction: column;
	gap: 6px;
	font-size: 13px;
}

.popover-example__actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}
</style>
