import { combineReducers } from 'redux';

import {
    SELETE_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS,
} from './actions';

const selectedsubreddit = (state = 'reactjs', action) => {
    switch(action.type) {
        case SELETE_SUBREDDIT:
            return action.subreddit;
        default:
            return state;
    }
}

const post = (
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
            return {
                ...state, 
                didInvalidate: true
            }
        case REQUEST_POSTS:
            return {
                ...state, 
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_POSTS:
            return {
                ...state, 
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            }
        default:
            return state;
    }
}

const postsBySubreddit = (state = {}, action) => {
    switch(action.type) {
        case INVALIDATE_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return {
                ...state, 
                [action.subreddit]: post(state[action.subreddit], action)
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    selectedsubreddit,
    postsBySubreddit
})

export default rootReducer;