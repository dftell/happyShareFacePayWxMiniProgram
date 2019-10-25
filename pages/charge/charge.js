// pages/charge/charge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //userInfo:{},
    title:"充值",
    chargeAmt:"",
    telNo:"",
    wxId:"",
    wxName:"",
    bankName:"",
    bankNo:"",
    reqId:"",
    orderNum:"",
    imgData:"",
    errcode:"",
    msg:"",
    chargeAccount:"",
    linkFrom:"",
    respTime:"",
    submitBtn_disabled:false,
    defaultProvider:"神烦狗",
    provider:""
  },
  getBase64ImageUrl: function (imgData) {
    /// 获取到base64Data
    var base64Data = imgData;
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
    /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
    const base64ImgUrl = "data:image/png;base64," + base64Data;
    /// 刷新数据
    this.setData({
      base64ImgUrl: base64ImgUrl
    })
  },
  submitCharge:function()
  {
    wx.request({
      url: 'https://www.wolfinv.com/pk10/app/submitCharge.asp',
      data: {
        reqId:this.data.request,
        wxId:this.data.wxId,
        wxName:this.data.wxName,
        chargeAmt:this.data.chargeAmt,
        chargeAccount:this.data.chargeAccount,
        orderNum:this.data.orderNum,
        imgData:this.data.imgData,
        bankNo: this.data.bankNo,
        telNo: this.data.telNo,
        respTime :this.data.respTime,
        provider:this.data.provider,
        defaultProvider:this.data.defaultProvider
      },
      header: { 'content-type': 'application/json' },
      success: (res) => { }
    }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      wxId:options.wxId,
      wxName:options.nickName,
      title:"提交信息"
    })
    this.setData({
      provider: options.provider
    });
    console.log(options)
  },
  formSubmit:function(e)
  {
    var myThis =  this;
    console.log(e);
    if (e.detail.value.chargeAmt.length == 0) {
      myThis.setData({
        msg: '金额不能为空！'
      });
      wx.showToast({
        title: myThis.data.msg,
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (e.detail.value.telNo.length == 0) {
      myThis.setData({
        msg: '手机号不能为空！'
      });
      wx.showToast({
        title: myThis.data.msg,
        icon: 'none',
        duration: 2000

      });
      return;
    }
    myThis.setData({
      telNo :e.detail.value.telNo,
      wxName:e.detail.value.wxName,
      chargeAmt: e.detail.value.chargeAmt,
      bankNo:e.detail.value.bankNo,
      bankName:e.detail.value.bankName,
      submitBtn_disabled:true
    }
    );
    wx.request({
      
      url: 'https://www.wolfinv.com/pk10/app/charge.asp' ,
      data: { 
        wxId: e.detail.value.telNo,
        wxName: e.detail.value.wxName,
        chargeAmt: e.detail.value.chargeAmt
       }, 
      header: { 'content-type': 'application/json' }, 
      success: (res) => 
      {
        myThis.setData({ submitBtn_disabled: false });
        console.log(res.data); 
        if(res.data.imgData == null)
        {
          myThis.setData({
            errcode: res.data.errcode,
            msg: res.data.msg,
          });  
          wx.showToast({

            title: myThis.data.msg,
            icon: 'none',
            duration: 2000
          });
          
        }
        else
        {       
          myThis.setData({ submitBtn_disabled: false });
          myThis.setData({          
          reqId:res.data.reqId,          
          orderNum: res.data.orderNum,
          chargeAmt:res.data.chargeAmt,
          errcode:res.data.errcode,
          msg:res.data.msg,
          imgData:res.data.imgData,
          chargeAccount:res.data.chargeAccount,
          
          });
          wx.request({
            url: 'https://www.wolfinv.com/pk10/app/submitCharge.asp',
            data: {
              reqId: myThis.data.reqId,
              wxId: myThis.data.telNo,
              wxName: myThis.data.wxName,
              chargeAmt: myThis.data.chargeAmt,
              chargeAccount: myThis.data.chargeAccount,
              orderNum: myThis.data.orderNum,
              imgData: "已获取到base64",
              bankNo: myThis.data.bankNo,
              bankName:myThis.data.bankName,
              provider: myThis.data.provider
            },
            header: { 'content-type': 'application/json' },
            success: (res) => { 
              console.log(res)
            }
          }
          );
        }   
      },
      fail:function(errmsg)
      {
        wx.showToast({
          title: errmsg,
          icon: 'none',
          duration: 2000
        });
        myThis.setData({ submitBtn_disabled: false });
      } ,
      complete:function(e)
      {
        
      }

    }) 
    
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