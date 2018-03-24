// pages/shoe/shoe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoeTypeIsSelected: 'false',
    inputPickerIsSelected: 'false',

    shoeTypePickerIsShow: 'false',
    lengthPickerIsShow: 'false',
    chinaPickerIsShow: 'false',
    europePickerIsShow: 'false',
    ukPickerIsShow: 'false',
    usaPickerIsShow: 'false',
    pickerIsShow: 'false',

    inputPickerIsShow: 'false',


    shoeTypePickerValue: NaN,
    inputPickerValue: NaN,
    shoeTypeList: ['男鞋', '女鞋'],

    lengthList_male: ['230mm','235mm','240mm','245mm','250mm','255mm','260mm','265mm','270mm','275mm','280mm','285mm','290mm','295mm','300mm','310mm','320mm'],
    lengthList_female: ['200mm', '205mm', '210mm', '215mm', '220mm', '225mm', '230mm', '235mm', '240mm', '245mm', '250mm', '255mm', '260mm', '265mm', '270mm', '275mm', '280mm'],

    lengthPickerValue: NaN,
    chinaTypeList_male: ['23码','23.5码','24码','24.5码','25码','25.5码','26码','26.5码','27码','27.5码','28码','28.5码','29码','29.5码','30码','31码','32码'],
    chinaTypeList_female: ['20码', '20.5码', '21码', '21.5码', '22码', '22.5码', '23码', '23.5码', '24码', '24.5码', '25码', '25.5码', '26码', '26.5码', '27码', '27.5码', '28码'],

    europeTypeList_male: ['37码', '37.5码', '38码', '38.5码', '39码', '40码', '41码', '42码', '43码', '43.5码', '44码', '44.5码', '45码', '45.5码', '46码', '47码', '48码'],
    europeTypeList_female: ['34码', '34.5码', '35码', '35.5码', '36码', '37码', '37.5码', '38码', '38.5码', '39码', '40码', '40.5码', '41码', '41.5码', '42码', '42.5码', '43码'],

    ukTypeList_male: ['4.5码', '5码', '5.5码', '6码', '6.5码', '7码', '7.5码', '8码', '8.5码', '9码', '9.5码', '10码', '10.5码', '11码', '11.5码', '12.5码', '13.5码'],
    ukTypeList_female: ['2码', '2.5码', '3码', '3.5码', '4码', '4.5码', '5码', '5.5码', '6码', '6.5码', '7码', '7.5码', '8码', '8.5码', '9码', '9.5码', '10码'],

    usaTypeList_male: ['5码', '5.5码', '6码', '6.5码', '7码', '7.5码', '8码', '8.5码', '9码', '9.5码', '10码', '10.5码', '11码', '11.5码', '12码', '13码','14码'],
    usaTypeList_female: ['4码', '4.5码', '5码', '5.5码', '6码', '6.5码', '7码', '7.5码', '8码', '8.5码', '9码', '9.5码', '10码', '10.5码', '11码', '11.5码', '12码'],

    country: '',
    ringSize: null,
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

  showShoeTypePicker: function (e) {
    this.setData({
      shoeTypePickerIsShow: true,
    });
  },

  showLengthPicker:function(e){
    this.setData({
      lengthPickerIsShow: true,
    });
  },

  showChinaPicker: function (e) {
    this.setData({
      chinaPickerIsShow: true,
    });
  },

  showEuropePicker: function (e) {
    this.setData({
      europePickerIsShow: true,
    });
  },

  showUKPicker: function (e) {
    this.setData({
      ukPickerIsShow: true,
    });
  },

  showUSAPicker: function (e) {
    this.setData({
      usaPickerIsShow: true,
    });
  },

  shoeTypePickerOnSureClick: function (e) {
    this.setData({
      shoeTypePickerValue: e.detail.value,
      shoeTypePickerIsShow: false,
      shoeTypeIsSelected: true,
    });
  },

  shoeTypePickerOnCancelClick: function (e) {
    this.setData({
      shoeTypePickerIsShow: false,
    });
  },

  inputCancel: function(e){
    switch (e.currentTarget.id){
      case 0:
        this.setData({
          lengthPickerIsShow: false,
        });
      case 1:
        this.setData({
          chinaPickerIsShow: false,
        });
      case 2:
        this.setData({
          europePickerIsShow: false,
        });
      case 3:
        this.setData({
          ukPickerIsShow: false,
        });
      case 4:
        this.setData({
          usaPickerIsShow: false,
        });
    }
  },

  keyInput:function(e){
    // switch (e.currentTarget.id){
    //   case 0:
    //     this.setData({
    //       lengthPickerIsShow: false,
    //     });
    //   case 1:
    //     this.setData({
    //       chinaPickerIsShow: false,
    //     });
    //   case 2:
    //     this.setData({
    //       europePickerIsShow: false,
    //     });
    //   case 3:
    //     this.setData({
    //       ukPickerIsShow: false,
    //     });
    //   case 4:
    //     this.setData({
    //       usaPickerIsShow: false,
    //     });
    // }
    this.setData({
      inputPickerValue: e.detail.value,
      inputPickerIsShow: false,
      inputPickerIsSelected: true,
    });
  }

})