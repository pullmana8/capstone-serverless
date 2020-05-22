import { Logger } from '@sailplane/logger'
import { cors } from 'lambda-proxy-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteTodoById } from '../../dataLayer/Database'

const logger = new Logger('delete')

export const handler = cors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug(event.body)
    const todoId = event.pathParameters ? event.pathParameters.todoId : ''

    logger.info('List todo id for user', todoId)

    if (!todoId) {
      logger.error('Invalid delete attempt without todo id')

      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'Invalid parameters',
            input: event,
          },
          null,
          2,
        ),
      }
    }

    const deleteItem = await deleteTodoById
    logger.info('User delete todo item', deleteItem)

    return {
      statusCode: 204,
      body: JSON.stringify(
        {
          message: `Sucessfully deleted item ${deleteItem}`,
          input: event,
        },
        null,
        2,
      ),
    }
  },
)
