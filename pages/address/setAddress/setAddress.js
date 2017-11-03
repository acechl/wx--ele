var app = getApp();
let bmap = require("../../../utils/bmap-wx.min");
let Mock = require("../../../utils/mock");
Page({
    data: {
        address: "",
        again: "重新定位",
        value: "",
        delete: false,
        search: false,
        winHeight: 0,
        addressArray: {"type":[]}
    },
    onShow () {
        let that = this;
        this.setData({
            address: app.globalData.address
        })
        wx.getSystemInfo({
            success (res) {
                that.setData({
                    winHeight: res.windowHeight
                })
                app.globalData.winHeight = res.winHeight;
            }
        })
    },
    goBack () {
        wx.switchTab({
            url: "../../index/index"
        })
    },
    localAgain () {
        if(this.data.again == "定位中...") return false;
        this.setData({
            again: "定位中..."
        })
        this.location();
    },
    location () {
        let that = this;
        let BMap = new bmap.BMapWX({
            ak: "4X4uPt3XfLVMg18PlnEQxYvbpz1GFWK2"
        })
        BMap.search({
            fail (data) {
            },
            success (data) {
                let wxMarkerData =  data.wxMarkerData;
                app.globalData.address = wxMarkerData[1].address;
                that.setData({
                    address: wxMarkerData[1].address,
                    again: "重新定位"
                })
            }
        })
    },
    searchAddress (e) {
            if(this.data.value.length == 0) return false;
            this.setData({
                search: true
            })
            let wushan = Mock.mock({
           "type": [
               {"place":"华晟大厦","address":"广东省广州市天河区天河五山路1号"},
               {"place":"尚德大厦","address":"广东省广州市天河区五山路141号"},
               {"place":"华南理工大学(五山校区)","address":"广东省广州市天河区天河五山路381号"},
               {"place":"中公教育大厦","address":"广东省广州市天河区天河五山路371号之1"},
               {"place":"天河区国家税务局第二税局分局","address":"广东省广州市天河区天河五山路261号"},
               {"place":"蓝凌管理咨询支持系统有限公司(龙怡路)","address":"广东省广州市天河区天河五山路261-9号楼B座附近"},
               {"place":"广州市团校","address":"广东省广州市天河区天河五山路33号"},
               {"place":"天立大厦","address":"广东省广州市天河区天河五山路135号1层"},
               {"place":"华南理工大学国家大学科技园(东莞庄路)","address":"广东省广州市天河区天河五山路282-15号附近"},
               {"place":"中公教育(广东总部)","address":"广东省广州市天河区天河五山路371号中公教育大厦9层"},
           ]
       })
       let erzhong = Mock.mock({
           "type": [
               {"place":"广州市第二中学(初中部)","address":"广东省广州市越秀区应元路21号"},
               {"place":"广州市第二中学(东南门)","address":"广东省广州市越秀区应元路21号"},
               {"place":"豪辉文具行","address":"广东省广州市越秀区应元路76号"},
               {"place":"广州市第二中学(高中部)","address":"广东省广州市黄埔区水西路21号"},
               {"place":"广州市第二中学高中部饭堂","address":"广东省广州市黄埔区水西路(近开创大道)"},
               {"place":"广州市第二中学(东门)","address":"广东省广州市黄埔区水西路与香雪大道西交叉口西南100米"},
               {"place":"广州市二中苏元实验学校","address":"广东省广州市黄埔区水西路西50米"},
               {"place":"广州市第二中学(西侧门)","address":"广东省广州市越秀区应元路21号"},
               {"place":"广州市第二中学停车场","address":"广东省广州市越秀区吉祥路与应元路交叉口西北50米"},
               {"place":"广州市第二中学停车场(出入口)","address":"广东省广州市越秀区吉祥路与应元路交叉口西北50米"},
           ]
       })
       if(this.data.value.indexOf("五山") != -1 || this.data.value.indexOf("华工") != -1) {
           this.setData({
               addressArray: wushan
           })
       }else if(this.data.value.indexOf("二中") != -1){
            this.setData({
                addressArray: erzhong
            })
       }else {
           this.setData({
               addressArray: []
           })
       }
    },
    searchInput (e) {
        if(e.detail.value.length > 0){
            this.setData({
                delete: true,
                value: e.detail.value
            })
        }else {
            this.setData({
                delete: false,
                value: e.detail.value
            })
        }
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
    selectAddress (e) {
        app.globalData.address = e.currentTarget.dataset.address;
        wx.switchTab({
            url: "../../index/index"
        })
    },
    deleteAll () {
        this.setData({
            value: ""
        })
    },
   
})