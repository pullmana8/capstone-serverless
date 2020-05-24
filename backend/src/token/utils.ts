import { decode } from 'jsonwebtoken'
import { JwtPayload } from './JwtPayload'

export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  try {
    return decodedJwt.sub
  } catch (error) {
    return null
  }
}

export function extractToken(authorization: string): string {
  try {
    const split = authorization.split(' ')
    const jwtToken = split[1]
    return jwtToken
  } catch (error) {
    return null
  }
}
