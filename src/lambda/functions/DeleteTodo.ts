/* eslint-disable @typescript-eslint/no-var-requires */
import * as LambdaUtils from '@sailplane/lambda-utils'
import { Logger } from '@sailplane/logger'

const AWSXRay = require('aws-xray-sdk')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const logger = new Logger('delete')

async function deleteTodoById(userId: string, todoId: string) {
  logger.debug('Deleting todo id for user', userId, todoId)

  await docClient.delete({
    TableName: todosTable,
    Key: { userId, todoId }
  }).promise

  return null
}

export const handler = LambdaUtils.wrapApiHandler(async (event: LambdaUtils.APIGatewayProxyEvent) => {
  logger.debug(event.body)

  const todoId = event.pathParameters.todoId
  logger.info('List todo id for user', todoId)

  if(!todoId) {
    logger.error('Invalid delete attempt without todo id')

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Invalid parameters',
        input: event
      }, null, 2)
    }
  }

  const deleteItem = await deleteTodoById
  logger.info('User delete todo item', deleteItem)

  return {
    statusCode: 204,
    body: JSON.stringify({
      message: `Sucessfully deleted item ${deleteItem}`,
      input: event,
    }, null, 2)
  }
})
