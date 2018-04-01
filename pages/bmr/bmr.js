Page({
  data:{
    index:NaN,
    sex:['男','女'],
    age:'',
    height: '',
    weight: '',
    result:null
  },
  onShow: function () {
    var logs = wx.getStorageSync('logs') || [];
    this.setData({ "logs": logs });
  },
  bindPickerChange:function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  getAge: function (e) {
    this.setData({ age: e.detail.value });
    if(this.data.age>120){
      this.alert(); this.setData({age: '' });return;
    }
  },
  getHeight: function (e) {
    this.setData({ height: e.detail.value });
    if (this.data.height > 210) {
      this.alert(); this.setData({height: '' });return;
    }
  },
  getWeight: function (e) {
    this.setData({weight: e.detail.value });
    if (this.data.weight>200) {
      this.alert(); this.setData({ weight:'' });return;
    }
  },
  bmrman:function (e) {
    var resultbmr;
    var height=this.data.height;
    var weight=this.data.weight;
    var age=this.data.age;
    resultbmr = 13.7 * weight;
    resultbmr = 5 * height + resultbmr;
    resultbmr = 66 - 6.8 * age + resultbmr;
    return resultbmr;
  },
  bmrwoman:function (e) {
    var resultbmr;
    var height = this.data.height;
    var weight = this.data.weight;
    var age=this.data.age;
    resultbmr = 9.6 * weight;
    resultbmr = 1.8* height + resultbmr;
    resultbmr = 655 - 4.7 * age+ resultbmr;
    return resultbmr;
  },
 process:function () {
    if (this.data.index==NaN||this.data.age == '' || this.data.height == '' || this.data.weight == '') {
      this.alert(); return;
    }
    else if(this.data.index==0){
      this.setData({result:"基础代谢为："+this.bmrman()+"kJ"});
    } else if (this.data.index==1) {
      this.setData({ result: "基础代谢为：" +this.bmrwoman()+"kJ" });
    }
    this.data.logs.push("性别：" + this.data.sex[this.data.index] + "  年龄：" + this.data.age +"  身高：" +this.data.height + "   体重：" + this.data.weight + "\n" + this.data.result);
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