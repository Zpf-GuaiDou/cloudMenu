import {
	get,add
} from "../../utils/db";
import {
	multiUpload
} from "../../utils/tools.js";

const app=getApp()
Page({
	data: {
		list: [], //菜谱分类列表
		files: [], //图片临时地址数组
	},
	async onLoad() {
		//读取菜谱分类
		var result = await get("class")
		this.setData({
			list: result.data
		})
	},
	//选择图片，获取临时地址
	selectImage(e) {
		// console.log(e)
		var arr = e.detail.tempFilePaths //临时图片字符串数组
		var files = arr.map(item => {
			return {
				url: item
			}
		})
		// console.log(newArr)
		this.setData({
			files
		})
	},
	//发布菜单
	async mySubmit(e) {
		wx.showLoading({
			title:"正在提交",
			mask:true
		})
		//1 批量上传上传图片到云存储
		var arr = this.data.files.map(item => {
			return item.url 
		})
		var result =await multiUpload(arr);
		
		//获取图片云端地址组成的数组
		var image=result.map(item=>{
			return item.fileID
		})
		//2 添加数据库
		var data=e.detail.value;
		data.image=image;
		data.avatarUrl=app.globalData.userInfo.avatarUrl;
		data.nickName=app.globalData.userInfo.nickName;
		data.views=0;
		data.likes=0;
		data.addtime=new Date().getTime()
		data.status=1;
		
		var result = await add("menu",data).catch(err=>console.log(err))
		
		//3 交互效果
		wx.hideLoading()
		wx.showToast({
			title:"成功添加",
			duration:1500
		})
		setTimeout(()=>{
			wx.navigateBack()
		},1500)

	}
})
