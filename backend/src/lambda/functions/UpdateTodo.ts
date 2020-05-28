import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../helpers/logger";
import { getUserId } from "../helpers/authHelper";
import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { TodosAccess } from "../../dataLayer/TodosAccess";
import { corsSuccessResponse } from "../helpers/utils";

const logger = createLogger('update-todo')

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug('Received event: ', event)

    const authHeader = event.headers.Authorization
    const userId = getUserId(authHeader)
    logger.info('Decoded user: ', userId)

    const todoId = event.pathParameters!.todoId ? event.pathParameters!.todoId : ''
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body!)

    const result = await new TodosAccess().updateTodo(userId, todoId, updatedTodo)
    logger.info('Update items: ', result)
    
    const response = corsSuccessResponse({
        result,
        input: event
    })

    return response

}