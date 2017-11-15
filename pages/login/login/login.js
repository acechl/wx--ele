let app = getApp();
Page({
    data: {
        current: 0,
        phoneValue: "",
        passwordValue: "",
        verificationValue: "",
        tips: "",
        show: false
    },
    onLoad () {

    },
    onShow () {

    },
    switchChange () {
        
    },
    verificationTap () {
        let phone = /^1(3|4|5|7|8)\d{9}$/;
        if(this.data.phoneValue.length == 0 || this.data.verificationValue.length == 0){
            this.setData({
                show: true,
                tips: "手机号码和验证码均不能为空"
            })
        }
        
    },
    passwordTap () {
        if(this.data.phoneValue.length == 0 || this.data.passwordValue.length == 0) {
            this.setData({
                show: true,
                tips: "手机号码和密码均不能为空"
            })
            return false;
        }else if(!(phone.test(this.data.phoneValue))){
            this.setData({
                show: true,
                tips: "请输入正确的手机号码"
            })
        }else if(this.data.passwordValue.length < 6){
            this.setData({
                show: true,
                tips: "密码长度请大于6位"
            })
        }
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
    }
})