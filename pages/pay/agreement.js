// pages/pay/agreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"商户合作协议",
    machineNames:["青蛙扫脸","支付宝扫脸"],
    machineIndex:1,
    payPaths:["当面付"],
    payPathIndex:0,
    //agreeInfo:
    //{
      applyUserName:"",
      applyUserId:"",
      applyAddress:"",
      applyContact:"",
      applyContactId:"",
      applyContactTel:"",
      applyCnt:1,
      payPath:"当面付",
      payPathRate:0.38
    //}

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
  bindMachineChange:function(e)
  {
    this.setData({
      machineIndex: e.detail.value
    })

  },
  bindPathChange:function(e)
  {
    this.setData({
      payPathIndex: e.detail.value
    })

  },
  formSubmit:function(e)
  {
    console.log(e.detail);  
    /*
    var mythis = this;
      this.setData(
        {
          applyUserName:e.detail.value.applyUserName,
          applyUserId: e.detail.value.applyUserId,
          applyAddress: e.detail.value.applyAddress,
          applyContact: e.detail.value.applyContact,
          applyContactId: e.detail.value.applyContactId,
          applyContactTel: e.detail.value.applyContactTel,
          payPath: mythis.data.payPaths[mythis.data.payPathIndex],
          PayRate: e.detail.value.PayRate
        }
      );
    
    console.log(this.data);*/
    var mythis = this;
    var strUrl = '../pay/outAgreement?applyUserName={0}&applyUserId={1}&applyAddress={2}&applyContact={3}&applyContactId={4}&applyContactTel={5}&applyCnt={6}&payPath={7}&payPathRate={8}';
    console.log(e.detail);
    var url = strUrl.replace("{0}", e.detail.value.applyUserName);
    url = url.replace("{1}", e.detail.value.applyUserId);
    url = url.replace("{2}", e.detail.value.applyAddress);
    url = url.replace("{3}", e.detail.value.applyContact);
    url = url.replace("{4}", e.detail.value.applyContactId);
    url = url.replace("{5}", e.detail.value.applyContactTel);
    url = url.replace("{6}", e.detail.value.applyCnt);
    url = url.replace("{7}", mythis.data.payPaths[mythis.data.payPathIndex]);
    url = url.replace("{8}", e.detail.value.payPathRate);
    //console.log(url);
    wx.navigateTo({
      url: url
    });
  }
})