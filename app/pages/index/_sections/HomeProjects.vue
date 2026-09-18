<script setup lang="ts"></script>

<template>
	<section id="projects" class="valley__section valley__projects">
		<div class="valley__section-top">
			<span class="valley__label">01 / Избранные проекты</span>
			<span class="valley__section-note">У каждого бизнеса — своя история</span>
		</div>
		<div class="valley__heading-row">
			<h2 class="valley__heading">
				Меньше слов.
				<br />
				<span class="valley__muted">Больше дела.</span>
			</h2>
			<p class="valley__section-copy">
				Сайты, в которых эстетика
				<br />
				встречается с эффективностью.
			</p>
		</div>
		<div class="valley__project-grid">
			<a
				class="valley__project"
				href="https://web-valley.ru/portfolio-i-keysi-webvalley/sajt-katalog-optiki"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="valley__project-image-wrap">
					<img
						class="valley__project-image"
						src="https://static.tildacdn.com/tild3265-3736-4162-b066-343535383439/optic_lab.png"
						alt="Дизайн сайта Optic Lab"
						loading="lazy"
					/>
					<span class="valley__project-arrow">↗</span>
				</div>
				<div class="valley__project-caption">
					<h3 class="valley__project-title">Optic Lab</h3>
					<span class="valley__project-category">Сайт-каталог · Дизайн · Разработка</span>
				</div>
			</a>
			<a
				class="valley__project"
				href="https://web-valley.ru/arkhiv-portfolio-i-keysi/agentstvo-po-podboru-crm"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="valley__project-image-wrap">
					<img
						class="valley__project-image"
						src="https://static.tildacdn.com/tild6336-3939-4237-b731-366264313634/ragaza.png"
						alt="Дизайн сайта Ragaza"
						loading="lazy"
					/>
					<span class="valley__project-arrow">↗</span>
				</div>
				<div class="valley__project-caption">
					<h3 class="valley__project-title">Ragaza</h3>
					<span class="valley__project-category">CRM · Корпоративный сайт</span>
				</div>
			</a>
			<a
				class="valley__project valley__project--logistic"
				href="https://web-valley.ru/portfolio-i-keysi-webvalley/sozdanie-sajta-transportnoj-kompanii"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="valley__project-image-wrap">
					<img
						class="valley__project-image"
						src="https://static.tildacdn.com/tild3530-3461-4036-b066-356135346465/STLogistic.png"
						alt="Дизайн сайта ST Logistic"
						loading="lazy"
					/>
					<span class="valley__project-arrow">↗</span>
				</div>
				<div class="valley__project-caption">
					<h3 class="valley__project-title">ST Logistic</h3>
					<span class="valley__project-category">Корпоративный сайт · Логистика</span>
				</div>
			</a>
			<a
				class="valley__project"
				href="https://web-valley.ru/portfolio-i-keysi-webvalley/konversionniy-lending-dlya-kursov-restart-academy"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="valley__project-image-wrap">
					<img
						class="valley__project-image"
						src="https://static.tildacdn.com/tild6639-6261-4637-a466-643061623263/restart.png"
						alt="Дизайн сайта Restart Academy"
						loading="lazy"
					/>
					<span class="valley__project-arrow">↗</span>
				</div>
				<div class="valley__project-caption">
					<h3 class="valley__project-title">Restart Academy</h3>
					<span class="valley__project-category">Образование · Лендинг</span>
				</div>
			</a>
			<a
				class="valley__project valley__project--cars"
				href="https://web-valley.ru/arkhiv-portfolio-i-keysi/design-sayta-companii-dealer-cars"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div class="valley__project-image-wrap valley__project-image-wrap--wide">
					<img
						class="valley__project-image"
						src="https://static.tildacdn.com/tild6531-6531-4664-a234-373961313764/Dealer_cars.png"
						alt="Дизайн сайта Dealer Cars"
						loading="lazy"
					/>
					<span class="valley__project-arrow">↗</span>
				</div>
				<div class="valley__project-caption">
					<h3 class="valley__project-title">Dealer Cars</h3>
					<span class="valley__project-category">Автомобильный бизнес · Дизайн · Разработка</span>
				</div>
			</a>
		</div>
	</section>
</template>

<style scoped lang="scss">
.valley__section {
	padding: 105px 5%;
	scroll-margin-top: calc(var(--valley-header-height) + 30px);
	@media (max-width: 760px) {
		padding: 68px 6%;
	}
}
.valley__section-top {
	display: flex;
	justify-content: space-between;
	margin-bottom: 47px;
	gap: 20px;
}
.valley__label {
	font-size: 12px;
	color: #d5d6ce;
}
.valley__section-note {
	font-size: 12px;
	color: #9a9d95;
	@media (max-width: 760px) {
		display: none;
	}
}
.valley__heading-row {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 40px;
	margin-bottom: 55px;
	@media (max-width: 760px) {
		display: block;
		margin-bottom: 35px;
	}
}
.valley__heading {
	font-size: clamp(43px, 5.25vw, 80px);
	font-weight: 500;
	line-height: 1.08;
	letter-spacing: -2.7px;
	margin: 0;
	@media (max-width: 760px) {
		font-size: 42px;
		letter-spacing: -1.6px;
	}
}
.valley__muted {
	color: #8b8f87;
}
.valley__section-copy {
	font-size: 17px;
	line-height: 1.55;
	color: #bcbfb6;
	max-width: 380px;
	margin: 0 0 5px;
	@media (max-width: 760px) {
		margin-top: 25px;
		font-size: 16px;
	}
}
.valley__project-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 48px 28px;
	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		gap: 35px;
	}
}
.valley__project {
	color: #f7f7f0;
	text-decoration: none;
	&:hover {
		.valley__project-image {
			transform: scale(1.035);
		}
		.valley__project-arrow {
			background: var(--valley-yellow);
			color: #111211;
		}
	}
}
.valley__project--cars {
	grid-column: 1 / -1;
}
.valley__project-image-wrap {
	aspect-ratio: 1.27;
	position: relative;
	overflow: hidden;
	background: #d4c5b5;
}
.valley__project--logistic {
	.valley__project-image-wrap {
		background: #cfd7e0;
	}
}
.valley__project-image-wrap--wide {
	aspect-ratio: 2.1;
	background: #afb3ba;
	@media (max-width: 760px) {
		aspect-ratio: 1.27;
	}
}
.valley__project-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.5s;
}
.valley__project-arrow {
	position: absolute;
	right: 20px;
	bottom: 20px;
	width: 48px;
	height: 48px;
	display: grid;
	place-items: center;
	border-radius: 50%;
	color: #f7f7f0;
	background: #111211;
	font-size: 26px;
	transition: background 0.2s;
}
.valley__project-caption {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	margin-top: 20px;
	@media (max-width: 760px) {
		display: block;
	}
}
.valley__project-title {
	font-size: 24px;
	font-weight: 500;
	margin: 0;
}
.valley__project-category {
	font-size: 12px;
	color: #a6aaa0;
	@media (max-width: 760px) {
		display: block;
		margin-top: 6px;
	}
}
</style>
