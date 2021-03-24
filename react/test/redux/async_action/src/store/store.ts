
import { createLogger } from 'redux-logger';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { createStore, applyMiddleware, AnyAction } from 'redux';
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
      thunkMiddleware as ThunkMiddleware, // 允许我们 dispatch() 函数
      loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
)
  

export default store;