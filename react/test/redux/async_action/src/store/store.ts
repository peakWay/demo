
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const stateStructure = {
    selectedsubreddit: 'frontend',
    postsBySubreddit: {
        frontend: {
            isFetching: false,
            didInvalidate: false,
            items: []
        },
        reactjs: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1616510065,
            items: [
                {
                    id: 1,
                    title: 'I learn redux'
                }
            ]
        }
    }
}

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)