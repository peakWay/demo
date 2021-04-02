import React, { Component } from 'react';
import Tabs from './src/first/tabs';
import TabPanel from './src/first/tab_panel';


export default class App extends Component {

    handleChange(e) {
        console.log(e)
    }

    render() {
        return (
            <Tabs defaultActiveIndex={0} onChange={ this.handleChange.bind(this) }>
                <TabPanel key={0} tab={'一'}>第一页</TabPanel>
                <TabPanel key={0} tab={'二'}>第二页</TabPanel>
                <TabPanel key={0} tab={'三'}>第三页</TabPanel>
            </Tabs>
        )
    }
}


