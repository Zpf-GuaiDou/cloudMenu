import {
    get
} from "../../utils/db"
Page({
    data: {
        page: 1,
        pageSize: 4,
        types: [{
                src: "../../imgs/index_07.jpg",
                typename: "营养菜谱"
            },
            {
                src: "../../imgs/index_09.jpg",
                typename: "儿童菜谱"
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
    nav(e) {
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.id,
        })
    },
    // async onShow() {
    //     let res = await get("menu", {
    //         status: 1
    //     });
    //     let menuarr = res.data;
    //     this.setData({
    //         recipes: menuarr
    //     })

    // }
})