


import styles from './nav-link.m.scss';
import { Route, Link } from 'react-router-dom';
import React from "react";
import classnames from 'classnames';

interface IProps {
    to: string;
    label: string;
}

const NavLink: React.FC<IProps> = ({to, label}) => (
    <Route
        path={to}
        children={({ match }) => (
            <div className={classnames([styles.nav, match ? styles.active : '', 'div'])}>
                <Link to={to} className={styles.link}>{ label }</Link>
            </div>
        )}
    />
)

export default NavLink;