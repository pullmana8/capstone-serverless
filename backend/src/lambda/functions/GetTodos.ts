import { createLogger } from '../helpers/logger'
import { runWarm, corsSuccessResponse } from '../helpers/utils'
import { getUserId } from '../helpers/authHelper'
import { APIGatewayProxyResult } from 'aws-lambda'
import { S3Helper } from '../helpers/s3Helper'
import { TodosAccess } from '../../dataLayer/TodosAccess'

const s3Helper = new S3Helper()
const logger = createLogger('retrieve-todos')

const getTodos: Function = async (event: AWSLambda.APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.debug('Received event: ', event)
  
  const authHeader = event.headers.Authorization
  const userId = getUserId(authHeader)
  logger.info(userId)

  const items = await new TodosAccess().getAllTodosItems(userId)
  logger.info('todos: ', items)

  for (const record of items) {
    record.attachmentUrl = await s3Helper.getTodoAttachmentUrl(record.todoId)
  }

  const response = corsSuccessResponse({
    items,
    input: event,
  })

  return response
}

export default runWarm(getTodos)
