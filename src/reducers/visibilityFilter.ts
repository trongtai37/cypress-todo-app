import { SET_VISIBILITY_FILTER } from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/TodoFilters';

export type VisibilityFilterAction = {
  type: typeof SET_VISIBILITY_FILTER;
  filter: string;
};

const visibilityFilter = (state = SHOW_ALL, action: VisibilityFilterAction) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
