/* eslint-disable @typescript-eslint/no-var-requires */
import * as LambdaUtils from '@sailplane/lambda-utils';
import { Logger } from '@sailplane/logger';
import { TodoAccess } from '../../dataLayer/TodoAccess';
import { getUserId } from '../../auth/utils';

const logger = new Logger('list');

export const handler = LambdaUtils.wrapApiHandler(
  async (event: LambdaUtils.APIGatewayProxyEvent) => {
    logger.info('event:', event);

    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const userId = getUserId(jwtToken);

    const todos = await new TodoAccess(userId);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          todos,
        },
        null,
        2
      ),
    };
  }
);
