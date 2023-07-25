// pages/me/index.js
const computedBehavior = require('miniprogram-computed').behavior
import {userBehavior} from '../../behaviors/user-behavior'
Page({
  behaviors: [userBehavior, computedBehavior],
  data: {
    // mobile: ''
  },
  // computed: {
  //   desensitiveMobile(data) {
  //     if (!data.user) {
  //       return ''
  //     }
  //     let mobile = data.user.phoneNumber
  //     if (mobile) {
  //       mobile = mobile.replace(/^(\d{3})\d{6}(\d{2}$)/, '$1******$2')
  //     }
  //     return mobile;
  //   }
  // },
  onShow() {
    // if (!this.data.user) {
    //   const user = wx.getStorageSync('user')
    //   this.setData({
    //     user
    //   })
    // }
  },

  gotoCustomPage (e) {
    
    const { code } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/custom-page/index?code=${code}`,
    })
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
})
