import { z } from 'zod'
import { VMessage } from './ValidationMessages'

export const validation = {
	name: (minLength: number = 1, message: string = VMessage.name) =>
		z.string().trim().min(minLength, message),

	phone: (message: string = VMessage.phone) =>
		z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, message),
}
