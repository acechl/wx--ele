let app = getApp()
let Mock = require('../../../utils/mock');
Page({
  data: {
    winHeight: '',
    title: '',
    classify_left: app.globalData.classify_left,
    classify_right: app.globalData.classify_right,
    rank_type: app.globalData.rank_type,
    send_type: app.globalData.send_type,
    consume: app.globalData.consume,
    activity_type: app.globalData.activity_type,
    shop_attr: app.globalData.shop_attr,
    show: {'classify': false, 'rank': false, 'selection': false},
    choosed: {'send_type': [], 'consume': [], 'activity_type': [], 'shop_attr': []},
    num: 0,
    more: [],
    more_num: [],
    selection: [],
    selected: {},
    winHeight: 0,
    shop_intro: {},
    flag: [],
    index: true,
    meg: '',
    page: 1
  },
  onLoad (options) {
    this.setData({
      title: options.title
    })
  },
  onShow () {
    let winHeight = 0
    wx.getSystemInfo({
      success (res) {
        winHeight = res.windowHeight
      }
    })
    let classify_left = this.data.classify_left;
    let classify_right = this.data.classify_right;
    let rank_type = this.data.rank_type;
    let shop_attr = this.data.shop_attr;
    let consume = this.data.consume;
    let activity_type = this.data.activity_type;
    let send_type = this.data.send_type;
    let selection = [];
    classify_left.type.forEach((value, index, arr) => {
      if (index == 0) {
        selection[index] = true
      } else {
        selection[index] = false
      }
    })
    let selected = {'send_type': [], 'consume': [], 'activity_type': [], 'shop_attr': []}
    send_type.type.forEach((value, index, arr) => {
      selected.send_type[index] = undefined
    })
    consume.type.forEach((value, index, arr) => {
      selected.consume[index] = undefined
    })
    activity_type.type.forEach((value, index, arr) => {
      selected.activity_type[index] = undefined
    })
    shop_attr.type.forEach((value, index, arr) => {
      selected.shop_attr[index] = undefined
    })
    let shop_intro = Mock.mock({
      'type|2': [
                {'names': '广州麦当劳信德商务诚信店', 'average': '4.7', 'num': '333', 'fare': '0', 'fare1': '15', 'distance': '1.2km', 'time': '38', 'new': '7', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}, {'name': '[星球大战]星球金枕超值双人餐首发', 'word': '星', 'color': 'rgb(241, 136, 79)'}, {'name': '249元超值[4人新品咖喱虾蟹狂欢套餐]', 'word': '新', 'color': 'rgb(241, 136, 79)'}, {'name': '[双十一]王牌5折工作餐', 'word': '爆', 'color': 'rgb(241, 136, 79)'}], 'brand': '1', 'img': '../../../images/m1.jpeg', 'bao': '1', 'piao': '1', 'send': '1', 'good': '1', 'number': 6},
                {'names': '海银海记牛肉火锅', 'average': '3.4', 'num': '444', 'fare': '10', 'fare1': '25', 'distance': '2.2km', 'time': '39', 'new': '8', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}, {'name': '[星球大战]星球金枕超值双人餐首发', 'word': '星', 'color': 'rgb(241, 136, 79)'}, {'name': '249元超值[4人新品咖喱虾蟹狂欢套餐]', 'word': '新', 'color': 'rgb(241, 136, 79)'}], 'brand': '1', 'img': '../../../images/m2.png', 'piao': '1', 'send': '1', 'number': 5},
                {'names': '汉拿山韩式料理', 'average': '2.6', 'num': '555', 'fare': '20', 'fare1': '35', 'distance': '3.2km', 'time': '40', 'new': '9', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}, {'name': '[星球大战]星球金枕超值双人餐首发', 'word': '星', 'color': 'rgb(241, 136, 79)'}], 'brand': '0', 'img': '../../../images/m3.jpeg', 'bao': '1', 'send': '1', 'good': '1', 'number': 4},
                {'names': '摩打寿司黄沙店', 'average': '4.8', 'num': '666', 'fare': '30', 'fare1': '45', 'distance': '4.2km', 'time': '41', 'new': '10', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}], 'name': '1', 'img': '../../../images/m4.png', 'send': '1', 'number': 3},
                {'names': '情愿鸡粥', 'average': '2.9', 'num': '777', 'fare': '40', 'fare1': '55', 'distance': '5.2km', 'time': '42', 'new': '11', 'brand': '0', 'img': '../../../images/m5.jpeg', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}], 'good': '1', 'number': 1}
      ]
    })
    this.changeLength(shop_intro.type)
    this.setData({
      selection: selection,
      winHeight: winHeight,
      selected: selected,
      shop_intro: shop_intro
    })
  },
  goBack () {
    wx.switchTab({
      url: '../../index/index'
    })
  },
  select_tap (e) {
    let that = this
    let show = this.data.show
    if (this.data.last != e.currentTarget.dataset.attr) {
      for (let key in show) {
        show[key] = false
      }
      show[e.currentTarget.dataset.attr] = true
      this.setData({
        show: show,
        last: e.currentTarget.dataset.attr
      })
    } else {
      for (let key in show) {
        show[key] = false
      }
      this.setData({
        show: show,
        last: ''
      })
    }
  },
  classify_select (e) {
    let selection = this.data.selection
    selection.forEach((value, index, arr) => {
      selection[index] = false
    })
    selection[e.currentTarget.dataset.index] = true
    this.setData({
      selection: selection
    })
  },
  go_select () {
    let show = this.data.show
    for (let key in show) {
      show[key] = false
    }
    this.setData({
      show: show
    })
  },
  itemTap (e) {
    let choosed = this.data.selected
    if (e.currentTarget.dataset.attr != 'shop_attr') { // 当为单选时
      if (choosed[e.currentTarget.dataset.attr].indexOf(e.currentTarget.dataset.id) != -1) { // 存在
        choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = undefined
      } else { // 不存在
        choosed[e.currentTarget.dataset.attr].forEach((value, index, arr) => {
          choosed[e.currentTarget.dataset.attr][index] = undefined
        })
        choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = e.currentTarget.dataset.id
      }
    } else { // 当为多选时
      if (choosed[e.currentTarget.dataset.attr].indexOf(e.currentTarget.dataset.id) != -1) { // 存在
        choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = undefined
      } else { // 不存在
        choosed[e.currentTarget.dataset.attr][e.currentTarget.dataset.index] = e.currentTarget.dataset.id
      }
    }
    let num = 0
    for (let key in choosed) {
      choosed[key].forEach((value, index, arr) => {
        if (value != undefined) {
          num++
        }
      })
    }
    this.setData({
      selected: choosed,
      num: num
    })
  },
  clearTap () {
    let selected = this.data.selected
    for (let key in selected) {
      selected[key].forEach((value, index, arr) => {
        arr[index] = undefined
      })
    }
    this.setData({
      selected: selected,
      num: 0
    })
  },
  changeLength (shop_intro) {
    let flag = []
    shop_intro.forEach(function (value, index, arr) {
      flag[index] = {'deg': 0, 'height': '80rpx'}
    })
    this.setData({
      flag: flag
    })
  },
  tapRotate (e) {
    let data_index = e.currentTarget.dataset.index
    let flag = this.data.flag
    flag.forEach(function (value, index, arr) {
      if (index == data_index) {
        if (value.deg == 0) { // 当为0时 释放
          arr[index] = {'deg': 180, 'height': 'auto'}
        } else { // 当为180时 回收
          arr[index] = {'deg': 0, 'height': '80rpx'}
        }
      }
    })
    this.setData({
      flag: flag
    })
  },
  scrollToLower (e) {
    let shop1_intro = Mock.mock({
      'type|2': [
                {'names': '广州麦当劳信德商务诚信店', 'average': '4.7', 'num': '333', 'fare': '0', 'fare1': '15', 'distance': '1.2km', 'time': '38', 'new': '7', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}, {'name': '[星球大战]星球金枕超值双人餐首发', 'word': '星', 'color': 'rgb(241, 136, 79)'}, {'name': '249元超值[4人新品咖喱虾蟹狂欢套餐]', 'word': '新', 'color': 'rgb(241, 136, 79)'}, {'name': '[双十一]王牌5折工作餐', 'word': '爆', 'color': 'rgb(241, 136, 79)'}], 'brand': '1', 'img': '../../../images/m1.jpeg', 'bao': '1', 'piao': '1', 'send': '1', 'good': '1', 'numner': 6},
                {'names': '海银海记牛肉火锅', 'average': '3.4', 'num': '444', 'fare': '10', 'fare1': '25', 'distance': '2.2km', 'time': '39', 'new': '8', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}, {'name': '[星球大战]星球金枕超值双人餐首发', 'word': '星', 'color': 'rgb(241, 136, 79)'}, {'name': '249元超值[4人新品咖喱虾蟹狂欢套餐]', 'word': '新', 'color': 'rgb(241, 136, 79)'}], 'brand': '1', 'img': '../../../images/m2.png', 'piao': '1', 'send': '1', 'number': 5},
                {'names': '汉拿山韩式料理', 'average': '2.6', 'num': '555', 'fare': '20', 'fare1': '35', 'distance': '3.2km', 'time': '40', 'new': '9', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}, {'name': '[星球大战]星球金枕超值双人餐首发', 'word': '星', 'color': 'rgb(241, 136, 79)'}], 'brand': '0', 'img': '../../../images/m3.jpeg', 'bao': '1', 'send': '1', 'good': '1', 'number': 4},
                {'names': '摩打寿司黄沙店', 'average': '4.8', 'num': '666', 'fare': '30', 'fare1': '45', 'distance': '4.2km', 'time': '41', 'new': '10', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}, {'name': '[99]元超值套餐', 'word': '超', 'color': 'rgb(240, 115, 115)'}, {'name': '满40减30', 'word': '折', 'color': 'rgb(240, 115, 115)'}], 'brand': '1', 'img': '../../../images/m4.png', 'send': '1', 'number': 3},
                {'names': '情愿鸡粥', 'average': '2.9', 'num': '777', 'fare': '40', 'fare1': '55', 'distance': '5.2km', 'time': '42', 'new': '11', 'brand': '0', 'img': '../../../images/m5.jpeg', 'discount': [{'name': '新用户下单立减17元', 'word': '首', 'color': 'rgb(112, 188, 70)'}], 'good': '1', 'number': 1}
      ]
    })
    if (this.data.inden == false) {
      return false
    }
    this.setData({
      inden: false,
      meg: '正在加载中...'
    })
    if (this.data.page >= 3) {
      this.setData({
        meg: '亲，没有可以推荐的商家了'
      })
      return false
    }
    let shop_intro = this.data.shop_intro.type.concat(shop1_intro.type)
    let that = this
    setTimeout(function () {
      that.setData({
        shop_intro: {'type': shop_intro}
      })
      that.changeLength(shop_intro)
      that.setData({
        page: that.data.page + 1,
        inden: true,
        meg: ''
      })
    }, 500)
  },
  scrollDown (e) {
  },
  bookinggoods (e) {
    wx.redirectTo({
      url: '../../booking/booking?path=tabMenu&title=' + e.currentTarget.dataset
            .title + '&path=tabMenu&id=' + this.data.title
    })
  },
  moreActivity () {

  }
})
