let app = getApp();
Page({
    data: {
        winHeight: 0,
        tips:"",
        show: false,
        oldPass: "",
        newPass: "",
        surePass: "",
        login: "",
        exit: false
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
            success (res) {
                if(res.data.password){
                    that.setData({
                        exit: true
                    })
                }else {
                    that.setData({
                        exit: false,
                        oldPass: "11"
                    })
                }
                that.setData({
                    login: res.data
                })
            }
        })
    },
    onLoad () {

    },
    oldChange (e) {
        this.setData({
            oldPass: e.detail.value
        })
    },
    newChange (e) {
        this.setData({
            newPass: e.detail.value
        })
    },
    sureChange (e) {
        this.setData({
            surePass: e.detail.value
        })
    },
    passSure () {
        let login = this.data.login;
        if(this.data.exit){
            if(this.data.oldPass.length == 0 || this.data.newPass.length == 0 ||                    this.data.surePass.length == 0){
                this.showToast("请输入密码");
                setTimeout(()=>{
                    this.cancelToast()
                },2000);
                return false;
            }
            if(this.data.oldPass != this.data.login.password){
                this.showToast("旧密码输入不正确");
                setTimeout(()=>{
                    this.cancelToast()
                },2000);
                return false;
            }   
        }else {
            if(this.data.newPass.length == 0 || this.data.surePass.length == 0){
                console.log("nii")
                this.showToast("请输入密码");
                setTimeout(()=>{
                    this.cancelToast()
                },2000);
                return false;
            }
        }
        if(this.data.newPass != this.data.surePass){
            this.showToast("两次密码输入不一致");
                setTimeout(()=>{
                    this.cancelToast()
                },2000);
                return false;
        }
        login.password = this.data.newPass;
        wx.setStorage({
            key: "user",
            data: login
        })
        wx.redirectTo({
            url: "../../center/center"
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