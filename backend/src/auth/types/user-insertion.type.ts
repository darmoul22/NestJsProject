import type { User } from '@prisma/client'

export type UserInsertion = Pick<User, 'email' | 'hash'>
