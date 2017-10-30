let bmap = require("../../utils/bmap-wx.min");
let Mock = require("../../utils/mock")
let app = getApp();
Page({
    data: {
        address: "未能获取地址...",
        latitude: "",
        longitude: "",
        type: [],
        introduce: [],
        intro1: [],
        intro2: [],
        a_top: [],
        a_bottom: []
    },
    onLoad () {//当小程序初始化完成时，全局触发一次
    },
    onShow () {//当小程序启动 或者从后台进入前台时显示
        let that = this;
        let data = Mock.mock({
            "type|2": [{"name":"必胜客"},{"name":"海记牛肉火锅"},{"name":"哈根达斯"},{"name":"汉拿山"},{"name":"摩打寿司"}]
        })
        let introduce = Mock.mock({
            "type": [
                {"img":"../../images/good.jpeg","title": "美食"},
                {"img":"../../images/drink.jpeg","title": "甜品饮品"},
                {"img":"../../images/super.jpeg","title": "商超便利"},
                {"img":"../../images/breakfast.jpeg","title": "预定早餐"},
                {"img":"../../images/fruit.jpeg","title": "果蔬生鲜"},
                {"img":"../../images/shop.jpeg","title": "新店特惠"},
                {"img":"../../images/onTime.jpeg","title": "准时达"},
                {"img":"../../images/night.jpeg","title": "夜宵"},
                {"img":"../../images/introduce.jpeg","title": "土豪推荐"},
                {"img":"../../images/humbeger.jpeg","title": "汉堡薯条"},
                {"img":"../../images/soup.jpeg","title": "包子粥店"},
                {"img":"../../images/cake.jpeg","title": "鲜花蛋糕"},
                {"img":"../../images/hot.jpeg","title": "麻辣烫"},
                {"img":"../../images/四川.jpeg","title": "川湘菜"},
                {"img":"../../images/pizza.jpeg","title": "披萨意面"},
                {"img":"../../images/ricce.jpeg","title": "日韩料理"},
            ]
        })
        let a_top = Mock.mock({
            type: [
                    {"title":"限量抢购","introduce":"超值美味9.9元起","num":"101人正在抢>","img":"../../images/a_left.webp","color1":"#e81919",'color2':"#e81919"},
                    {"title":"热卖套餐","introduce":"销量最高,好评最多","num":"TOP 100>","img":"../../images/a_right.webp","color1":"black","color2":"#af8260"}
                ]
        })
        let a_bottom = Mock.mock({
            type: [
                {"title":"天天特价","introduce":"低至1折","img":"../../images/b_left.webp","color1":"#ff5339","color2":"#ffa89b"},
                {"title":"乐享鲜果","introduce":"鲜果乐享7折","img":"../../images/b_center.webp","color1":"#777","color2":"#bbb"},
                {"title":"品质优选","introduce":"尖货来袭","img":"../../images/b_right.webp","color1":"#777","color2":"#bbb"}
            ]
        })
        this.setData({
            type: data,
            intro1: introduce.type.slice(0,8),
            intro2: introduce.type.slice(9),
            a_top:a_top,
            a_bottom: a_bottom
        })
        let BMap = new bmap.BMapWX({
            ak: "4X4uPt3XfLVMg18PlnEQxYvbpz1GFWK2"
        })
        BMap.search({
            fail (data) {
            },
            success (data) {
                let wxMarkerData =  data.wxMarkerData;
                that.setData({
                    address: wxMarkerData[1].address
                })
            }
        })
        wx.getLocation({
            type: "wgs84",
            success (res) {
                wx.request({
                    url: "https://api.map.baidu.com/geocoder/v2/",
                    data: {
                        location: res.latitude + "," + res.longitude,
                        output: "json",
                        ak: "4X4uPt3XfLVMg18PlnEQxYvbpz1GFWK2"
                    },
                    success (res) {
                        let add = res.data.result.addressComponent.city.substr(0,res.data.result.addressComponent.city.length-1);
                    }
                })
            }
        })
    },
    onHide () {//当小程序从前台进入后台时

    },
    onError () {//当小程序发生脚本错误时

    },
    clickAddress () {
        wx.redirectTo({
            url: "../address/setAddress/setAddress"
        })
    },
    clickMenu () {
        wx.redirectTo({
            url: "../menu/makeMenu/makeMenu"
        })
    },
    clickType (e) {
        console.log(e)
        wx.redirectTo({
            url: "../menu/tabMenu/tabMenu?id="+ e.currentTarget.id
        })
    },
    clickWidth (e) {
        console.log(e)
    },
    scrollDown (e) {
        console.log(e);
    }
 })