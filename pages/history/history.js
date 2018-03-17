Page({
  data: {
    calclogs: [], 
    interlogs:[],
  },
  clear: function () {
    wx.showModal({
      title: '',
      content: '确定清除所有历史记录吗？',
      confirmColor: '#29bbb4',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('calclogs');
          wx.removeStorageSync('interlogs');
          wx.removeStorageSync('calenlogs');
          this.setData({ "calclogs": [] ,
            "interlogs": [], 
            "calenlogs": [],});
        } else if (res.cancel) {

        }
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var calclogs = wx.getStorageSync('calclogs');
    var interlogs=wx.getStorageSync('interlogs');
    var calenlogs = wx.getStorageSync('calenlogs');
    this.setData({ "calclogs": calclogs });
    this.setData({ "interlogs": interlogs });
    this.setData({ "calenlogs": calenlogs });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})