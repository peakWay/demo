
import React from 'react';
import Todo from './todo';

const TodoList = (
    { todos, onTodoClick }: {todos: {text: string, completed: boolean}[], 
    onTodoClick: (index: number) => void}
) => (
    <ul>
        {
            todos.map((todo, index) => (
                <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
            ))
        }
    </ul>
)

export default TodoList;

