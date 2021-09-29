

import React, { Component } from "react";
import controllPropsHoc from "./components/base/controll_props";
import referenceRef from './components/base/reference_ref';


function compose(...fns) {
    return fns.reduce((pre, cur) => (...args) => {
        return pre(cur(...args))
    })
}


//ES7 decorator babel-plugin-transform-decorators-legacy
@referenceRef
@controllPropsHoc
class Person extends Component {

    constructor(props) {
        super(props);
        // this.textInput = null;

        // this.setTextInputRef = element => {
        //     this.textInput = element;
        // };

        // this.focusTextInput = () => {
        //     // 使用原生 DOM API 使 text 输入框获得焦点
        //     if (this.textInput) this.textInput.focus();
        // };

        console.log(this.props)
    }

    // componentDidMount() {
    //     this.focusTextInput()
    // }

    render() {
        return (
            <React.Fragment>
                <div>我的名字： {this.props.name}</div>
                <div>我的年龄： {this.props.age}</div>
                <input ref={this.props.forwardRef} value={this.props.value} />
            </React.Fragment>
        )
    }
}

// const NewPerson = controllPropsHoc(Person)
// const NewPerson = compose(referenceRef, controllPropsHoc)(Person)

export default class App extends Component {
    render() {
        return (
            <Person name="oldman" />
        )
    }
}