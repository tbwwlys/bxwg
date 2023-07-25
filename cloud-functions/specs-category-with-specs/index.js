// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const { list } = await db.collection('specs_category').aggregate()
    .lookup({
      from: 'specs',
      localField: '_id',
      foreignField: 'category',
      as: 'specs'
    }).end()
    console.log(list)
    return list
}