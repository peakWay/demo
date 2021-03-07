

// import styles from './name.scss';

import React, { useState } from "react";
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Auth from '@/modules/auth/manager/auth';

const LoginPage: React.FC<RouteComponentProps> = (props: {location}) => {

    const [isLogin, setIsLogin] = useState(false);
    
    const onLogin = () => {
        Auth.login(() => {
            setIsLogin(true)
        });
    }

    const from:string = props.location.state?.from || '/'
    
    return (
        isLogin 
        ? <Redirect to={from}></Redirect>
        : (
            <>
                <div>这是登录页</div>
                <button onClick={() => onLogin()}>登录</button>
            </>
        )
    )
}

export default LoginPage;