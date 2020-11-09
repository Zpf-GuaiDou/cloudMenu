// pages/detail/detail.js
import {
  getOne,
  get,
  inc,
  incLike,
  add
} from '../../utils/db'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //保存菜单的详情
    detail: {},
    //保存菜单的图片地址
    imgs: [],
    id: "",
    isLike: false, //false 为关注; true 已关注
    allow:true,   // 关注的操作:true允许操作; false 不允许
  },
  async onLoad(e) {

    //获取菜谱id
    this.data.id = e.id;
    this.getDetail()
   
    //改变标题名称
    // wx.setNavigationBarTitle({
    //   title:this.data.detail.name
    // })
    //判断是否关注
    var openid = wx.getStorageSync('openid');
    var menuId = this.data.id;
    var result = await get("likes", {
      _openid: openid,
      menuId: menuId
    });
    if (result.data.length > 0) {
      //已关注
      this.setData({
        isLike: true,
      })
    } else {
      //未关注
      this.setData({
        isLike: false
      })
    }
 
  },
  //添加关注
  async addLike() {
    if(!this.data.allow){
      return;
    }
    this.data.allow=false; //不允许再点击
    //  1.在likes集合中添加记录
    var result = await add("likes", {
      menuId: this.data.id
    }).catch(err => console.log(err))

    //  2.更新menu集合中likes数量,累计1
    var result = await incLike("menu", this.data.id).catch(err => console.log(err))
    this.data.allow=true;		//允许点击
    // 3.更改页面数据
    this.data.detail.likes += 1;
    this.setData({
      isLike: true,
      detail: this.data.detail
    })
  },
  //取消关注
	cancelLike(){
    //如果allow为false,不允许点击
    if(!this.data.allow){
      return;
    }
    this.data.allow=false; //不允许点击
		//1.通过云函数删除likes中记录
		var openid=wx.getStorageSync("openid");
		// console.log(openid);return;
		wx.cloud.callFunction({
			name:"cancelLike",
			data:{
				openid:openid,
				menuId:this.data.id
			}
		})
		.then(async res=>{
			// console.log(res)
			//1.menu中like减1
			var result =await incLike("menu",this.data.id,-1).catch(err=>console.log(err))
     this.data.allow=true;
      //2 页面减少
			this.data.detail.likes-=1;
			this.setData({
				detail:this.data.detail,
				isLike:false
      })
		})
		.catch(err=>{
			console.log(err)
		})
		
  },
  //获取详情
  async getDetail(){
   //保存详情页的图片
   var result = await inc("menu", this.data.id, 1).catch(err => console.log(err))
   //详情页详情
   let res = await getOne("menu",this.data.id);
  //  console.log(res);
   this.setData({
     detail: res.data,
     imgs: res.data.image
   })
   wx.setNavigationBarTitle({
     title:this.data.detail.name
   })
  },
  //图片全屏预览
  previewImage(e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: this.data.imgs,
      current: url
    })
  }
})