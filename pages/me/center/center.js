let app = getApp();
Page({
    data: {
        winHeight: 0,
        login: "",
        pic: ""
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
    },
    quitLogin () {
        wx.setStorage({
            key: "user",
            data: ""
        })
        wx.switchTab({
            url: "../../me/me"
        })
    },
    picChange () {
        let login = this.data.login;
        let that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original","compressed"],
            sourceType: ['album','camera'],
            success (res) {
                login.pic = res.tempFilePaths[0];
                that.setData({
                    login: login
                })
                wx.setStorage({
                    key: "user",
                    data: login
                })
            }
        })
    }
})