<script setup lang="ts">
const { isOpen } = defineProps<{
	isOpen: boolean
}>()
</script>

<template>
	<button
		class="header-burger"
		:class="{ 'header-burger_open': isOpen }"
		type="button"
		:aria-label="isOpen ? 'Закрыть меню' : 'Открыть меню'"
		:aria-expanded="isOpen"
		aria-controls="header-mobile-menu"
	>
		<span class="header-burger__line" />
		<span class="header-burger__line" />
		<span class="header-burger__line" />
	</button>
</template>

<style scoped lang="scss">
.header-burger {
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 44px;
  height: 44px;
  gap: 5px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: var(--text);
  background: color-mix(in srgb, var(--grey) 35%, var(--background));
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: var(--white);
    background: var(--brand);
  }

  @media (max-width: $sm) {
    display: inline-flex;
    order: 2;
  }

  &.header-burger_open {
    .header-burger__line {
      &:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
      }
    }
  }
}

.header-burger__line {
  width: 18px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
