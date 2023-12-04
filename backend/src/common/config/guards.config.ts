import { APP_GUARD } from '@nestjs/core'
import { AtGuard } from '../guards'

export const guards = [
  {
    provide: APP_GUARD,
    useClass: AtGuard,
  },
]
