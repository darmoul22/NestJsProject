import { registerAs } from '@nestjs/config'

type ConfigKeyType = 'APP' | 'DB' | 'TOKEN'

export const ConfigKey: Record<ConfigKeyType, string> = {
  APP: 'app',
  DB: 'db',
  TOKEN: 'token',
}

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TESTING = 'testing',
}

const APPConfig = registerAs(ConfigKey.APP, () => ({
  env: Environment[process.env.NODE_ENV as keyof typeof Environment] || Environment.DEVELOPMENT,
  port: Number(process.env.APP_PORT),
  front_end_url: process.env.FRONT_END_URL,
}))

const DBConfig = registerAs(ConfigKey.DB, () => ({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}))

const TokenConfig = registerAs(ConfigKey.TOKEN, () => ({
  access_token: process.env.AT_SECRET,
  access_token_expires_in: process.env.AT_EXPIRES_IN,
  refresh_token: process.env.RT_SECRET,
  refresh_token_expires_in: process.env.RT_EXPIRES_IN,
}))

export const configurations = [APPConfig, TokenConfig, DBConfig]

export type AppConfigType = ReturnType<typeof APPConfig>
export type DBConfigType = ReturnType<typeof DBConfig>
export type TokenConfigType = ReturnType<typeof TokenConfig>
