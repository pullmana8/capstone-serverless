import { createLogger } from '../helpers/logger'
import { getUserId } from '../helpers/authHelper'
import { corsSuccessResponse, runWarm } from '../helpers/utils'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { APIGatewayProxyResult } from 'aws-lambda'
import { TodosAccess } from '../../dataLayer/TodosAccess'

const logger = createLogger('create-todo')

const createTodo: Function = async (
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug('event: ', event)
  const authHeader = event.headers['Authorization']
  const userId = getUserId(authHeader)
  logger.info(`Create todo items for user ${userId}`)
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const item = await new TodosAccess().createTodo(newTodo, userId)
  const response = corsSuccessResponse({
    message: 'Items created',
    items: item,
    input: event,
  })

  return response
}

export default runWarm(createTodo)
