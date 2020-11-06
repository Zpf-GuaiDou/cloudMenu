// pages/list/list.js

import {get,search,getLikeMenu} from "../../utils/db"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[
]
  },
//加载页面数据
async onLoad(e){
  // console.log(e);
  if(e.keyword){
    var keyword=e.keyword;
    var result=await search("menu",keyword).catch(err=>{
      console.log(err);
    })
    var lists=result.data
    //星星
    lists.forEach(item=>{
      if(item.views==0){
        item.star=0;
      }else if(item.views>0 && item.views<=10){
        item.star=1;
      }else if(item.views>10 && item.views<=20){
        item.star=2;
      }else if(item.views>20 && item.views<=30){
        item.star=3;
      }else if(item.views>30 && item.views<=40){
        item.star=4;
      }else{
        item.star=5
      }
    })
  }else{
    var result=await get("menu",{
      classId:e.id
    })
    // console.log(result);
    var lists=result.data
    //星星
    lists.forEach(item=>{
      if(item.views==0){
        item.star=0;
      }else if(item.views>0 && item.views<=10){
        item.star=1;
      }else if(item.views>10 && item.views<=20){
        item.star=2;
      }else if(item.views>20 && item.views<=30){
        item.star=3;
      }else if(item.views>30 && item.views<=40){
        item.star=4;
      }else{
        item.star=5
      }
    })
  } 
      this.setData({
        lists,
       })
},


nav(e){
  wx.navigateTo({
    url: '../detail/detail?id='+e.currentTarget.id,
  })
}
 
})