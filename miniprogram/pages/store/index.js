import storeApi from '../../api/store'
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const key = 'LVABZ-YSV6N-RPWFL-SWRNH-LXS6V-THB7W';
const computedBehavior = require('miniprogram-computed').behavior
const chooseLocation = requirePlugin('chooseLocation')
import { userBehavior } from '../../behaviors/user-behavior'
Page({
  // 引入computed
  behaviors: [userBehavior, computedBehavior],
  data: { 
    latitude: 0,
    longitude: 0,
    storeList: [],
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已关闭'
    },
    storeDetailShow: false,
    mapKey: key,
    collapse: false
  },

  computed: {
    markers(data) {
      return data.storeList.map((item, index) => {
        return {
          id: index + 1,
          key: item._id,
          title: item.name,
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          iconPath: '../../assets/image/marker.png',
          width: '55rpx', height: '69rpx'
        }
      })
    }
  },

  mapContext: null,
  mapSdk: null,


  onLoad: function() {
    this.initMapSdk(),
    this.loadCurrentLocation(),
    this.initMapContext()
  },

  onShow() {
    const location = chooseLocation.getLocation()
    if (location) {
      const { latitude, longitude } = location
      this.setData({
        latitude,
        longitude
      })
      this.fetchStoreList()
    }
  },

  onUnload() {
    chooseLocation.setLocation(null)
  },

  onMarkerTab(e) {
    const { markerId } = e.detail
    const store = this.data.storeList[markerId - 1] 
    // console.log(store)
    this.setData({
      storeDetailShow: true
    })
    this.setCurrentStore(store)
  },
  chooseLocation() {
    const key = this.data.mapKey; //使用在腾讯位置服务申请的key
    const referer = '冰雪王国'; //调用插件的app的名称
    const location = JSON.stringify({
      latitude: this.data.latitude,
      longitude: this.data.longitude
    });
    
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location
    });
  },
  // 获取店铺详细信息传到弹窗
  popupStoreDetail(e) {
    // console.log(e)
    const { store } = e.currentTarget.dataset
    this.setData({
      storeDetailShow: true,
    })
    this.setCurrentStore(store)
  }, 
  // 控制地图是否展开
  collapse() {
    this.setData({
      collapse: !this.data.collapse
    })
  },
  // 初始化sdk，获取地图距离计算方法
  initMapSdk() {
    this.mapSdk = new QQMapWX({key})
  },
  // 获取数据库中的store数据
  fetchStoreList() {
    storeApi.list(this.data.longitude, this.data.latitude).then(res => {
      this.makeStoreList(res.data)
    })
  },
  // 点击location图片跳转到地图
  navigateLocation(e) {
    const {latitude, longitude} = e.currentTarget.dataset.location;
    wx.openLocation({
      latitude,
      longitude
    })
  },
  // 点击phone图片跳转到拨打电话
  call(e) {
    console.log(e)
    const { phone } = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  makeStoreList(storeList) {
    if(storeList.length === 0) {
      this.setData({
        storeList: []
      })
    }
    const locationList = storeList.map(item => {
      const location = item.location
      return {
        latitude: location.latitude,
        longitude: location.longitude
      }
    })  
    // console.log(locationList)
    // console.log(this.mapSdk)
    // 计算出当前位置与店的距离
    this.mapSdk.calculateDistance({
      from: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      to: locationList,
      success: (res) => {
        // console.log(res)
        storeList.forEach((item, key) => {
          storeList[key]['distance'] = (res.result.elements[key].distance/1000).toFixed(2)
        })
        this.setData({
          storeList
        })
      }
    })
  },

  goToMenu (e) {
    const { storeId } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/menu/index',
    })
  },
  initMapContext() {
    wx.createSelectorQuery().select('#store-map').context((res) => {
      // console.log(res)
      this.mapContext = res.context
    }).exec() 
  },
  // 设置当前位置
  async loadCurrentLocation() {
    this.setData({
      latitude: this.data.user.location.latitude,
      longitude: this.data.user.location.longitude
    })
    this.fetchStoreList()
  },
  // 返回并将地图调整至中心
  goToCurrentLocation() {
    this.mapContext.moveToLocation()
    this.loadCurrentLocation()
  }
})