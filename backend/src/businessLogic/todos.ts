import { TodoItem } from '../models/TodoItem'
import { createTodoItem, listAllTodos } from '../dataLayer/Database'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { getUserId } from '../lambda/utils'
import { APIGatewayProxyEvent } from 'aws-lambda'

export async function getAllTodos(event: APIGatewayProxyEvent): Promise<TodoItem[]> {
  const userId = getUserId(event)
  return listAllTodos(userId)
}

export async function createTodo(event: APIGatewayProxyEvent, payload: CreateTodoRequest): Promise<TodoItem> {
  const userId = getUserId(event)
  return createTodoItem(userId, payload)
}
