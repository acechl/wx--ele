let app = getApp();
Page({
    data: {
        winHeight: 0,
        vcode: "获取验证码",
        login: "",
        phone: "",
        value: "",
        change: false,
        button: "验证后绑定新手机号",
        newPhone: "手机号码",
        new: false,
        phoneValue: "",
        tip:"",
        show: false
    },
    onShow () {
        let that = this;
        let reg = /^(\d{3})\d{4}(\d{4})$/;
        wx.getSystemInfo({
            success (res) {
                that.setData({
                    winHeight: res.windowHeight
                })
            }
        })
        wx.getStorage({
            key: "user",
            success (res) {
                let phone = res.data.phone.replace(reg, "$1****$2");
                that.setData({
                    login: res.data,
                    phone: phone
                })
            }
        })
    },
    onLoad () {

    },
    vcodeChange (e) {
        this.setData({
            value: e.detail.value
        })
        if(e.detail.value.length > 0) {
            this.setData({
                change: true
            })
        }else {
            this.setData({
                change: false
            })
        }
    },
    phoneChange (e) {
        this.setData({
            phoneValue: e.detail.value
        })
    },
    textPhone () {
        let that = this;
        let login = this.data.login;
        if(this.data.button == "验证后绑定新手机号"){//验证就手机
            if(this.data.value.length == 0) {
                this.showToast("请输入验证码");
                setTimeout(()=>{
                    this.cancelToast();
                },2000)
                return false;
                
            }
            this.setData({
                button: "确认绑定",
                newPhone: "新手机号",
                change: false,
                phone: "",
                value: "",
                new: true
            })
        }else if(this.data.button == "确认绑定"){//跳转页面
            if(this.data.value.length == 0 || this.data.phoneValue.length == 0) {
                this.showToast("验证码和手机号码不能为空");
                setTimeout(function(){
                    that.cancelToast();
                },2000)
                return false;
            }
            login.phone = this.data.phoneValue;
            wx.setStorage({
                key: "user",
                data: login
            })
            wx.redirectTo({
                url: "../../center/center"
            })
        }
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