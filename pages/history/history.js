Page({
  data: {
    logs: []
  },
  clear: function () {
    wx.showModal({
      title: '',
      content: '确定清除所有历史记录吗？',
      confirmColor: '#29bbb4',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('calclogs');
          this.setData({ "logs": [] });
        } else if (res.cancel) {

        }
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var logs = wx.getStorageSync('calclogs');
    this.setData({ "logs": logs });
    console.log(this.data.logs);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})