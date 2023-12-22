import type { User } from '@prisma/client'

export type UserPayload = Pick<User, 'id' | 'email' | 'role'>
