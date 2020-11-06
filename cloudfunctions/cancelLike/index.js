// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV 
})
//获取数据库引用
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var menuId=event.menuId;
  var openid=event.openid;
return db.collection("likes").where({
  menuId:menuId,
  _openid:openid
}).remove()
}