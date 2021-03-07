
import * as React from 'react';
import Sidebar from './components/sidebar/sidebar';
import { HashRouter as Router, Redirect, Route, RouteComponentProps } from 'react-router-dom';
import styles from './styles/app.scss';
import Auth from './modules/auth/manager/auth';
import routes from './router';
import ErrorPage from './pages/error/error';


const AuthRoute: React.FC<RouteComponentProps> = (props) => {
    console.log(props, 'props.children')
    

    return Auth.isAuthenticated ? null : <Redirect to={'/login'} />;
} 

const App: React.FC = () => {
    return (
        <Router>
            <Route 
                path="/"
                component={AuthRoute} 
            />

            <div className={styles.root}>
                <Sidebar></Sidebar>
                
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
                
                <Route component={ErrorPage}></Route>
            </div>
        </Router>
    )
}

export default App;