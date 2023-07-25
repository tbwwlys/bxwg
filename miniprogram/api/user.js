// import {db} from './cloud-init'

// const create = ({ phoneNumber }) => {
//   return db.collection('user').add({
    
//     data: {
//       phone_number: phoneNumber
//     }
//   })
// }
wx.cloud.init()
const db = wx.cloud.database()

// const me = () => {
//   return db.collection('user').get()
// }
const me = () => {
  return db.collection('user').get()
} 
export default {
  me
}