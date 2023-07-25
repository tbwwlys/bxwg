import { userBehavior } from '../../behaviors/user-behavior'
const swiper = require('../../api/swiper')
import goodsApi from '../../api/goods'
import goodsCategoryApi from '../../api/goods_category'

Page({
  behaviors: [userBehavior],
  data: {
    headerStyle: '',
    swiperList : [],
    goodsList: [],
    currentCategoryIndex: 0,
    sidebarCurrent: 0,
    goodsDialogShow: false,
    selectedGoods: null
  },

  onLoad (options) {
    this.makeHeaderStyle()
    this.fetchSwiperList()
    this.fetchData()
  },
  onSideBarChange(e) {
    this.setData({
      currentCategoryIndex: e.detail.index
    })
  },
  onGoodsListChange(e) {
    this.setData({
      sidebarCurrent: e.detail.index
    })
  },
  onGoodsSelected(e) {
    // this.selectGoods(e.detail)
    console.log(e.detail)
    this.setData({
      selectedGoods: e.detail,
      goodsDialogShow: true,
    })
  },
  fetchData() { 
    goodsApi.listWithCategory().then(res => {
      // console.log(res)
      this.setData({
        goodsList: res.result.list
      })
    })
  },
  fetchSwiperList() {
    swiper.list().then(res => {
      this.setData({
        swiperList: res.data
      })
    })
  },
  switchCurrentStore() {
    this.setCurrentStore(null)
    wx.navigateBack({
      delta: 0,
    })
  },
  makeHeaderStyle () {
    const { top, bottom, height } = wx.getMenuButtonBoundingClientRect()
    const menuBottonCenterPoint = top + height/2 
    const headerStyle = 'margin-top: calc(' + menuBottonCenterPoint + 'px - 32rpx)'
    this.setData({
      headerStyle
    })
  }
})