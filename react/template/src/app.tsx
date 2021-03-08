
import React, { version } from 'react';
import Sidebar from './components/sidebar/sidebar';
import { HashRouter as Router, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styles from './styles/app.m.scss';
import Auth from './modules/auth/manager/auth';
import routes from './router';
import ErrorPage from './pages/error/error';
import LoginPage from './pages/login/login';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import classNames from 'classnames';

interface AuthRouteProps {
    component: React.ComponentType,
    path: string
}

const AuthRoute: React.FC<AuthRouteProps> = ({component: Component, ...rest}) => {

    return (
        <Route 
            {...rest}
            render={(props) => (
                !Auth.isAuthenticated 
                ? <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location.pathname }
                  }} />
                : <Component {...rest} />
            )}
        >    
        </Route>
    )
    
} 

const PageRoute: React.FC = (props) => {
    return (
        <Layout style={{ height: '100%' }}>
            <Header className={classNames('header', styles.header)}>
                <div className="company">
                    <img className="logo" src="https://oss.pocketuniversity.cn/media/2021-03-08/6045a75e477e8.jpg" />
                    <div className="company-name">无邪科技</div>
                </div>
                <div className={styles.project}>数据管理中心</div>
            </Header>
            <Layout hasSider={true}>
                <Sidebar></Sidebar>

                <Layout className="main-container">
                    <Content
                        className="main-content"
                    >
                        <Switch>
                            <Redirect exact path="/" to="/index" />

                            {
                                routes.map((route, i) => (                        
                                    <Route
                                        key={i}
                                        path={route.path}
                                        render={(props) => (<route.component {...props} />)}
                                    >
                                    </Route>
                                ))
                            }
                            
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        // <div className={styles.root}>
        //     <Sidebar></Sidebar>
            
            // <Switch>
            //     <Redirect exact path="/" to="/index" />

            //     {
            //         routes.map((route, i) => (                        
            //             <Route
            //                 key={i}
            //                 path={route.path}
            //                 render={(props) => (<route.component {...props} />)}
            //             >
            //             </Route>
            //         ))
            //     }
                
            //     <Route component={ErrorPage} />
            // </Switch>
        // </div>
    )
}

const App: React.FC = () => {
    return (
        <Router>
            
            {/* <Switch>

                <Route exact path="/login" component={LoginPage}></Route>

                
                <AuthRoute path="/" component={PageRoute}></AuthRoute>
            </Switch> */}
            
            <PageRoute />
        </Router>
    )
}

export default App;