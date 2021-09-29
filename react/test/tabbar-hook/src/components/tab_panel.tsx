


import React from "react";
import classnames from 'classnames';

interface TabPanelProps {
    order: number,
    isActive?: boolean,
    classPrefix?: string,
    children: any,
    tab: any
}

const TabPanel: React.FC<TabPanelProps> = ({ classPrefix, isActive, children }) => {

    const classes = classnames({
        [`${classPrefix}-panel`]: true,
        [`${classPrefix}-active`]: isActive
    })

    return (
        <div className={classes}>
            { children }
        </div>
    )
}

export default TabPanel;