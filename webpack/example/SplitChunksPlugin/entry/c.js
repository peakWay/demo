
import Vue from 'vue';

import '../utils/utilC'

import '../styles/c.scss';

window.document.getElementById('.btn').addEventListener('click', function () {
    import(/* webpackChunkName: "d" */ './d')
        .then((d) => {
           window.alert('d加载成功') 
        })
})


new Vue({
    el: '#app',
    render: h => h(App)
})