
import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import NavLink from '@/components/nav-link/nav-link'

import './app.scss';

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
            </div>
            <Switch>
                <Redirect exact to="/index" from="/" ></Redirect>

                
            </Switch>
        </Router>
    )
}

export default App;