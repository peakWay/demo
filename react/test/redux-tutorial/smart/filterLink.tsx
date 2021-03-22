
import Link from '../dumb/link';
import React from 'react';
import { setVisibleFilter } from '../store/action';
import { AppState } from '../store/store';
import { connect } from 'react-redux';

//将Link需要的filter做了处理
let mapStateToProps = (state: AppState, ownProps: {filter: string}) => {
    return {
        active: ownProps.filter == state.visibilityFilter
    }
}

let mapDispatchToProps = (dispatch, ownProps: {filter: string}) => {
    return {
        onClick: () => {
            dispatch(setVisibleFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)


export default FilterLink;