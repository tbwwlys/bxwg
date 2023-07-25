// index.js
// 获取应用实例
const app = getApp()
import storeApi from '../../api/store'
const swiper = require('../../api/swiper')
import { userBehavior } from "../../behaviors/user-behavior";

Page({
  behaviors: [ userBehavior ],
  
  data: {
    swiperList: [], 
    current: 0,
    // isLogin: false
    // memberInfo: false,
    nearbyStore: null
  },
  
  onLoad() {
    swiper.list().then(res => {
      this.setData({
        swiperList: res.data
      })
    })
  },
  onShow() {
  // this.loadMemberInfo()
    // if (!this.data.user) {
    //   const user = wx.getStorageSync('user')
    //   this.setData({
    //     user
    //   })
    // }
    const {location} = this.data.user
    // console.log(location)
    storeApi.list(location.longitude, location.latitude).then(res=>{
        !res.data.length || (this.setData({
          nearbyStore: res.data[0]
        }))
    })
    // console.log(this.data.nearbyStore)
  },

  // loadMemberInfo() {
  //   if (wx.getStorageSync('phoneNumber')) {
  //     this.setData({
  //       memberInfo: false
  //     })
  //   }
  //   // const memberInfo = app.getPhoneNumber()
  // },
 
  gotoLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  onMenuCardClick() {
    wx.switchTab({
      url: '/pages/store/index',
    })
  },
  onArticleClick() {
    wx.navigateTo({
      url: '/pages/web-view/index?url=https://www.baidu.com'
    })
  }

})
