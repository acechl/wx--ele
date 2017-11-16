let app = getApp();
Page({
    data: {
        list: []
    },
    onLoad () {

    },
    onShow () {
        let list = [{"type":["不要辣","少点辣","多点辣"]},{"type":["不要香菜"]},{"type":["不要洋葱"]},{"type":["多点醋"]},{"type":["多点葱"]}];
        this.setData({
            list: list
        })
    },
    goBack () {
        wx.navigateBack({
            delta: 1
        })
    }
})