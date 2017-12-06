let app = getApp()
let Mock = require('../../../utils/mock')
Page({
  data: {
    timeArray: [],
    index: 0,
    shopCar: app.globalData.shopCar,
    allPrize: [],
    goPlay: 0,
    all: 0,
    selected: [],
    show: false,
    tips: '',
    path: '',
    winHeight: 0,
    remark: app.globalData.remark,
    menu: [],
    address: [],
    hasAdd: false,
    id: '',
    title: ""
  },
  onLoad (options) {
    let that = this
    let menu = JSON.parse(options.remark || '[]');
    wx.getStorage({
      key: 'add',
      success: function (res) {
        if (options.id || (res.data != undefined)) { // 当有选择过的地址时
          that.setData({
            hasAdd: true
          })
        } else { // 当没有选择过的地址时
          that.setData({
            hasAdd: false
          })
        }
        if (options.id) { // 当有options.id时  说明是点击了地址
          that.setData({
            id: options.id
          })
        } else { // 当没有options
          that.setData({
            id: res.data
          })
        }
      }
    })
    this.setData({
      path: options.path,
      menu: menu,
      selected: menu,
      title: options.title
    })
  },
  onShow () {
    let allPrize = []
    let shopCar = wx.getStorageSync('shopCar') || []
    let that = this
    let checked = []
    let add = []
    wx.getSystemInfo({
      success (res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    shopCar.forEach((value, index, arr) => {
      let all = value.fare
      value.menu.forEach((value1, index1, arr) => {
        all = all + value1.prize
      })
      allPrize[index] = all
      if (this.data.menu.indexOf(index) != -1) {
        checked[index] = true
      } else {
        checked[index] = false
      }
    })
    let timeArray = ['尽快送达|预计14:14', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00']
    wx.getStorage({
      key: 'address',
      success: function (res) {
        res.data.forEach((value, index, arr) => {
          if (value.id == that.data.id) {
            console.log(value)
            add.push(value)
            console.log(add)
            that.setData({
              address: add
            })
          }
        })
      }
    })
    this.setData({
      timeArray: timeArray,
      allPrize: allPrize,
      shopCar: shopCar,
      remark: app.globalData.remark,
      checked: checked
    })
  },
  checkboxChange (e) {
    let all = e.currentTarget.dataset.pay
    let selected = this.data.selected
    let select = e.currentTarget.dataset.selected
    if (e.detail.value == false) { // 关闭改订单
      let index = selected.indexOf(select)
      selected.splice(index, 1)
      this.setData({
        all: this.data.all - all,
        selected: selected
      })
    } else { // 开启订单
      selected.push(select)
      this.setData({
        all: this.data.all + all,
        selected: selected
      })
    }
  },
  goPay () {
    let selected = this.data.selected
    let shopCar = this.data.shopCar
    if (selected.length == 0) {
      this.showToast('请选择要下单的商品')
      this.cancelToast()
      return false
    }
    selected.forEach((value, index, arr) => {
      shopCar.splice(value, 1)
    })
    wx.setStorage({
      key: 'shopCar',
      value: shopCar
    })
    this.showToast("下单成功")
    setTimeout(function () {
      wx.switchTab({
        url: '../../index/index'
      })
    }, 2000)
  },
  showToast (meg) {
    this.setData({
      show: true,
      tips: meg
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
  goBack () {
    if (this.data.path == 'login') {
      // wx.navigateBack({
      //   delta: 2
      // })
      wx.redirectTo({
        url: "../../booking/booking?title="+this.data.title
      })
    } else {
      // wx.navigateBack({
      //   delta: 1
      // })
      wx.redirectTo({
        url: "../../booking/booking?title="+this.data.title
      })
    }
  },
  selectAddress () {
    wx.redirectTo({
      url: '../../address/selectAddress/selectAddress'
    })
  },
  timeChange (e) {
    this.setData({
      index: e.detail.value
    })
  },
  selectTaste () {
    console.log('nini')
    wx.redirectTo({
      url: '../../car/remark/remark?remark=' + JSON.stringify(this.data.selected)
    })
  }
})
