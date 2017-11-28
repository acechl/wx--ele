let app = getApp();
Page({
    data: {
        winHeight: 0
    },
    onLoad () {

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
    addAddress () {
        wx.redirectTo({
            url: "../addAddress/addAddress"
        })
    }
})