import { plainToClass } from 'class-transformer'
import {
  IsDefined,
  IsEnum,
  IsNumberString,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator'
import { Environment } from './app.config'


class EnvironmentVariables {
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  APP_PORT: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  FRONT_END_URL: string

  /* DATABASE CONFIG */
  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_NAME: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_HOST: string

  @IsDefined()
  @IsNumberString()
  @MinLength(1)
  DATABASE_PORT: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_USER: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_PASSWORD: string

  /* Token config */
  @IsDefined()
  @IsString()
  @MinLength(1)
  AT_SECRET: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  AT_EXPIRES_IN: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  RT_SECRET: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  RT_EXPIRES_IN: string

  // Storage
  @IsDefined()
  @IsString()
  @MinLength(1)
  API_KEY: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  AUTH_DOMAIN: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  PROJECT_ID: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  STORAGE_BUCKET: string


  @IsDefined()
  @IsString()
  @MinLength(1)
  MESSAGING_SENDER_ID: string

  @IsDefined()
  @IsString()
  @MinLength(1)
  APP_ID: string
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(finalConfig, { skipMissingProperties: false })

  let index = 0
  for (const err of errors) {
    Object.values(err.constraints).forEach((str) => {
      ++index
      console.log(index, str)
    })
    console.log('\n ***** \n')
  }
  if (errors.length) throw new Error('Please provide the valid ENVs mentioned above')

  return finalConfig
}
