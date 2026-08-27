<script setup lang="ts">
import { ref } from 'vue'
import Bullets from '../Bullets.vue'

const activeBullet = ref(0)
</script>

<template>
	<Bullets
		v-model="activeBullet"
		:bullets-length="5"
		variant="long"
		size="medium"
	/>
</template>
