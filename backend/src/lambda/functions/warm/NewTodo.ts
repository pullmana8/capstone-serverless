import { createLogger } from '../../helpers/logger'
import { getUserId } from '../../helpers/authHelper'
import { corsSuccessResponse, runWarm } from '../../helpers/utils'
import { CreateTodoRequest } from '../../../requests/CreateTodoRequest'
import { APIGatewayProxyResult } from 'aws-lambda'
import { createTodoItem } from '../../../businessLogic/Todos'

const logger = createLogger('create-todo')

const createTodo: Function = async (event: AWSLambda.APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.debug('Received event: ', event)
  //  const newTodo: CreateTodoRequest = typeof event.pathParameters !== 'undefined' ? JSON.parse(event.body) : event.body
  //  const newTodo: CreateTodoRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body

  const authHeader = event.headers.Authorization
  const userId = getUserId(authHeader)
  logger.info(userId)

  const newTodo: CreateTodoRequest = typeof event.body !== undefined ? JSON.parse(event.body) : event.body

  const item = await createTodoItem(userId, newTodo)

  const response = corsSuccessResponse({
    message: 'Items created',
    items: item,
    input: event,
  })

  return response
}

export default runWarm(createTodo)
