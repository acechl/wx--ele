let Mock = require("../../../utils/mock");
let app = getApp();
Page({
    data: {
        id: "",
        delete: false,
        value: "",
        hot: {},
        history: {}
    },
    onShow () {
        let hot = Mock.mock({
            "type|10": [
                {
                    "name|1": ["猪脚饭","幸福西饼","面","麦当劳","星巴克","鸡蛋仔","手抓饼","薏米","枸杞叶","寿司","东南亚美食","摩打寿司","汉拿山","法国大餐","不二家","泡芙","爆米花","哈根达斯","明治","臊子面","沙县小吃","煎饼","炸酱面","粥"]
                }
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
        console.log("input");
        if(e.detail.value.length == 0){
            this.setData({
                delete: false,
                value: e.detail.value
            })
        }else {
            this.setData({
                delete: true,
                value: e.detail.value
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
            history: history
        })
    },
     historyEmpty () {
        console.log("nini")
        wx.setStorageSync("history",{"type":[]})
        this.setData({
            history: {}
        })
    }
})