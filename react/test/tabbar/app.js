import GroupAnimation from '@/animation/group';
import OpacityAnimation from '@/animation/opacity';
import ScaleAnimation from '@/animation/scale';
import ScaleAndSliderAnimation from '@/animation/scale_and_slider';
import SlideAnimation from '@/animation/slider';
import React, { Component } from 'react';
import Tabs from './src/first/tabs';
import TabPanel from './src/first/tab_panel';
import './src/styles/style.scss';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.hidden = this.hidden.bind(this);

        this.state = {
            activeIndex: 0,
            showGroupAnimation: false
        }
    }

    handleChange({activeIndex}) {

        this.setState({
            activeIndex
        })
    }

    handleChangeSelect(e) {
        console.log(e)
        this.setState({
            activeIndex: Number(e.target.value)
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showGroupAnimation: true
            })
        }, 1000)
    }

    hidden() {
        this.setState({
            showGroupAnimation: false
        })
    }

    render() {

        const selectedValue = this.state.activeIndex.toString()
        return (
            <React.Fragment>
            {/* defaultActiveIndex={0} */}
                <Tabs activeIndex={this.state.activeIndex} defaultActiveIndex={0}  onChange={ this.handleChange.bind(this) }>
                    <TabPanel order={0} tab={'一'}>第一页</TabPanel>
                    <TabPanel order={1} tab={'二'}>第二页</TabPanel>
                    <TabPanel order={2} tab={'三'}>第三页</TabPanel>
                </Tabs>
                <select value={selectedValue} onChange={this.handleChangeSelect}>
                    <option value={0}>tab0</option>
                    <option value={1}>tab1</option>
                    <option value={2}>tab2</option>
                </select>
                <OpacityAnimation />
                <ScaleAnimation />
                <SlideAnimation />
                <ScaleAndSliderAnimation />
                {
                    <GroupAnimation>
                        { this.state.showGroupAnimation ? <img src="https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG" onClick={this.hidden} /> : null }
                    </GroupAnimation>
                }
            </React.Fragment>
        )
    }
}


