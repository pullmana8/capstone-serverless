import { decode } from 'jsonwebtoken'
import { JwtPayload } from './JwtPayload'

export function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken) as JwtPayload
  return decodedJwt.sub
}

export function parseAuthorizationHeader(authorization: string): string {
  const split = authorization.split(' ')
  const jwtToken = split[1]
  return jwtToken
}
