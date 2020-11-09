//app.js
App({
  //小程序初始化的时候，获取用户信息
  onLaunch() {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
   wx.setStorageSync('logs', logs)
    wx.cloud.init({
      env:"test-5gzxq2787c4a5bb3"
    })
    //获取用户授权
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          
          //获取用户信息
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // var nickName=res.userInfo.nickName
              // wx.setStorageSync('nickName', nickName)
              this.globalData.userInfo = res.userInfo;
              if(this.getUserInfo){
                this.getUserInfo(res)
              }
            }
          })
        }
        	
	//获取openid，存储到本地缓存
        var result = wx.cloud.callFunction({
          name:"login"
        }).then(res=>{

          var openid=res.result.openid;
          wx.setStorageSync('openid', openid)
        })
      }
    })


  },
  globalData: {
    userInfo: null
  }
})



    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

//   //   this.globalData = {}
//   // }
// })
