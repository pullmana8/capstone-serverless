import * as uuid from 'uuid'
import { createLogger } from '../lambda/helpers/logger'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodosAccess } from '../dataLayer/TodosAccess'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { TodoUpdate } from '../models/TodoUpdate'
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy'

const logger = createLogger('todos-access')
const todosAccess = new TodosAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return todosAccess.getAllTodosItems(userId)
}

export async function createTodoItem(event: APIGatewayProxyEvent, userId: string, todoItem: CreateTodoRequest): Promise<TodoItem> {
  logger.debug('Create todo items for user', userId)

  let todoId = event.pathParameters ? event.pathParameters.todoId : uuid.v4()
    
  const timestamp = new Date().toISOString()
  return todosAccess.createTodo({
    userId,
    todoId,
    createdAt: timestamp,
    name: todoItem.name,
    dueDate: todoItem.dueDate,
    done: false,
    attachmentUrl: null!,
  })
}

export async function updateTodoItem(userId: string, todoId: string, todoItem: UpdateTodoRequest): Promise<TodoUpdate> {
  return todosAccess.updateTodo(userId, todoId, todoItem)
}
