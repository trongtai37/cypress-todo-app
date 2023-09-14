import {
  ADD_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL_TODOS,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from '../constants/ActionTypes';
import { TodoItem } from '../models';

export type TodoAction =
  | {
      type: typeof ADD_TODO;
      text: TodoItem['text'];
    }
  | {
      type: typeof DELETE_TODO;
      id: TodoItem['id'];
    }
  | {
      type: typeof EDIT_TODO;
      id: TodoItem['id'];
      text: TodoItem['text'];
    }
  | {
      type: typeof COMPLETE_TODO;
      id: TodoItem['id'];
    }
  | {
      type: typeof COMPLETE_ALL_TODOS;
    }
  | {
      type: typeof CLEAR_COMPLETED;
    };

const initialState: TodoItem[] = [];

export default function todos(state = initialState, action: TodoAction) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
      ];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );

    case COMPLETE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every((todo) => todo.completed);
      return state.map((todo) => ({
        ...todo,
        completed: !areAllMarked,
      }));

    case CLEAR_COMPLETED:
      return state.filter((todo) => todo.completed === false);

    default:
      return state;
  }
}
