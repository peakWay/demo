

import React from "react";
import PropsType from 'prop-types';
import { PopConfirm, Button } from 'antd';
import { connect } from "_dva@2.4.1@dva";

const ProductList = (props) => {
    console.log(props)

    const { products = [] } = props;


    console.log(products, 'products');

    return (
        <div>
            {
                products.map(item => (
                    <div key={item.id}>
                        <span>{ item.name }</span>
                        <span onClick={ () => {console.log(1); props.dispatch({type: 'products/getData'})} }>删除</span>
                        {/* <PopConfirm title="Delete?" onConfirm={() => onDelete(item.id)}>
                            <Button>删除</Button>
                        </PopConfirm> */}
                    </div>
                ))
            }
        </div>
    )
}



export default connect(state => state)(ProductList)