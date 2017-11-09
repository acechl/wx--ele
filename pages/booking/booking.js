let app = getApp();
let Mock = require("../../utils/mock");
Page({
    data: {
        title: "",
        shop: [],
        path: "",
        id: "",
        look_activity: false,
        winHeight: 0
    },
    onLoad (options) {
        this.setData({
            title: options.title,
            path: options.path,
            id: options.id
        })
    },
    onShow () {
        let winHeight = 0;
        wx.getSystemInfo({
            success (res) {
                winHeight =  res.windowHeight
            }
        })
        let title = this.data.title
        let shop = Mock.mock({
            "detail": [{
                "title":title,
                "img":"../../images/m1.jpeg",
                "send":1,
                "time": 23,
                "fare":5,
                "tips":"公告: 欢迎光临，用餐高峰期请提前下单，谢谢",
                "activity":[{"name":"首","detail":"新用户下单立减17元(不与其它活动同享)","color":"rgb(112, 188, 70)"},{"name":"减","detail":"满40减12，满60减20","color":"rgb(240, 115, 115)"},{"name":"折","detail":"新宫保鸡丁套餐,饿了么5折限量钜惠","color":"rgb(240, 115, 115)"},{"name":"特","detail":"11.11吃货狂欢节","color":"rgb(241, 136, 79)"}],
                "average":4.5
            }]
        })
        this.setData({
            shop: shop.detail,
            winHeight: winHeight
        })
    },
    changeTab (e) {
        console.log(e)
    },
    goBack () {
        console.log("nini")
        if(this.data.path == "index") {
            wx.switchTab({
                url: "../index/index"
            }) 
        }else {
            wx.redirectTo({
                url: "../menu/tabMenu/tabMenu?title="+this.data.id
            })
        }
    },
    goCar () {
        wx.redirectTo({
            url: "../car/shoppingCar/shoppingCar"
        })
    },
    moreActivity () {
        this.setData({
            look_activity: true
        })
    },
    closeActivity () {
        this.setData({
            look_activity: false
        })
    }
})