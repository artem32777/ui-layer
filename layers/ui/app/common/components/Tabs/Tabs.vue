<script setup lang="ts">
// https://reka-ui.com/docs/components/tabs
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

const modelValue = defineModel<string>({ default: 'account' })
</script>

<template>
	<TabsRoot
		v-model="modelValue"
		class="ui-tabs"
	>
		<TabsList
			class="ui-tabs__list"
			aria-label="Manage account"
		>
			<TabsTrigger
				class="ui-tabs__trigger"
				value="account"
			>
				Account
			</TabsTrigger>
			<TabsTrigger
				class="ui-tabs__trigger"
				value="password"
			>
				Password
			</TabsTrigger>
		</TabsList>
		<TabsContent
			class="ui-tabs__content"
			value="account"
		>
			Make changes to your account here.
		</TabsContent>
		<TabsContent
			class="ui-tabs__content"
			value="password"
		>
			Change your password here.
		</TabsContent>
	</TabsRoot>
</template>

<style scoped lang="scss">
.ui-tabs {
	display: flex;
	flex-direction: column;
	width: 320px;
}

.ui-tabs__list {
	display: inline-flex;
	align-items: center;
	align-self: flex-start;
	padding: 4px;
	border-radius: 8px;
	background-color: var(--grey, #e2e2e2);
}

.ui-tabs__trigger {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 120px;
	height: 32px;
	padding: 0 12px;
	border-radius: 6px;
	color: var(--additional-2, #6b5b72);
	font-weight: 500;
	user-select: none;
	transition: color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
	cursor: pointer;

	&[data-state="active"] {
		color: var(--text, #000000);
		background-color: var(--background, #ffffff);
		box-shadow: 0 1px 2px color-mix(in srgb, var(--text, #000000) 8%, transparent);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}
}

.ui-tabs__content {
	flex-grow: 1;
	margin-top: 12px;
	padding: 16px;
	border: 1px solid var(--grey, #e2e2e2);
	border-radius: 8px;
	color: var(--additional-2, #6b5b72);
	background-color: var(--background, #ffffff);
	font-size: 14px;
	line-height: 1.5;

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand, #4149f2) 35%, transparent);
	}
}
</style>
