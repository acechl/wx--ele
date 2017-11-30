let app = getApp();
Page({
    data: {
        winHeight: 0,
        address: [],
        selected: "",
        id: ""
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
        wx.getStorage({
            key: "add",
            success: function (res) {
                that.setData({
                    id: res.data
                })
                console.log(that.data.id)
            }
        })
        this.setData({
            selected: app.globalData.selected
        });

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
    },
    goBack () {
        wx.redirectTo({
            url: "../../car/shoppingCar/shoppingCar"
        })
    },
    backAddress (e) {
        wx.setStorage({
            key: "add",
            data: e.currentTarget.dataset.id
        })
        wx.redirectTo({
            url: "../../car/shoppingCar/shoppingCar?id="+e.currentTarget.dataset.id
        })
    }
})