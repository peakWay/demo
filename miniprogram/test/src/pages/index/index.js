//index.js
//获取应用实例
// import styles from '@/app.scss'

const app = getApp()

Page({

    data: {
        change: false
    },

    onLoad () {
        console.log(this)

    },
    

    handleChange() {
        this.setData({
            change: true
        })
    }
  
})
