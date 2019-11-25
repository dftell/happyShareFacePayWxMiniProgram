var app = getApp();
// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"乐享智付",
    intruduce:"本公司为支付宝，微信的合作伙伴，不但经销智能扫脸支付设备，同时为其系统服务商,开发商，为扫码支付设备提供二次开发。本公司在支付领域的信念是：不求硬件赚钱，只求在线上线下搭起桥梁，长久为客户提供更优质的服务！",    
    saleProduceWeChat:"青蛙支付",
    saleProduceAliPay: "蜻蜓支付",
    saleAgreement:"合作协议",
    wxurl:"http://images.lfwin.com/upload/kxadmin/2019_07/08_W8ofoIj2sT.jpg",
    alipayurl:"http://images.lfwin.com/upload/kxadmin/2019_08/13_RyRxHoa7OT.jpg",
    userInfo: {},
    hasUserInfo: false,
    provider: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    unionId:"",
    telNo:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    } else 
    {
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
  userInfoHandler:function(e)
  {
    console.log("lkjdldfljddfljdf");
    //pp.wxLogin();
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
  gotoAgreement:function()
  {
    //app.wxLogin();
    wx.navigateTo({
      url: '../pay/agreement'
    })
  }
  ,returnMenu:function()
  {
    
    wx.navigateTo({
      url: '../menu/menu'
    })
  },
  gotoSaleMgr:function()
  {
    
    wx.navigateTo({
      url: '../pay/MgrIndex'
    })
  }
})