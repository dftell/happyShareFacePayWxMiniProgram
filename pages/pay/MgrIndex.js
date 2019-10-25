var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '账户名', //用户昵称
    avatar: '', //用户头像
    isLogin: false, //是否登录
    isAvatar: false, //是否获取头像
    isAvatarLoading: false, //获取头像loading
    isLoginLoading: false,//
    userId: "18926019928",
    userPwd: "abcdef123",
    userName: "",
    userDept: "",
    userPos: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  login:function(e) {
    if (this.data.isLogin == false) {
      var mythis = this;
      console.log(mythis);
      var logined = app.login(e.detail.value.loginId , e.detail.value.loginPwd,function(){
        var jurl = "../pay/menu";
        wx.navigateTo({
          url: jurl
        }
        );
      });
      
    }
  },
  toast:function(message) {
    wx.showToast({
      content: message,
      duration: 3000
    });
  }
})