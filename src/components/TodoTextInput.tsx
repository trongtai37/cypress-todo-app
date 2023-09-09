import React from 'react';
import classnames from 'classnames';

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  editing?: boolean;
  newTodo?: boolean;
}

const TodoTextInput: React.FC<TodoTextInputProps> = ({
  newTodo,
  onSave,
  text: textFromProps,
  editing,
  placeholder,
}) => {
  const [text, setText] = React.useState(textFromProps || '');

  const handleSubmit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // @ts-ignore
    const text = e.target.value.trim();
    if (e.which === 13) {
      onSave(text);
      if (newTodo) {
        setText('');
      }
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };

  return (
    <input
      className={classnames({
        edit: editing,
        'new-todo': newTodo,
      })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoTextInput;
