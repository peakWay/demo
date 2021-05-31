


import React from "react";


const Race = ({onStart, onEnd, list}) => { 

    return (
        <div>
            <button onClick={ onStart }>开始拉取数据</button>
            <button onClick={ onEnd }>结束拉取数据</button>
            <ul>
                {
                    list.map((item, index) => {
                        return (
                            <li key={index}>
                                { item }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}


export default Race;