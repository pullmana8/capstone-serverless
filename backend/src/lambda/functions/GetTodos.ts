import { cors } from 'lambda-proxy-cors'
import { Logger } from '@sailplane/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAllTodos } from '../../businessLogic/todos'

const logger = new Logger('list')

export const handler = cors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.infoObject('event: ', event)
    const todos = await getAllTodos(event)
    logger.info('todos: ', todos)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          items: todos,
        },
        null,
        2,
      ),
    }
  },
)
