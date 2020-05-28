import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { createLogger } from "../helpers/logger";
import { getUserId } from "../helpers/authHelper";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { TodosAccess } from "../../dataLayer/TodosAccess";
import { corsSuccessResponse } from "../helpers/utils";

const logger = createLogger('create-todo')

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.debug('Received event: ', event)

    const authHeader = event.headers.Authorization
    const userId = getUserId(authHeader)
    logger.info('Decoded user: ', userId)

    const newTodo: CreateTodoRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body
    logger.info('List requested items: ', newTodo)
    
    const todoId = event.pathParameters!.todoId
    logger.info('List todo item', todoId)

    const item = await new TodosAccess().createTodo(newTodo)
    logger.info('List items: ', item)

    const response = corsSuccessResponse({
        item,
        input: event
    })

    return response
}
