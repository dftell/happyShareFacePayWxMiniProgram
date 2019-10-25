// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"武府投资产品目录",
        happyShareCard:"乐享智卡",
    happyShareInvest:"乐享智投",
    happySharePay:"乐享智付",
    happyShareLottery:"乐享智彩",
    happyShareControl:"乐享智控",
    happyShareMgr:"乐享智营",
    returnIndex:"返回主页",
    produces:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.produces);
    if(this.data.produces == null)
    {
    var mythis = this;
    wx.request({
      url: 'https://www.wolfinv.com/HappyShareETech/producelist.json',
      header: { 'content-type': 'application/json' },
      success:function(res)
      {
        console.log(res.data);
          mythis.setData(
            {
              produces:res.data
            }
          );
      }
    })
    }
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
  gotoUrl: function (outurl) {
    wx.navigateTo({
      url: "../menu/gotoUrl?url=" + outurl,
    })
  } ,
  gotoPay:function()
  {
    wx.navigateTo({
      url: '../pay/index'
    })
  },
  gotoInv:function()
  {
    //this.switchPage('乐享智投','','https://www.wolfinv.com/');
    //console.log(this.data.produces.produces[0]);
    this.switchPage(this.data.produces.produces[0]);
  },
  gotoSaas:function()
  {
    //this.gotoUrl("https://www.wolfinv.com/saas/index.asp");
    this.switchPage(this.data.produces.produces[1]);
  },
  gotoIIC:function()
  {
    this.switchPage(this.data.produces.produces[2]);
  },
  gotoCard:function()
  {
    wx.navigateTo({
      url: '../charge/charge',
    })
  },
  gotoLottery:function()
  {
    //this.gotoUrl("https://www.wolfinv.com/pk10/app/requestInsts.asp");
    
    this.switchPage(this.data.produces.produces[3]);
  },
  switchPage:function(produce)
  {
    console.log(produce);
    //if(produce.disable)
    //  return;
    
    wx.navigateTo({
      url: '../lottery/index?title=' + produce.title + '&intraduce=' + produce.intraduce + '&imgUrl=' + produce.imgUrl
    })
  },
  retIndex:function()
  {
    wx.navigateTo({
      url: '../index/index',
    })
  }

})