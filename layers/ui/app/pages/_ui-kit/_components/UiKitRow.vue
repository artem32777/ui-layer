<template>
	<div class="ui-kit-row">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.ui-kit-row {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-end;
	gap: 16px;
}
</style>
