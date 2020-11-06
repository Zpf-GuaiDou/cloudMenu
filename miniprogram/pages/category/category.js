import {
  delOne,
  get,
  add,
  updateOne
} from "../../utils/db"
Page({
  data: {
    list: [], //分类列表
    name: "", //菜谱名称
    id: "", //修改的id
    addTag: "", //判断添加按钮是否出现
    revTag: "" //判断修改按钮是否出现    
  },
  //获取数据库菜单
  async onLoad(e) {
    var result = await get("class")
    this.setData({
      list: result.data
    })
  },
  //显示添加的输入框
  showAdd() {
    this.setData({
      addTag: true
    })
  },
  //显示修改输入框
  showRev(e) {
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    this.data.id = id;
    this.setData({
      revTag: true,
      name
    })
  },
  //监听输入框输入的菜单名称
  myInput(e){
    // console.log(e);
    var name=e.detail.value;
    this.data.name=name;
  },
  //添加
  async doAdd(){
    //添加到数据库
    var result =await add("class",{name:this.data.name}).catch(err=>console.log(err))
    //输入框隐藏
    //将数据在页面显示
    var result = await get("class")
    this.setData({
      list:result.data,
      addTag:false
    })
  },
  //修改
async doUpdate(){
updateOne("class",this.data.id,{name:this.data.name}).catch(err=>console.log(err))
//隐藏输入框
//将数据在页面显示
var result = await get("class")
// console.log(result);

this.setData({
  list:result.data,
  revTag:false
})
},
  //删除菜单功能
  async delmenu(e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.showModal({
      title: '温馨提示!',
      content: '您确定要删除吗?',
      success: async result => {
        console.log(result);
        
        if(result.confirm){
          var result = await delOne("class",id).catch(err=>console.log(err))
          var result =await get("class")
          this.setData({
            list: result.data
          })
        }
      }
    })



    // var resule = await delOne("class",id)
  }
})