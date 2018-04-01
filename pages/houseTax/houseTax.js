// pages/houseTax/houseTax.）
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPageIsShow: true,
    outputPageIsShow: false,
    loanDateValue: NaN,
    repayTypeValue: NaN,

    loanAmount: NaN,
    loanRate: NaN,

    loanDateList: ['1年（12期）', '2年（24期）', '3年（36期）', '4年（48期）', '5年（60期）', '6年（72期）', '7年（84期）', '8年（96期）', '9年（108期）', '10年（120期）', '11年（132期）', '12年（144期）', '13年（156期）', '14年（168期）', '15年（180期）', '16年（192期）', '17年（204期）', '18年（216期）', '19年（228期）', '20年（240期）', '21年（252期）', '22年（264期）', '23年（276期）', '24年（288期）', '25年（300期）', '26年（312期）', '27年（324期）', '28年（336期）', '29年（348期）', '30年（360期）',],
    repayTypeList: ['等额本金（每月还款递减）', '等额本息（每月等额还款）'],

    totalLoan: NaN,
    totalMonth: NaN,
    firstRepay: NaN,
    reduce: NaN,
    totalInterest: NaN,
    totalRepay: NaN,
    monthRepay: NaN,



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

  pickerOnSureClick: function (e) {
    // if ( e.currentTarget.id == '1' ){
    //   this.setData({
    //     loanDateValue: e.detail.value,
    //   });
    // }else if (e.currentTarget.id == '3'){
    //   this.setData({
    //     repayTypeValue: e.detail.value,
    //   });
    // }
    switch (e.currentTarget.id) {
      case '1':
        this.setData({
          loanDateValue: e.detail.value,
        });
        break
      case '3':
        this.setData({
          repayTypeValue: e.detail.value,
        });
        break
    }
  },

  getInput: function (e) {
    switch (e.currentTarget.id) {
      case '12':
        this.setData({
          loanAmount: e.detail.value,
        });
        break
      case '13':
        this.setData({
          loanRate: e.detail.value,
        });
        break
    }
  },

  returnInputPage: function () {
    this.setData({
      inputPageIsShow: true,
      outputPageIsShow: false,
    });
  },


  process: function () {

    if (this.data.repayTypeValue == null || this.data.loanDateValue == null || this.data.loanAmount == null || this.data.loanRate ==null) {

      // 弹出警示对话框
      wx.showModal({
        title: '提示',
        content: '请检查是否有遗漏的数据',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            return;
          }
        }
      })

    } else {

      this.setData({
        inputPageIsShow: false,
        outputPageIsShow: true,
      });

      var totalLoan = this.data.loanAmount * 10000;
      var totalMonth = (parseInt(this.data.loanDateValue) + 1) * 12;
      var monthRate = this.data.loanRate / 100 / 12;

      if (this.data.repayTypeValue == 0) {
          this.setData({
          totalLoan: totalLoan ,
          totalMonth: totalMonth ,
          firstRepay: (totalLoan / totalMonth + totalLoan* monthRate).toFixed(2),
          totalInterest: (totalLoan * monthRate * (totalMonth / 2 + 0.5)).toFixed(2) ,
          totalRepay: (totalLoan + totalLoan * monthRate * (totalMonth / 2 + 0.5)).toFixed(2),
        });
      } else {
        this.setData({
          totalLoan: totalLoan,
          totalMonth: totalMonth,
          monthRepay: (totalLoan * monthRate * Math.pow(1 + monthRate, totalMonth) / (Math.pow(1 + monthRate, totalMonth) - 1)).toFixed(2),
          totalInterest: ((totalLoan * monthRate * Math.pow(1 + monthRate, totalMonth) / (Math.pow(1 + monthRate, totalMonth) - 1)) * totalMonth - totalLoan).toFixed(2),
          totalRepay: ((totalLoan * monthRate * Math.pow(1 + monthRate, totalMonth) / (Math.pow(1 + monthRate, totalMonth) - 1)) * totalMonth).toFixed(2),
        })
      }
    }
  },
save: function () {
  if (this.data.repayTypeValue==0){
    this.data.logs.push(" 贷款总额：" + this.data.totalLoan + "\n  还款月数：" + this.data.totalMonth + "\n 首月还款：" + this.data.firstRepay + "\n 总支付利息：" + this.data.totalInterest + "\n   本息合计：" + this.data.totalRepay);
  }
  else if (this.data.repayTypeValue == 1) {
    this.data.logs.push(" 贷款总额：" + this.data.totalLoan + "\n  还款月数：" + this.data.totalMonth + "\n 每月还款：" + this.data.monthRepay + "\n 总支付利息：" + this.data.totalInterest + "\n   本息合计：" + this.data.totalRepay);
  }
    wx.setStorageSync("logs", this.data.logs);
    wx.showModal({
      title: '',
      content: '已保存',
      confirmColor: '#29bbb4',
      showCancel: false,
    })
  },
})