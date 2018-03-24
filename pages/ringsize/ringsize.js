// pages/ringsize/ringsize.js
// import * as data from '../../utils/ringArray'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fingerCir:null,
    countryIsSelected:'false',
    countryPickerIsShow:'false',
    countryPickerValue:NaN,
    countryList:['中国','美国','英国','日本','德国','法国','瑞士'],
    country:'',
    ringSize:null,
    logs: [],
    ringArr: [['9', '12', '14', '16', '18', '20', '23', '25'],
    ['5', '6', '7', '8', '9', '10', '11', '12'],
    ['J1/2', 'I1/2', 'O', 'Q', 'S', 'T1/2', 'V1/2', 'Y1/2'],
    ['9', '12', '14', '16', '18', '20', '23', '25'],
    ['15.75', '16.5', '17.25', '18', '19', '20', '20.75', '21.25'],
    ['49', '51.5', '54', '56.5', '59', '61.5', '64', '66.5'],
    ['9', '11.5', '14', '16.5', '19', '21.5', '24', '27.5']]
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
    if (wx.getStorageSync('logs') != '') {
      this.setData({ logs: wx.getStorageSync('logs') }, );
    }
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

  getCir: function (e) {
    this.setData({
      fingerCir: e.detail.value,
    });
  },

  showCountryPicker: function (e) {
    this.setData({
      countryPickerIsShow: true,
    });
  },

  countryPickerOnSureClick: function (e) {
    this.setData({
      countryPickerValue: e.detail.value,
      countryIsShow: false,
      countryIsSelected: true,
    });
  },

  countryPickerOnCancelClick: function (e) {
    this.setData({
      countryIsShow: false,
    });
  },

  process: function () {
    if (this.data.fingerCir == null || this.data.countryPickerValue == null) {
      return;
    }
    var cir = parseFloat(this.data.fingerCir);
    var cirProcess = Math.ceil(cir*10)/10;
    var cirNum ;
    if(cir < 48 || cir > 67.2){
      wx.showModal({
        title: '提示',
        content: '请输入正确数据' ,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })
    }else{
      if(cirProcess<49.3){
        cirNum = 0;
      }else if(cirProcess<51.8){
        cirNum = 1;
      }else if(cirProcess<54.4){
        cirNum = 2;
      }else if(cirProcess<56.5){
        cirNum = 3;
      }else if(cirProcess<59.5){
        cirNum = 4;
      }else if(cirProcess<62.1){
        cirNum = 5;
      }else if(cirProcess<64.6){
        cirNum = 6;
      }else if(cirProcess<+67.2){
        cirNum = 7;
      }
    }
    var ringSize = this.data.ringArr[this.data.countryPickerValue][cirNum];
    this.setData({
      ringSize: ringSize,
    });
    this.data.logs.push(this.data.fingerCir + "mm\n" +this.data.countryList[this.data.countryPickerValue]+"："+this.data.ringSize);
    wx.setStorageSync("logs",this.data.logs);
  }

})