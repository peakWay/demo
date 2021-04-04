

import React, { Component } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "./modules/auth/manager/auth";
import LoginPage from "./pages/login/login";
import PageRoute from "./view/page_route/page_route";

interface AuthRouteProps {
    component: React.ComponentType
}

const AuthRoute: React.FC<AuthRouteProps> = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() => {
                return !Auth.isAuthenticated
                    ? <Redirect to="/login" />
                    : <Component {...rest} />
            }}
        />
    )
}

interface AppProps {

}

const App: React.FC<AppProps> = (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                
                <AuthRoute component={PageRoute} />
            </Switch>
        </Router>
    )
}

export default App;