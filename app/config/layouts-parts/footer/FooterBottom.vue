<script setup lang="ts"></script>

<template>
	<div class="valley__footer-legal">
		<a
			class="valley__footer-link"
			href="https://web-valley.ru/policy"
		>Политика конфиденциальности</a>
		<a
			class="valley__footer-link"
			href="https://web-valley.ru/polzovatelskoe-soglashenie"
		>Пользовательское соглашение</a>
		<a
			class="valley__footer-link"
			href="https://web-valley.ru/cookies"
		>Использование cookies</a>
	</div>
	<div class="valley__footer-bottom">
		<span>© {{ new Date().getFullYear() }} WebValley Studio</span>
		<span>Делаем digital человечнее.</span>
		<span>Дизайн. Код. Результат.</span>
	</div>
</template>

<style scoped lang="scss">
.valley__footer-legal {
	display: flex;
	flex-wrap: wrap;
	gap: 15px 30px;
	padding-bottom: 30px;
}
.valley__footer-bottom {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	font-size: 11px;
	color: #88947a;
	@media (max-width: $sm) {
		flex-direction: column;
		gap: 10px;
	}
}
.valley__footer-link {
	color: #aeb5a3;
	text-decoration: none;
	font-size: 13px;
	line-height: 1.45;
	&:hover {
		color: var(--brand);
	}
}
</style>
