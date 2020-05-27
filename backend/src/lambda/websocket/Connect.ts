import * as AWS from 'aws-sdk'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../helpers/logger'

const logger = createLogger('connect')

const docClient = new AWS.DynamoDB.DocumentClient()
const connectionsTable = process.env.CONNECTIONS_TABLE

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Websock connect: ', event)

  const connectionId = event.requestContext.connectionId
  const timestamp = new Date().toISOString()

  const item = {
    id: connectionId,
    timestamp,
  }

  logger.info('Storing item: ', item)

  await docClient
    .put({
      TableName: connectionsTable!,
      Item: item,
    })
    .promise()

  return {
    statusCode: 200,
    body: '',
  }
}
