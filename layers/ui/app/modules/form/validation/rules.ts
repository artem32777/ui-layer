import { z } from 'zod'
import { VMessage } from './messages.ts'

export const VRule = {
	name: (minLength: number = 1, message: string = VMessage.name) =>
		z.string().trim().min(minLength, message),

	phone: (message: string = VMessage.phone) =>
		z.string().regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, message),
}
