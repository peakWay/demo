
import React, { Component } from 'react';
import classnames from 'classname'
import PropTypes from 'prop-types';

export default class TabNav extends Component {

    getTabs() {

        console.log(this.props), 'props';
        return this.props.panels.map((child, index) => {
            if (!child) return;

            const { classProfix, onTabClick, activeIndex } = this.props;

            console.log(child.props);
            const {order, disabled, tab} = child.props;
            

            //设置class
            let classes = classnames({
                [`${classProfix}-tab`]: true,
                [`${classProfix}-active`]: activeIndex == order,
                [`${classProfix}-disabled`]: disabled,
            })

            //绑定点击事件
            let events = {}
            if (!disabled) {
                events.onClick = onTabClick.bind(this, order);
            }

            return (
                <li
                    role="tab"
                    aria-disabled={disabled ? 'true' : 'false'}
                    {...events}
                    className={classes}
                    key={index}
                >
                    { tab }
                </li>
            );
        })
    }

    render() {
        const { classProfix } = this.props;
        
        const rootClasses = classnames({
            [`${classProfix}-bar`]: true
        })

        const classes = classnames({
            [`${classProfix}-nav`]: true
        })

        return (
            <div className={rootClasses}>
                <ul className={classes}>
                    { this.getTabs() }
                </ul>
            </div>
        );
    }
}

TabNav.propTypes = {
    classProfix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
    onTabClick: PropTypes.func
}