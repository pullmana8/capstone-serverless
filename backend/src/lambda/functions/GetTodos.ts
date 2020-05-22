import { cors } from 'lambda-proxy-cors'
import { Logger } from '@sailplane/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { parseAuthorizationHeader } from '../../token/utils'
import { listAllTodos } from '../../dataLayer/Database'
const logger = new Logger('list')

export const handler = cors(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.infoObject('event: ', event)

    const jwtToken = parseAuthorizationHeader(event.headers.Authorization)
    const todos = await listAllTodos(jwtToken)
    logger.info('todos: ', todos, jwtToken)

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          todos,
        },
        null,
        2,
      ),
    }
  },
)
