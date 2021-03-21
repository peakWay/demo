
import React from 'react';

const Todo = ({ text, completed, onClick }: {text: string, completed: boolean, onClick: () => void}) => (
    <li 
        onClick={onClick}
        style={{ 
            textDecoration: completed ? 'line-through' : 'none' 
        }}
    >
        { text }
    </li>
)

export default Todo;

