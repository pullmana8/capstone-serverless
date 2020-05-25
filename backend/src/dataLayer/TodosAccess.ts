import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../lambda/helpers/logger'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'

const logger = createLogger('todos-access')

export class TodosAccess {
  constructor(
    private readonly XAWS = AWSXRay.captureAWS(AWS),
    private readonly docClient: AWS.DynamoDB.DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX,
  ) {}

  async getUserTodos(userId: string): Promise<TodoItem> {
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise()
    logger.info('List items: ', result, userId)
    return result.Items as TodoItem[]
  }

  async getTodoById(id: string): Promise<AWS.DynamoDB.QueryOutput> {
    return this.docClient
      .query({
        TableName: this.todosTable,
        KeyConditionExpression: 'todoId = :todoId',
        ExpressionAttributeValues: {
          ':todoId': id,
        },
      })
      .promise()
  }

  async createTodo(request: CreateTodoRequest, userId: string): Promise<TodoItem> {
    logger.debug('Create todo items for user', userId)

    const newId = uuid.v4()
    const timestamp = new Date().toISOString()

    const item = {
      TableName: this.todosTable,
      Item: {
        userId,
        todoId: newId,
        createdAt: timestamp,
        name: request.name,
        dueDate: request.dueDate,
        done: false,
      }
    }

    await this.docClient.put(item).promise()
    logger.info('List items: ', item)
    return item.Item
  }
}
