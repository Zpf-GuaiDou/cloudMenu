
function upload(localPath=""){
  var random= Math.floor(Math.random()*10)
  var nowtime=new Date().getTime()+random    //获取时间戳
  var ext=localPath.split(".").pop()  //获取扩展名
  return wx.cloud.uploadFile({
    cloudPath:nowtime+"."+ext,
    filePath:localPath
  })
}
/*
 参数说明:  arr  ["http://tem/***.png","http://tem/***.png"]
 */
async function multiUpload(arr=[]){
  var arrPromise=[]
  arr.forEach((item,index)=>{
    var nowtime=new Date().getTime()+"_"+index;   //时间戳
    var ext=item.split(".").pop()  //获取扩展名
    var itemPromise= wx.cloud.uploadFile({
      cloudPath:nowtime+"."+ext,
      filePath:item
    })
    arrPromise.push(itemPromise)
  })

  return  Promise.all(arrPromise)



}

export {upload,multiUpload}