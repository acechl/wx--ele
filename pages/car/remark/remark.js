let app = getApp();
Page({
    data: {
        list: []
    },
    onLoad () {

    },
    onShow () {
        let list = [{"type":["不要辣","少点辣","多点辣"]},{"type":["不要香菜"]},{"type":["不要洋葱"]},{"type":["多点醋"]},{"type":["多点葱"]}];
        list.forEach((value,index,arr)=>{
            value.length = value.type.length;
            value.color = [];
            value.type.forEach((value1,index1,arr1)=>{
                 value.color[index1] = "unselect";
            })
        })
        this.setData({
            list: list
        })
        console.log(list);
    },
    goBack () {
        wx.navigateBack({
            delta: 1
        })
    },
    selectRemark () {
        
    }
})