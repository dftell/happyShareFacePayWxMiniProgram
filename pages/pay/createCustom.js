const categeriesJSON = require('../../js/categery.js');
var  app = getApp();//获取应用实例
// pages/pay/createCustom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "代客户签约信息",
    AssetImgSrc: "",
    IdImgSrc: "",
    DoorImgSrc: "",
    myCategery: "",
    b64AssetImg: "",
    b64IdImg: "",
    b64DoorImg: "",
    allCategery:{},
    selectCategery:["","",""],
    userId:""
  },
  onLoad:function(options) {
    var mythis = this;
    this.setData({
      allCategery:categeriesJSON.allCategery,
      userId:options.userId
    });
  },
  selectAssetImg:function() {
    var mythis = this;
    wx.chooseImage({
      count: 1,
      success: (res) => {
        var path = res.tempFilePaths[0];
        var imgbase64 = app.toBase64Img(res.tempFilePaths[0]);
        console.log(imgbase64);
        mythis.setData(
          {
            AssetImgSrc: path,
            b64AssetImg: imgbase64
          });
        //my.getImageInfo();
      },
    });
  },
  selectIdImg:function() {
    var mythis = this;
    var fm = wx.getFileSystemManager();
    //my.getfil
    wx.chooseImage({
      count: 1,
      success: (res) => {
        var path = res.tempFilePaths[0];
        var imgbase64 = app.toBase64Img(res.tempFilePaths[0]);
        console.log(imgbase64);
        mythis.setData(
          {
            IdImgSrc: path,
            b64IdImg: imgbase64
          });

      },
    });
  },
  selectDoorImg:function() {
    var mythis = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success(res) {
        var path = res.tempFilePaths[0];
        var imgbase64 = app.toBase64Img(res.tempFilePaths[0]);
        console.log(imgbase64);
        mythis.setData(
          {
            DoorImgSrc: path,
            b64DoorImg: imgbase64
          });

      },
    });
  },
  returnMenu:function() {
    wx.navigateTo({
      url: "../pay/menu"
    });
  },
  submitCustomInfo:function(e) {
    console.log(e);
    var baseurl = "https://www.wolfinv.com/HappyShareETech/forCustomAreegent.asp?customId={0}&contactName={1}&contactTel={2}&contactEmail={3}&base64AssetImg={4}&base64IdImg={5}&base64DoorImg={6}&saleId={7}";
    var url = baseurl.replace("{0}",e.detail.value.customId);
    url = url.replace("{1}", e.detail.value.contactName);
    url = url.replace("{2}", e.detail.value.contactTel);
    url = url.replace("{3}", e.detail.value.contactEmail);
    url = url.replace("{4}", e.detail.value.b64AssetImgContent);
    url = url.replace("{5}", e.detail.value.b64IdImgContent);
    url = url.replace("{6}", e.detail.value.b64DoorImgContent);
    url = url.replace("{7}", app.globalData.userId);
    var mythis = this;
    console.log(url);
    console.log(app.globalData);
    wx.request({
      url: url,
      header: { 'content-type': 'application/json;charset=utf-8' },
      success: (res) => { 
        console.log(res);
        if(res.data.succ ==1 )
        {
          this.returnMenu();
        }
        else
        {
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration: 3000
          })
        }
      }
    })

  },
  
  selectCategery:function() {
    console.log(categeriesJSON);
    var mythis = this;
    /*
    wx.multiLevelSelect({
      title: "经营类目",
      name: "name",
      list: categeriesJSON.allCategery,
      success: (res) => {
        console.log(res);

        mythis.setData(
          {

            myCategery: res.result[0].name + '>' + res.result[1].name + '>' + res.result[2].name
          }
        );
      },
    });*/
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

  }
})