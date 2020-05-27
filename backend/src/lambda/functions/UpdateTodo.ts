import { createLogger } from '../helpers/logger'
import { corsErrorResponse, corsSuccessResponse, runWarm } from '../helpers/utils'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../helpers/authHelper'
import { APIGatewayProxyResult } from 'aws-lambda'
import { updateTodoItem } from '../../businessLogic/Todos'

const logger = createLogger('update-todo')

const updateTodo: Function = async (event: AWSLambda.APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.debug('event: ', event)
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const authHeader = event.headers.Authorization
  const userId = getUserId(authHeader)
  logger.info('List todo id for user', todoId)

  const result = await updateTodoItem(userId, todoId, updatedTodo)
  if (!todoId) {
    logger.error(`user requesting to update an non-existing todo with id ${todoId}`)
    const error = corsErrorResponse({
      message: 'TODO item does not exist',
      input: event,
    })
    return error
  } else {
    return corsSuccessResponse({
      message: 'Items sucessfully updated for user',
      userId,
      result,
      input: event,
    })
  }
}
export default runWarm(updateTodo)
