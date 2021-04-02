
import React, { Component } from "react";
import classnames from 'classname'
import PropTypes from 'prop-types';

export default class TabPanel extends Component {

    render() {
        const { className, isActive, classProfix } = props;

        let classes = classnames({
            [className]: className,
            [`${classProfix}-panel`]: true,
            [`${classProfix}-active`]: isActive
        })

        return (
            <div
                className={classes}
            >
                {children}
            </div>
        )
    }
}


TabPanel.propTypes = {
    tab: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    order: PropTypes.number,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool
}