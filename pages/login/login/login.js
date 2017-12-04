let app = getApp()
Page({
  data: {
    current: 0,
    phone1Value: '',
    phoneValue: '',
    passwordValue: '',
    verificationValue: '',
    tips: '',
    show: false,
    winHeight: 0,
    checked: true,
    user: {},
    password: app.globalData.password,
    verificate: app.globalData.verificate,
    path: '',
    url: ""
  },
  onLoad (options) {
    this.setData({
      path: options.path
    })
  },
  onShow () {
    let user
    let that = this
    wx.getStorage({
      key: 'user',
      success (res) {
        that.setData({
          user: res.data || {}
        })
      }
    })
    wx.getSystemInfo({
      success (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    let url = "";
    if (this.data.path == 'shoppingCar') {
      url = '../../car/shoppingCar/shoppingCar'
    }else if(this.data.path == "me") {
      url = "../../me/me" 
    }
    this.setData({
      url: url
    })
  },
  switchChange () {

  },
  phone1Input (e) {
    this.setData({
      phone1Value: e.detail.value
    })
  },
  verificateInput (e) {
    this.setData({
      verificationValue: e.detail.value
    })
  },
  phoneInput (e) {
    this.setData({
      phoneValue: e.detail.value
    })
  },
  passwordInput (e) {
    this.setData({
      passwordValue: e.detail.value
    })
  },
  verificationTap () {
    let that= this;
    let phone = /^1(3|4|5|7|8)\d{9}$/
    let user = this.data.user
    if (this.data.phone1Value.length == 0 || this.data.verificationValue.length == 0) {
      this.showToast('手机号码和验证码均不能为空')
      this.cancelToast()
      return false
    } else if (!(phone.test(this.data.phone1Value))) {
      this.showToast('请输入正确的手机号码')
      this.cancelToast()
      return false
    } else if (this.data.verificationValue != this.data.verificate) {
      this.showToast('请输入正确的验证码')
      this.cancelToast()
      return false
    }
    user.phone = this.data.phone1Value
    user.nickName = "acechl"
    wx.setStorage({
      key: 'user',
      data: user
    })
    wx.redirectTo({
      url: that.data.url
    })
  },
  passwordTap () {
    let that = this
    let user = this.data.user
    let phone = /^1(3|4|5|7|8)\d{9}$/
    if (this.data.phoneValue.length == 0 || this.data.passwordValue.length == 0) {
      this.showToast('手机号码和密码均不能为空')
      this.cancelToast()
      return false
    } else if (!(phone.test(this.data.phoneValue))) {
      this.showToast('请输入正确的手机号码')
      this.cancelToast()
      return false
    } else if (this.data.passwordValue.length < 6) {
      this.showToast('密码长度请大于6位')
      this.cancelToast()
      return false
    } else if (this.data.passwordValue != this.data.password) {
      this.showToast('请输入正确的密码')
      this.cancelToast()
      return false
    }
    user.phone = this.data.phoneValue;
    user.nickName = "acechl";
    wx.setStorage({
      key: 'user',
      data: user
    })
    wx.redirectTo({
      url: that.data.url
    })
  },
  swiperChange (e) {
    this.setData({
      current: e.detail.current
    })
  },
  typeTap (e) {
    this.setData({
      current: e.currentTarget.dataset.current
    })
  },
  switchChange (e) {
    let checked = this.data.checked
    this.setData({
      checked: !checked
    })
  },
  cancelToast () {
    setTimeout(() => {
      this.setData({
        show: false,
        tips: ''
      })
    }, 2000)
  },
  showToast (meg) {
    this.setData({
      show: true,
      tips: meg
    })
  }
})
