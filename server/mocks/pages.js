export const pageMocks = {
    '/': {
        id: 'home',
        path: '/',
        template: 'home',
        revision: 1,
        seo: {
            title: 'Главная',
            meta: [
                {
                    name: 'description',
                    content: 'Главная страница проекта.',
                },
            ],
        },
        blocks: [
            {
                name: 'visual',
                settings: [{ theme: 'dark' }],
                content: [
                    {
                        title: 'Главная страница',
                        text: 'Этот блок получен из мокового PageDocument.',
                    },
                ],
            },
        ],
    },
    '/about': {
        id: 'about',
        path: '/about',
        template: 'content',
        revision: 3,
        seo: {
            title: 'О компании',
            meta: [{
                    name: 'description',
                    content: 'Информация о компании.',
                }],
        },
        blocks: [
            {
                name: 'visual',
                settings: [{ theme: 'light' }],
                content: [
                    {
                        title: 'О компании',
                        text: 'Контент этой страницы можно будет редактировать в админке.',
                    },
                    {
                        title: 'О проекте',
                        text: 'Сейчас данные находятся в server/mocks/pages.ts, позднее endpoint можно переключить на отдельный бэкенд.',
                    },
                ],
            },
        ],
    },
    '/news': {
        id: 'news',
        path: '/news',
        template: 'content',
        revision: 1,
        seo: {
            title: 'Новости',
            meta: [{
                    name: 'description',
                    content: 'Новости и события проекта.',
                }],
        },
        blocks: [
            {
                name: 'visual',
                settings: [{ theme: 'light' }],
                content: [{ title: 'Новости' }],
            },
        ],
    },
    '/progress': {
        id: 'progress',
        path: '/progress',
        template: 'content',
        revision: 1,
        seo: {
            title: 'Ход строительства',
            meta: [
                {
                    name: 'description',
                    content: 'Новости о ходе строительства.',
                },
            ],
        },
        blocks: [
            {
                name: 'visual',
                settings: [{ theme: 'dark' }],
                content: [{ title: 'Ход строительства' }],
            },
        ],
    },
    '/policy': {
        id: 'policy',
        path: '/policy',
        template: 'content',
        revision: 1,
        seo: {
            title: 'Политика конфиденциальности',
            meta: [
                {
                    name: 'robots',
                    content: 'noindex, nofollow',
                },
            ],
        },
        blocks: [
            {
                name: 'visual',
                settings: [{ width: 'narrow' }],
                content: [
                    {
                        title: 'Политика конфиденциальности',
                        text: 'Текст политики конфиденциальности.',
                    },
                ],
            },
        ],
    },
    '/policy/agreement': {
        id: 'agreement',
        path: '/policy/agreement',
        template: 'content',
        revision: 1,
        seo: {
            title: 'Согласие на обработку данных',
            meta: [
                {
                    name: 'robots',
                    content: 'noindex, nofollow',
                },
            ],
        },
        blocks: [
            {
                name: 'visual',
                settings: [
                    { width: 'narrow' },
                ],
                content: [
                    {
                        title: 'Согласие на обработку данных',
                        text: 'Текст согласия на обработку персональных данных.',
                    },
                ],
            },
        ],
    },
    '/policy/terms': {
        id: 'terms',
        path: '/policy/terms',
        template: 'content',
        revision: 1,
        seo: {
            title: 'Пользовательское соглашение',
            meta: [
                {
                    name: 'robots',
                    content: 'noindex, nofollow',
                },
            ],
        },
        blocks: [
            {
                name: 'visual',
                settings: [
                    { width: 'narrow' },
                ],
                content: [
                    {
                        title: 'Пользовательское соглашение',
                        text: 'Текст пользовательского соглашения.',
                    },
                ],
            },
        ],
    },
};
