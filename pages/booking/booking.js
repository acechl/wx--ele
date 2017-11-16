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
        sonId: "goods1",
        shoppingCar: {},
        message: "",
        prize: 0,
        qua: 0,
        booking: 0,
        shopCar: [],
        booking: 0,
        allPrize: 0,
        user: ""
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
        let user =  wx.getStorageSync('user');
        let shopCar = wx.getStorageSync('shopCar') || [];
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
                "least": 20,
                "tips":"公告: 欢迎光临，用餐高峰期请提前下单，谢谢",
                "activity":[{"name":"首","detail":"新用户下单立减17元(不与其它活动同享)","color":"rgb(112, 188, 70)"},{"name":"减","detail":"满40减12，满60减20","color":"rgb(240, 115, 115)"},{"name":"折","detail":"新宫保鸡丁套餐,饿了么5折限量钜惠","color":"rgb(240, 115, 115)"},{"name":"特","detail":"11.11吃货狂欢节","color":"rgb(241, 136, 79)"}],
                "average":4.5
            }]
        })
        let goods = Mock.mock({
            "goods": [
                {"name":"热销","id":"goods1","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"豉油皇三丝炒面","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"湾仔艇仔粥","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"金牌虾饺王","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}
                ]},
                {"name":"优惠","id":"goods2","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"豉油皇三丝炒面(鸡蛋、粉丝、火腿肠、牛肉条、胡萝卜、豆芽)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"鲍汁排骨饭套餐","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"葱香鸡饭套餐","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"肠如意","id":"goods3","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"白玉牛腩饭套餐【微辣】","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"鲍汁排骨饭【招牌】","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"黑椒肥牛饭套餐","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"齿留香","id":"goods4","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"鲍汁排骨饭饮料套餐","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"酱爆肉饭套餐【辣】","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"泰国香米饭","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"粥好运","id":"goods5","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"至尊肥牛饭套餐","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"鲜榨金桔汁【特惠价】","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"特惠餐(酱爆肉饭+金桔汁+凤爪)","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"甜蜜蜜","id":"goods6","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"特惠餐(葱香鸡饭+金桔汁)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"特惠餐(卤肉饭+金桔汁)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"超值双人套餐","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"包都德","id":"goods7","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"鲍汁排骨豪华套餐(凤爪)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"鲍汁排骨豪华套餐(豆腐)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"黑椒肥牛豪华套餐(凤爪)","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
                {"name":"焗焗赢","id":"goods8","ad":"大家喜欢吃，才叫真好吃","least":20,"fare":5,"goods":[{"name":"黑椒肥牛豪华套餐(豆腐)","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","last":"9","img":"../../images/good.jpeg"},{"name":"鲍汁排骨饭套餐【招牌】","num":"231","good":"100%","newPrize":"10","oldPrize":"20","discount":"5","d_detail":"每单限1份优惠","img":"../../images/fruit.jpeg"},{"name":"黑椒肥牛饭套餐","num":"231","good":"100%","newPrize":"10","img":"../../images/humbeger.jpeg"}]},
            ]
        })
        let selected = [];
        let shoppingCar = {"title":title};
        goods.goods.forEach((value,index,arr)=>{
            selected.push(false);
        })
        goods.goods.forEach((value,index,arr)=>{
            shoppingCar[value.id] = []
            value.goods.forEach((value1,index1,arr1)=>{
                shoppingCar[value.id].push({'name':value1.name,'num':0,'prize':0});
            })
        })
        selected[0] = true;
        this.setData({
            shop: shop.detail,
            winHeight: winHeight,
            goods: goods,
            selected: selected,
            shoppingCar: shoppingCar,
            shopCar: shopCar,
            user: user
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
            wx.navigateTo({
                url: "../menu/tabMenu/tabMenu?title="+this.data.id
            })
        }
    },
    goCar () {
        wx.navigateTo({
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
    clickDis (e) {//减菜单
        let title = e.currentTarget.dataset.title;
        let id = e.currentTarget.dataset.id;
        let oldPrize = e.currentTarget.dataset.oldprize;
        let newPrize = e.currentTarget.dataset.newprize;
        let shoppingCar = this.data.shoppingCar;
        let shopCar = this.data.shopCar;
        let menu = {};
        let booking = this.data.booking;
        let allPrize = this.data.allPrize;
        for(let key in shoppingCar){
            if(key == id){
                shoppingCar[key].forEach((value,index,arr)=>{
                    if(value.name == title){
                        if(value.num > 1){//当大于第一份时 减去旧价格
                            if(oldPrize){
                                this.setData({
                                    allPrize: allPrize - oldPrize
                                })
                                value.prize = Number(value.prize) - oldPrize;
                            }else {
                                this.setData({
                                    allPrize: allPrize - newPrize
                                })
                                value.prize = Number(value.prize) - newPrize;
                            }
                        }else {//当只有1份时  减去的都是 新价格
                                this.setData({
                                    allPrize: allPrize - newPrize
                                })
                            value.prize = 0
                        }
                        value.num --;
                        this.setData({
                            booking: booking - 1
                        })
                        menu = {"name":value.name,"num":value.num,"prize":value.prize};
                    }
                })
            }
        }
        shopCar.forEach((value,index,arr)=>{//value代表的是每个商家
            if(value.brand == this.data.title){//当找到相同的商店时
                value.menu.forEach((value1,index1,arr1)=>{//value代表的是每个商品
                    if(value1.name == menu.name){//当找到相同的商品时
                        arr1.splice(index1,1)
                        if(menu.num != 0){//当选择的商品的数量不为0 时
                            arr1.push(menu)
                        }   
                    }
                })
            }
            if(value.menu.length == 0) {
                arr.splice(index,1)
            }
        })
        this.setData({
            shoppingCar: shoppingCar,
            shopCar: shopCar 
        })

    },
    clickPlus (e) {//加菜单
        let title = e.currentTarget.dataset.title;
        let id = e.currentTarget.dataset.id;
        let newPrize = e.currentTarget.dataset.newprize;
        let oldPrize = e.currentTarget.dataset.oldprize;
        let shoppingCar = this.data.shoppingCar;
        let menu = {};
        let shopCar = this.data.shopCar;
        let flag = false;
        let booking = this.data.booking;
        let allPrize = this.data.allPrize;
        let least = e.currentTarget.dataset.least;
        let fare = e.currentTarget.dataset.fare;
        for(let key in shoppingCar){
            if(key == id){
                shoppingCar[key].forEach((value,index,arr)=>{
                    if(value.name == title){
                        if(oldPrize){//当有两种价格
                            if(value.num >= 1 ){//当已经买了第一份了
                                this.setData({
                                    allPrize: Number(allPrize) + Number(oldPrize)
                                })
                                value.prize = Number(value.prize) + Number(oldPrize);
                                if(value.num == 1){
                                    this.setData({
                                        message: "该美食一份优惠,超过按原价计算喔"
                                    })
                                }
                            }else {//这一份为第一份
                                this.setData({
                                    allPrize: Number(allPrize) + Number(newPrize)
                                })
                                value.prize =  Number(value.prize) + Number(newPrize);
                            }
                        }else {//当只有一种价格
                            this.setData({
                                allPrize: Number(allPrize) + Number(newPrize)
                            })
                            value.prize = Number(value.prize) + Number(newPrize);
                        }
                        this.setData({
                            booking: booking + 1
                        })
                        value.num ++;
                        menu = {"name":title,"num":value.num,"prize":value.prize};
                    }
                })
            }
        }
        if(shopCar.length == 0){
            shopCar.push({"brand":this.data.title,"menu":[menu],"least":least,"fare":fare})
        }else {
            shopCar.forEach((value,index,arr)=>{//arr 代表的是shopCar
                if(value.brand == this.data.title){//存在这个商店
                    flag = true;
                    value.menu.forEach((value1,index1,arr1)=>{ //arr1代表的是value.menu
                        if(value1.name == menu.name){//存在这个商品
                            arr1.splice(index1,1);
                        }
                    })
                        value.menu.push(menu);
                }
            })
            if(flag == false) {
                shopCar.push({"brand":this.data.title,"menu":[menu],"least":least,"fare":fare})
            }
        }
        app.globalData.shopCar = shopCar;
        this.setData({
            shoppingCar: shoppingCar,
            shopCar: shopCar
        })
        setTimeout(()=>{
            this.setData({
                message: ""
            })
        },3000)
    },
    clickName (e) {
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
    },
    shoppingCar () {
        let that = this;
        wx.setStorage({
            key:"shopCar",
            data: that.data.shopCar
          })
        if(!this.data.user){//没有登录或者注册
            wx.navigateTo({
                url: "../login/login/login?path=shoppingCar"
            })
        }else {
            wx.navigateTo({
                url: "../car/shoppingCar/shoppingCar"
            })
        }
    }
})