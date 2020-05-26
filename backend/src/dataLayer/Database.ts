import { DynamoDB } from 'aws-sdk'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../lambda/helpers/logger'

const logger = createLogger('todos-access')

const todosTable = process.env.TODOS_TABLE
/* const userIdIndex = process.env.USER_ID_INDEX */

let AWS
if (process.env.X_AMX_TRACE_ID) {
  AWS = require('aws-xray-sdk').captureAWS(require('aws-sdk'))
} else {
  logger.info('Serverless Offline detected; skipping AWS X-RAY Setup')
  AWS = require('aws-sdk')
}

const db = process.env.IS_OFFLINE
  ? new DynamoDB.DocumentClient({
      region: 'localhost',
      accessKeyId: 'MOCK_ACCESS_KEY_ID',
      secretAccessKey: 'MOCK_SECRET_ACCESS_KEY',
      endpoint: `http://${process.env.DYNAMODB_HOST || 'localhost'}:${
        process.env.DYNAMODB_PORT || 8000
      }`,
    })
  : new DynamoDB.DocumentClient()

/*
export async function listAllTodos(userId: string): Promise<TodoItem[]> {
  logger.debug(`List todos items for user`, userId)

  const params = {
    TableName: todosTable!,
    IndexName: userIdIndex!,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  }

  const items = await db.query(params).promise()
  logger.info('List items: ', items, userId)
  return items.Items as TodoItem[]
}

export async function createTodoItem(
  userId: string,
  payload: CreateTodoRequest,
): Promise<TodoItem> {
  logger.debug('Create todo items for user', userId)
  const itemId = uuid.v4()
  const timestamp = new Date().toISOString()

  const newItem = {
    TableName: todosTable!,
    Item: {
      userId,
      todoId: itemId,
      createdAt: timestamp,
      name: payload.name,
      dueDate: payload.dueDate,
      done: false,
    },
  }

  await db.put(newItem).promise()
  logger.info('List items: ', newItem)
  return newItem.Item
} */

export async function updateTodo(
  userId: string,
  todoId: string,
  payload: UpdateTodoRequest,
) {
  try {
    const params = {
      TableName: todosTable!,
      UpdateExpression: 'set #N=:todoName, dueDate=:dueDate, done=:done',
      Key: { todoId, userId },
      ExpressionAttributeValues: {
        ':todoName': payload!.name,
        ':dueDate': payload!.dueDate,
        ':done': payload!.done,
      },
      ReturnValues: 'UPDATED_NEW',
    }

    await db.update(params).promise()
  } catch (err) {
    if (err.code === 'ConditonalCheckFailedException') {
      throw new err()
    }
  }
}

export async function deleteTodoById(todoId: string) {
  logger.debug('Deleting todo id for user', todoId)
  try {
    const params = {
      TableName: todosTable!,
      Key: { todoId },
    }

    await db.delete(params).promise()
  } catch (err) {
    logger.error(err)
    if (err.code === 'ConditonalCheckFailedException') {
      throw new err()
    }
  }
}
