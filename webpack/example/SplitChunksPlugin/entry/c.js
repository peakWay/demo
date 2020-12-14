
import Vue from 'vue';

import '../utils/utilC'

import '../styles/c.scss';

if (module.hot) {
    //热启动下才能按需加载
    window.document.getElementById('btn').addEventListener('click', function () {
        import(/* webpackChunkName: "show" */ '../show')
            .then(({show}) => {
                show('Webpack');
            })
    
    })
}


new Vue({
    el: '#app',
    // render: h => h(App)
})