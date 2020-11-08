import {
    get,getLikeMenu
} from "../../utils/db"
Page({
    data: {
        page: 1,
        pageSize: 4,
        types: [{
                src: "../../imgs/index_07.jpg",
                typename: "主食",
                id:"38597c165fa602df006ba9700907c97c"
            },
            {
                src: "../../imgs/index_09.jpg",
                typename: "饮品",
                id:"b333e0365fa604ea005c775d629ce3cc"
            },
        ],
        recipes: []
    },
    //页面加载
    async onLoad() {
        this.getList()
    },
    //页面触底
    onReachBottom() {
        //页面滚动触底,page累计
        this.data.page += 1;
        this.getList()
    },
    //获取列表
    async getList() {
        var pageSize = this.data.pageSize; //每页多少条数据
        var page = this.data.page;
        var skip = (page - 1) * pageSize; //要跳过的数据
        var res = await get('menu', {
            status: 1
        }, skip, pageSize);
        // console.log(res, page);

        var arr = res.data;
        this.setData({
            page,
            recipes: this.data.recipes.concat(arr),
            //新数据和旧数据进行拼接
        })
    },
    //跳转到详情页
    toDetail(e) {
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.id,
        })
    },
    //跳转到菜谱分类页
    toSort() {
        wx.navigateTo({
            url: '../type/type',
        })
    },
    //跳转到关注页面
      toFollow(e) {
        
        wx.navigateTo({
          url: '../list/list?id='+"follow",
        })

    },
    //跳转到主食或者饮品页面
    toFood(e){
      wx.navigateTo({
        url: '../list/list?id='+e.currentTarget.id,
      })
    }


})