
export const ADD_TODO = 'ADD_TODO'
export const TOOGLE_TODO = 'TOOGLE_TODO'
export const SET_VISIBLE_FILTER = 'SET_VISIBLE_FILTER'

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
    return {type: ADD_TODO, text}
}

export function toggleTodo(index) {
    return {type: TOOGLE_TODO, index}
}

export function setVisibleFilter(filter) {
    return {type: SET_VISIBLE_FILTER, filter}
}


