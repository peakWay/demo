


import React, { Component } from "react";

const Login = ({onLogin, onLoginOut, isLogined, isLoging}) => {

    let loginStatus;
    
    if (isLogined) {
        loginStatus = '已登录'
    } else if (isLoging) {
        loginStatus = '登录中'
    } else {
        loginStatus = '未登录'
    }

    return (
        <div>
            <button onClick={onLogin}>
                登录
            </button>
            <button onClick={onLoginOut}>
                登出
            </button>
            <br></br>
            <span >{ loginStatus }</span>
        </div>
    );
}

export default Login;