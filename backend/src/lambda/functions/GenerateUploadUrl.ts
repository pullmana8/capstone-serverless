import { createLogger } from '../helpers/logger'
import { getUserId } from '../helpers/authHelper'
import {
  corsErrorResponse,
  corsSuccessResponse,
  runWarm,
} from '../helpers/utils'
import { APIGatewayProxyResult } from 'aws-lambda'
import { TodosAccess } from '../../dataLayer/TodosAccess'

const logger = createLogger('generate-upload')
const todosAccess = new TodosAccess()

const generateUploadUrl: Function = async (
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug('event: ', event)
  const authHeader = event.headers.Authorization
  const userId = getUserId(authHeader)
  const todoId = event.pathParameters.todoId
  const item = await todosAccess.getTodoById(todoId)
  const url = await generateUploadUrl(todoId, userId)

  if (item.Count === 0) {
    logger.error(
      `User ${userId} requesting to upload url does not exist with id ${todoId}`,
    )
    const response = corsErrorResponse({
      message: 'TODO not exists',
      input: event,
    })
    return response
  }

  if (item.Items[0].userId !== userId) {
    logger.error(
      `user ${userId} requesting put url todo does not belong to account with id ${todoId}`,
    )
    const error = corsErrorResponse({
      message:
        'Unable to upload image for user. User is requesting to upload url for todo item that does not belong to account.',
      input: event,
    })
    return error
  } else {
    const success = corsSuccessResponse({
      message: 'Upload url',
      url,
      input: event,
    })
    return success
  }
}

export default runWarm(generateUploadUrl)
