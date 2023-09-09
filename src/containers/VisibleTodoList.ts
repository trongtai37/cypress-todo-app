import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TodoActions from '../actions';
import TodoList from '../components/TodoList';
import { getVisibleTodos } from '../selectors';
import { StoreState } from '../store';

const mapStateToProps = (state: StoreState) => ({
  filteredTodos: getVisibleTodos(state),
});

// @ts-ignore
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
