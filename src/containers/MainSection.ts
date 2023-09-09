import { connect } from 'react-redux';
import * as TodoActions from '../actions';
import { bindActionCreators } from 'redux';
import MainSection from '../components/MainSection';
import { getCompletedTodoCount } from '../selectors';
import { StoreState } from '../store';

const mapStateToProps = (state: StoreState) => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state),
});

// @ts-ignore
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
