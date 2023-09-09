import React from 'react';
import TodoTextInput from './TodoTextInput';

interface HeaderProps {
  addTodo: (text: string) => void;
}

const Header: React.FC<HeaderProps> = ({ addTodo }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          // simulate delayed application logic
          // setTimeout(addTodo, 1000, text)
          addTodo(text);
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
);

export default Header;
