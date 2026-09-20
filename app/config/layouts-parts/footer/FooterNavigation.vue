<script setup lang="ts"></script>

<template>
	<div class="valley__footer-navigation">
		<nav
			class="valley__footer-group"
			aria-label="Студия"
		>
			<h3 class="valley__footer-group-title">
				Студия
			</h3>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/o-studii"
			>О студии</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/o-studii/etapy-sozdaniya-sajta"
			>Этапы работы</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/o-studii/otzyvy-o-webvalley-studio"
			>Отзывы</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/o-studii/faq"
			>Вопросы и ответы</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/o-studii/vakansii-veb-studii"
			>Вакансии</a>
		</nav>
		<nav
			class="valley__footer-group"
			aria-label="Для клиентов"
		>
			<h3 class="valley__footer-group-title">
				Для клиентов
			</h3>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/uslugi"
			>Услуги</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/portfolio-i-keysi-webvalley"
			>Проекты</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/support"
			>Поддержка</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/brif"
			>Бриф</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/kontakty"
			>Контакты</a>
		</nav>
		<nav
			class="valley__footer-group"
			aria-label="Больше о digital"
		>
			<h3 class="valley__footer-group-title">
				Больше о digital
			</h3>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/articles"
			>Статьи</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/academy"
			>Академия</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/partnerskie-programmy-veb-studij"
			>Партнёрская программа</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/dokumenty"
			>Документы</a>
			<a
				class="valley__footer-link"
				href="https://web-valley.ru/members/login"
			>Личный кабинет</a>
		</nav>
		<nav
			class="valley__footer-group"
			aria-label="Социальные сети"
		>
			<h3 class="valley__footer-group-title">
				Мы в сети
			</h3>
			<a
				class="valley__footer-link"
				href="https://t.me/webvalley_news"
				target="_blank"
				rel="noopener noreferrer"
			>Telegram ↗</a>
			<a
				class="valley__footer-link"
				href="https://www.behance.net/webvalleystudio"
				target="_blank"
				rel="noopener noreferrer"
			>
				Behance ↗
			</a>
			<a
				class="valley__footer-link"
				href="https://dprofile.ru/webvalley"
				target="_blank"
				rel="noopener noreferrer"
			>Dprofile ↗</a>
			<a
				class="valley__footer-link"
				href="https://www.youtube.com/webvalleystudio"
				target="_blank"
				rel="noopener noreferrer"
			>
				YouTube ↗
			</a>
			<a
				class="valley__footer-link"
				href="https://www.pinterest.ru/webvalley_studio/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Pinterest ↗
			</a>
			<a
				class="valley__footer-link"
				href="https://vk.com/webvalley"
				target="_blank"
				rel="noopener noreferrer"
			>ВКонтакте ↗</a>
		</nav>
	</div>
</template>

<style scoped lang="scss">
.valley__footer-navigation {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 40px;
	padding: 30px 0 55px;
	border-top: 1px solid #383e31;
	@media (max-width: $sm) {
		grid-template-columns: 1fr 1fr;
		gap: 35px 20px;
		padding-bottom: 40px;
	}
}
.valley__footer-group {
	display: flex;
	flex-direction: column;
	gap: 14px;
}
.valley__footer-group-title {
	margin: 0 0 8px;
	font-size: 15px;
	font-weight: 500;
	color: #f7f7f0;
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
