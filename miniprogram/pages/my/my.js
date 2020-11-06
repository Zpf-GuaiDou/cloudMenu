// pages/my/my.js
const app = getApp();
// import{get,getLikeMenu} from '../../utils/db'
const db = wx.cloud.database();
import {
  get,
  getLikeMenu
} from "../../utils/db"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //定义存储用户的信息
    userInfo: {},
    //定义切换功能菜单下标
    menuIndex: 0,
    isLogin: false, //是否登录。 false 未登录  true，已经登录
    //定义菜单信息
    recipes: [],
    types: [],
    lists: [],
  },
  //页面加载
  async onShow() {
    let userInfo = app.globalData.userInfo;
    if (userInfo == null) {
      this.data.isLogin = false
    } else {
      this.data.isLogin = true
    }

    //菜谱
    {
      //获取菜谱数据
      var openid = wx.getStorageSync("openid"); //获取缓存的openid
      //菜单列表
      var menuresult = await get("menu", {
        _openid: openid
      });
      //存贮菜单的内容
      var recipes = menuresult.data
    }
    //分类
    {
      var menulist = await get("class", {
        _openid: openid
      })
      
      //存贮分类的内容
      var types = menulist.data
    }
    //关注
    {
      //获取我添加的菜单
      var openid = wx.getStorageSync('openid')
      var result = await get('likes', {
        _openid: openid
      })
      var arr = result.data.map(item => {
        return item.menuId
      })
      //根据menuid查询memu集合，获取菜谱的信息
      var followresult = await getLikeMenu(arr)
      //存贮我关注的菜单
      var lists = followresult.data; //关注菜谱列表
      // console.log(lists);
      
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

//把数据展示出来
    this.setData({
      userInfo,
      isLogin: this.data.isLogin,
      recipes,
      types,
      lists
    })
    //获取用户登录信息
    if (app.globalData.userInfo != null) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: true
      })
    } else {
      //如果没有用户信息，从app.js中再获取用户信息
      app.getUserInfo = (res) => {
        this.setData({
          userInfo: res.userInfo,
          isLogin: true
        })
      }
    }
  },
  //判断是否获取用户信息
  getInfo(e) {
    // console.log(e);
    if (e.detail.userInfo !== undefined) {
      this.setData({
        userInfo: e.detail.userInfo,
        isLogin: true
      })
    }
  },
  //taBar导航
  changemenu(e) {
    this.setData({
      menuIndex: e.currentTarget.dataset.index
    })
  },
  //跳转到菜单详情页
  toDetail(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  },
  //跳转到添加页面
  toAddmenu() {
    wx.navigateTo({
      url: '/pages/pbrecipe/pbrecipe',
    })
  },
  //跳转到菜谱分类页面
  toType() {
    wx.navigateTo({
      url: '/pages/category/category',
    })
  },

  //跳转到list列表页
  async toTypeList(e) {
    // console.log(e)
    wx.navigateTo({
      url: '../list/list?id=' + e.currentTarget.id,
    })
  },
  _delStyle() {
    wx.showModal({
      title: "删除提示",
      content: "确定要删除么？",
    })
  }
})