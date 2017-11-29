let app = getApp();
Page({
    data: {
        winHeight: 0,
        show: false,
        address: {},
        name: "",
        sex: "",
        phone: "",
        stand: "",
        location: "",
        de_address: "",
        babel: "",
        mes: "",
        showing: false,
        place: "",
        id: 0,
        address: []
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
            key: 'address',
            success: function(res) {
                that.setData({
                    id: res.data.length || 0,
                    address: res.data
                })
            }  
        })
    },
    onLoad (options) {
        let place = options.place || "";
        let detail = JSON.parse(options.detail || "{}")
        console.log(detail)
        this.setData({
            detail: detail,
            name: detail.name || "",
            sex: detail.sex || "",
            phone: detail.phone || "",
            stand: detail.stand || "",
            location: place || (detail.location || ""),
            de_address: detail.de_address || "",
            babel: detail.babel || ""
        })
    },
    makeSure () {//确定
        let phone = /^1(3|4|5|7|8)\d{9}$/;
        if(!(phone.test(this.data.phone))) {
            this.showToast("请输入正确的手机号码");
            this.cancelToast();
            return false;
        }
        if(this.data.name.length == 0) {
            this.showToast("请输入你的称呼");
            this.cancelToast();
            return false;
        }
        if(this.data.location.length == 0) {
            this.showToast("请输入小区/写字楼/学校等详情地址信息");
            this.cancelToast();
            return false;
        }
        let address = this.data.address;
        let add = {
            id: this.data.id,
            name: this.data.name,
            phone: this.data.phone,
            stand: this.data.stand,
            sex: this.data.sex,
            babel: this.data.babel,
            location: this.data.location,
            de_address: this.data.de_address
        };
        address.push(add);
        wx.setStorage({
            key: "address",
            data: address
        })
    },
    showStandBy () {
        let show = this.data.show;
        if(show == false) {
            this.setData({
                show: true
            })
        }else {
            this.setData({
                show: false
            })
        }
    },
    nameChange (e) {//姓名
        this.setData({
            name: e.detail.value
        })
    },
    sexChange (e) {//性别
        this.setData({
            sex: e.detail.value
        })
        console.log(this.data.sex)
    },
    phoneChange (e) {//电话
        this.setData({
            phone: e.detail.value
        })
    },
    standChange (e) {//备用电话
      this.setData({
          stand: e.detail.value
      })  
    },
    locationChange () {//位置
        let params = {
            name: this.data.name,
            phone: this.data.phone,
            stand: this.data.stand,
            sex: this.data.sex,
            babel: this.data.babel,
            location: this.data.location,
            de_address: this.data.de_address
        }
        wx.redirectTo({
            url: "../searchAddress/searchAddress?detail="+JSON.stringify(params)
        })
    },
    deAddChange (e) {//详情地址
        this.setData({
            de_address: e.detail.value
        })
    },
    babelChange (e) { //家、公司等的选择
        this.setData({
            babel: e.detail.value
        })
    },
    cancelToast () {
        setTimeout(()=>{
            this.setData({
                showing: false,
                mes: ""
            })
        },2000)
    },
    showToast (meg) {
        this.setData({
            showing: true,
            mes: meg
        })
    }
})