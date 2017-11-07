let bmap = require("../../utils/bmap-wx.min");
let Mock = require("../../utils/mock")
let app = getApp();
Page({
    data: {
        address: app.globalData.address,
        latitude: "",
        longitude: "",
        type: [],
        introduce: [],
        intro1: [],
        intro2: [],
        a_top: [],
        a_bottom: [],
        winHeight: 0,
        position: "",
        top: 10,
        bottom: 10,
        height: 50,
        m_top: 0,
        shop_intro: [],
        shop_intro1: [],
        shop_intro2: [],
        max_height: 80,
        flag: [],
        page: 1,
        iden: false,
        meg: ""
    },
    onLaunch () {//当小程序初始化完成时，全局触发一次
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
        let shop_intro = Mock.mock({
             "type|2": [
                {"names":"广州麦当劳信德商务诚信店","average":"4.7","num":"333","fare":"0","fare1":"15","distance":"1.2km","time":"38","new":"7","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"},{"name":"[星球大战]星球金枕超值双人餐首发","word":"星","color":"rgb(241, 136, 79)"},{"name":"249元超值[4人新品咖喱虾蟹狂欢套餐]","word":"新","color":"rgb(241, 136, 79)"},{"name":"[双十一]王牌5折工作餐","word":"爆","color":"rgb(241, 136, 79)"}],"brand":"1","img":"../../images/m1.jpeg","bao":"1","piao":"1","send":"1","good":"1","number":6},
                {"names":"海银海记牛肉火锅","average":"3.4","num":"444","fare":"10","fare1":"25","distance":"2.2km","time":"39","new":"8","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"},{"name":"[星球大战]星球金枕超值双人餐首发","word":"星","color":"rgb(241, 136, 79)"},{"name":"249元超值[4人新品咖喱虾蟹狂欢套餐]","word":"新","color":"rgb(241, 136, 79)"}],"brand":"1","img":"../../images/m2.png","piao":"1","send":"1","number":5},
                {"names":"汉拿山韩式料理","average":"2.6","num":"555","fare":"20","fare1":"35","distance":"3.2km","time":"40","new":"9","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"},{"name":"[星球大战]星球金枕超值双人餐首发","word":"星","color":"rgb(241, 136, 79)"}],"brand":"0","img":"../../images/m3.jpeg","bao":"1","send":"1","good":"1","number":4},
                {"names":"摩打寿司黄沙店","average":"4.8","num":"666","fare":"30","fare1":"45","distance":"4.2km","time":"41","new":"10","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"}],"name":"1","img":"../../images/m4.png","send":"1","number":3},
                {"names":"情愿鸡粥","average":"2.9","num":"777","fare":"40","fare1":"55","distance":"5.2km","time":"42","new":"11","brand":"0","img":"../../images/m5.jpeg","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"}],"good":"1","number":1}
            ]
        })
        this.changeLength(shop_intro.type);
        wx.getSystemInfo({
            success (res) {
                console.log(res.windowHeight)
                that.setData({
                    winHeight: res.windowHeight
                })
            }
        });
        this.setData({
            type: data,
            intro1: introduce.type.slice(0,8),
            intro2: introduce.type.slice(9),
            a_top: a_top,
            a_bottom: a_bottom,
            shop_intro: shop_intro,
            address: app.globalData.address
        });
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
        wx.redirectTo({
            url: "../menu/tabMenu/tabMenu?id="+ e.currentTarget.id
        })
    },
    clickWidth (e) {
    },
    scrollDown (e) {
        if(e.detail.scrollTop >= 26) {
            this.setData({
                position: "fixed",
                top: 10,
                bottom: 10,
                height: 50,
                m_top: 50
            })
        }else {
            this.setData({
                position: "",
                top: 10,
                bottom: 10,
                height: 50,
                m_top: 0
            })
        }
    },
    scrollToLower (e) {
        let shop1_intro = Mock.mock({
            "type|2": [
                {"names":"广州麦当劳信德商务诚信店","average":"4.7","num":"333","fare":"0","fare1":"15","distance":"1.2km","time":"38","new":"7","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"},{"name":"[星球大战]星球金枕超值双人餐首发","word":"星","color":"rgb(241, 136, 79)"},{"name":"249元超值[4人新品咖喱虾蟹狂欢套餐]","word":"新","color":"rgb(241, 136, 79)"},{"name":"[双十一]王牌5折工作餐","word":"爆","color":"rgb(241, 136, 79)"}],"brand":"1","img":"../../images/m1.jpeg","bao":"1","piao":"1","send":"1","good":"1","numner":6},
                {"names":"海银海记牛肉火锅","average":"3.4","num":"444","fare":"10","fare1":"25","distance":"2.2km","time":"39","new":"8","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"},{"name":"[星球大战]星球金枕超值双人餐首发","word":"星","color":"rgb(241, 136, 79)"},{"name":"249元超值[4人新品咖喱虾蟹狂欢套餐]","word":"新","color":"rgb(241, 136, 79)"}],"brand":"1","img":"../../images/m2.png","piao":"1","send":"1","number":5},
                {"names":"汉拿山韩式料理","average":"2.6","num":"555","fare":"20","fare1":"35","distance":"3.2km","time":"40","new":"9","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"},{"name":"[星球大战]星球金枕超值双人餐首发","word":"星","color":"rgb(241, 136, 79)"}],"brand":"0","img":"../../images/m3.jpeg","bao":"1","send":"1","good":"1","number":4},
                {"names":"摩打寿司黄沙店","average":"4.8","num":"666","fare":"30","fare1":"45","distance":"4.2km","time":"41","new":"10","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"},{"name":"[99]元超值套餐","word":"超","color":"rgb(240, 115, 115)"},{"name":"满40减30","word":"折","color":"rgb(240, 115, 115)"}],"brand":"1","img":"../../images/m4.png","send":"1","number":3},
                {"names":"情愿鸡粥","average":"2.9","num":"777","fare":"40","fare1":"55","distance":"5.2km","time":"42","new":"11","brand":"0","img":"../../images/m5.jpeg","discount":[{"name":"新用户下单立减17元","word":"首","color":"rgb(112, 188, 70)"}],"good":"1","number":1}
            ]
        });
        if(this.data.inden == false) {
            return false;
        }
        this.setData({
            inden: false,
            meg: "正在加载中..."
        })
        if(this.data.page >= 3) {
            this.setData({
                meg: "亲，没有可以推荐的商家了"
            })
            return false;
        }
        let shop_intro = this.data.shop_intro.type.concat(shop1_intro.type)
        let that = this;
        setTimeout(function () {
            that.setData({
                shop_intro: {"type":shop_intro}
            })
            that.changeLength(shop_intro);
            that.setData({
                page: that.data.page + 1,
                inden: true,
                meg: ""
            })
        },500)
    },
    tapRotate (e) {
        let data_index = e.currentTarget.dataset.index;
        let flag = this.data.flag;
        flag.forEach(function(value,index,arr){
            if(index == data_index){
                if(value.deg == 0){ //当为0时 释放
                    arr[index] = {"deg":180,"height":"auto"}
                }else {//当为180时 回收
                    arr[index] = {"deg":0,"height":"80rpx"}
                }
            }
        })
        this.setData({
            flag: flag
        })
    },
    changeLength (shop_intro) {
        let flag = [];
        shop_intro.forEach(function(value,index,arr){
            flag[index] = {"deg":0,"height": "80rpx"};
        })
        this.setData({
            flag: flag
        })
    }
 })