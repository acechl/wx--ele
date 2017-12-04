let app = getApp()
Page({
  data: {
    winHeight: 0,
    login: false
  },
  onLaunch () {

  },
  onShow () {
    let that = this;
    wx.getSystemInfo({
      success (res) {
        that.setData({
          winHeight: res.windowHeight
        })      
      }
    })
    wx.getStorage({
      key: "user",
      success: function (res) {
        that.setData({
          login: res.data
        })
        console.log(that.data.login)
      }
    })
  },
  login () {
    if(this.data.login){
      wx.redirectTo({
        url: "./center/center"
      })
    }else {
      wx.redirectTo({
        url: "../login/login/login?path=me"
      })
    }
  }
})
