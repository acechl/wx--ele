let app = getApp();
Page({
    data: {
        winHeight: 0,
        login: ""
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
            key: "user",
            success (res) {
                that.setData({
                    login: res.data
                })
            }
        })
    },
    onLoad () {

    },
    quitLogin () {

    },
    passwordChange () {
        wx.redirectTo({
            url: "../edit/passwordEdit/passwordEdit"
        })
    },
    phoneChange () {
        wx.redirectTo({
            url: "../edit/phoneEdit/phoneEdit"
        })
    },
    nickNameChange () {
        wx.redirectTo({
            url: "../edit/nickNameEdit/nickNameEdit"
        })
    }
})