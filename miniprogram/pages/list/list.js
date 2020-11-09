// pages/list/list.js

import {
  get,
  search,
  getLikeMenu
} from "../../utils/db"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },
  //加载页面数据
  async onLoad(e) {
    if (e.keyword) {
      var keyword = e.keyword;
      var result = await search("menu", keyword).catch(err => {
        console.log(err);
      })
      var lists = result.data
      //星星
      lists.forEach(item => {
        if (item.views == 0) {
          item.star = 0;
        } else if (item.views > 0 && item.views <= 10) {
          item.star = 1;
        } else if (item.views > 10 && item.views <= 20) {
          item.star = 2;
        } else if (item.views > 20 && item.views <= 30) {
          item.star = 3;
        } else if (item.views > 30 && item.views <= 40) {
          item.star = 4;
        } else {
          item.star = 5
        }
      })
    } else if (e.id == "follow") {
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
      lists.forEach(item => {
        if (item.views == 0) {
          item.star = 0;
        } else if (item.views > 0 && item.views <= 10) {
          item.star = 1;
        } else if (item.views > 10 && item.views <= 20) {
          item.star = 2;
        } else if (item.views > 20 && item.views <= 30) {
          item.star = 3;
        } else if (item.views > 30 && item.views <= 40) {
          item.star = 4;
        } else {
          item.star = 5
        }
      })


    } else {
      var result = await get("menu", {
        classId: e.id
      })
      // console.log(result);
      var lists = result.data
      //星星
      lists.forEach(item => {
        if (item.views == 0) {
          item.star = 0;
        } else if (item.views > 0 && item.views <= 10) {
          item.star = 1;
        } else if (item.views > 10 && item.views <= 20) {
          item.star = 2;
        } else if (item.views > 20 && item.views <= 30) {
          item.star = 3;
        } else if (item.views > 30 && item.views <= 40) {
          item.star = 4;
        } else {
          item.star = 5
        }
      })
    }
    this.setData({
      lists,
    })
  },


  nav(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
    })
  }

})