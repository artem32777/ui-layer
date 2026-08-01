<script setup lang="ts">

</script>

<template>
	<div class="auth-layout">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.auth-layout {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	padding: 24px;
}
</style>
