

import styles from './card.m.scss';

import React from "react";

interface CardProps {
    
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div className={styles.card}>
            { props.children }
        </div>
    )
}

export default Card;