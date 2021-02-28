import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import classNames from 'classnames'
import './nav-link.scss';

const NavLink = ({to, label}) => (
    <Route
        path={to}
        children={({ match }) => (
            <div className={classNames(['nav', match ? 'active' : ''])}>
                <Link to={to} className="link">{ label }</Link>
            </div>
        )}
    >
    </Route>
);


export default NavLink;