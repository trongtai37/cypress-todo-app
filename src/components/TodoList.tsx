import { TodoItem as TodoItemType } from '../models';
import TodoItem from './TodoItem';

interface TodoListProps {
  filteredTodos: TodoItemType[];
  actions: any;
}

const TodoList: React.FC<TodoListProps> = ({ filteredTodos, actions }) => (
  <ul className="todo-list" data-test="todo-list">
    {filteredTodos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} {...actions} />
    ))}
  </ul>
);

export default TodoList;
