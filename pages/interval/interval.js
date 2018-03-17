
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date1: '',
    date2: '',
    date1IsSelected:false,
    date2IsSelected:false,
    datePickerValue1: ['', '', ''],
    datePickerIsShow1: false,
    datePickerValue2: ['', '', ''],
    datePickerIsShow2: false,
    day_num:NaN,
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
    if (wx.getStorageSync('interlogs')!=''){
    this.setData({ logs :wx.getStorageSync('interlogs')},);}
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
  showDatePicker1: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow1: true,
    });
  },
  showDatePicker2: function (e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow2: true,
    });
  },

  datePickerOnSureClick1: function (e) {
    this.setData({
      date1: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue1: e.detail.value,
      datePickerIsShow1: false,
      date1IsSelected: true,
    });
  },
  datePickerOnSureClick2: function (e) {
    this.setData({
      date2: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
      datePickerValue2: e.detail.value,
      datePickerIsShow2: false,
      date2IsSelected: true,
    });
  },

  datePickerOnCancelClick1: function (event) {
    this.setData({
      datePickerIsShow1: false,
    });
  },
  datePickerOnCancelClick2: function (event) {
    this.setData({
      datePickerIsShow2: false,
    });
  },
  process:function(){
    if (!this.data.date1IsSelected || !this.data.date2IsSelected){
      return;
    }
   var date1 = new Date(this.data.datePickerValue1[0], this.data.datePickerValue1[1] - 1, this.data.datePickerValue1[2]);
   var date2 = new Date(this.data.datePickerValue2[0], this.data.datePickerValue2[1] - 1,this.data.datePickerValue2[2]);
   var day_num=(date2.getTime()-date1.getTime())/24000/3600;
    this.setData({
      day_num:day_num,
    });
    this.data.logs.push(this.data.date1 + "--" + this.data.date2 +"  "+day_num+"天");
    wx.setStorageSync("interlogs", this.data.logs);
  }
})