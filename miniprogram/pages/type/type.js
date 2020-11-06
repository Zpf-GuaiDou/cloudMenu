// pages/type/type.js
import {get} from "../../utils/db"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[
      // {typename:"营养菜谱",'src':"../../static/type/type01.jpg"},
      // {typename:"儿童菜谱",'src':"../../static/type/type02.jpg"},
      // {typename:"家常菜谱",'src':"../../static/type/type03.jpg"},
      // {typename:"主食菜谱",'src':"../../static/type/type04.jpg"},
      // {typename:"西餐菜谱",'src':"../../static/type/type05.jpg"},
      // {typename:"早餐菜谱",'src':"../../static/type/type06.jpg"},
    ]
  },
  async onLoad(){
    var openid=wx.getStorageSync("openid")
    var result=await get("class",{_openid:openid});
    console.log(result);
    this.setData({
      types:result.data
    })
    
  }

 
})