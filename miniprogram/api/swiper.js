function list () {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://www.fastmock.site/mock/3642c573c4457a8b296a72f7917d911a/bxwg/api/swiper', 
      method: 'GET',
      success (res) {
        // console.log(res.data)
        resolve(res)
      }
    })
  })
}
module.exports = {
  list
}
// const db = wx.cloud.database()
// const list = () => {
//   return db.collection('mx_swiper').get();
// }

// export default {
//   list
// }