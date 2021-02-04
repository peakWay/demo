
import React from 'react'
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FirstComponent extends Component{
    componentDidUpdate (e) {
        console.log(e, '第一个组件更新')
    }

    render () {
        console.log(this.props, '参数')
        return (
            <div>
                <div>这是第一个组件</div>
                {
                    this.props.link
                    ? <Link to="/about">去第二个页</Link>
                    : null
                }
            </div>
        )
    }
}