import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../helpers/logger";
import { getUserId } from '../helpers/authHelper';
import { TodosAccess } from "../../dataLayer/TodosAccess";
import { corsSuccessResponse } from "../helpers/utils";

const logger = createLogger('retrieve-todos')

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.debug('Received event: ', event)

    const authHeader = event.headers.Authorization
    const userId = getUserId(authHeader)
    logger.info('Decoded user: ', userId)

    const items = await new TodosAccess().getAllTodosItems(userId)
    logger.info('Listing todos: ', items)

/*    const todoId = event.pathParameters ? event.pathParameters.todoId : ''

    for (const record of items) {
        record.attachmentUrl = await new TodosAccess().generateUploadUrl(todoId, userId)
    }
*/
    const response = corsSuccessResponse({
        items,
        input: event
    })

    return response
}