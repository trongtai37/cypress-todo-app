import React from 'react';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodoList';

interface MainSectionProps {
  todosCount: number;
  completedCount: number;
  actions: any;
}

const MainSection: React.FC<MainSectionProps> = ({
  todosCount,
  completedCount,
  actions,
}) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
          onClick={actions.completeAllTodos}
          onChange={actions.completeAllTodos}
          data-test="toggle-all-checkbox"
        />
        <label
          data-cy-toggle-all
          onClick={actions.completeAllTodos}
          data-test="toggle-all-label"
        />
      </span>
    )}
    <VisibleTodoList />
    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
      />
    )}
  </section>
);

export default MainSection;
