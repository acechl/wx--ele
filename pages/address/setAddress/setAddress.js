let app = getApp();
let bmap = require("../../../utils/bmap-wx.min");
let Mock = require("../../../utils/mock");
Page({
    data: {
        address: "",
        again: "重新定位"
    },
    onShow () {
       this.location();
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
                that.setData({
                    address: wxMarkerData[1].address,
                    again: "重新定位"
                })
            }
        })
    }
})