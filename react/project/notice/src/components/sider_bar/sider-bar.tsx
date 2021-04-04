

import styles from './sider-bar.scss';

import React from "react";
import { Menu } from '_antd@4.15.0@antd';
import { Link, withRouter } from 'react-router-dom';
import { SiderBar, siderBarList } from '@/constants/siderbar';

interface SiderBarProps {
    selected: string[],
    list: SiderBar[]
}

const SiderBarView: React.FC<SiderBarProps> = ({ selected, list }) => {
    return (
        <>
            <Menu
                mode="vertical"
                theme="dark"
                selectedKeys={selected}
            >
                {
                    list.map(sider => (
                        <Menu.Item key={sider.name}>
                            <Link to={sider.path} >{ sider.label }</Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
        </>
    );
};

const SiderBarState = ({location}) => {
    
    const { name } = siderBarList.find(item => location.pathname.indexOf(item.name) > -1) || {name: ''}
    
    return SiderBarView({list: siderBarList, selected: [name]});
}

export default withRouter(SiderBarState);