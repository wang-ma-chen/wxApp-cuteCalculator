Page({

  /**
   * 页面的初始数据
   */
  data: { 
    focus:true,
    height:'',
    weight:'',
    result:null,
    logs:[]
    },
  onShow: function () {
    var logs = wx.getStorageSync('logs') || [];
    this.setData({ "logs": logs });
  },

  getHeight: function (e) {
    this.setData({
      height: e.detail.value,
    });
    if (this.data.height > 210) {
      this.alert(); this.setData({ height: '' }); return;
    }
  },

  getWeight: function (e) {
    this.setData({
      weight: e.detail.value,
    });
    if (this.data.weight > 200) {
      this.alert(); this.setData({ weight: '' }); return;
    }
  },
   process:function(e) {
      if(this.data.height==''||this.data.weight==''){
        this.alert();return;
      }
      var a = this.data.height * this.data.height/10000;
       var resultBmi=(this.data.weight/a).toFixed(2);
      if(resultBmi<=18.5){
        this.setData({result:"BMI为："+resultBmi+"\n   体重过轻"});
      } else if (resultBmi > 18.5 && resultBmi<= 23.9){
        this.setData({ result: "BMI为：" + resultBmi + "\n   体重正常" });
      } else if (resultBmi > 23.9 && resultBmi <= 28){
        this.setData({ result: "BMI为：" + resultBmi + "\n   体重过重" });
      } else if (resultBmi > 28 && resultBmi <= 32) {
        this.setData({ result: "BMI为：" + resultBmi + "\n   体重肥胖" });
      } else {
        this.setData({ result: "BMI为：" + resultBmi + "\n   非常肥胖" });
      } 
      this.data.logs.push("身高：" + this.data.height + "   体重：" + this.data.weight+"\n"+this.data.result);
      wx.setStorageSync("logs", this.data.logs);
    },
alert: function () {
     wx.showModal({
       title: '',
       content: '请输入正确数据',
       confirmColor: '#29bbb4',
       showCancel: false,
     })
   },
})