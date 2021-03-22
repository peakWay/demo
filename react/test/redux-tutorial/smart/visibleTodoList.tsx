import { toggleTodo } from "../store/action";
import { todoModel } from "../store/reducers";
import { connect } from "react-redux";
import TodoList from "../dumb/todoList";
import { AppState } from "../store/store";

//将过滤放在connect函数之前
const getVisibleTodos = (todos: todoModel[], filter: string) => {
    switch(filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed)
        case 'SHOW_ALL':
        default:
            return todos;
    }
}

let mapStateToProps = (state: AppState) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

let mapDispatchToProps = dispatch => {
    return {
        onTodoClick: (index: number) => {
            dispatch(toggleTodo(index))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default VisibleTodoList;

