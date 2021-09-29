
import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import { HashRouter as Router, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import styles from './styles/app.scss';
import Auth from './modules/auth/manager/auth';
import routes from './router';
import ErrorPage from './pages/error/error';
import LoginPage from './pages/login/login';

interface AuthRouteProps {
    component: React.ComponentType,
    path: string
}

const AuthRoute: React.FC<AuthRouteProps> = ({component: Component, ...rest}) => {
    console.log(rest);

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

const PageRoute: React.FC<RouteComponentProps> = (props) => {
    return (
        <div className="root">
            <Sidebar></Sidebar>
            
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
                
                <Route component={ErrorPage} />
            </Switch>
        </div>
    )
}
const App: React.FC = () => {
    return (
        <Router>
            <Switch>

                <Route exact path="/login" component={LoginPage}></Route>

                
                <AuthRoute path="/" component={PageRoute}></AuthRoute>
            </Switch>
        </Router>
    )
}

export default App;