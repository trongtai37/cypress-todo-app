import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';
import { StoreState } from '../store';

// @ts-ignore
const mapStateToProps = (state: StoreState, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

// @ts-ignore
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
