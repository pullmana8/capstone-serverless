import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import * as uuid from 'uuid'
import { Types } from 'aws-sdk/clients/s3'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { createLogger } from '../lambda/helpers/logger'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const logger = createLogger('todos-access')

export class TodosAccess {
  constructor(
    private readonly XAWS = AWSXRay.captureAWS(AWS),
    private readonly docClient: AWS.DynamoDB.DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly s3Client: Types = new AWS.S3({ signatureVersion: 'v4' }),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX,
    private readonly s3BucketName = process.env.ATTACHMENTS_BUCKET,
  ) {}

  async getUserTodos(userId: string): Promise<TodoItem[]> {
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

  async createTodo(
    request: CreateTodoRequest,
    userId: string,
  ): Promise<TodoItem> {
    logger.debug('Create todo items for user', userId)

    const newId = uuid.v4()
    const timestamp = new Date().toISOString()

    const todo = {
      TableName: this.todosTable,
      Item: {
        userId,
        todoId: newId,
        createdAt: timestamp,
        done: false,
        ...request,
      },
    }

    await this.docClient.put(todo).promise()
    logger.info('List items: ', todo)
    return todo.Item as TodoItem
  }
  /*
  async updateTodo(
    request: UpdateTodoRequest,
    userId: string,
    todoId: string,
  ): Promise<TodoUpdate> {
    const returnValue = await this.docClient
      .update({
        TableName: this.todosTable,
        Key: { todoId, userId },
        UpdateExpression: 'set #N=:todoName, dueDate=:dueDate, done=:done',
        ExpressionAttributeValues: {
          ':todoName': request.name,
          ':dueDate': request.dueDate,
          ':done': request.done,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise()
    return returnValue.Attributes as TodoUpdate
  }
*/
  async generateUploadUrl(todoId: string, userId: string): Promise<string> {
    logger.info('Generating url')

    const url = this.s3Client.getSignedUrl('putObject', {
      Bucket: this.s3BucketName,
      Key: { userId, todoId },
      Expires: 1000,
    })
    logger.info('url')

    await this.docClient
      .update({
        TableName: this.todosTable,
        Key: {
          todoId: todoId,
          userId: userId,
        },
        UpdateExpression: 'set attachmentUrl = :url',
        ExpressionAttributeValues: {
          ':url': `https://${this.s3BucketName}.s3.amazonaws.com/${todoId}`,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise()
    return url as string
  }
}
