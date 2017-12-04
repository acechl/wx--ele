let app = getApp();
Page({
    data: {
        winHeight: 0
    },
    onShow () {
        let that = this;
        wx.getSystemInfo({
            success (res) {
                that.setData({
                    winHeight: res.windowHeight
                })
            }
        })
    },
    onLoad () {

    }
})