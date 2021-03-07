


import styles from './nav-link.scss';
import { Route, Link } from 'react-router-dom';
import * as React from "react";
import classnames from 'classnames';

interface IProps {
    to: string;
    label: string;
}

const NavLink: React.FC<IProps> = ({to, label}) => (
    <Route
        path={to}
        children={({ match }) => (
            <div className={classnames([styles.nav, match ? styles.active : ''])}>
                <Link to={to} className={styles.link}>{ label }</Link>
            </div>
        )}
    />
)

export default NavLink;