import { createLogger } from '../helpers/logger'
import { corsErrorResponse, corsSuccessResponse, runWarm } from '../helpers/utils'
import { deleteTodoById } from '../../dataLayer/Database'
import { getUserId } from '../helpers/authHelper'
import { APIGatewayProxyResult } from 'aws-lambda'

const logger = createLogger('delete')

const deleteTodo: Function = async (event: AWSLambda.APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.debug(event.body)

  const todoId = event.pathParameters ? event.pathParameters.todoId : ''
  if (!todoId) {
    logger.error('Invalid delete attempt without todo id')
    const response = corsErrorResponse({
      message: 'Invalid parameters',
      input: event,
    })
    return response
  }

  const authHeader = event.headers.Authorization
  const userId = getUserId(authHeader)
  const deleteItem = await deleteTodoById(todoId)

  logger.info('List todo id for user', todoId)
  logger.info('User delete todo item', deleteItem)
  const sucess = corsSuccessResponse({
    message: `Sucessfully deleted item ${deleteItem} for user ${userId}`,
    input: event,
  })
  return sucess
}

export default runWarm(deleteTodo)
