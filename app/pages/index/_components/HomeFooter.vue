<script setup lang="ts"></script>

<template>
	<footer class="valley__footer">
		<a class="valley__all-services" href="#services">
			<span>Все услуги студии</span>
			<span class="valley__all-services-arrow">↗</span>
		</a>
		<div class="valley__footer-top">
			<a class="valley__brand" href="#">
				webvalley
				<span class="valley__brand-studio">studio®</span>
			</a>
			<a class="valley__footer-email" href="mailto:hello@web-valley.ru">hello@web-valley.ru ↗</a>
			<a class="valley__back-top" href="#">Наверх ↑</a>
		</div>
		<div class="valley__footer-navigation">
			<nav class="valley__footer-group" aria-label="Студия">
				<h3 class="valley__footer-group-title">Студия</h3>
				<a class="valley__footer-link" href="https://web-valley.ru/o-studii">О студии</a>
				<a class="valley__footer-link" href="https://web-valley.ru/o-studii/etapy-sozdaniya-sajta">Этапы работы</a>
				<a class="valley__footer-link" href="https://web-valley.ru/o-studii/otzyvy-o-webvalley-studio">Отзывы</a>
				<a class="valley__footer-link" href="https://web-valley.ru/o-studii/faq">Вопросы и ответы</a>
				<a class="valley__footer-link" href="https://web-valley.ru/o-studii/vakansii-veb-studii">Вакансии</a>
			</nav>
			<nav class="valley__footer-group" aria-label="Для клиентов">
				<h3 class="valley__footer-group-title">Для клиентов</h3>
				<a class="valley__footer-link" href="https://web-valley.ru/uslugi">Услуги</a>
				<a class="valley__footer-link" href="https://web-valley.ru/portfolio-i-keysi-webvalley">Проекты</a>
				<a class="valley__footer-link" href="https://web-valley.ru/support">Поддержка</a>
				<a class="valley__footer-link" href="https://web-valley.ru/brif">Бриф</a>
				<a class="valley__footer-link" href="https://web-valley.ru/kontakty">Контакты</a>
			</nav>
			<nav class="valley__footer-group" aria-label="Больше о digital">
				<h3 class="valley__footer-group-title">Больше о digital</h3>
				<a class="valley__footer-link" href="https://web-valley.ru/articles">Статьи</a>
				<a class="valley__footer-link" href="https://web-valley.ru/academy">Академия</a>
				<a class="valley__footer-link" href="https://web-valley.ru/partnerskie-programmy-veb-studij">Партнёрская программа</a>
				<a class="valley__footer-link" href="https://web-valley.ru/dokumenty">Документы</a>
				<a class="valley__footer-link" href="https://web-valley.ru/members/login">Личный кабинет</a>
			</nav>
			<nav class="valley__footer-group" aria-label="Социальные сети">
				<h3 class="valley__footer-group-title">Мы в сети</h3>
				<a class="valley__footer-link" href="https://t.me/webvalley_news" target="_blank" rel="noopener noreferrer">Telegram ↗</a>
				<a class="valley__footer-link" href="https://www.behance.net/webvalleystudio" target="_blank" rel="noopener noreferrer">
					Behance ↗
				</a>
				<a class="valley__footer-link" href="https://dprofile.ru/webvalley" target="_blank" rel="noopener noreferrer">Dprofile ↗</a>
				<a class="valley__footer-link" href="https://www.youtube.com/webvalleystudio" target="_blank" rel="noopener noreferrer">
					YouTube ↗
				</a>
				<a class="valley__footer-link" href="https://www.pinterest.ru/webvalley_studio/" target="_blank" rel="noopener noreferrer">
					Pinterest ↗
				</a>
				<a class="valley__footer-link" href="https://vk.com/webvalley" target="_blank" rel="noopener noreferrer">ВКонтакте ↗</a>
			</nav>
		</div>
		<div class="valley__footer-legal">
			<a class="valley__footer-link" href="https://web-valley.ru/policy">Политика конфиденциальности</a>
			<a class="valley__footer-link" href="https://web-valley.ru/polzovatelskoe-soglashenie">Пользовательское соглашение</a>
			<a class="valley__footer-link" href="https://web-valley.ru/cookies">Использование cookies</a>
		</div>
		<div class="valley__footer-bottom">
			<span>© {{ new Date().getFullYear() }} WebValley Studio</span>
			<span>Делаем digital человечнее.</span>
			<span>Дизайн. Код. Результат.</span>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.valley__brand {
	color: #f7f7f0;
	text-decoration: none;
	font-size: 33px;
	font-weight: 750;
	letter-spacing: -1.7px;
	line-height: 0.85;
	display: flex;
	flex-direction: column;
}
.valley__brand-studio {
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 2.8px;
	margin-top: 8px;
}
.valley__footer {
	padding: 45px 5% 28px;
	border-top: 1px solid #383e31;
	@media (max-width: 760px) {
		padding: 35px 6% 28px;
	}
}
.valley__footer-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	padding-bottom: 50px;
	@media (max-width: 760px) {
		flex-wrap: wrap;
		gap: 30px;
	}
}
.valley__footer-email {
	color: #f7f7f0;
	text-decoration: none;
	font-size: clamp(18px, 2.4vw, 34px);
	letter-spacing: -0.7px;
	&:hover {
		color: var(--valley-yellow);
	}
	@media (max-width: 760px) {
		order: 3;
		width: 100%;
	}
}
.valley__back-top {
	color: #d6dec9;
	text-decoration: none;
	font-size: 13px;
}
.valley__footer-bottom {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	font-size: 11px;
	color: #88947a;
	@media (max-width: 760px) {
		flex-direction: column;
		gap: 10px;
	}
}
.valley__all-services {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 30px;
	padding: 55px 5%;
	margin: -45px -5.555556% 60px;
	color: #111211;
	background: var(--valley-yellow);
	text-decoration: none;
	font-size: clamp(35px, 6vw, 88px);
	letter-spacing: -2px;
	line-height: 1.1;
	&:hover {
		.valley__all-services-arrow {
			transform: translate(7px, -7px);
		}
	}
	@media (max-width: 760px) {
		padding: 40px 6%;
		margin: -35px -6.818182% 45px;
		font-size: 36px;
		letter-spacing: -1px;
	}
}
.valley__all-services-arrow {
	transition: transform 0.25s;
}
.valley__footer-navigation {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 40px;
	padding: 30px 0 55px;
	border-top: 1px solid #383e31;
	@media (max-width: 760px) {
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
		color: var(--valley-yellow);
	}
}
.valley__footer-legal {
	display: flex;
	flex-wrap: wrap;
	gap: 15px 30px;
	padding-bottom: 30px;
}
</style>
