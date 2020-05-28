import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../helpers/logger";
import { getUserId } from "../helpers/authHelper";
import { deleteTodoById } from "../../dataLayer/Database";
import { corsSuccessResponse } from "../helpers/utils/response";

const logger = createLogger('delete')

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug('Received event: ', event)

    const authHeader = event.headers.Authorization
    const userId = getUserId(authHeader)
    logger.info('Decoded user: ', userId)

    const todoId = event.pathParameters ? event.pathParameters.todoId : ''
    logger.info('List todo id', todoId)

    const deletItem = await deleteTodoById(todoId)
    logger.info('Delete item', deletItem)

    const success = corsSuccessResponse({
        input: event
    })

    return success
}