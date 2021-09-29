

import React, { ReactChildren } from "react";
import classnames from 'classnames';


interface TabContentProps {
    activeIndex: number,
    panels: any[],
    classPrefix: string,
}

const TabContent: React.FC<TabContentProps> = ({ activeIndex, panels, classPrefix  }) => {

    const getPanels = () => {
        return panels.map((child) : JSX.Element => {
            const order = child.props.order;
            const isActive = activeIndex == order;

            return React.cloneElement(child, {
                classPrefix,
                isActive,
                order: order,
                children: child.props.children,
                key: `tabpane-${order}`
            })
        })
    }

    const classes = classnames({
        [`${classPrefix}-content`]: true
    })

    return (
        <div className={classes}>
            { getPanels() }
        </div>
    )
}

export default TabContent;