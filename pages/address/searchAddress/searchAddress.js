let app = getApp();
let Mock = require("../../../utils/mock");
Page({
    data: {
        wushan: {},
        erzhong: {},
        all: []
    },
    onShow () {
        let wushan = Mock.mock({
           "type": [
               {"place":"华晟大厦","address":"广东省广州市天河区天河五山路1号"},
               {"place":"尚德大厦","address":"广东省广州市天河区五山路141号"},
               {"place":"华南理工大学(五山校区)","address":"广东省广州市天河区天河五山路381号"},
               {"place":"中公教育大厦","address":"广东省广州市天河区天河五山路371号之1"},
               {"place":"天河区国家税务局第二税局分局","address":"广东省广州市天河区天河五山路261号"},
               {"place":"蓝凌管理咨询支持系统有限公司(龙怡路)","address":"广东省广州市天河区天河五山路261-9号楼B座附近"},
               {"place":"广州市团校","address":"广东省广州市天河区天河五山路33号"},
               {"place":"天立大厦","address":"广东省广州市天河区天河五山路135号1层"},
               {"place":"华南理工大学国家大学科技园(东莞庄路)","address":"广东省广州市天河区天河五山路282-15号附近"},
               {"place":"中公教育(广东总部)","address":"广东省广州市天河区天河五山路371号中公教育大厦9层"},
           ]
        })
        let erzhong = Mock.mock({
           "type": [
               {"place":"广州市第二中学(初中部)","address":"广东省广州市越秀区应元路21号"},
               {"place":"广州市第二中学(东南门)","address":"广东省广州市越秀区应元路21号"},
               {"place":"豪辉文具行","address":"广东省广州市越秀区应元路76号"},
               {"place":"广州市第二中学(高中部)","address":"广东省广州市黄埔区水西路21号"},
               {"place":"广州市第二中学高中部饭堂","address":"广东省广州市黄埔区水西路(近开创大道)"},
               {"place":"广州市第二中学(东门)","address":"广东省广州市黄埔区水西路与香雪大道西交叉口西南100米"},
               {"place":"广州市二中苏元实验学校","address":"广东省广州市黄埔区水西路西50米"},
               {"place":"广州市第二中学(西侧门)","address":"广东省广州市越秀区应元路21号"},
               {"place":"广州市第二中学停车场","address":"广东省广州市越秀区吉祥路与应元路交叉口西北50米"},
               {"place":"广州市第二中学停车场(出入口)","address":"广东省广州市越秀区吉祥路与应元路交叉口西北50米"},
           ]
       })
       let all = erzhong.type.concat(wushan.type);
       this.setData({
           wushan: wushan,
           erzhong: erzhong,
           all: all
       })
       console.log(this.data.all)
    },
    onLoad () {

    }
})