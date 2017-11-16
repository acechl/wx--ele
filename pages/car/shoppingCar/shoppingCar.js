let app = getApp();
let Mock = require("../../../utils/mock");
Page({
    data: {
        timeArray: [],
        index: 0,
        shopCar: app.globalData.shopCar,
        allPrize: [],
        goPlay: 0,
        all: 0,
        selected:[],
        show: false,
        tips: "",
        path: "",
        winHeight: 0
    },
    onLoad (options) {
        this.setData({
            path: options.path
        })
    },
    onShow () {
        let allPrize = [];
        let shopCar = wx.getStorageSync("shopCar") || [];
        let that = this;
        wx.getSystemInfo({
            success (res) {
                that.setData({
                    winHeight: res.windowHeight
                })
            }
        })
        shopCar.forEach((value,index,arr)=>{
            let all = value.fare;
            value.menu.forEach((value1,index1,arr)=>{
                all = all + value1.prize;
            })
            allPrize[index] = all; 
        })
        let timeArray = ["尽快送达|预计14:14","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45","16:00"];
        this.setData({
            timeArray: timeArray,
            allPrize: allPrize,
            shopCar: shopCar
        })
    },
    checkboxChange (e) {
        let all = e.currentTarget.dataset.pay;
        let selected = this.data.selected;
        let select = e.currentTarget.dataset.selected;
        if(e.detail.value == false){//关闭改订单
            let index = selected.indexOf(select);
            selected.splice(index,1);
            this.setData({
                all: this.data.all - all,
                selected: selected
            })
        }else {//开启订单
            selected.push(select);
            this.setData({
                all: this.data.all + all,
                selected: selected
            })
        }
    },
    goPay () {
        let selected = this.data.selected;
        let shopCar = this.data.shopCar;
        if(selected.length == 0) {
            showToast();
            cancelToast();
            return false;
        }   
        selected.forEach((value,index,arr)=>{
            shopCar.splice(value,1);
        })
        wx.setStorage({
            key: "shopCar",
            value: shopCar
        });
        showToast();
        setTimeout(function(){
            wx.switchTab({
                url: "../../index/index"
            })
        },2000)
    },
    showToast () {
        this.setData({
            show: true,
            tips: "请选择要下单的商品"
        })
    },
    cancelToast () {
        setTimeout(()=>{
            this.setData({
                show: false,
                tips: ""
            })
        },2000)
    },
    goBack () {
        if(this.data.path == "login"){
            wx.navigateBack({
                delta: 2
            })
        }else {
            wx.navigateBack({
                delta: 1
            })
        }
    },
    selectAddress () {
        wx.navigateTo({
            url: ""
        })
    },
    timeChange (e) {
        this.setData({
            index: e.detail.value
        })
    }
})