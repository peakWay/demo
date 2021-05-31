
import { all, put, call, take, fork, cancel, race } from "redux-saga/effects";


function* hello() {
    console.log('hello');
}

function requestLogin() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('a1b2c3')
        }, 5000)
    })
}

/**
 * 最初版
 * 最初版有个问题：call 是一个会阻塞的 Effect。即 Generator 在调用结束之前不能执行或处理任何其他事情。 但在我们的情况中，我们不仅希望 loginFlow 执行授权调用，也想监听可能发生在调用未完成之前的 LOGOUT action。 因为 LOGOUT 与调用 authorize 是 并发的
 */
// function* anthorize() {
//     try {
//         let token = yield call(requestLogin);
        
//         yield put({ type: 'LOGIN_SUCCESS'});

//         return token
//     } catch(err) {
//         yield put({ type: 'LOGIN_ERROR' })
//     }
// }

// function* loginFlow() {
//     while(true) {
//         yield take('LOGIN_REQUEST');
//         console.log(0)
//         const token = yield call(anthorize);
//         console.log(1)
//         if (token) {
//             console.log(2)
//             localStorage.setItem('token', token);
//             yield take('LOGOUT');
//             console.log(3)
//             localStorage.removeItem('token');
//         }

//     }
// }
/* 最初版 */

/**
 * 完善版
 * 为了解决最初版的问题，使用无阻塞方法fork
 * 但是如果登录请求有渲染上的变化，比如loading，取消需要清除变化
 */
// function* anthorize() {
//     try {
//         let token = yield call(requestLogin);
//         console.log('anthorize')
        
//         if(token) {
//             yield put({type: 'LOGIN_SUCCESS'});
//             localStorage.setItem('token', token);
//         }
        
//     } catch(err) {
//         yield put({type: 'LOGIN_ERROR'});
//     }
// }

// function* loginFlow() {
//     while(true) {
//         yield take('LOGIN_REQUEST');
//         const task = yield fork(anthorize);
//         const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
//         console.log(1212)
//         if (action.type === 'LOGOUT') {
//             yield cancel(task);
//         }
//         localStorage.removeItem('token')
//     }
// }

/**
 * 最终版
 * 解决方案:增加LOADING状态改变LOGIN_PENDING状态
 */

function* anthorize() {
    try {
        yield put({type: 'LOGIN_PENDING'})
        let token = yield call(requestLogin);
        console.log('anthorize')
        
        if(token) {
            yield put({type: 'LOGIN_SUCCESS'});
            localStorage.setItem('token', token);
        }
        
    } catch(err) {
        console.log('err')
        yield put({type: 'LOGIN_ERROR'});
    }
}

function* loginFlow() {
    while(true) {
        yield take('LOGIN_REQUEST');
        const task = yield fork(anthorize);
        const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
        if (action.type === 'LOGOUT') {
            yield cancel(task);
        }
        localStorage.removeItem('token')
    }
}



//无限拉取数据并提供暂停按钮
function fetchPost() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([1, 2, 3])
        }, 1000)
    })
}

function* fetchPostTask() {
    while(true) {
        let res = yield call(fetchPost)
        yield put({type: 'ADD_POST', payload: res})
    }
}

function* watchPostTask() {
    while(true) {
        console.log(111)
        //开始拉取数据
        yield take('START_POST')
        yield race({
            task: call(fetchPostTask),
            cancel: take('CANCEL_POST')
        })
    }
}


export default function* rootSaga() {
    yield all([
        hello(),
        loginFlow(),
        watchPostTask()
    ])
}