/* eslint-disable @typescript-eslint/no-var-requires */
import * as uuid from 'uuid';
import * as LambdaUtils from '@sailplane/lambda-utils';
import { Logger } from '@sailplane/logger';

const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = process.env.TODOS_TABLE;
const logger = new Logger('create');

/*
interface CreateTodoRequest {
  name: string;
  dueDate: string;
} */

/* async function createTodoItem(request: CreateTodoRequest, userId: string): Promise<TodoItem> {
  const itemId = uuid.v4()

  const newItem = {
    todoId: itemId,
    userId,
    createdAt: new Date().toISOString(),
    name: request.name,
    dueDate: request.name,
    done: false
  }

  await docClient.put({
    TableName: todosTable,
    Item: newItem
  }).promise()

  logger.info('Create and list items: ', newItem)
  return newItem
} */

export const handler = LambdaUtils.wrapApiHandler(
  async (event: LambdaUtils.APIGatewayProxyEvent) => {
    logger.info(event.body);

    const newTodo = event.body;
    logger.info('Creating todo item for user', newTodo);

    const itemId = uuid.v4();

    const items = {
      todoId: itemId,
      ...newTodo,
    };

    await docClient
      .put({
        TableName: todosTable,
        Item: items,
      })
      .promise();

    logger.info('Create and list items: ', items);
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: `Item successfully created ${items}`,
          items,
        },
        null,
        2
      ),
    };
  }
);
