<script setup lang="ts">
import spacingScss from '#layers/ui/app/config/styles/spacing.scss?raw'

const spacingSizes = Array.from(spacingScss.match(/\$spacing-sizes:\s*\(([\s\S]*?)\n\);/)?.[1]?.matchAll(/^\s*"?([\w-]+)"?:\s*\(([^)]+)\),?$/gm) ?? [])
	.map((match) => {
		const [mobile, tablet, desktop] = match[2]!.split(',').map(value => value.trim())

		return { name: `--spacing-${match[1]}`, mobile, tablet, desktop }
	})
</script>

<template>
	<div class="spacing">
		<div
			v-for="spacing in spacingSizes"
			:key="spacing.name"
			class="spacing__row"
		>
			<code class="spacing__name">{{ spacing.name }}</code>
			<span>{{ spacing.mobile }}</span>
			<span>{{ spacing.tablet }}</span>
			<span>{{ spacing.desktop }}</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.spacing {
	display: grid;
	gap: 6px;
}

.spacing__row {
	display: grid;
  grid-template-columns: repeat(4, 1fr);
	align-items: center;
	gap: 20px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
}
</style>
