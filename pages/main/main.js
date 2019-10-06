// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '用户注册',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    region: [
      "四川省",
      "广安市",
      "海珠区"
    ],
    customItem: "全部"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  submit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})