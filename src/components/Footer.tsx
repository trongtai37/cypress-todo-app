import FilterLink from '../containers/FilterLink';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

interface FooterProps {
  completedCount: number;
  activeCount: number;
  onClearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { activeCount, completedCount, onClearCompleted } = props;
  const itemWord = activeCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer" data-test="footer">
      <span className="todo-count" data-test="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters" data-test="filters">
        {Object.keys(FILTER_TITLES).map((filter) => (
          <li key={filter}>
            <FilterLink filter={filter}>
              {FILTER_TITLES[filter as keyof typeof FILTER_TITLES]}
            </FilterLink>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
          data-test="clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
