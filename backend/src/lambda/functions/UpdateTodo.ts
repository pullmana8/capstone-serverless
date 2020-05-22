import * as AWSXRay from 'aws-xray-sdk'
import { Logger } from '@sailplane/logger'
import { cors } from 'lambda-proxy-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { updateTodoItem } from '../../dataLayer/Database'

const logger = new Logger('update')

export const handler = cors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug(event.body)

    const todoId = event.pathParameters ? event.pathParameters.todoId : ''
    logger.info('List todo id for user', todoId)

    const items = await updateTodoItem

    if (!items) {
      logger.error(
        `user requesting to update an non-existing todo with id ${todoId}`,
      )

      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'TODO item does not exist',
            input: event,
          },
          null,
          2,
        ),
      }
    } else {
      return {
        statusCode: 204,
        body: JSON.stringify(
          {
            message: `Item successfully updated ${items}`,
            items: items,
          },
          null,
          2,
        ),
      }
    }
  },
)
