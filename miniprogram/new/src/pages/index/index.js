//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            {
                avatar: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG',
                nickname: '怪老头',
                sex: 1,
                age: 20,
                star: '处女座',
                city: '杭州',
                countdown: '2.20.19'
            },
            {
                avatar: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG',
                nickname: '怪老头',
                sex: 1,
                age: 20,
                star: '处女座',
                city: '杭州',
                countdown: '2.20.19'
            }
            ,
            {
                avatar: 'https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG',
                nickname: '怪老头',
                sex: 1,
                age: 20,
                star: '处女座',
                city: '杭州',
                countdown: '2.20.19'
            }
        ],

        currentSwiper: 0,
        offsetX: 0,

        offsetX1: 0,
        currentItem: 0,
        transition: false,
        minMoveDistance: 60,

        diffWidth: 300 - 120
    },

    startX: null,
    startX1: null,
    
    onLoad () {

    },

    handleSwiperChange (e) {
        this.setData({
            currentSwiper: e.detail.currentSwiper
        })
    },

    handleSwiperChangeByIndex (e) {
        this.setData({
            currentSwiper: e.currentTarget.dataset.current
        })
    },

    handleSwiperTransition (e) {
        console.log(e)
    },

    onTouchStart (e) {
        console.log('touchstart')
        this.startX = e.touches[0].pageX
    },

    onTouchMove (e) {
        if (this.data.currentSwiper == 0) return

        console.log('touchmove', e.touches[0].pageX - this.startX)
        this.setData({
            offsetX: e.touches[0].pageX - this.startX
        })
    },

    onTouchEnd (e) {
        console.log('touchend')
        this.setData({
            offsetX: 0
        })
    },

    onTouchStart1 (e) {
        console.log('touchstart')
        this.startX1 = e.touches[0].pageX
    },

    onTouchMove1 (e) {
        let diff = e.touches[0].pageX - this.startX1
        if (this.data.currentItem == 0 && diff > 30) return

        console.log('touchmove', e.touches[0].pageX - this.startX1)
        this.setData({
            offsetX1: diff * 1.8
        })
    },

    onTouchEnd1 (e) {
        console.log('touchend', e)
        this.setData({
            transition: true
        })
        setTimeout(() => {
            let mathMethod = ''
            if (Math.abs(this.data.offsetX1) % this.data.diffWidth < this.data.minMoveDistance) {
                mathMethod = this.data.offsetX1 > 0 ? 'floor' : 'ceil'
            } else {
                mathMethod = this.data.offsetX1 > 0 ? 'ceil' : 'floor'
            }
            let diffItemCount = Math[`${ mathMethod }`](this.data.offsetX1 / this.data.diffWidth)
            console.log(diffItemCount, this.data.offsetX1)
            let resultItem = this.data.currentItem - diffItemCount
            this.setData({
                offsetX1: 0,
                currentItem: resultItem > 0 ? Math.min(this.data.imgUrls.length - 1, resultItem) : 0
            })
            setTimeout(() => {
                this.setData({
                    transition: false
                })
            }, 300)
        }, 0)
    },

    handleChangeItemByIndex (e) {
        this.setData({
            transition: true
        })
        setTimeout(() => {
            this.setData({
                currentItem: e.currentTarget.dataset.current
            })
            setTimeout(() => {
                this.setData({
                    transition: false
                })
            }, 300)
        }, 0)
    }
  
})
