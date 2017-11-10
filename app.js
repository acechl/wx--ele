//app.js
let bmap = require("utils/bmap-wx.min");
let Mock = require("./utils/mock");
App({
   globalData:{
    userInfo:null,
    address: "未能获取地址...",
    winHeight: 0,
    classify_left: {},
    classify_right: {},
    send_type: {},
    shop_attr: {},
    consume: {},
    rank_type: {},
    activity_type: {},
    prize: "",
    shopCar: []
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
    console.log("nini")
    let classify_left = Mock.mock({
      "type": [
          {"name":"全部商品","num":"9876"},
          {"name":"美食","num":"654"},
          {"name":"快餐便当","num":"234"},
          {"name":"特色菜系","num":"234"},
          {"name":"异国料理","num":"123"},
          {"name":"小吃宵夜","num":"987"},
          {"name":"甜品饮料","num":"435"},
          {"name":"果蔬生鲜","num":"769"},
          {"name":"商店超市","num":"432"},
          {"name":"浪漫鲜花","num":"765"},
          {"name":"医药健康","num":"342"},
          {"name":"早餐","num":"987"},
          {"name":"午餐","num":"564"},
          {"name":"下午茶","num":"998"},
          {"name":"晚餐","num":"887"},
          {"name":"宵夜","num":"775"},
      ]
    });
    let classify_right = Mock.mock({
      "type": [
        {"name":"全部","num":"8888"},
        {"name":"简餐便当","num":"6666"},
        {"name":"小吃炸串","num":"3333"},
        {"name":"面食粥店","num":"2222"},
        {"name":"地方菜系","num":"1111"},
        {"name":"日韩料理","num":"888"},
        {"name":"香锅冒菜","num":"666"},
        {"name":"轻食西餐","num":"222"},
        {"name":"汉堡披萨","num":"111"},
      ]
    });
    let rank_type = Mock.mock({
      "type": [
        {"name":"综合排序"},
        {"name":"销量最高"},
        {"name":"起送价最低"},
        {"name":"配送最快"},
      ]
    });
    let send_type = Mock.mock({
      "type": [
        {"name": "蜂鸟专送","id":0}
      ]
    });
    let consume = Mock.mock({
      "type": [
        {"name": "20以下","id":1},
        {"name": "20-40","id":2},
        {"name": "40以上","id":3},
      ]
    });
    let activity_type = Mock.mock({
      "type": [
        {"title":"新","name":"新用户优惠","color":"rgb(112, 188, 70)","id":4},
        {"title":"特","name":"特价商品","color":"rgb(241, 136, 79)","id":5},
        {"title":"减","name":"下单立减","color":"rgb(240, 115, 115)","id":6},
        {"title":"赠","name":"赠品优惠","color":"rgb(60, 199, 145)","id":7},
        {"title":"返","name":"下单返券","color":"rgb(255, 114, 57)","id":8},
        {"title":"领","name":"进店领劵","color":"rgb(255, 172, 42)","id":9},
      ]
    });
    let shop_attr = Mock.mock({
      "type": [
        {"title":"品","name":"品牌商家","color":"rgb(63, 189, 230)","id":10},
        {"title":"保","name":"外卖保","color":"rgb(153, 153, 153)","id":11},
        {"title":"新","name":"新店","color":"rgb(232, 132, 45)","id":12},
        {"title":"票","name":"开发票","color":"rgb(153, 153, 153)","id":13},
        {"title":"付","name":"在线支付","color":"rgb(255, 78, 0)","id":14}
      ]
    });
    this.globalData.classify_left = classify_left;
    this.globalData.classify_right = classify_right;
    this.globalData.rank_type = rank_type;
    this.globalData.send_type = send_type;
    this.globalData.consume = consume;
    this.globalData.activity_type = activity_type;
    this.globalData.shop_attr = shop_attr;
  }
   
})