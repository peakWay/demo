
import React, { Children, Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class TabContent extends Component {

    getTabPanels() {
        const { classProfix, panels, activeIndex } = this.props;

        console.log(panels, 21121212)



        return panels.map((child) => {
            const order = child.props.order;
            const isActive = order == activeIndex;

            console.log(order, 'order')

            return React.cloneElement(child, {
                classProfix,
                isActive,
                order: order,
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