
import { ADD_TODO, TOOGLE_TODO, SET_VISIBLE_FILTER, VisibilityFilters }  from './action';
import { combineReducers } from 'redux';

export interface todoModel {
    text: string,
    completed: boolean
}

// const initState: {visibilityFilter: string, todos: todoModel[]} = {
//     visibilityFilter: 'SHOW_ALL',
//     todos: []
// }

//默认
// export const todoApp = (state = initState, action) => {
//     switch(action.type) {
//         case ADD_TODO:
//             return {
//                 ...state,
//                 todos: [
//                     ...state.todos,
//                     {
//                         text: action.text,
//                         completed: false
//                     }
//                 ]
//             }
//         case TOOGLE_TODO:
//             return {
//                 ...state,
//                 todos: state.todos.map((todo, index) => {
//                     return index == action.index ? {...todo, completed: !todo.completed} : todo
//                 })
//             }
//         case SET_VISIBLE_FILTER: 
//             return {
//                 ...state,
//                 visibilityFilter: action.filter
//             }
//         default: 
//             return state
//     }
// }

//同属性简单拆分
// const todos = (state: todoModel[] = [], action) => {
//     switch(action.type) {
//         case ADD_TODO:
//             return [
//                 ...state,
//                 {
//                     text: action.text,
//                     completed: false
//                 }
//             ]
//         case TOOGLE_TODO:
//             return state.map((todo, index) => {
//                 return index == action.index ? {...todo, completed: !todo.completed} : todo;
//             })
//         default:
//             return state
//     }
// }

// export const todoApp = (state = initState, action) => {
//     switch(action.type) {
//         case ADD_TODO:
//             return {...state, todos: todos(state.todos, action)}
//         case TOOGLE_TODO:
//             return {...state, todos: todos(state.todos, action)}
//         case SET_VISIBLE_FILTER: 
//             return {
//                 ...state,
//                 visibilityFilter: action.filter
//             }
//         default: 
//             return state
//     }
// }

//合并state
const { SHOW_ALL } = VisibilityFilters

const todos = (state: todoModel[] = [], action) => {
    switch(action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOOGLE_TODO:
            return state.map((todo, index) => {
                return index == action.index ? {...todo, completed: !todo.completed} : todo;
            })
        default:
            return state
    }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch(action.type) {
        case SET_VISIBLE_FILTER:
            return action.filter
        default:
            return state
    }
}

// export const todoApp = (state = initState, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// }

//最终拆分(同名合并): 这个方法redux自带
// const combineReducers = (reducers) => {
//     return (state = {}, action) => {
//         Object.keys(reducers).reduce(
//             (nextReducer, key) => {
//                 nextReducer[key] = reducers[key](state[key], action)
//                 return nextReducer
//             }, 
//             {}
//         )
//     }
// } 

export const todoApp = combineReducers({
    todos, 
    visibilityFilter
});

export default todoApp;





