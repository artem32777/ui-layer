<template>
	<div class="container">
		<p
			v-for="index in 18"
			:key="index"
		>
			Scrollable item {{ index }}
		</p>
	</div>
</template>

<style scoped lang="scss">
.container {
  overflow-y: auto;
  max-height: 300px;
  @include custom-scrollbar();
}
</style>
