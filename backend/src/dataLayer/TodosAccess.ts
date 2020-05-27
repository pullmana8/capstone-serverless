import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { Types } from 'aws-sdk/clients/s3'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../lambda/helpers/logger'
import { TodoUpdate } from '../models/TodoUpdate'

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

  async getAllTodosItems(userId: string): Promise<TodoItem[]> {
    logger.info(userId)
    logger.info('Listing all todos')
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: this.userIdIndex,
        KeyConditionExpression: 'userId= :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      }).promise()
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

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    logger.info(todoItem)
    logger.info(this.todosTable)

    await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise()

    return todoItem
  }
  
  async updateTodo(userId: string, todoId: string, todoUpdate: TodoUpdate): Promise<TodoUpdate> {
    await this.docClient.update({
        TableName: this.todosTable,
        Key: { todoId, userId },
        UpdateExpression: "set #name = :name, dueDate= :dueDate, done= :done",
        ExpressionAttributeValues: {
          ':name': todoUpdate.name,
          ':dueDate': todoUpdate.dueDate,
          ':done': todoUpdate.done,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise()

      return todoUpdate
  }

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
