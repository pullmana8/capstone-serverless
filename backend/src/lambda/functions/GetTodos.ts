import { createLogger } from '../helpers/logger'
import { listAllTodos } from '../../dataLayer/Database'
import { runWarm, corsSuccessResponse } from '../helpers/utils'
import { getUserId } from '../helpers/authHelper'
import { APIGatewayProxyResult } from 'aws-lambda'
import { S3Helper } from '../helpers/s3Helper'

const s3Helper = new S3Helper()
const logger = createLogger('retrieve-todos')

const getTodos: Function = async (
  event: AWSLambda.APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug('event: ', event)
  const authHeader = event.headers['Authorization']
  const userId = getUserId(authHeader)
  logger.info(`Log todo items for user ${userId}`)
  const todos = await listAllTodos(userId)
  logger.info('todos: ', todos)

  for (const record of todos) {
    record.attachmentUrl = await s3Helper.getTodoAttachmentUrl(record.todoId)
  }

  const response = corsSuccessResponse({
    message: 'Retrieved todos',
    items: todos,
    input: event,
  })

  return response
}

export default runWarm(getTodos)
