

import React from "react";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "_antd@4.15.0@antd/lib/layout/Sider";
import styles from './page_route.scss';
import CSSModules from 'react-css-modules';
import classNames from "classnames";
import { Menu } from "_antd@4.15.0@antd";
import routes from "@/router/index";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import SiderBar from "@/components/sider_bar/sider-bar";
import IndexPage from "@/pages/index";


interface PageRouteProps {

}

const PageRoute: React.FC<PageRouteProps> = (props) => {

    const pageClass = 'page';
    const projectClass = 'project';
    const contentClass = 'content';

    consele.log(routes, 'props');

    return (
        <Layout styleName={pageClass}>
            <Header className="header">
                <h3 styleName={projectClass}>通知管理后台</h3>
            </Header>
            <Layout>
                <Sider>
                    <SiderBar />
                </Sider>
                <Content styleName={contentClass}>
                    <Switch>
                        <Redirect exact from="/" to="/index" />

                        {
                            routes.map((route, i) => (                        
                                <Route
                                    key={i}
                                    path={route.path}
                                    render={(props) => (<route.component {...props} />)}
                                />
                            ))
                        }

                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default CSSModules(PageRoute, styles);
