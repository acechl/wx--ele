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
        classify_left: app.globalData.classify_left,
        classify_right: app.globalData.classify_right,
        rank_type: app.globalData.rank_type,
        shop_attr: app.globalData.shop_attr,
        consume: app.globalData.consume,
        activity_type: app.globalData.activity_type,
        send_type: app.globalData.send_type,
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
        more_num: [],
        winHeight: 0,
        times: 1,
        meg: "",
        state: false,
        nothing: false
    },
    onLoad (options) {
        if(options.id){
            this.setData({
                value: options.id,
                search: true
            })
            this.searchFood();
        }
    },
    onShow () {
        let winHeight = 0;
        wx.getSystemInfo({
            success (res) {
                winHeight = res.windowHeight
            }
        });
        let hot = Mock.mock({
            "type|10": [
                {
                    "name|1": ["猪脚饭","幸福西饼","面","麦当劳","星巴克","鸡蛋仔","手抓饼","薏米","枸杞叶","寿司","东南亚美食","摩打寿司","汉拿山","法国大餐","不二家","泡芙","爆米花","哈根达斯","明治","臊子面","沙县小吃","煎饼","炸酱面","粥"]
                }
            ]
        })
        let classify_left = this.data.classify_left;
        let classify_right = this.data.classify_right;
        let rank_type = this.data.rank_type;
        let shop_attr = this.data.shop_attr;
        let consume = this.data.consume;
        let activity_type = this.data.activity_type;
        let send_type = this.data.send_type;
        let selection = [];
        classify_left.type.forEach((value,index,arr)=>{
            if(index == 0) {
                selection[index] = true;
            }else {
                selection[index] = false
            }
        })
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
            selection: selection,
            winHeight: winHeight,
            selected: selected
        });
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
                search: false,
                nothing: false
            })
        }else {
            if(e.detail.value != "什么鬼"){
                this.setData({
                    delete: true,
                    value: e.detail.value,
                    nothing: false,
                    search: false
                })
            }else {
                this.setData({
                    delete: true,
                    value: e.detail.value,
                    nothing: true,
                    search: false
                })
            }
            
        }
    },
    searchDelete () {
        this.setData({
            value: "",
            search: false,
            nothing: false
        })
    },
    searchItem () {
        let flag = false;
        if(this.data.value.length == 0) {
            return;
        }
        let history = wx.getStorageSync("history") || {"type": []};
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
        if(this.data.value == "什么鬼") {
            this.setData({
                nothing: true,
                search: true
            })
        }
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
        if(e.currentTarget.dataset.value == "什么鬼") {
            this.setData({
                nothing: true,
                search: true
            })
        }
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
        if(this.data.nothing == true){
            return false;
        }
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
        let more_num = [];
        search_food.type.forEach((value,index,arr)=>{
            let num = value.food.length-2;
            more.push({"name":"展开更多商品"+num+"个","height":"160px"});
            more_num.push(num);
        })
        this.setData({
            intro_food: intro_food,
            search_food: search_food,
            more: more,
            more_num: more_num,
        })
    },
    goods_fade (e) {
        let more = this.data.more;
        let more_num = this.data.more_num;
        more.forEach((value,index,arr)=>{
            if(index == e.currentTarget.dataset.index){
                if(value.height == "auto"){
                    //展开了 需要收起来
                    arr[index] = {"name":"展开更多商品"+more_num[index]+"个","height":"160px"}
                }else {
                    //收起来了 需要展开
                    arr[index] = {"name":"收起","height":"auto"}
                }
            }
        })
        this.setData({
            more: more
        })
    },
    toLower (e) {
        let times = this.data.times;
        if(this.data.times > 3){
            this.setData({
                meg: "亲，没有再多的数据了"
            })
            return false;
        }
        if(this.data.state == true){
            return false;
        }
        this.setData({
            state: true,
            meg: "正在加载中..."
        })
        let search_food = this.data.search_food;
        let search_food1 = Mock.mock({
            "type": [
                {"name":"神户料理.陆羽茶居","average":4.7,"fare":20,"fare1":5,"distance":'2.00km',"time":38,"food":[{"name":"酱烧玻璃虾寿司","num":210,"good":"92%","prize":"7.2","img":"../../../images/good.jpeg"},{"name":"鳗鱼寿司","num":211,"good":"92%","prize":"7.2","img":"../../../images/fruit.jpeg"},{"name":"北极贝寿司","num":212,"good":"92%","prize":"7.2","img":"../../../images/breakfast.jpeg"},{"name":"三文鱼寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/cake.jpeg"},{"name":"海草寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/humbeger.jpeg"},{"name":"左口寿司","num":214,"good":"92%","prize":"7.2","img":"../../../images/drink.jpeg"}],"img":"../../../images/m2.png"},
                {"name":"宫崎寿司","average":4.7,"fare":20,"fare1":5,"distance":'2.00km',"time":38,"food":[{"name":"酱烧玻璃虾寿司","num":210,"good":"92%","prize":"7.2","img":"../../../images/good.jpeg"},{"name":"鳗鱼寿司","num":211,"good":"92%","prize":"7.2","img":"../../../images/fruit.jpeg"},{"name":"北极贝寿司","num":212,"good":"92%","prize":"7.2","img":"../../../images/breakfast.jpeg"},{"name":"三文鱼寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/cake.jpeg"},{"name":"海草寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/humbeger.jpeg"}],"img":"../../../images/m3.jpeg"},
                {"name":"藤原和寿司","average":4.7,"fare":20,"fare1":5,"distance":'2.00km',"time":38,"food":[{"name":"酱烧玻璃虾寿司","num":210,"good":"92%","prize":"7.2","img":"../../../images/good.jpeg"},{"name":"鳗鱼寿司","num":211,"good":"92%","prize":"7.2","img":"../../../images/fruit.jpeg"},{"name":"北极贝寿司","num":212,"good":"92%","prize":"7.2","img":"../../../images/breakfast.jpeg"},{"name":"三文鱼寿司","num":213,"good":"92%","prize":"7.2","img":"../../../images/cake.jpeg"}],"img":"../../../images/m5.jpeg"},
            ]
        })
        search_food.type = search_food.type.concat(search_food1.type);
        let more = [];
        let more_num = [];
        search_food.type.forEach((value,index,arr)=>{
            let num = value.food.length-2;
            more.push({"name":"展开更多商品"+num+"个","height":"160px"});
            more_num.push(num);
        })
        setTimeout(()=>{
            this.setData({
                search_food: search_food,
                meg: "",
                more: more,
                more_num: more_num,
                state: false,
                times: times + 1
            })
        },1000)
    }
})