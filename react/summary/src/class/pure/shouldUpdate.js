


import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import shallowEqual from "../../utils/shallowEqual";

class ShouldUpdate extends Component { 

    shouldComponentUpdate(nextProps) {
        //PureComponent使用的是浅比较

        //深比较
        // Object.is(nextProps, this.props)

        //浅比较
        // shallowEqual(nextProps, this.props)     
        return !shallowEqual(nextProps, this.props);
    }

    render() {
        console.log('ShouldUpdate', 'Render')
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

ShouldUpdate.propTypes = {

}

export default ShouldUpdate;