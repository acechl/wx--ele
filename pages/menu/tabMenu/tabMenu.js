let app = new App();
Page({
    data: {
        winHeight: ""
    },
    onLaunch (options) {
    },
    onShow () {
        wx.getSystemInfo({
            success (res) {
            },
            fail (res) {
            }
        })
    },
    lower (e) {
    },
    scrollDown (e) {
    }
})