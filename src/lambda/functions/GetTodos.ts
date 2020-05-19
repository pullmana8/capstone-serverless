/* eslint-disable @typescript-eslint/no-var-requires */
import * as LambdaUtils from '@sailplane/lambda-utils'
import { Logger } from '@sailplane/logger'

const AWSXRay = require('aws-xray-sdk')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const userIdIndex = process.env.USER_ID_INDEX
const logger = new Logger('list')

interface TodoItem {
  userId: string;
  todoId: string;
  createdAt: string;
  name: string;
  dueDate: string;
  done: boolean;
  attachmentUrl?: string
}

async function listAllTodos(userId: string): Promise<TodoItem[]> {
  const result = await docClient.query({
    TableName: todosTable,
    IndexName: userIdIndex,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId
    },
    ScanIndexForward: false
  }).promise()

  const items = result.Items
  logger.info('List items: ', items)

  return items as TodoItem[]
}

export const handler = LambdaUtils.wrapApiHandler(async (event: LambdaUtils.APIGatewayProxyEvent) => {
  logger.info('event:', event)

  const todos = listAllTodos

  return {
    statusCode: 200,
    body: JSON.stringify({
      todos
    }, null, 2)
  }
})
