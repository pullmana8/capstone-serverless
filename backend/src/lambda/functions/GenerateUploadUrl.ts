import { createLogger } from '../helpers/logger'
import { getUserId } from '../helpers/authHelper'
import { getTodoById } from '../../dataLayer/Database'
import {
  corsErrorResponse,
  corsSuccessResponse,
  runWarm,
} from '../helpers/utils'
import { S3Helper } from '../helpers/s3Helper'
import { APIGatewayProxyResult } from 'aws-lambda'

const logger = createLogger('generate-upload')

const generateUploadUrl: Function = async (
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug('event: ', event)
  const authHeader = event.headers['Authorization']
  const userId = getUserId(authHeader)

  const todoId = event.pathParameters.todoId
  if (!todoId) {
    logger.error(
      `User ${userId} requesting to upload url does not exist with id ${todoId}`,
    )
    const response = corsErrorResponse({
      message: 'TODO not exists',
      input: event,
    })
    return response
  }

  const item = await getTodoById(todoId)
  const url = new S3Helper().getPresignedUrl(todoId)
  if (item) {
    const success = corsSuccessResponse({
      message: 'Upload url',
      url,
      input: event,
    })
    return success
  }
}

export default runWarm(generateUploadUrl)
