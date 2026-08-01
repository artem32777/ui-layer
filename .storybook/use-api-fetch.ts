import type { MaybeRefOrGetter, Ref, WatchSource } from 'vue'
import { ref, toValue, watch } from 'vue'

interface Product {
	id: string
	name: string
	category: string
	price: number
}

interface UseApiFetchOptions<T> {
	query?: MaybeRefOrGetter<Record<string, unknown>>
	watch?: WatchSource[]
	default?: () => T
}

const products: Product[] = [
	{ id: 'notebook', name: 'Ноутбук', category: 'Электроника', price: 120000 },
	{ id: 'chair', name: 'Кресло', category: 'Мебель', price: 32000 },
	{ id: 'phone', name: 'Смартфон', category: 'Электроника', price: 78000 },
	{ id: 'table', name: 'Стол', category: 'Мебель', price: 47000 },
	{ id: 'headphones', name: 'Наушники', category: 'Электроника', price: 18000 },
	{ id: 'lamp', name: 'Лампа', category: 'Освещение', price: 9000 },
	{ id: 'monitor', name: 'Монитор', category: 'Электроника', price: 42000 },
	{ id: 'keyboard', name: 'Клавиатура', category: 'Аксессуары', price: 7500 },
	{ id: 'mouse', name: 'Мышь', category: 'Аксессуары', price: 4200 },
	{ id: 'sofa', name: 'Диван', category: 'Мебель', price: 89000 },
	{ id: 'wardrobe', name: 'Шкаф', category: 'Мебель', price: 61000 },
	{ id: 'camera', name: 'Камера', category: 'Электроника', price: 95000 },
	{ id: 'router', name: 'Роутер', category: 'Электроника', price: 11000 },
	{ id: 'kettle', name: 'Чайник', category: 'Бытовая техника', price: 6800 },
	{ id: 'vacuum', name: 'Пылесос', category: 'Бытовая техника', price: 27000 },
]

export function useApiFetch<T>(
	_url: string,
	options: UseApiFetchOptions<T> = {},
) {
	const data = ref(options.default?.()) as Ref<T>
	const status = ref<'idle' | 'pending' | 'success'>('idle')

	const execute = async () => {
		status.value = 'pending'
		await Promise.resolve()

		const query = options.query ? toValue(options.query) : {}
		const search = String(query.search ?? '').toLocaleLowerCase()
		const page = Number(query.page ?? 1)
		const pageSize = 4
		const sort = String(query.sort ?? '')
		const order = String(query.order ?? 'asc')
		const filteredProducts = products.filter(product => (
			product.name.toLocaleLowerCase().includes(search)
			|| product.category.toLocaleLowerCase().includes(search)
		))

		if (['name', 'category', 'price'].includes(sort)) {
			filteredProducts.sort((left, right) => {
				const result = sort === 'price'
					? left.price - right.price
					: sort === 'category'
						? left.category.localeCompare(right.category, 'ru')
						: left.name.localeCompare(right.name, 'ru')

				return order === 'desc' ? -result : result
			})
		}

		data.value = {
			columns: [
				{ accessorKey: 'name', header: 'Название', enableSorting: true },
				{ accessorKey: 'category', header: 'Категория', enableSorting: true },
				{ accessorKey: 'price', header: 'Цена, ₽', enableGlobalFilter: false, enableSorting: true },
			],
			items: options.query
				? filteredProducts.slice((page - 1) * pageSize, page * pageSize)
				: filteredProducts,
			pagination: {
				page,
				pageSize,
				total: filteredProducts.length,
			},
		} as T
		status.value = 'success'
	}

	if (options.watch) {
		watch(options.watch, execute)
	}

	void execute()

	return {
		data,
		status,
		execute,
	}
}
