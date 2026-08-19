<script setup lang="ts">
const {
	phone,
} = defineProps<{
	phone?: string
}>()

// Делает номер телефона из +78123359885 в формате +7 (812) 335-98-85
const formatPhone = () => {
	if (!phone) return

	const clean = phone.replace(/[^+\d]/g, '')

	if (clean.startsWith('+7') && clean.length === 12) {
		return clean.replace(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4')
	}

	return clean
}
</script>

<template>
	<a
		class="header-actions__phone"
		:href="`tel:${phone}`"
	>
		{{ formatPhone() }}
	</a>
</template>

<style scoped lang="scss">
.header-actions__phone {
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary);
  }

  @media (max-width: $lg) {
    font-size: 15px;
  }

  @media (max-width: $md) {
    display: none;
  }
}
</style>
