import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import Login from "./Login";
import Race from './Race';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

const action = (type, payload) => store.dispatch({type, payload})

function render() {
    ReactDom.render(
        <div>
            <Login
                {...store.getState()}
                onLogin={() => action('LOGIN_REQUEST')}
                onLoginOut={() => action('LOGOUT')}
            />
            <Race 
                list={store.getState().list}
                onStart={() => action('START_POST')}
                onEnd={() => action('CANCEL_POST')}
            />
        </div>,
        document.getElementById('root')
    )
}

render();
store.subscribe(render);

sagaMiddleware.run(rootSaga)

