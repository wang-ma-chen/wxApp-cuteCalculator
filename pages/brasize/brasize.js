// pages/brasize/brasize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upperChest: '',
    lowerChest: '',
    braSize: null,
    logs: [],
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
    var logs = wx.getStorageSync('logs') || [];
    this.setData({ "logs": logs });
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

  getUpper:function(e){
    this.setData({
      upperChest: e.detail.value,
    });
  },

  getLower:function(e){
    this.setData({
      lowerChest: e.detail.value,
    });
  },

  /**
   * 尺码计算处理过程
   */
  process: function () {
    if (this.data.upperChest == null || this.data.lowerChest == null ) {
      return;
    }
    var up = parseFloat(this.data.upperChest);
    var low = parseFloat(this.data.lowerChest);
    var up_max = low + 25.0;
    if (up < 60 || up > 92 || low >= up || up > up_max) {
      wx.showModal({
        title: '提示',
        content: '数据不合理\n请输入正确数据',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
    }else{
      var diff = up - low;
      var lowToInt = Math.ceil(low);
      var type = '';
      var interSize = 0;
      var ukSize = 0;
      if(diff < 7.5){
        type = 'AA'
      }else if( diff < 10.0){
        type = 'A'
      } else if ( diff < 12.5) {
        type = 'B'
      } else if ( diff < 15.0) {
        type = 'C'
      } else if ( diff < 17.5) {
        type = 'D'
      } else if ( diff < 20.0) {
        type = 'E'
      } else if ( diff < 22.5) {
        type = 'F'
      } else if ( diff <= 25.0) {
        type = 'G'
      }
      if (lowToInt < 72) {
        interSize = 70;
        ukSize = 32;
      } else if (lowToInt < 77) {
        interSize = 75;
        ukSize = 34;
      } else if (lowToInt < 82) {
        interSize = 80;
        ukSize = 36;
      } else if (lowToInt < 87) {
        interSize = 85;
        ukSize = 38;
      } else if (lowToInt < 92) {
        interSize = 90;
        ukSize = 40;
      }

      var braSize = ukSize + "/" + interSize + type;
      this.setData({
        braSize: braSize,
      });
    this.data.logs.push(low + "--" +up+ "\n" +braSize);
    wx.setStorageSync("logs", this.data.logs);
    }
  }
})