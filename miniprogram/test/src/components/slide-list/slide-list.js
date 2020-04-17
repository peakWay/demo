
Component({
    properties: {
        list: Array,
        openWidth: Number,
        closeWidth: Number,
        minMoveDistance: Number,
        height: Number,
        prevMargin: Number
    },

    data: {
        offsetX: 0,
        currentItem: 0,
        transition: false,
        diffWidth: null,
        visible: false
    },

    startX: null,

    attached () {
        if(!(this.data.list && this.data.openWidth && this.data.closeWidth && this.data.minMoveDistance && this.data.height)) return console.error('slide-list: params error')

        this.setData({
            diffWidth: this.data.openWidth - this.data.closeWidth,
            visible: true
        })

    },

    methods: {
        onTouchStart (e) {
            this.startX = e.touches[0].pageX
        },
    
        onTouchMove (e) {
            let diff = e.touches[0].pageX - this.startX
            if (this.data.currentItem == 0 && diff > 30) return
    
            console.log('touchmove', e.touches[0].pageX - this.startX)
            this.setData({
                offsetX: diff * 2
            })
        },
    
        onTouchEnd (e) {
            this.setData({
                transition: true
            })
            setTimeout(() => {
                let mathMethod = ''
                if (Math.abs(this.data.offsetX) % this.data.diffWidth < this.data.minMoveDistance) {
                    mathMethod = this.data.offsetX > 0 ? 'floor' : 'ceil'
                } else {
                    mathMethod = this.data.offsetX > 0 ? 'ceil' : 'floor'
                }
                let diffItemCount = Math[`${ mathMethod }`](this.data.offsetX / this.data.diffWidth)
                let resultItem = this.data.currentItem - diffItemCount
                this.setData({
                    offsetX: 0,
                    currentItem: resultItem > 0 ? Math.min(this.data.list.length - 1, resultItem) : 0
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
    }
})