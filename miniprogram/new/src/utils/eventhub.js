const EventHub = (function () {
    let list = {}
    
    function on (key, cb) {
        if( !list[key] ) {
            list[key] = []
        }
        list[key].push(cb)
    }

    function off (key, cb) {
        let msg = list[key]
        if( !msg ) {
            return console.warn('事件不存在')
        }

        // 无回调, 删除整个事件
        if( !cb ) {
            delete list[key]
        } else {
            let index = msg.findIndex(fn => fn === cb)
            msg.splice(index, 1)
        }
    }

    function emit (key, ...argv) {
        let msg = list[key]
        if( !msg ) {
            return console.warn('事件不存在')
        }

        msg.forEach(cb => {
            cb && cb(...argv)
        })
    }

    return {
        on,
        off,
        emit
    }
})()

export default EventHub