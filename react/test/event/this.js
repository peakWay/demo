
import * as React from 'react';
import { render } from 'react-dom';
import './style.scss';

function funC () {
    console.log(this, 2323)
}

function funcD (scope) {
    console.log(scope)
}

class This extends React.Component {
    constructor (props) {
        super(props)
        console.log(this, 'constructor')
    }

    componentDidMount () {
        console.log(this, '生命周期')
    }

    funcA () {
        console.log(this, 'funcA')
    }

    funcB = () => {
        console.log(this, 'funcB')
    }

    handleChild = () => {
        console.log(this.child)
        this.child.childMethod()
    }

    bindRef = (ref) => {
        this.child = ref
    }

    handleRefChild = () => {
        this.refs.child.childMethod()
    }

    render () {
        console.log(this, 'render')
        return (
            <div>
                <button onClick={this.funcA}>this.funcA</button>
                <button onClick={() => this.funcA()}>{ '() => this.funcA()' }</button>
                <button onClick={this.funcB}>this.funcB</button>
                <Child onClick={funC} ref="child">
                    <div>点击</div>
                </Child>
                <Child onClick={funcD} onRef={this.bindRef}>
                    <div>点击D</div>
                </Child>
                <button onClick={funcD.bind(this)}>this.funcD</button>
                <button onClick={this.handleChild}>父级操作子级点击</button>
                <button onClick={this.handleRefChild}>父级通过ref操作子级点击</button>
            </div>
        )
    }
}

class Child extends React.Component {
    constructor (props) {
        super(props);
        console.log(this)
    }

    componentDidMount () {
        this.props.onRef && this.props.onRef(this)
    }

    childMethod () {
        console.log('我是子组件的方法')
    }

    render () {
        return (
            <div>
                <button onClick={this.props.onClick}>this.ChildFun</button>
                { this.props.children }
            </div>
        )
    }
}

render(<This />, window.document.getElementById('this'))