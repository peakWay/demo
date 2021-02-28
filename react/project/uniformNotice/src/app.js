
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import NavLink from '@/components/nav-link/nav-link';
import routes from '@/router/index';

import './app.scss';
import ErrorPage from './components/error/error';

const sideBarNav = [
    {
        name: 'index',
        label: '业务通知',
        path: '/index'
    },
    {
        name: 'template',
        label: '模版操作',
        path: '/template'
    },
    {
        name: 'marketing',
        label: '营销活动',
        path: '/marketing'
    },
    {
        name: 'statistics',
        label: '推送统计',
        path: '/statistics'
    }
]

console.log(routes);

const App = () => {
    
    return (
        <Router>
            <div className="root-page">
                <div className="sidebar">
                    {
                        sideBarNav.map((item, index) => (
                            <NavLink key={index} to={item.path} label={item.label}></NavLink>
                        ))
                    }
                </div>
                <div className="container">
                    <Switch>
                        <Redirect exact to="/index" from="/" ></Redirect>

                        {
                            routes.map((route, i) => (
                                <Route
                                    path={route.path}
                                    render={
                                        (props) => {
                                            <route.component {...props} />
                                        }
                                    }
                                >

                                </Route>
                            ))
                        }

                        <Route component={ErrorPage}></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App;