/* eslint-disable id-blacklist */
import * as uuid from 'uuid'
import { Logger } from '@sailplane/logger'
import { DynamoDB } from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const logger = new Logger('todos-access')
const todosTable = process.env.TODOS_TABLE
const userIdIndex = process.env.USER_ID_INDEX

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

export async function listAllTodos(userId: string): Promise<TodoItem[]> {
  logger.debug(`List todo items for user`)
  const params = {
    TableName: todosTable!,
    IndexName: userIdIndex!,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
    ReturnValues: 'UPDATED_NEW',
  }
  const items = await db.query(params).promise()
  logger.info('List items: ', items)
  return items.Items as TodoItem[]
}

export async function createTodoItem(
  userId: string,
  payload: CreateTodoRequest,
): Promise<TodoItem> {
  const newId = uuid.v4()
  const timestamp = new Date().toISOString()
  const newItem = {
    TableName: todosTable!,
    ConditionExpression:
      'attribute_not_exists(todoId) AND attribute_not_exists(userId)',
    Item: {
      todoId: newId,
      userid: userId,
      createdAt: timestamp,
      name: payload.name,
      dueDate: payload.dueDate,
      done: payload.done,
    },
  }

  await db.put(newItem).promise()
  logger.info('List items: ', newItem)
  return newItem.Item
}

export async function updateTodoItem(
  userId: string,
  todoId: string,
  request: UpdateTodoRequest,
) {
  try {
    const params = {
      TableName: todosTable!,
      ReturnValues: 'NONE',
      ConditionExpression:
        'attribute_exists(todoId) AND attribute_exists(userId)',
      UpdateExpression: 'set #N=:todoName, dueDate=:dueDate, done=:done',
      Key: { todoId, userId },
      ExpressionAttributeValues: {
        ':todoName': request.name,
        ':dueDate': request.dueDate,
        ':done': request.done,
      },
    }

    await db.update(params).promise()
  } catch (err) {
    if (err.code === 'ConditonalCheckFailedException') {
      throw new err()
    }
  }
}

export async function deleteTodoById(userId: string, todoId: string) {
  logger.debug('Deleting todo id for user', userId, todoId)
  try {
    const params = {
      TableName: todosTable!,
      ConditionExpression:
        'attribute_exists(todoId) AND attribute_exists(userId)',
      Key: { userId, todoId },
    }

    await db.delete(params).promise()
  } catch (err) {
    logger.error(err)
    if (err.code === 'ConditonalCheckFailedException') {
      throw new err()
    }
  }
}
