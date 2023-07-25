// app.ts
import userApi from './api/user'
import {userBehavior} from './behaviors/user-behavior'

App({
  behaviors: [],
  globalData: {
  },
  onLaunch() {
    // this.checkUser()
    if (!this.isLogin()) {
      this.checkUser() 
    }
    this.loadCurrentLocation()
  },
  loadCurrentLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const longitude = res.longitude
        const latitude = res.latitude
        wx.setStorageSync('location', {latitude, longitude})
      }
    }) 
  },
  isLogin() {
    return Boolean(wx.getStorageSync('user'))
  },
  checkUser() {
    wx.showLoading({
      title: '正在检查登录',
    })
    userApi.me().then(res => {
      if (res.data.length) {
        wx.setStorageSync('user', res.data[0])
        wx.reLaunch({
          url: 'pages/index/index',
        })
      }
      wx.hideLoading()
    })

  },
  getPhoneNumber() {
    return wx.getStorageSync('phoneNumber')
  }
})