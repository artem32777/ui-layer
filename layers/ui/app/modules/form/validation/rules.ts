import { z } from 'zod'
import { VMessage } from './messages.ts'

export const VRule = {
	name: (minLength: number = 2, message: string = VMessage.name) =>
		z.string({ required_error: message }).trim().min(minLength, message),

	email: (message: string = VMessage.email) =>
		z.string({ required_error: message }).trim().email(message),

	phone: (message: string = VMessage.phone) =>
		z.string({ required_error: message }).regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, message),
}
