import React, { Component } from "react";
import PropTypes from 'prop-types';
import TabNav from "./tab_nav";
import TabContent from "./tab_content";
import classnames from 'classnames';

export default class Tabs extends Component {

    constructor(props) {
        super(props);


        //初始化index
        const currentProps = this.props;

        let activeIndex;
        if ('activeIndex' in currentProps) {
            activeIndex = currentProps.activeIndex
        } else if ('defaultActiveIndex' in currentProps) {
            activeIndex = currentProps.defaultActiveIndex
        }

        this.state = {
            activeIndex,
            prevIndex: activeIndex
        }
    }

    componentWillReceiveProps(nextProps) {
        //如果外部props activeIndex更改执行
        if (activeIndex in nextProps) {
            this.setState({
                activeIndex
            })
        }
    }

    handleTabClick(activeIndex) {
        const prevIndex = this.activeIndex
        if (this.activeIndex != activeIndex && 'defaultActiveIndex' in this.props) {
            this.setState({
                prevIndex,
                activeIndex
            })

            this.props.onChange({activeIndex, prevIndex})
        }
    }

    renderNav() {

        const { classProfix, children } = this.props;

        return (
            <TabNav
                classProfix={classProfix}
                panels={children}
                activeIndex={ this.state.activeIndex }
                onTabClick={ this.handleTabClick }
            >    
            </TabNav>
        )
    }

    renderContent() {
        const { classProfix, children } = this.props;

        return (
            <TabContent
                classProfix={classProfix}
                panels={ children }
                activeIndex={ this.state.activeIndex }
            >
            </TabContent>
        )
    }

    render () {
        const { classProfix } = this.props;

        return (
            <div className={classProfix}>
                {this.renderNav()}
                {this.renderContent()}
            </div>
        )
    }

    
}

Tabs.propTypes = {
    //主节点class 
    className: PropTypes.string,
    //子节点class 前缀
    classProfix: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    //外部控制index
    activeIndex: PropTypes.number,
    //内部控制index
    defaultActiveIndex: PropTypes.number,
    //切换回调
    onChange: PropTypes.func
}

Tabs.defaultProps = {
    classProfix: 'tabs',
    onChange: () => {}
}