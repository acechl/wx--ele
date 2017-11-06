//app.js
let bmap = require("utils/bmap-wx.min");
App({
   globalData:{
    userInfo:null,
    address: "未能获取地址...",
    winHeight: 0,
  },
  onLaunch () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this;
    let BMap = new bmap.BMapWX({
      ak: "4X4uPt3XfLVMg18PlnEQxYvbpz1GFWK2"
    })
    BMap.search({
      fail (data) {
      },
      success (data) {
        let wxMarkerData =  data.wxMarkerData;
        that.globalData.address = wxMarkerData[1].address;
      }
    })
      // var res = wx.getSystemInfoSync();
      // this.globalData.winHeight = res.windowHeight;
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onShow () {
  }
   
})