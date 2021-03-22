
import { addTodo } from '../store/action';
import React from 'react';
import { connect } from 'react-redux';

let AddTodoFC:any = ({dispatch}) => {
    let input;

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (!input.value.trim()) return
                    
                    dispatch(addTodo(input.value))
                    input.value = ''
                }}
            >
                <input ref={node => input = node} />
                <button type="submit">提交</button>
            </form>
        </div>
    )
}

const AddTodo = connect()(AddTodoFC);

export default AddTodo;

