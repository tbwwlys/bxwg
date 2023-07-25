const db = wx.cloud.database()
const _ = db.command
// db.collection('restaurants').where({
//   location: _.geoNear({
//     geometry: db.Geo.Point(115.85817, 28.68268),
//     minDistance: 1000,
//     maxDistance: 5000
//   })
// }).get()
  // 筛选出距离当前位置5000m范围内的店铺
const list = (longitude, latitude) => {
  return db.collection('store').where({
    location: _.geoNear({
      geometry: db.Geo.Point(longitude, latitude),
      maxDistance: 5000  
   })
  }).limit(10).get()
}


export default {
  list
}