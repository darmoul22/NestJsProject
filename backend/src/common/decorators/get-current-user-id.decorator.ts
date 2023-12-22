import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { UserPayload } from 'src/auth/types'

export const GetCurrentUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest()
    const user = request.user as UserPayload
    return user.id
  },
)
