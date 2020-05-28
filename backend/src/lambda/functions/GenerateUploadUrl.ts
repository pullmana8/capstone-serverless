import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../helpers/logger";
import { getUserId } from "../helpers/authHelper";
import { TodosAccess } from "../../dataLayer/TodosAccess";
import { corsSuccessResponse } from "../helpers/utils";

const logger = createLogger('generate-upload')

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug('Received event: ', event)

    const authHeader = event.headers.Authorization
    const userId = getUserId(authHeader)
    logger.info('Decoded user: ', userId)

    const todoId = event.pathParameters.todoId ? event.pathParameters.todoId : ''
    logger.info('List todo id', todoId)

    const url = await new TodosAccess().generateUploadUrl(todoId, userId)
    logger.info('List url', url)

    const success = corsSuccessResponse({
        url,
        input: event
    })

    return success
}
