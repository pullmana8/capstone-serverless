/* eslint-disable @typescript-eslint/no-var-requires */
import * as LambdaUtils from '@sailplane/lambda-utils';
import { Logger } from '@sailplane/logger';

const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = process.env.TODOS_TABLE;
const logger = new Logger('update');

interface TodoUpdate {
  name: string;
  dueDate: string;
  done: boolean;
}

/* interface UpdateTodoRequest {
  name: string
  dueDate: string
  done: boolean
} */

async function updateTodoItem(
  request: TodoUpdate,
  userId: string,
  todoId: string
) {
  const updateTodo = await docClient
    .update({
      TableName: todosTable,
      Key: { userId, todoId },
      ExpressionAttributeName: { '#N': 'name' },
      UpdateExpression: 'set #N=:todoName, dueDate=:dueDate, done=:done',
      ExpressionAttributeValues: {
        ':todoName': request.name,
        ':dueDate': request.dueDate,
        ':done': request.done,
      },
      ReturnValues: 'UPDATED_NEW',
    })
    .promise();

  return { Updated: updateTodo };
}

export const handler = LambdaUtils.wrapApiHandler(
  async (event: LambdaUtils.APIGatewayProxyEvent) => {
    logger.debug(event.body);

    const todoId = event.pathParameters.todoId;
    logger.info('List todo id for user', todoId);

    const items = await updateTodoItem;

    if (!items) {
      logger.error(
        `user requesting to update an non-existing todo with id ${todoId}`
      );

      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'TODO item does not exist',
            input: event,
          },
          null,
          2
        ),
      };
    } else {
      return {
        statusCode: 204,
        body: JSON.stringify(
          {
            message: `Item successfully updated ${items}`,
            items,
          },
          null,
          2
        ),
      };
    }
  }
);
