<script setup lang="ts">
import { Theme } from '#layers/ui/app/config/theme'
</script>

<template>
	<div class="themes">
		<div
			v-for="(className, name) in Theme"
			:key="className"
			class="themes__item"
		>
			<strong class="themes__name">{{ name }}</strong>
			<span class="themes__class">{{ className }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.themes {
	display: grid;
	gap: 6px;
}

.themes__item {
	display: flex;
	align-items: center;
	gap: 20px;
	padding-bottom: 5px;
	border-bottom: 1px solid lightgray;
}

.themes__name {
	font-size: 25px;
}

.themes__class {
	font-size: 25px;
}
</style>
