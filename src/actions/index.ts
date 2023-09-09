import * as types from '../constants/ActionTypes';
import { TodoItem } from '../models';

export const addTodo = (text: TodoItem['text']) => ({
  type: types.ADD_TODO,
  text,
});
export const deleteTodo = (id: TodoItem['id']) => ({
  type: types.DELETE_TODO,
  id,
});
export const editTodo = (id: TodoItem['id'], text: TodoItem['text']) => ({
  type: types.EDIT_TODO,
  id,
  text,
});
export const completeTodo = (id: TodoItem['id']) => ({
  type: types.COMPLETE_TODO,
  id,
});
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const setVisibilityFilter = (filter: string) => ({
  type: types.SET_VISIBILITY_FILTER,
  filter,
});
