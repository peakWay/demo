

import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

import './index.scss';
import classnames from 'classnames';

const ALIGN_ENUM = [
    'left',
    'right',
    'center'
]

class Table extends PureComponent {

    tableLayout = this.props.columns.find(col => col.ellipsis) ? 'fixed' : 'auto';

    //获取单元格宽度
    getThStyle = ({width, align}) => {
        let result = {}

        if (width) {
            result.width = typeof width == 'number' ? width + 'px' : width
        }

        if (align && align != 'start') {
            result.textAlign = align
        }

        return result;
    }

    getTdStyle = ({ align }) => {
        let result  = {};

        if (align && align != 'start') {
            result.textAlign = align
        }

        return result;
    }

    getTdClass = ({ ellipsis, className }) => {
        return classnames({
            ellipsis,
            'table-cell': true,
            [`${className}`]: className
        })
    }

    render() {
        const  { columns, dataSource, bordered, theadClassName } = this.props;
        //表头渲染
        let header = null;
        if (columns && columns.length) {
            header = (
                <thead className={ theadClassName }>
                    <tr>
                        {
                            columns.reduce((prev, cur) => {
                                if (cur.colSpan !== 0) {
                                    const thClasses = classnames(['table-cell', cur.className])
                                    prev = prev.concat(
                                        <th key={ cur.key || cur.dataIndex } className={ thClasses } colSpan={ cur.colSpan } style={ this.getThStyle(cur) }>
                                            { cur.title }
                                        </th>
                                    )
                                }

                                return prev;
                            }, [])
                        }
                    </tr>
                </thead>
            )
        }

        return (
            <div className={ `table ${ bordered ? 'bordered' : '' }` }>
                <table style={{ tableLayout: this.tableLayout }}>
                    { header }

                    <tbody>
                        {
                            dataSource.map((rowData, rowIndex) => {
                                //返回每行元素
                                
                                return (
                                    <tr key="row">
                                        {
                                            columns.reduce((prev, cur, colIndex) => {

                                                const tdStyle = this.getTdStyle(cur);
                                                const tdClass = this.getTdClass(cur);


                                                if (columns[colIndex].render) {
                                                    let domRender = columns[colIndex].render(rowData[cur.dataIndex], rowData, rowIndex);

                                                    if (!domRender) return prev;

                                                    if (React.isValidElement(domRender)) {
                                                        let tdProps = {
                                                            style: tdStyle,
                                                            className: tdClass
                                                        };
                                                        
                                                        prev = prev.concat(
                                                            React.createElement(
                                                                'td', 
                                                                tdProps,
                                                                domRender
                                                            )
                                                        )
                                                    } else {
                                                        if (domRender.props.rowSpan == 0  || domRender.props.colSpan == 0) return prev;

                                                        domRender.props.style = tdStyle;
                                                        domRender.props.className = tdClass;

                                                        prev = prev.concat(React.createElement('td', domRender.props, domRender.children))
                                                    }
                                                    console.log(domRender, typeof domRender, 'domRender')
                                                    
                                                } else {
                                                    prev = prev.concat(<td style={ tdStyle } className={ tdClass }>{ rowData[cur.dataIndex] }</td>);
                                                }

                                                return prev;
                                                
                                            }, [])
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.exact({
            align: PropTypes.oneOf(ALIGN_ENUM),           //设置列的对齐方式
            className: PropTypes.string,                  //列样式类名
            colSpan: PropTypes.number,                    //表头列合并，设置为 0 时，不渲染	
            dataIndex: PropTypes.string,                  //列数据在数据项中对应的路径
            ellipsis: false,                              //超过宽度将自动省略
            filter: PropTypes.func,                       //列表高亮函数,参数分别为当前行值、当前行数据、行索引、返回true则增加filteredClassName,
            filteredClassName: PropTypes.string,          //高亮样式类名
            key: PropTypes.string,                        //React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
            render: PropTypes.func,                       //生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
            title: PropTypes.oneOfType([                  //表格标题	
                PropTypes.string,
                PropTypes.node
            ]),
            width: PropTypes.oneOfType([                  //宽度number是px，string是百分比
                PropTypes.number,            
                PropTypes.string
            ])
        })
    ).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,      //数据数组
    bordered: PropTypes.bool,
    theadClassName: PropTypes.string
}

Table.defaultProps = {
    align: 'start'
}

export default Table;