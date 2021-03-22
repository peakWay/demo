
import React from 'react';
import FilterLink from '../smart/filterLink';

const Footer = () => (
    <p>
        Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED">SHOW_COMPLETED</FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE">SHOW_ACTIVE</FilterLink>
    </p>
)

export default Footer;