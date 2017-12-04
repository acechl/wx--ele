let app = getApp();
Page({
    data: {
        winHeight:0,
        value: "",
        login: "",
        show: false
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
                that.setData({
                    login: res.data
                })
            }
        })
    },
    onLoad () {

    },
    sureChange () {
        let login = this.data.login;
        if(e.detail.value.length == 0){
            this.showToast("请输入昵称");
            return false;
            setTimeout(()=>{
                this.cancelToast()
            },2000)
        }
        login.nickName = this.data.value;
    },
    nickNameChange (e) {
        that.setData({
            value: e.detail.value
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