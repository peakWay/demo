
import { createStore } from 'redux';
import todoApp, { todoModel } from './reducers';
import { addTodo, toggleTodo, setVisibleFilter, VisibilityFilters } from './action';

export interface AppState {
    visibilityFilter: string,
    todos: todoModel[]
}

let store = createStore(todoApp, {
    visibilityFilter: 'SHOW_ALL',
    todos: []
})


const unsubscribe = store.subscribe(() => {console.log(store.getState())})

store.dispatch(addTodo('学习React'))
store.dispatch(addTodo('还要学Redux'))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibleFilter(VisibilityFilters.SHOW_COMPLETED))

//取消监听
unsubscribe()

export default store;