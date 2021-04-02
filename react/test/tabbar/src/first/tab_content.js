
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class TabContent extends Component {

    getTabPanels() {
        const { classProfix, panels, activeIndex } = this.props;


        panels.map((child) => {
            const order = child.props.order;
            const isActive = order == activeIndex;

            return React.cloneElement(child, {
                classProfix,
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            })
        })
    }

    render() {
        const { classProfix } = this.props;

        const classes = classnames({
            [`${classProfix}-content`]: true
        })

        return (
            <div className={classes}>
                { this.getTabPanels() }
            </div>
        )
    }

}

TabContent.propTypes = {
    classProfix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number
}