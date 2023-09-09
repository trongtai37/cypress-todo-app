import React from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { TodoItem as TodoItemType } from '../models';

interface TodoItemProps {
  todo: TodoItemType;
  completeTodo: (id: TodoItemType['id']) => void;
  deleteTodo: (id: TodoItemType['id']) => void;
  editTodo: (id: TodoItemType['id'], text: TodoItemType['text']) => void;
}

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { todo, completeTodo, deleteTodo, editTodo } = props;
  const [editing, setEditing] = React.useState(false);
  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id: TodoItemType['id'], text: TodoItemType['text']) => {
    if (text.length === 0) {
      deleteTodo(id);
    } else {
      editTodo(id, text);
    }
    setEditing(false);
  };

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
    );
  }

  return (
    <li
      className={classnames({
        todo: true,
        completed: todo.completed,
        editing: editing,
      })}
    >
      {element}
    </li>
  );
};

export default TodoItem;
