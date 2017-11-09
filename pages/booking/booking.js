let app = getApp();
let Mock = require("../../utils/mock");
Page({
    data: {
        title: "",
        shop: [],
        path: "",
        id: "",
        look_activity: false,
        winHeight: 0,
        current: 0,
        goods: {},
        selected: [],
        sonId: ""
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
        let goods = Mock.mock({
            "goods": [
                {"name":"热销","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}
                ]},
                {"name":"优惠","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面(鸡蛋、粉丝、火腿肠、牛肉条、胡萝卜、豆芽)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"肠如意","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"齿留香","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"粥好运","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"甜蜜蜜","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"包都德","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"焗焗赢","ad":"大家喜欢吃，才叫真好吃","goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
            ]
        })
        let selected = []
        goods.goods.forEach((value,index,arr)=>{
            selected.push(false);
        })
        selected[0] = true;
        this.setData({
            shop: shop.detail,
            winHeight: winHeight,
            goods: goods,
            selected: selected
        })
    },
    changeTab (e) {
    },
    goBack () {
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
    },
    changeTab (e) {
        this.setData({
            current: e.detail.current
        })
    },
    clickTab (e) {
        this.setData({
            current: e.currentTarget.dataset.current
        })
    },
    clickDis () {

    },
    clickPlus () {

    },
    clickName (e) {
        console.log(e.currentTarget.dataset.id)
        let selected = this.data.selected;
        selected.forEach((value,index,arr)=>{
            if(e.currentTarget.dataset.index == index) {
                selected[index] = true;
            }else {
                selected[index] = false;
            }
        })
        this.setData({
            selected: selected,
            sonId: e.currentTarget.dataset.id
        })
    }
})