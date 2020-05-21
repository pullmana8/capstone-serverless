import { Logger } from '@sailplane/logger'
import {
  CustomAuthorizerEvent,
  CustomAuthorizerResult,
  CustomAuthorizerHandler,
} from 'aws-lambda'
import { verify } from 'jsonwebtoken'
import * as AWS from 'aws-sdk'
import { JwtToken } from '../../token/JwtToken'
import * as middy from 'middy'
import { secretsManager } from 'middy/middlewares'

const logger = new Logger('auth-user')

/* const auth0Secret = process.env.AUTH_0_SECRET */
const secretId = process.env.AUTH_0_SECRET_ID
const secretField = process.env.AUTH_0_SECRET_FIELD

const client = new AWS.SecretsManager()

/* Cache secret if a Lambda is reused */
let cachedSecret: string

export const handler: CustomAuthorizerHandler = async (
  event: CustomAuthorizerEvent,
): Promise<CustomAuthorizerResult> => {
  try {
    const decodedToken = await verifyToken(event.authorizationToken!)
    logger.infoObject('User was authorized', decodedToken)

    return {
      principalId: decodedToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
      },
    }
  } catch (e) {
    logger.info('User was not authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*',
          },
        ],
      },
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtToken> {
  if (!authHeader) throw new Error('No authorization error')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authorization bearer')

  const split = authHeader.split(' ')
  const token = split[1]

  const secretObject: any = await getSecret()
  const secret = secretObject[secretField!]

  return verify(token, secret) as JwtToken
  /*  if (token !== '123') throw new Error('Invalid token'); */
}

async function getSecret() {
  if (cachedSecret) return cachedSecret

  const data = await client
    .getSecretValue({
      SecretId: secretId!,
    })
    .promise()

  cachedSecret = data.SecretString!

  return JSON.parse(cachedSecret)
}
