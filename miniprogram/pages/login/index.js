// pages/login/index.js
import userApi from '../../api/user'
import {userBehavior} from '../../behaviors/user-behavior'
// index.js
// 获取应用实例
const app = getApp()
const swiper = require('../../api/swiper')
Page({
  behaviors: [userBehavior],
  data: {
    phoneNumber: '1',
  },

  isLogin () {
    userApi.me().then(res => {
      wx.setStorageSync('user', results.data[0])
      this.updatePhoneNumber()
      this.setData({
        phoneNumber: res.data[0].phone_number,
        user: res.data[0]
      })
    })
  },
  onLoad () {
    if (getApp().isLogin()) {
      wx.navigateBack({
        delta: 0
      })
    }
  }


})


  // getPhoneNumber(e) {
  //   console.log(e)
  // },

  // login(e) {

  //   const cloudId = e.detail.cloudID

  //   wx.cloud.callFunction({
  //     name: 'get-phone-number', // 云函数
  //     data: {
  //       weRunData: wx.cloud.CloudID(cloudId),// 这个cloudID值到云函数端会被替换
  //     } 
  //   }).then(res => {
  //     const phoneNumber = res.result
  //     userApi.create({ phoneNumber }).then(response => {
  //       userApi.me().then(results => {
  //         wx.setStorageSync('user', results.data[0])
  //         wx.navigateBack({
  //           delta: 0
  //         })
  //       })
        
  //     })
  //     console.log(res)
  //     this.setData(res => {
  //       wx.setStorageSync('phoneNumbre', res.result)
  //       wx.navigateBack({
  //         delta: 0
  //       })
  //     })
  //   })
  //   // console.log(e)
  // }
// })