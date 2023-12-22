import type { UserPayload } from './user-payload.type'

export type JwtPayloadWithRt = UserPayload & { refreshToken: string }
