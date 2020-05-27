import * as uuid from 'uuid'
import { createLogger } from '../lambda/helpers/logger'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodosAccess } from '../dataLayer/TodosAccess'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { TodoUpdate } from '../models/TodoUpdate'

const logger = createLogger('todos-access')
const todosAccess = new TodosAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
    return await todosAccess.getAllTodosItems(userId)
}

export async function createTodoItem(userId: string, todoItem: CreateTodoRequest): Promise<TodoItem> {
    logger.debug('Create todo items for user', userId)
    const todoId = uuid.v4()
    const timestamp = new Date().toISOString()
    return await todosAccess.createTodo({
        userId: userId,
        todoId: todoId,
        createdAt: timestamp,
        name: todoItem.name,
        dueDate: todoItem.dueDate,
        done: false,
        attachmentUrl: null
    })
}

export async function updateTodoItem(userId: string, todoId: string, todoItem: UpdateTodoRequest): Promise<TodoUpdate> {
    return await todosAccess.updateTodo(userId, todoId, todoItem)
}