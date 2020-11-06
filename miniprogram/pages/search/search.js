// pages/search/search.js
import {get} from "../../utils/db.js"
const db = wx.cloud.database();
const _ = db.command;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showTag:false, //控制热门搜索和近期搜索是否显示
    keyword: "", //输入框内容
    list: [], //热门搜索列表
    history: [], //近期搜索
  },
  async onLoad(){
	  //获取访问量最高的10条记录
  var result =await get("menu",{},0,4,{field:"views",sort:"desc"})  
  
	// console.log(result)
	this.setData({
		list:result.data
	})
  },
  onShow(){
    //读取缓存
     var history= wx.getStorageSync("history")||[]
     this.setData({
       history
     })
    },
  //监听inuput输入框的内容
  myInput(e) {
    var keyword = e.detail.value;
    this.data.keyword = keyword;
   
  },
  //输入框点击事件
  showContent(){
    this.setData({
      showTag:true
     })
  },
  //进行搜搜
  doSearch(){
	  //操作缓存
	  // var arr=[]
	  var arr=wx.getStorageSync("history")||[];
	  var index=arr.findIndex(item=>{
		  return item==this.data.keyword
	  })
	  if(index==-1){
		    arr.unshift(this.data.keyword)
	  }else{
		  //删除已经存在的；添加新来的
		  arr.splice(index,1)
		  arr.unshift(this.data.keyword)
	  }
	  wx.setStorageSync("history",arr)
	
	  
	  //1.页面跳转
	  wx.navigateTo({
		  url:"/pages/list/list?keyword="+this.data.keyword
	  }) 
  },
  //跳转到list页面
  toList(e){ 
    console.log(e);
    var keyword=e.currentTarget.dataset.keyword;
    wx.navigateTo({
      url: '/pages/list/list?keyword='+keyword,
    })
  },
  //跳转到详情页
  toDetail(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  },

})