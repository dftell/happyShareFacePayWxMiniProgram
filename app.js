//app.js
App({
  Data:
  {
    nickName:"",
    avatarUrl:""
  },
  globalData: {
    userInfo: null,
    provider: "",
    userName: "",
    userId: "",
    userPwd: "",
    userName: "",
    userDept: "",
    userPos: ""
  },
  onShow(res)
  {
    var thisData =this;
    console.log(res);
    if(res.scene != 1044)
    {
      /*
      wx.getShareInfo({
        //shareTicket: res.shareTickets[0],
        success: function(e)
        {
          thisData.globalData.provider=res.shareTicket[0];
          //globalData.provider : res.shareTicket[0]
        },
        fail: {}
      })
      */
      return;
    }

  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  toBase64Img: function (path) {
    /*
    wx.getFileSystemManager().readFile({
      filePath: path, //选择图片返回的相对路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        //console.log(res);
        var ret = 'data:image/png;base64,' + res.data;
        console.log(ret);
        return ret;
      }
    });
    */
    var base64 = wx.getFileSystemManager().readFileSync(path, 'base64') 
    return base64;
  },
  
  login:function(id,pwd,spress)
  {
    var mythis = this;
    var strUrl = 'https://www.wolfinv.com/login/login.asp?loginCorp=1&loginKey=' + id + '&loginPwd=' + pwd; // 目标服务器url
    console.log(strUrl);
    var ret = false;
    wx.request({
      url: strUrl,
      success: (res) => {
        if(res.data.succ == 1)
        {
          mythis.globalData.userName = res.data.info.name;
          mythis.globalData.userDept = res.data.info.dept;
          mythis.globalData.userPos = res.data.info.pos;
          mythis.globalData.userId = id;
          ret = true;
        }
        else
        {
          ret = false;
        }
        wx.hideToast();
        console.log(ret);
        if (ret == false)
        {
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration: 3000
          })
        }
        else
        {
          spress();
        }
      },
      
    }
    );
    wx.showToast({
      title: '载入中...',
      icon:"none",
      duration: 10000
    })
    return ret;
  },
  wxgetUserInfo:function()
  {
    var that = this;
    var openId = (wx.getStorageSync('openId'));
    console.log(openId);
    if (openId)//缓存中存在openId 
    {
      wx.getUserInfo(
      {
        success: function (res) {
          that.setData({
            nickName:res.userInfo.nickName,
            avatarUrl:res.userInfo.avatarUrl,
          })
        },
        fail: function () {//fail
          console.log("获取失败！")
        },
        complete: function () {
          //complete
          console.log("获取用户信息完成！")
        }
      });
    } 
    else 
    {
      wx.login(
      {
        success: function (res) 
        {
          console.log(res.code);
          if (res.code) 
          {
            wx.getUserInfo(
            {
              withCredentials: true,
              success: function (res_user) 
              {
                console.log(res_user);
                wx.request(
                {
                  //后台接口地址
                  url: 'https://www.wolfinv.com/login/wx.asp',
                  data:
                  {
                    code:res.code,
                    encryptedData:res_user.encryptedData,
                    iv:res_user.iv
                  },
                  method: 'GET',
                  header:
                  {
                    'content-type': 'application/json'
                  },
                  success: function (res) 
                  {
                    //
                    this.globalData.userInfo = JSON.parse(res.data);
                    that.setData({
                      nickName:res.data.nickName,
                      avatarUrl:res.data.avatarUrl,
                    })
                    wx.setStorageSync('openId',res.data.openId);
                  }
                })
              },
              fail: function () 
              {
                wx.showModal(
                {
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success: function (res) {
                    if (res.confirm) 
                    {
                      wx.openSetting({
                        success:(res) => 
                        {
                            if (res.authSetting["scope.userInfo"]) 
                            {////如果用户重新同意了授权登录
                              wx.login({
                                success: function (res_login) 
                                {
                                  if (res_login.code) 
                                  {
                                    wx.getUserInfo(
                                    {
                                      withCredentials: true,
                                      success: function (res_user) 
                                      {
                                        wx.request({
                                          url: 'https://www.wolfinv.com/login/wx.asp',
                                          data:
                                          {
                                            code:res_login.code,
                                            encryptedData:res_user.encryptedData,
                                            iv:res_user.iv
                                          },
                                          method: 'GET',
                                          header:
                                          {
                                            'content-type': 'application/json'
                                          },
                                          success: function (res) 
                                          {
                                            that.setData(
                                            {
                                              nickName:res.data.nickName,
                                              avatarUrl:res.data.avatarUrl,
                                            })
                                            wx.setStorageSync('openId',res.data.openId);
                                          }
                                        })
                                      }
                                    })
                                  }
                                }
                              });
                            }
                          },
                        fail: function (res) {

                        }
                      })
                    }
                  }
                })
              },
              complete: function (res) {
              }
            })
          }
        }
      })
    }





  },
  
  wxlogin: function () {
    var openId = (wx.getStorageSync('openId'));
    console.log(openId);
    if (openId)//缓存中存在openId 
    {
      
    }
    else 
    {
      wx.login(
        {
          success: function (res) {
            console.log(res);
            if (res.code) {
              //wx.setStorageSync('openId', res.data.openId);
            }
          }
        }
      )
    }
  }
  ,
  userInfoReadyCallback:function(res)
  {
    console.log(res);
    wx.request(
      {
        //后台接口地址
        url: 'https://www.wolfinv.com/login/wx.asp',
        data:
        {
          code: res.code,
          encryptedData: res_user.encryptedData,
          iv: res_user.iv
        },
        method: 'GET',
        header:
        {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          this.globalData.userInfo = JSON.parse(res.data);
          that.setData({
            nickName: res.data.nickName,
            avatarUrl: res.data.avatarUrl,
          })
          wx.setStorageSync('openId', res.data.openId);
        }
      })
  }
})