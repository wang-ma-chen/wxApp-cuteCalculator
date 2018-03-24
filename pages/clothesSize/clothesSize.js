// pages/shoe/shoe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waist:'',
    bust:'',
    hip:'',
    chinaSize:'',
    ukSize:'',
    globalSize:'',
    usauSize:'',
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
getBust:function(e){
  this.setData({bust:e.detail.value});
},
getWaist: function (e) {
  this.setData({ waist: e.detail.value });
},
getHip: function (e) {
  this.setData({ hip: e.detail.value });
},
one_is_empty:function(){
  if(this.data.bust==''||this.data.waist==''||this.data.hip==''){
    wx.showModal({
      title: '提示',
      content: '请输入完整数据',
      confirmColor: '#29bbb4',
      showCancel: false,
    })
    return true;
  }
  else return false;
},
data_is_wrong:function(average){
  if(average<68||average>116){
    wx.showModal({
      title: '提示',
      content: '请输入合理数据',
      confirmColor: '#29bbb4',
      showCancel: false,
    })
    return true;
  }
  else return false;
},
process:function(){
  var average = (Number(this.data.bust) + Number(this.data.waist) +Number( this.data.hip) )/ 3;
  var size;
  if(this.one_is_empty()||this.data_is_wrong(average))return;
  if (average < 70) size = 0;
  else if (average < 74) size = 1;
  else if(average<78)size=2;
  else if(average<82)size=3;
  else if(average<87)size=4;
  else if (average <92) size = 5;
  else if (average < 97) size = 6;
  else if (average < 104) size = 7;
  else size=8;
  switch(size){
    case 0: this.setData({
      globalSize: "XXS",
      chinaSize: "150/76A",
      ukSize: "32",
      usaSize: "0"
    });break;
    case 1: this.setData({
      globalSize: "XS",
      chinaSize: "155/80A",
      ukSize: "34",
      usaSize: "2"
    });break;
    case 2: this.setData({
      globalSize: "S",
      chinaSize: "160/84A",
      ukSize: "36",
      usaSize: "4"
    });break;
    case 3: this.setData({
      globalSize: "M",
      chinaSize: "160/88A",
      ukSize: "38",
      usaSize: "6"
    }); break;
    case 4: this.setData({
      globalSize: "L",
      chinaSize: "165/92A",
      ukSize: "40",
      usaSize: "8"
    }); break;
    case 5: this.setData({
      globalSize: "XL",
      chinaSize: "170/96A",
      ukSize: "42",
      usaSize: "10"
    }); break;
    case 5: this.setData({
      globalSize: "XXL",
      chinaSize: "175/100A",
      ukSize: "44",
      usaSize: "12"
    }); break;
    case 6: this.setData({
      globalSize: "3XL",
      chinaSize: "180/108B",
      ukSize: "46",
      usaSize: "14"
    }); break;
    case 7: this.setData({
      globalSize: "4XL",
      chinaSize: "185/112C",
      ukSize: "48",
      usaSize: "16"
    }); break;
    case 8: this.setData({
      globalSize: "5XL",
      chinaSize: "185/128C",
      ukSize: "50",
      usaSize: "18"
    }); break;
  }
  this.data.logs.push(this.data.bust + "--" + this.data.waist + "--" + this.data.hip + "\n国际：" + this.data.globalSize + "    中国：" + this.data.chinaSize + "\n欧洲：" + this.data.ukSize + "    美国："+this.data.usaSize);
  wx.setStorageSync("logs", this.data.logs);
},
  emptied: function () {
    this.setData({
      bust: '',
      waist: '',
      hip: '',
      chinaSize: '',
      ukSize: '',
      globalSize:'',
      usaSize:'',
    })
  },

  

})