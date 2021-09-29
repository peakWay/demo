

import React from "react";
import classnames from 'classnames';

interface TabNavProps {
    classPrefix: string,
    activeIndex: number,
    panels: JSX.Element[],
    onTabClick?: (activeIndex: number) => void
}

const TabNav: React.FC<TabNavProps> = ({classPrefix, activeIndex, panels, onTabClick}) => {
    
    const getNavs = (): JSX.Element[] => {
        return panels.map(child => {

            const order = child.props.order;

            const classes = classnames({
                [`${classPrefix}-tab`]: true,
                [`${classPrefix}-active`]: order == activeIndex,
            })

            let events = {
                onClick: onTabClick?.bind(this, order)
            }

            return (
                <li className={classes} {...events} key={order}>
                    { child.props.tab }
                </li>
            )
        })
    }

    const barClasses = classnames({
        [`${classPrefix}-bar`]: true
    })

    const navClasses = classnames({
        [`${classPrefix}-nav`]: true
    })

    return (
        <div className={barClasses}>
            <ul className={navClasses}>
                { getNavs() }
            </ul>
        </div>
    )
}

export default TabNav;