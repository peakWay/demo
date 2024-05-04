
import { registerMicroApps, runAfterFirstMounted, initGlobalState, setDefaultMountApp, start } from 'qiankun'
import './index.less'

// import render from './render/ReactRender'
import render from './render/VueRender'


// /**
//  * Step1 初始化应用
//  */
render(true)

/**
 * Step2 注册子应用
 * 1. 子应用注册
 * 2. 父子状态通信
 */
const loader = loader => render(loader)

registerMicroApps([
    {
        name: 'vue2',
        entry: 'http://localhost:3030',
        container: '#subapp-viewport',
        loader,
        activeRule: '/vue2'
    },
    {
        name: 'vue3',
        entry: 'http://localhost:3031',
        container: '#subapp-viewport',
        loader,
        activeRule: '/vue3'
    },
    {
        name: 'react',
        entry: 'http://localhost:3032',
        container: '#subapp-viewport',
        loader,
        activeRule: '/react'
    },
], {
    beforeLoad: [
        app => {
            console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
    ],
    beforeMount: [
        app => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
    ],
    afterUnmount: [
        app => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
    ],
})

const {
    onGlobalStateChange,
    setGlobalState
} = initGlobalState({
    user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[主应用收到状态变化]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});


/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/vue');

/**
 * Step4 启动
 */
start()

runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
})