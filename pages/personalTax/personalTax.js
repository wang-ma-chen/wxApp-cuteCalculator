//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    wage: '',
    beginMoney:3500,
    social:'',
    tax: '',
    criticalAarray: [0, 1500, 4500, 9000, 35000, 55000, 80000],
    taxRatesArray: [0, 0.03, 0.10, 0.20, 0.25, 0.30, 0.35, 0.45],
    taxArray: []
  },
  KeyInput: function (e) {
    if (e.currentTarget.id === '1') {     
      this.data.wage = e.detail.value;
    }
    if (e.currentTarget.id === '2') {  
      this.data.social = e.detail.value;
    }
    if (e.currentTarget.id === '3') {  
      this.data.beginMoney = e.detail.value;
    }
  },
  process:function(){
    if (Number(this.data.wage) >Number(this.data.social)) {
      var url = '/pages/TaxResult/TaxResult?beginMoney=' + this.data.beginMoney + '&wage=' + this.data.wage + '&social=' + this.data.social;
      wx.navigateTo({
        url: url
      })
    } 
    else {
      this.openAlert();
    }
  },
  openAlert: function () {
    wx.showModal({
      content: '税前工资必须大于社保公积金',
      showCancel: false
    });
  }
})