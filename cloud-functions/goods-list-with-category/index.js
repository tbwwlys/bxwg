// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const result = await db.collection('goods_category').aggregate()
    .lookup({
      from: 'goods',
      localField: '_id',
      foreignField: 'category._id',
      as: 'goodsList',
    }).end()
    return result
}