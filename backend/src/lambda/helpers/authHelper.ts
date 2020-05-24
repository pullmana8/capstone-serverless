import { createLogger } from './logger'
import { Jwt } from '../../token/Jwt'
import { decode } from 'jsonwebtoken'

const logger = createLogger('authHeader')

export function getUserId(authHeader: string): string {
  logger.info('authHeader', authHeader)
  const token = getToken(authHeader)
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  logger.info('jwt', jwt.payload)
  return jwt.payload.sub
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('no authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
