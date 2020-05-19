import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { Logger } from '@sailplane/logger';
import { TodoItem } from '../models/TodoItem';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const XAWS = AWSXRay.captureAWS(AWS);
const logger = new Logger('todos-access');

export class TodoAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX
  ) {}

  async listAllTodos(userId: string): Promise<TodoItem[]> {
    logger.debug(`List todo items for user ${userId}`);

    const result = await this.docClient
      .query({
        TableName: this.todosTable!,
        IndexName: this.userIdIndex!,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
        ScanIndexForward: false,
      })
      .promise();

    const items = result.Items;
    logger.info('List items: ', items);

    return items as TodoItem[];
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance');
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  }

  return new XAWS.DynamoDB.DocumentClient();
}
