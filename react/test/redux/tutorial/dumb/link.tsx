
import React, { ReactNode } from 'react';

const Link = ({ active, children, onClick }: {active: boolean, children: ReactNode, onClick: () => void}) => {
    if (active) {
        return <span>{ children }</span>
    }
    
    return (
        <a 
            href="" 
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
        >
            { children }
        </a>
    )
};

export default Link;