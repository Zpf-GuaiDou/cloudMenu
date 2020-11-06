// const db =wx.cloud.database();
// //添加数据
// function add(_collection,_data){
//   return db.collection(_collection).add({
//     data:_data
//   })
// }
// //删除一条数据
// function delOne(_collection,_id){
//   return db.collection(_collection).doc(_id).remove()
// }
// //查询一条记录
// function getOne(_collection,_id){
//   return db.collection(_collection).doc(_id).get()
// }
// //修改一条数据
// function updateOne(_collection,_id,_update){
//   return db.collection(_collection).doc(_id).update({
//     data:_update
//   })
// }
const db = wx.cloud.database();
//添加数据
function add(_collection, _data = {}) {
  return db.collection(_collection).add({
    data: _data
  })
}
//获取数据库全部
function get(_collection, _data = {},_skip=0,_limit=10,_orderBy={field:"addtime",sort:"desc"}) {
  return db.collection(_collection).where(_data).orderBy(_orderBy.field,_orderBy.sort).skip(_skip).limit(_limit).get()
}
//获取一条数据
function getOne(_collection, _data) {
  return db.collection(_collection).doc(_data).get()
}
//删除一条数据
function delOne(_collection,_data) {
  return db.collection(_collection).doc(_data).remove()
}
//更改一条数据
function updateOne(_collection, _data, _update = {}) {
  return db.collection(_collection).doc(_data).update({data:_update})
}
/*
数量累加
	_collection  集合名称
	_id				记录的id
	field			字段名称
	_count			数量
*/
//计算访问量
function inc(_collection,_id,_count="1"){
	const _ = db.command
	return db.collection(_collection).doc(_id).update({
	  data: {
	    views: _.inc(_count)
	  }
	})
}
//计算关注数量
function incLike(_collection,_id,_count=1){
	const _ = db.command
	return db.collection(_collection).doc(_id).update({
		data:{
			likes:_.inc(_count)
		}
	})
}
/*执行搜索
	@params   _collection   集合名称
			  keyword		关键字（字符串）
*/
function search(_collection,keyword){
	return db.collection(_collection).where({
	  name: db.RegExp({
	    regexp: keyword,
	    options: 'i',
	  })
	}).get()
}
/*获取我关注的menu*/
function getLikeMenu(arr=[]){
	return db.collection("menu").where({
		_id:db.command.in(arr)
	}).get()
}
export {add,get,getOne,delOne,updateOne,inc,incLike,search,getLikeMenu}