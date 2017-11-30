let app = getApp();
Page({
    data: {
        winHeight: 0,
        address: []
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
        wx.getStorage({
            key: 'address',
            success: function(res) {
                that.setData({
                    address: res.data
                })
            } 
        })
    },
    addAddress () {
        wx.redirectTo({
            url: "../addAddress/addAddress"
        }) 
    },
    editing (e) {
        wx.redirectTo({
            url: "../addAddress/addAddress?id="+e.currentTarget.dataset.id
        })
    }
})