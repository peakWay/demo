
import React from 'react'
import { Component } from 'react';

export default class SecondComponent extends Component{
    componentDidUpdate (e) {
        console.log(e, '第二个组件更新')
    }
    
    render () {
                    
        return (
            <div>
                {
                    new Array(3).fill(1).map((item, index) => <div key={index}>这是第二个组件</div>)
                }
            </div>
        )
    }
}