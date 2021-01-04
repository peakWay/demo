
import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import './style.scss';

class FatherEvent extends Component {
    handleClick = (e) => {
        console.log('父级点击事件')
    }

    render () {
        return (
            <div onClick={this.handleClick} style={{background: 'yellow', width: '200px', height: '200px'}}>
                <ChildEvent />
            </div>
        )
    }
}

class ChildEvent extends Component {
    handleClick = (e) => {
        //阻止冒泡
        e.stopPropagation()
        console.log('子级点击事件')
    }

    render () {
        return (
            <div onClick={this.handleClick} style={{background: 'red', width: '100px', height: '100px'}}></div>
        )
    }
}

render(<FatherEvent />, window.document.getElementById('app'))