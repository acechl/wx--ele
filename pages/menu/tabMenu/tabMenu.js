let app = new App();
Page({
    data: {
        winHeight: ""
    },
    onLoad (options) {
    },
    onShow () {
        console.log("tabMenu")
        wx.getSystemInfo({
            success (res) {
                console.log(res);
            },
            fail (res) {
                console.log(res)
            }
        })
    },
    lower (e) {
        console.log("下拉");
        console.log(e);
    },
    scrollDown (e) {
        console.log("down");
        console.log(e);
    }
})