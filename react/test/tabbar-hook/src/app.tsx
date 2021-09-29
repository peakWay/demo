

import React, {useState} from "react";
import '@/styles/app.scss';
import Tabs from "./components/tabs";
import TabPanel from "./components/tab_panel";


interface AppProps {

}

const App: React.FC<AppProps> = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectChange = (e) => {
        setActiveIndex(parseInt(e.target.value, 10)) 
    }

    const handleChange = (e) => {
        console.log(e.activeIndex, 'sd')
        setActiveIndex(e.activeIndex)

        console.log(activeIndex, 'aa')
    }

    return (
        <>
            <Tabs activeIndex={activeIndex} defaultActiveIndex={0} onChange={handleChange}>
                <TabPanel order={0} tab="tab 1" >第一页</TabPanel>
                <TabPanel order={1} tab="tab 2" >第二页</TabPanel>
                <TabPanel order={2} tab="tab 3" >第三页</TabPanel>
            </Tabs>
            <select value={activeIndex} onChange={handleSelectChange}>
                <option value={0}>tab1</option>
                <option value={1}>tab2</option>
                <option value={2}>tab3</option>
            </select>
            <button onClick={() => console.log(activeIndex)}>点击</button>
        </>
    )
}

export default App;