let app = getApp()
Page({
  data: {
    list: [],
    selected: [],
    remark: [],
    textarea: '',
    menu: '',
    winHeight: 0
  },
  onLoad (options) {
    this.setData({
      menu: options.remark
    })
  },
  onShow () {
    let selected = [];
    let winHeight = 0;
    let list = [{'type': 'hot', 'detail': ['不要辣', '少点辣', '多点辣']}, {'type': 'caraway', 'detail': ['不要香菜']}, {'type': 'onion', 'detail': ['不要洋葱']}, {'type': 'vigenar', 'detail': ['多点醋']}, {'type': 'scallion', 'detail': ['多点葱']}]
    list.forEach((value, index, arr) => {
      value.length = value.detail.length
      selected.push({type: value.type, selected: []})
      value.detail.forEach((value1, index1, arr1) => {
        selected[index].selected[index1] = 'unselected'
      })
    })
    wx.getSystemInfo({
      success (res) {
        winHeight = res.windowHeight
      }
    })
    this.setData({
      list: list,
      selected: selected,
      winHeight: winHeight
    })
  },
  goBack () {
    wx.redirectTo({
      url: '../shoppingCar/shoppingCar'
    })
  },
  selectedClick (e) {
    let type = e.currentTarget.dataset.type
    let idx = e.currentTarget.dataset.index
    let remark = e.currentTarget.dataset.remark
    let selected = this.data.selected
    selected.forEach((value, index, arr) => {
      if (value.type == type) {
        value.selected.forEach((value1, index1, arr1) => {
          if (index1 == idx) {
            if (value.selected[idx] == 'selected') {
              value.selected[idx] = 'unselected'
            } else {
              value.selected[idx] = 'selected'
            }
          } else {
            value.selected[index1] = 'unselected'
          }
        })
      }
    })
    this.setData({
      selected: selected
    })
  },
  textareaInput (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  SureTap () {
    let choosed = []
    let selected = this.data.selected
    let list = this.data.list
    let remark = ''
    selected.forEach((value, index, arr) => {
      choosed.push({'type': value.type, 'index': []})
      value.selected.forEach((value1, index1, arr1) => {
        if (value1 == 'selected') {
          choosed[index].index.push(index1)
        }
      })
    })
    choosed.forEach((value, index, arr) => {
      if (value.index.length > 0) {
        value.index.forEach((value1, index1, arr1) => { // value1为选中的index值
          list.forEach((value2, index2, arr2) => {
            if (value.type == value2.type) {
              value2.detail.forEach((value3, index3, arr3) => {
                if (value1 == index3) {
                  remark = remark + value3
                }
              })
            }
          })
        })
      }
    })
    remark = remark + this.data.textarea
    app.globalData.remark = remark
    wx.redirectTo({
      url: '../shoppingCar/shoppingCar?remark=' + this.data.menu
    })
  },
  selectRemark () {

  }
})
