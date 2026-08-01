import type { NavigationMenuItem } from '../NavigationMenu.types.ts'

export const items: NavigationMenuItem[] = [
	{
		label: 'Услуги',
		children: [
			{
				label: 'Стратегия',
				href: '/services/strategy',
			},
			{
				label: 'Аудит продукта',
				href: '/services/product-audit',
			},
			{
				label: 'Разработка',
				children: [
					{
						label: 'Веб-приложения',
						href: '/services/development/web',
					},
					{
						label: 'Мобильные приложения',
						href: '/services/development/mobile',
					},
					{
						label: 'Интеграции',
						href: '/services/development/integrations',
					},
					{
						label: 'Высоконагруженные системы',
						href: '/services/development/highload',
					},
					{
						label: 'Техническая поддержка',
						href: '/services/development/support',
					},
					{
						label: 'Как купить',
						children: [
							{
								label: 'Ипотека',
								href: '/services/development/mortgage',
							},
							{
								label: 'Рассрочка',
								href: '/services/development/installment',
							},
							{
								label: 'Лизинг',
								href: '/services/development/leasing',
							},
						],
					},
				],
			},
			{
				label: 'Дизайн',
				width: 220,
				children: [
					{
						label: 'UX-исследования',
						href: '/services/design/research',
					},
					{
						label: 'Интерфейсы',
						href: '/services/design/interfaces',
					},
					{
						label: 'Дизайн-системы',
						href: '/services/design/systems',
					},
					{
						label: 'Брендинг',
						href: '/services/design/branding',
					},
				],
			},
			{
				label: 'Отраслевые решения',
				width: 260,
				children: [
					{
						label: 'Ритейл и e-commerce',
						href: '/industries/retail',
					},
					{
						label: 'Финансовые сервисы',
						href: '/industries/finance',
					},
					{
						label: 'Промышленность',
						href: '/industries/manufacturing',
					},
					{
						label: 'Здравоохранение',
						href: '/industries/healthcare',
					},
					{
						label: 'Логистика',
						href: '/industries/logistics',
					},
				],
			},
			{
				label: 'Данные и аналитика',
				width: 240,
				children: [
					{
						label: 'BI-системы',
						href: '/services/data/bi',
					},
					{
						label: 'Машинное обучение',
						href: '/services/data/machine-learning',
					},
					{
						label: 'Платформы данных',
						href: '/services/data/platforms',
					},
					{
						label: 'Аудит данных',
						href: '/services/data/audit',
					},
				],
			},
			{
				label: 'Поддержка',
				href: '/services/support',
			},
		],
	},
	{
		label: 'Компания',
		children: [
			{
				label: 'О компании',
				href: '/company',
			},
			{
				label: 'Карьера',
				href: '/company/career',
			},
			{
				label: 'Команда',
				href: '/company/team',
			},
			{
				label: 'Офисы',
				children: [
					{
						label: 'Москва',
						href: '/company/offices/moscow',
					},
					{
						label: 'Саратов',
						href: '/company/offices/saratov',
					},
					{
						label: 'Казань',
						href: '/company/offices/kazan',
					},
				],
			},
			{
				label: 'Документы',
				children: [
					{
						label: 'Реквизиты',
						href: '/company/documents/details',
					},
					{
						label: 'Лицензии',
						href: '/company/documents/licenses',
					},
					{
						label: 'Политики',
						href: '/company/documents/policies',
					},
				],
			},
		],
	},
	{
		label: 'Материалы',
		children: [
			{
				label: 'Блог',
				href: '/blog',
			},
			{
				label: 'Кейсы',
				href: '/cases',
			},
			{
				label: 'Документация',
				width: 240,
				children: [
					{
						label: 'Начало работы',
						href: '/docs/getting-started',
					},
					{
						label: 'Компоненты',
						href: '/docs/components',
					},
					{
						label: 'API',
						href: '/docs/api',
					},
				],
			},
			{
				label: 'Медиа',
				children: [
					{
						label: 'Новости',
						href: '/media/news',
					},
					{
						label: 'Вебинары',
						href: '/media/webinars',
					},
					{
						label: 'Подкасты',
						href: '/media/podcasts',
					},
				],
			},
		],
	},
	{
		label: 'Продукты',
		children: [
			{
				label: 'Платформа',
				href: '/products/platform',
			},
			{
				label: 'Облачные сервисы',
				children: [
					{
						label: 'Вычисления',
						href: '/products/cloud/compute',
					},
					{
						label: 'Хранилище',
						href: '/products/cloud/storage',
					},
					{
						label: 'Базы данных',
						href: '/products/cloud/databases',
					},
				],
			},
			{
				label: 'Инструменты',
				children: [
					{
						label: 'Мониторинг',
						href: '/products/tools/monitoring',
					},
					{
						label: 'Аналитика',
						href: '/products/tools/analytics',
					},
					{
						label: 'Автоматизация',
						href: '/products/tools/automation',
					},
				],
			},
			{
				label: 'Тарифы',
				href: '/products/pricing',
			},
		],
	},
	{
		label: 'Контакты',
		href: '/contacts',
	},
]
