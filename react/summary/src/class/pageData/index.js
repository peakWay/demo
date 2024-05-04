import React from 'react'

const pageData = {
    1: '这是第一页数据',
    2: '这是第二页数据'
}

export default  class ClassPageData extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            data: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        const {page} = this.state
        console.log("当前页", page)
        const data = pageData[page]
        this.setState({
            data
        })
    }

    nextPage = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.fetchData()
        })
    }

    render () {
        const {page, data} = this.state
        return (
            <div>
                当前页码：{page}<button onClick={this.nextPage}>下一页</button>
                <div>{data}</div>
            </div>
        )
    }
}