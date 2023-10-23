import { AuthGuard } from '@nestjs/passport'
import { REFRESH_TOKEN } from '../constants/guard'

export class RtGuard extends AuthGuard(REFRESH_TOKEN) {}
