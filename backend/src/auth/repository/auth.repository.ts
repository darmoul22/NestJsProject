import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import type { UserInsertion } from '../types'

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        hash: true,
        role: true,
      },
      where: {
        email,
      },
    })
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        hash: true,
        role: true,
        hashedRt: true,
      },
      where: {
        id,
      },
    })
  }

  insert(user: UserInsertion) {
    return this.prisma.user.create({
      data: user,
    })
  }

  updateRtHash(id: number, hashedRt: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedRt,
      },
    })
  }

  invalidateRt(id: number) {
    return this.prisma.user.update({
      where: {
        id,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    })
  }
}
