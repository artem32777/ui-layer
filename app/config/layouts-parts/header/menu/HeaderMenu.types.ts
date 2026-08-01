import { getNavigationMenuItemValue } from '#layers/ui/app/common/components/NavigationMenu/NavigationMenu.types.ts'

export type HeaderMenuItem = {
	label: string
	href?: string
	children?: HeaderMenuItem[]
	wide?: boolean
}

export function getHeaderMenuItemKey(item: HeaderMenuItem) {
	return getNavigationMenuItemValue(item)
}
