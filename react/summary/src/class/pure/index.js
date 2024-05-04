

import React, { Component } from "react";
import PropTypes from "prop-types";
import PureChild from "./pureChild";
import ShouldUpdate from "./shouldUpdate";

let outSchool = {
    high: '市一中'
}


class Pure extends Component { 
    state = {
        name: '怪老头',
        age: 0,
        school: outSchool
    }

    tag = <span>children</span>

    changeAge = () => {
        this.setState({
            age: 25
        })
    }

    changeName = () => {
        this.setState({
            name: '费涛'
        })
    }

    changeSchool = () => {
        this.setState({
            school: outSchool
        })
    }

    childClick = () => {

    }

    render() {
        const { name, school } = this.state;
        
        return (
            <div>
                <h3>PureComponent</h3>
                {/* 由于onClick每次都是新函数，所以age变化会重新渲染 */}
                {/* <PureChild name={ name } school={ school } onClick={() => {}}></PureChild> */}

                {/* age不会重新渲染,传入prop都浅相等 */}
                {/* <PureChild name={ name } school={ school } onClick={this.childClick}></PureChild> */}

                {/* props中的children属性渲染的时候都是不同的，span标签每次都会创建新的ReactElement */}
                {/* <PureChild name={ name } school={ school }><span>children</span></PureChild> */}

                {/* props中的标签由于是不变的，那么通过实例属性来保存，则children每次渲染是不变的 */}
                {/* <PureChild name={ name } school={ school }>{ this.tag }</PureChild> */}

                {/* props中的children属性渲染的纯文本是相通的,不会重新渲染 */}
                <PureChild name={ name } school={ school }>children</PureChild>

                <h3>ShouldComponentUpdate</h3>
                <ShouldUpdate name={ name } school={ school }>{ this.tag }</ShouldUpdate>
                
                <button onClick={ this.changeAge }>改变年龄</button>
                <button onClick={ this.changeName }>改变姓名</button>
                <button onClick={ this.changeSchool }>改变相同属性的学校</button>

            </div>
        )
    }
}

Pure.propTypes = {

}

export default Pure;