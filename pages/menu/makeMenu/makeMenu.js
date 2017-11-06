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
        classify_right: {}
    },
    onShow () {
        let hot = Mock.mock({
            "type|10": [
                {
                    "name|1": ["猪脚饭","幸福西饼","面","麦当劳","星巴克","鸡蛋仔","手抓饼","薏米","枸杞叶","寿司","东南亚美食","摩打寿司","汉拿山","法国大餐","不二家","泡芙","爆米花","哈根达斯","明治","臊子面","沙县小吃","煎饼","炸酱面","粥"]
                }
            ]
        })
        let classify_left = Mock.mock({
            "type": [
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
        })
        let history = wx.getStorageSync("history") || {"type":[]};
        this.setData({
            hot: hot,
            history: history
        })
        
    },
    onLaunch (options) {
        this.setData({
            id: option.id
        })
    },
    searchFocus () {
        console.log("focus");
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
        console.log("blur");
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
                search: true
            })
        }
    },
    searchDelete () {
        console.log("delete");
        this.setData({
            value: ""
        })
    },
    searchItem () {
        let history = wx.getStorageSync("history") || {"type": []}
        history.type = history.type.concat({"name":this.data.value});
        wx.setStorageSync("history",history)
        this.setData({
            history: history,
            search: true
        })
    },
     historyEmpty () {
        console.log("nini")
        wx.setStorageSync("history",{"type":[]})
        this.setData({
            history: {}
        })
    },
    goBack () {
        wx.switchTab({
            url: "../../index/index"
        })
    }
})