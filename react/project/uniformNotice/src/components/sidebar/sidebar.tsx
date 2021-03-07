


import styles from './sidebar.scss';

import * as React from "react";
import NavLink from '../nav-link/nav-link';

interface IProps {

}

const SideBar: React.FC<IProps> = (props) => {

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

    return (
        <div className={styles.sidebar}>
            {
                sideBarNav.map((item, index) => (
                    <NavLink key={index} to={item.path} label={item.label}></NavLink>
                ))
            }
        </div>
    )
}

export default SideBar;