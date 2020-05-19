/* import * as uuid from 'uuid' */
import { TodoItem } from '../models/TodoItem';
import { TodosAccess } from '../dataLayer/todosAcess';
/* import { CreateTodoRequest } from '../requests/CreateTodoRequest' */

const todosAccess = new TodosAccess();

export async function getAllTodos(): Promise<TodoItem[]> {
  return todosAccess.getAllTodos();
}
