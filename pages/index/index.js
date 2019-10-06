//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '使用乐享卡',
    corp:'武府科技|乐享生活',
    corpUrl:'http://www.wolfinv.com',
    intruduce:"免手续费使用信用卡不是梦！",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    /*
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../charge/charge?nickName=' + app.globalData.userInfo.nickName
      })
    }
    else
    {
      wx.navigateTo({
        url: '../main/regist'
      })
    }*/
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  formSubmit: function (event)
  {
    /*wx.navigateTo({
      url: '../charge/charge?nickName=' + userInfo.nickName
    })*/
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../charge/charge?nickName=' + app.globalData.userInfo.nickName + "&wxid=" + app.globalData.userInfo.wxid
      })
        //console.log(userInfo.nickName)
    }
    else {
      wx.navigateTo({
        url: '../main/regist'
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
