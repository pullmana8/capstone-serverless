import * as AWS from 'aws-sdk'
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import { Logger } from '@sailplane/logger'

const logger = new Logger('connect')

const docClient = new AWS.DynamoDB.DocumentClient()
const connectionsTable = process.env.CONNECTIONS_TABLE

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info('Websock connect: ', event)

  const connectionId = event.requestContext.connectionId
  const timestamp = new Date().toISOString()

  const item = {
    id: connectionId,
    timestamp,
  }

  logger.infoObject('Storing item: ', item)

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
