let Mock = require("../../../utils/mock");
let app = getApp();
Page({
    data: {
        id: "",
        delete: false,
        value: "",
        hot: {},
        history: {},
        search: false,
        classify_left: {},
        classify_right: {},
        rank_type: {},
        shop_attr: {},
        show:{"classify":false,"rank":false,"selection":false},
        selection: [],
        winHeight: 0,
        last: "",
        selected: {},
        choosed: {"send_type":[],"consume":[],"activity_type":[],"shop_attr":[]},
        num: 0,
        intro_food: {},
        search_food: {},
        more: [],
        more_num: []
    },
    onShow () {
        let winHeight = 0;
        wx.getSystemInfo({
            success (res) {
                winHeight = res.windowHeight
            }
        })
        let hot = Mock.mock({
            "type|10": [
                {
                    "name|1": ["猪脚饭","幸福西饼","面","麦当劳","星巴克","鸡蛋仔","手抓饼","薏米","枸杞叶","寿司","东南亚美食","摩打寿司","汉拿山","法国大餐","不二家","泡芙","爆米花","哈根达斯","明治","臊子面","沙县小吃","煎饼","炸酱面","粥"]
                }
            ]
        })
        let classify_left = Mock.mock({
            "type": [
                {"name":"全部商品","num":"9876"},
                {"name":"美食","num":"654"},
                {"name":"快餐便当","num":"234"},
                {"name":"特色菜系","num":"234"},
                {"name":"异国料理","num":"123"},
                {"name":"小吃宵夜","num":"987"},
                {"name":"甜品饮料","num":"435"},
                {"name":"果蔬生鲜","num":"769"},
                {"name":"商店超市","num":"432"},
                {"name":"浪漫鲜花","num":"765"},
                {"name":"医药健康","num":"342"},
                {"name":"早餐","num":"987"},
                {"name":"午餐","num":"564"},
                {"name":"下午茶","num":"998"},
                {"name":"晚餐","num":"887"},
                {"name":"宵夜","num":"775"},
            ]
        });
        let selection = [];
        classify_left.type.forEach((value,index,arr)=>{
            if(index == 0) {
                selection[index] = true;
            }else {
                selection[index] = false
            }
        })
        let classify_right = Mock.mock({
            "type": [
                {"name":"全部","num":"8888"},
                {"name":"简餐便当","num":"6666"},
                {"name":"小吃炸串","num":"3333"},
                {"name":"面食粥店","num":"2222"},
                {"name":"地方菜系","num":"1111"},
                {"name":"日韩料理","num":"888"},
                {"name":"香锅冒菜","num":"666"},
                {"name":"轻食西餐","num":"222"},
                {"name":"汉堡披萨","num":"111"},
            ]
        });
        let rank_type = Mock.mock({
            "type": [
                {"name":"综合排序"},
                {"name":"销量最高"},
                {"name":"起送价最低"},
                {"name":"配送最快"},
            ]
        });
        let send_type = Mock.mock({
            "type": [
                {"name": "蜂鸟专送","id":0}
            ]
        });
        let consume = Mock.mock({
            "type": [
                {"name": "20以下","id":1},
                {"name": "20-40","id":2},
                {"name": "40以上","id":3},
            ]
        });
        let activity_type = Mock.mock({
            "type": [
                {"title":"新","name":"新用户优惠","color":"rgb(112, 188, 70)","id":4},
                {"title":"特","name":"特价商品","color":"rgb(241, 136, 79)","id":5},
                {"title":"减","name":"下单立减","color":"rgb(240, 115, 115)","id":6},
                {"title":"赠","name":"赠品优惠","color":"rgb(60, 199, 145)","id":7},
                {"title":"返","name":"下单返券","color":"rgb(255, 114, 57)","id":8},
                {"title":"领","name":"进店领劵","color":"rgb(255, 172, 42)","id":9},
            ]
        });
        let shop_attr = Mock.mock({
            "type": [
                {"title":"品","name":"品牌商家","color":"rgb(63, 189, 230)","id":10},
                {"title":"保","name":"外卖保","color":"rgb(153, 153, 153)","id":11},
                {"title":"新","name":"新店","color":"rgb(232, 132, 45)","id":12},
                {"title":"票","name":"开发票","color":"rgb(153, 153, 153)","id":13},
                {"title":"付","name":"在线支付","color":"rgb(255, 78, 0)","id":14}
            ]
        });
        let selected = {"send_type":[],"consume":[],"activity_type":[],"shop_attr":[]};
        send_type.type.forEach((value,index,arr)=>{
            selected.send_type[index] = undefined;
        })
        consume.type.forEach((value,index,arr)=>{
            selected.consume[index] = undefined;
        })
        activity_type.type.forEach((value,index,arr)=>{
            selected.activity_type[index] = undefined;
        })
        shop_attr.type.forEach((value,index,arr)=>{
            selected.shop_attr[index] = undefined;
        })
        let history = wx.getStorageSync("history") || {"type":[]};
        this.setData({
            hot: hot,
            history: history,
            classify_left: classify_left,
            classify_right: classify_right,
            rank_type: rank_type,
            send_type: send_type,
            consume: consume,
            activity_type: activity_type,
            shop_attr: shop_attr,
            selection: selection,
            winHeight: winHeight,
            selected: selected
        });
        
    },
    onLaunch (options) {
        this.setData({
            id: option.id
        })
    },
    searchFocus () {
        if(this.data.value.length > 0) {
            this.setData({
                delete: true
            })
        }else {
            this.setData({
                delete: false
            })
        }
    },
    searchBlur () {
        this.setData({
            delete: false
        })
    },
    searchInput (e) {
        if(e.detail.value.length == 0){
            this.setData({
                delete: false,
                value: e.detail.value,
                search: false
            })
        }else {
            this.setData({
                delete: true,
                value: e.detail.value,
            })
        }
    },
    searchDelete () {
        this.setData({
            value: "",
            search: false
        })
    },
    searchItem () {
        let flag = false;
        if(this.data.value.length == 0) {
            return;
        }
        let history = wx.getStorageSync("history") || {"type": []};
        console.log(history.type)
        history.type.forEach((value,index,arr)=>{
             if(this.data.value == value.name){
                flag = true;
            }
        })
        if(flag == false){
            history.type = history.type.concat({"name":this.data.value});
        }
        wx.setStorageSync("history",history)
        this.setData({
            history: history,
            search: true
        })
        this.searchFood();
    },
    searchItem1 (e) {
        let flag = false;
        let history = wx.getStorageSync("history") || {"type": []}
        history.type.forEach((value,index,arr)=>{
            if(e.currentTarget.dataset.value == value.name){
                flag = true;
            }
        })
        if(flag == false){
            history.type = history.type.concat({"name":e.currentTarget.dataset.value})
        }
        wx.setStorageSync("history",history)
        this.setData({
            history: history,
            search: true,
            value: e.currentTarget.dataset.value
        })
        this.searchFood();
    },
    historyEmpty () {
        wx.setStorageSync("history",{"type":[]})
        this.setData({
            history: {}
        })
    },
    goBack () {
        wx.switchTab({
            url: "../../index/index"
        })
    },
    select_tap (e) {
        let that = this;
        let show = this.data.show;
        if(this.data.last != e.currentTarget.dataset.attr) {
            for(let key in show){
                show[key] = false;
            }
            show[e.currentTarget.dataset.attr] = true;
            this.setData({
                show: show,
                last: e.currentTarget.dataset.attr
            })
        }else {
            for(let key in show) {
                show[key] = false
            }
            this.setData({
                show: show,
                last: ""
        })
        }
        
    },
    classify_select (e) {
        let selection = this.data.selection;
        selection.forEach((value,index,arr)=>{
            selection[index] = false;
        })
        selection[e.currentTarget.dataset.index] = true;
        this.setData({
            selection: selection
        })
    },
    go_select () {
        let show = this.data.show;
        for(let key in show) {
            show[key] = false;
        }
        this.setData({
            show: show
        })
    },
    itemTap (e) {
        let choosed = this.data.selected;
        if(e.currentTarget.dataset.attr != "shop_attr"){//当为单选时
            if(choosed[e.currentTarget.dataset.attr].indexOf(e.currentTarget.dataset.id) != -1){//存在
                choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = undefined;
            }else {//不存在
                choosed[e.currentTarget.dataset.attr].forEach((value,index,arr)=>{
                    choosed[e.currentTarget.dataset.attr][index] = undefined;
                })
                choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = e.currentTarget.dataset.id
            }
        }else {//当为多选时
            if(choosed[e.currentTarget.dataset.attr].indexOf(e.currentTarget.dataset.id) != -1){//存在
                choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = undefined;
            }else {//不存在
                choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = e.currentTarget.dataset.id
            }
        }
        let num = 0;
        for(let key in choosed){
            choosed[key].forEach((value,index,arr)=>{
                if(value != undefined){
                    num ++;
                }
            })
        }
        this.setData({
            selected: choosed,
            num: num
        })

    },
    clearTap() {
        let selected = this.data.selected;
        for(let key in selected){
            selected[key].forEach((value,index,arr)=>{
                arr[index] = undefined;
            })
        }
        this.setData({
            selected: selected,
            num: 0
        })
    },
    searchFood () {
        let intro_food = Mock.mock({
            "type|12": [
                {
                    "name|1": ["蜂鸟专送","鲜香","三文鱼","鳗鱼","咸香","果味","甜","鲮鱼","芒果","玉米","墨鱼","带子","北极贝","海蜇","拉面","青口","清酒","梅子酒","海草","八爪鱼"]
                }
            ]
        })
        let search_food = Mock.mock({
            "type": [
                {"name":"神户料理.陆羽茶居","average":4.7,"fare":20,"fare1":5,"distance":'2.00km',"time":38,"food":[{"name":"酱烧玻璃虾寿司","num":210,"good":"92%","prize":"7.2","img":"../../../images/good.jpeg"},{"name":"鳗鱼寿司","num":211,"good":"92%","prize":"7.2","img":"../../../images/fruit.jpeg"},{"name":"北极贝寿司","num":212,"good":"92%","prize":"7.2","img":"../../../images/breakfast.jpeg"},{"name":"三文鱼寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/cake.jpeg"},{"name":"海草寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/humbeger.jpeg"},{"name":"左口寿司","num":214,"good":"92%","prize":"7.2","img":"../../../images/drink.jpeg"}],"img":"../../../images/m2.png"},
                {"name":"宫崎寿司","average":4.7,"fare":20,"fare1":5,"distance":'2.00km',"time":38,"food":[{"name":"酱烧玻璃虾寿司","num":210,"good":"92%","prize":"7.2","img":"../../../images/good.jpeg"},{"name":"鳗鱼寿司","num":211,"good":"92%","prize":"7.2","img":"../../../images/fruit.jpeg"},{"name":"北极贝寿司","num":212,"good":"92%","prize":"7.2","img":"../../../images/breakfast.jpeg"},{"name":"三文鱼寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/cake.jpeg"},{"name":"海草寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/humbeger.jpeg"}],"img":"../../../images/m3.jpeg"},
                {"name":"藤原和寿司","average":4.7,"fare":20,"fare1":5,"distance":'2.00km',"time":38,"food":[{"name":"酱烧玻璃虾寿司","num":210,"good":"92%","prize":"7.2","img":"../../../images/good.jpeg"},{"name":"鳗鱼寿司","num":211,"good":"92%","prize":"7.2","img":"../../../images/fruit.jpeg"},{"name":"北极贝寿司","num":212,"good":"92%","prize":"7.2","img":"../../../images/breakfast.jpeg"},{"name":"三文鱼寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/cake.jpeg"}],"img":"../../../images/m5.jpeg"},
            ]
        })
        let more = [];
        let more_num = []
        search_food.type.forEach((value,index,arr)=>{
            let num = value.food.length-2;
            more.push({"name":"展开更多商品"+num+"个","height":"170px"});
            more_num.push(num);
        })
        this.setData({
            intro_food: intro_food,
            search_food: search_food,
            more: more,
            more_num: more_num
        })
    },
    goods_fade (e) {
        console.log(e);
        let more = this.data.more;
        let more_num = this.data.more_num;
        more.forEach((value,index,arr)=>{
            if(index == e.currentTarget.dataset.index){
                if(value.height == "auto"){
                    //展开了 需要收起来
                    arr[index] = {"name":"展开更多商品"+more_num[index]+"个","height":"170px"}
                }else {
                    //收起来了 需要展开
                    arr[index] = {"name":"收起","height":"auto"}
                }
            }
        })
        this.setData({
            more: more
        })
    }
})