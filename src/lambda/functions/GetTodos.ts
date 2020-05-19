/* eslint-disable @typescript-eslint/no-var-requires */
import * as LambdaUtils from '@sailplane/lambda-utils';
import { Logger } from '@sailplane/logger';
import { getAllTodos } from '../../businessLogic/todos';

const logger = new Logger('list');

export const handler = LambdaUtils.wrapApiHandler(
  async (event: LambdaUtils.APIGatewayProxyEvent) => {
    logger.info('event:', event);

    const todos = await getAllTodos();

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
