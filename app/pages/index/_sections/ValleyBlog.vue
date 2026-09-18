<script setup lang="ts">
const articles = [
	{
		title: 'Бизнес-сайт: как создать эффективный инструмент продаж, а не просто красивую визитку',
		date: '12.08.2026',
		category: 'Маркетинг и аналитика',
		href: 'https://web-valley.ru/articles/biznes-sajt',
		image: 'https://static.tildacdn.com/tild3432-6531-4935-a631-626531383631/Frame_9698_1.jpg',
	},
	{
		title: 'Тёмная тема на сайте: как сделать, чтобы ночной режим улучшал пользовательский опыт',
		date: '24.07.2026',
		category: 'Дизайн и разработка',
		href: 'https://web-valley.ru/articles/temnaya-tema-sajta',
		image: 'https://static.tildacdn.com/tild3631-3339-4135-a535-653735306337/Frame_9695_1.jpg',
	},
	{
		title: 'Сайты для B2B и B2C: в чём разница, и почему нельзя делать одинаково',
		date: '09.07.2026',
		category: 'Развитие бизнеса',
		href: 'https://web-valley.ru/articles/raznica-sajtov-dlya-b2b-i-b2c',
		image: 'https://static.tildacdn.com/tild6339-3535-4139-a239-376566656164/Frame_9693.jpg',
	},
]
</script>

<template>
	<section id="blog" class="valley-blog">
		<div class="valley-blog__intro">
			<span class="valley-blog__label" data-reveal>Делимся опытом</span>
			<h2 class="valley-blog__title" data-reveal>
				3 последних поста
				<br />
				из блога
			</h2>
			<p class="valley-blog__copy" data-reveal>
				Пишем о дизайне, разработке и продвижении сайтов. Делимся практикой студии с предпринимателями и будущими дизайнерами.
			</p>
		</div>
		<div class="valley-blog__posts">
			<a
				v-for="article in articles"
				:key="article.href"
				class="valley-blog__post"
				:href="article.href"
				target="_blank"
				rel="noopener noreferrer"
				data-reveal
			>
				<div class="valley-blog__image-wrap">
					<img class="valley-blog__image" :src="article.image" :alt="article.title" loading="lazy" />
				</div>
				<div class="valley-blog__meta">
					<span>{{ article.category }}</span>
					<span>{{ article.date }}</span>
				</div>
				<h3 class="valley-blog__name">{{ article.title }}</h3>
				<span class="valley-blog__read">Читать статью ↗</span>
			</a>
		</div>
		<a class="valley-blog__all" href="https://web-valley.ru/articles" target="_blank" rel="noopener noreferrer">
			Читать все статьи
			<span>↗</span>
		</a>
	</section>
</template>

<style scoped lang="scss">
.valley-blog {
	padding: 110px 5%;
	background: #1a1c19;
	@media (max-width: 760px) {
		padding: 70px 6%;
	}
}
.valley-blog__label {
	font-size: 12px;
	text-transform: uppercase;
	color: #c1c3ba;
}
.valley-blog__title {
	font-size: clamp(40px, 5.6vw, 90px);
	margin: 35px 0 30px;
	line-height: 1.05;
	letter-spacing: -0.045em;
	font-weight: 400;
}
.valley-blog__copy {
	margin: 0 0 65px auto;
	max-width: 560px;
	font-size: 20px;
	line-height: 1.45;
	color: #c1c3ba;
	@media (max-width: 760px) {
		margin-left: 0;
	}
}
.valley-blog__posts {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 28px;
	@media (max-width: 850px) {
		grid-template-columns: 1fr;
		gap: 50px;
	}
}
.valley-blog__post {
	display: flex;
	flex-direction: column;
	text-decoration: none;
	color: inherit;
	&:hover .valley-blog__image {
		transform: scale(1.035);
	}
	&:hover .valley-blog__name {
		color: var(--valley-yellow);
	}
}
.valley-blog__image-wrap {
	overflow: hidden;
	aspect-ratio: 1.5;
	background: #30332b;
}
.valley-blog__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	transition: transform 0.4s;
}
.valley-blog__meta {
	margin: 22px 0 15px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 12px;
	font-size: 10px;
	text-transform: uppercase;
	color: #b5b8ae;
}
.valley-blog__name {
	margin: 0 0 25px;
	font-size: clamp(22px, 2vw, 30px);
	font-weight: 400;
	line-height: 1.2;
	letter-spacing: -0.025em;
	transition: color 0.2s;
}
.valley-blog__read {
	margin-top: auto;
	font-size: 12px;
	text-transform: uppercase;
	color: var(--valley-yellow);
}
.valley-blog__all {
	margin-top: 65px;
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	color: inherit;
	text-decoration: none;
	border-bottom: 1px solid #696b62;
	font-size: 13px;
	text-transform: uppercase;
	&:hover {
		color: var(--valley-yellow);
	}
}
</style>
