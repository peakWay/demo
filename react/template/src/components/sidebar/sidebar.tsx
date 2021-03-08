


import styles from './sidebar.m.scss';

import React from "react";
import NavLink from '../nav-link/nav-link';
import Sider from 'antd/lib/layout/Sider';
import { Menu } from 'antd';
import { Link, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { BarChartOutlined } from '@ant-design/icons';


const SideBar: React.ComponentClass = withRouter(({location}) => {

    const sideBarNav: any[] = [
        {
            name: 'index',
            label: '业务通知',
            path: '/index',
            icon: <BarChartOutlined style={{fontSize: 18, color: '#fff'}} />
        },
        {
            name: 'template',
            label: '模版操作',
            path: '/template',
            icon: <BarChartOutlined style={{fontSize: 18, color: '#fff'}} />
        },
        {
            name: 'marketing',
            label: '营销活动',
            path: '/marketing',
            icon: <BarChartOutlined style={{fontSize: 18, color: '#fff'}} />
        },
        {
            name: 'statistics',
            label: '推送统计',
            path: '/statistics',
            icon: <BarChartOutlined style={{fontSize: 18, color: '#fff'}} />
        }
    ]

    const { name } = sideBarNav.find(item => location.pathname.indexOf(item.name) > -1) || {name: ''}
    
    return (
        <Sider width={180} className="sider">
            <Menu
                mode="vertical"
                selectedKeys={[name]}
                className="sider-menu"
                style={{ height: '100%' }}
            >
                {
                    sideBarNav.map((item, index) => (
                        <Menu.Item key={item.name} className="sider-menu-item" icon={item.icon}>
                            <Link to={item.path} className={styles.link}>
                                {item.label}
                            </Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </Sider>
    )
})

export default SideBar;