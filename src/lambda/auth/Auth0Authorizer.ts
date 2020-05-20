import { Logger } from '@sailplane/logger';
import { JwtToken } from '../../auth/JwtToken';
import {
  CustomAuthorizerEvent,
  CustomAuthorizerResult,
  CustomAuthorizerHandler,
} from 'aws-lambda';
import { verify } from 'jsonwebtoken';

const logger = new Logger('auth-user');

const auth0Secret = process.env.AUTH_0_SECRET;

export const handler: CustomAuthorizerHandler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  try {
    const decodedToken = verifyToken(event.authorizationToken!);
    logger.infoObject('User was authorized', decodedToken);

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
    };
  } catch (e) {
    logger.info('User was not authorized', e.message);

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
    };
  }
};

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader) throw new Error('No authorization error');

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authorization bearer');

  const split = authHeader.split(' ');
  const token = split[1];

  return verify(token, auth0Secret) as JwtToken;
  /*  if (token !== '123') throw new Error('Invalid token'); */
}
