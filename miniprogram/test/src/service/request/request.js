import vbus from '@/service/vbus/vbus'
import { DOMAIN_MSY, DEFAULT_MEDIA_ID } from '@/config/index.js'
import EventHub from '@/utils/eventhub.js'

export function errorMap (code, extra) {
    let errorData = {
        code: code,
        extra: extra
    },
    msg = ''
    
    switch (code) {
        case -1: 
            msg = '参数不足'
            break
        case -2: 
            msg = '参数类型错误'
            break
    }

    errorData.message = msg

    return errorData
}

export function request(url, options = {}, notice = {}) {

    const defaultOptions = {
        method: 'GET'
    }

    let newOptions = { url: url, ...defaultOptions, ...options }
    newOptions.method = newOptions.method.toUpperCase()

    if( !/http:|https:/.test(url) ) {
        newOptions.url = DOMAIN_MSY + newOptions.url
    }

    let header = {
        authorization: wx.getStorageSync('pocket_token'),
        app: DEFAULT_MEDIA_ID
    }

    if( newOptions.method == 'POST' ) {
        if( !newOptions.header || !newOptions.header['content-type'] ) {
            header['content-type'] = 'application/x-www-form-urlencoded'
        }
    }


    return new Promise((resolve, reject) => {
        wx.request({
            ...newOptions,
            header: header,
            dataType: 'json',
            success: data => {

                if (data && data.data) {
                    let code = data.data.code || data.data.errcode

                    if( code == 301 || code == -301 ) {
                        EventHub.emit('reLogin')
                    }
                }

                resolve(data.data)
            },
            fail: res => {
                reject()
            }
        })
    })
}


export default request