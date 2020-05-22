import { cors } from 'lambda-proxy-cors'
import { Logger } from '@sailplane/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { createTodo } from '../../businessLogic/todos'

const logger = new Logger('create')

export const handler = cors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.infoObject('event: ', event)
    const newItem: CreateTodoRequest =
      typeof event.body === 'string' ? JSON.parse(event.body) : event.body

    const Item = await createTodo(event, newItem)
    logger.info('Creating todos for user: ', event, newItem)

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: `Item successfully created ${Item}`,
          items: Item,
        },
        null,
        2,
      ),
    }
  },
)
