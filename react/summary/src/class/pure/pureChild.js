


import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

class PureChild extends PureComponent { 

    render() {
        console.log('PureChild', 'Render')
        return (
            <>
                <div>名称：{ this.props.name }</div>
                <div>学校：{ this.props.school.high }</div>
                <div onClick={ this.props.onClick }>点击事件</div>
                <div>子组件： { this.props.children }</div>
            </>
        )
    }
}

PureChild.propTypes = {

}

export default PureChild;