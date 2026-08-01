import { defineEventHandler } from 'h3'
import type { NavigationMenuItem } from '#layers/ui/app/common/components/NavigationMenu/NavigationMenu.types.ts'

export default defineEventHandler(() => {
	return [
		{
			label: 'Березка',
			children: [
				{ label: 'Контакты', href: '#contact' },
				{ label: 'Панель поиска', href: '#poisk' },
				{ label: 'Документация', href: '#documents' },
				{
					label: 'Расположение',
					children: [
						{
							label: 'Как купить',
							children: [
								{
									label: 'Все способы покупки',
									href: '#how-buy',
								},
								{
									label: 'Ипотека',
									href: '#mortgage',
								},
								{
									label: 'Рассрочка',
									href: '#installment',
								},
							],
						},
						{ label: 'Акции', href: '#novosti2' },
					],
				},
				{
					label: 'Новости и Акции',
					width: 260,
					children: [
						{
							label: 'Виртуальная прогулка',
							href: '#3d',
						},
						{ label: 'Отделка', href: '#otdelka' },
						{
							label: 'Ход строительства',
							href: '#construction',
						},
						{ label: 'Визуальный', href: '#visual' },
					],
				},
				{ label: 'Типовые квартиры', href: '#kvartira' },
				{ label: 'Преимущества', href: '#blago' },
				{ label: 'Галерея', href: '#gallery2' },
				{ label: 'жк', href: '#about2' },
				{ label: 'О проекте', href: '#about-us' },
				{ label: 'Визуальный', href: '#visual' },
				{
					label: 'Ход строительства',
					href: '#construction',
				},
				{ label: 'Отделка', href: '#otdelka' },
				{ label: 'тц', href: '#about' },
				{ label: 'вирт прогулка', href: '#3d' },
			],
		},
		{
			label: 'Как купить',
			children: [
				{ label: 'Проекты', href: '/favorite' },
			],
		},
		{
			label: 'Параметрический поиск',
			href: '/parametric-search',
		},
		{ label: 'Ход строительства', href: '/progress' },
		{ label: 'О компании', href: '/news-list' },
		{ label: 'Новости и акции', href: '/news-list' },
		{
			label: 'Коммерческие помещения',
			href: '/kommerciia',
		},
		{ label: '3д тур', href: '#virtualnaia-progulka' },
	] satisfies NavigationMenuItem[]
})
