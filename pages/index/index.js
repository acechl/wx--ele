let bmap = require("../../utils/bmap-wx.min")
let app = getApp();
Page({
    data: {
        address: "",
        latitude: "",
        longitude: ""
    },
    onLaunch () {//当小程序初始化完成时，全局触发一次
        console.log("onlaunch")
    },
    onShow () {//当小程序启动 或者从后台进入前台时显示
        let that = this;
        let BMap = new bmap.BMapWX({
            ak: "4X4uPt3XfLVMg18PlnEQxYvbpz1GFWK2"
        })
        BMap.search({
            fail (data) {
                console.log(data)
            },
            success (data) {
                console.log(data)
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
                        console.log(res)
                        let add = res.data.result.addressComponent.city.substr(0,res.data.result.addressComponent.city.length-1);
                        // wx.request({
                        //     // url: "https://free-api.heweather.com/v5/weather",
                        //     data: {
                        //         key: ""
                        //     }
                        // })
                    }
                })
                // that.setData({
                //     latitude: res.latitude,
                //     longitude: res.longitude
                // })
            }
        })
    },
    onHide () {//当小程序从前台进入后台时

    },
    onError () {//当小程序发生脚本错误时

    }
})