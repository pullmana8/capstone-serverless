import { cors } from 'lambda-proxy-cors'
import { Logger } from '@sailplane/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { parseAuthorizationHeader } from '../../token/utils'
import { createTodoItem } from '../../dataLayer/Database'

const logger = new Logger('create')

export const handler = cors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.infoObject('event: ', event)

    const newTodo: CreateTodoRequest =
      typeof event.body === 'string' ? JSON.parse(event.body) : event.body

    const jwtToken = parseAuthorizationHeader(event.headers.Authorization)
    const items = await createTodoItem(jwtToken, newTodo)
    logger.info('Creating todos for user: ', newTodo, jwtToken)

    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: `Item successfully created ${items}`,
          items,
        },
        null,
        2,
      ),
    }
  },
)
