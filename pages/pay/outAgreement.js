// pages/pay/outAgreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outurl:'https://www.wolfinv.com/happyShareETech/agreement.asp?',
    weburl:"https://www.wolfinv.com/happyShareETech/agreement.asp",
    value:null,
    title:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options.url);
    //var params = options.url;
    //console.log(params);
    //params = params.replace("../pay/outAgreement?","");
    //console.log(params);
    //var fullurl = this.data.outurl + encodeURI(params);
    var fullurl = "applyUserName="+options.applyUserName;
    fullurl = fullurl +"&applyUserId="+options.applyUserId;
    fullurl = fullurl + "&applyAddress=" + options.applyAddress;
    fullurl = fullurl + "&applyContact=" + options.applyContact;
    fullurl = fullurl + "&applyContactId=" + options.applyContactId;
    fullurl = fullurl + "&applyContactTel=" + options.applyContactTel;
    fullurl = fullurl + "&applyCnt=" + options.applyCnt;
    fullurl = fullurl + "&payPath=" + options.payPath;
    fullurl = fullurl + "&payPathRate=" + options.payPathRate
    fullurl = this.data.outurl + encodeURI(fullurl);
     console.log(fullurl);
     this.setData(
       {
         weburl :fullurl
       }
     );
    console.log(this.data.weburl);
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
  msgHandler: function (e) {    //(h5像小程序传递参数）
    console.log(e.detail.data) //获取到来自也页面的数据
    var info = (e.detail.data)[0]
    this.setData({
      value: info.value
    });
    this.setData({
      title: info.title
    });
  }
})