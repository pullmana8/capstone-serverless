import { createLogger } from '../helpers/logger'
import { getUserId } from '../helpers/authHelper'
import { createTodoItem } from '../../dataLayer/Database'
import { corsSuccessResponse, runWarm } from '../helpers/utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { APIGatewayProxyResult } from 'aws-lambda'

const logger = createLogger('create-todo')

const newTodo: Function = async (
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug('event: ', event)
  const authHeader = event.headers['Authorization']
  const userId = getUserId(authHeader)
  logger.info(`Create todo items for user ${userId}`)
  const newItem: CreateTodoRequest = JSON.parse(event.body)
  const todos = await createTodoItem(userId, newItem)
  const response = corsSuccessResponse({
    message: 'Items created',
    items: todos,
    input: event,
  })

  return response
}

export default runWarm(newTodo)
