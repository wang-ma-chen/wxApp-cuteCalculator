Component({
  properties: {
    value: {
      type: Array,
      value: [],
      observer: "onValue"
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: "onShow"
    }
  },

  data: {
    years: [],
    months: [],
    days: [],
    hours:[],
    tempYearPos: [0],
    tempMonthPos: [0],
    tempDayPos: [0],
    tempHourPos: [0],
    showPicker: false
  },

  attached: function () {
    /**
     * 初始化年月日
     */
    var date = new Date();
    var years = [];
    var months = [];
    var days = [];
    var hours=[];

    for (let i = 1900; i <= date.getFullYear() + 50; i++) {
      years.push(i);
    }

    for (let i = 1; i <= 12; i++) {
      let month = 0;
      month = i < 10 ? '0' + i : i;
      months.push(month);
    }

    days = this.getDays(date.getFullYear() + 50, 12);
    for (let i = 0; i <= 23; i++) {
      let hour = 0;
      hour= i < 10 ? '0' + i : i;
      hours.push(hour);
    }
    this.setData({
      years: years,
      months: months,
      days: days,
      hours:hours
    });

  },

  methods: {
    onTouchmask: function (event) {
    },
    onCacnelClick(e) {
      this.triggerEvent('cancelclick', {});
    },
    onSureClick(e) {
      var curYear = this.data.years[this.data.tempYearPos];
      var curMonth = this.data.months[this.data.tempMonthPos];
      var curDay = this.data.days[this.data.tempDayPos];
      var curHour = this.data.hours[this.data.tempHourPos];
      var value = [curYear, curMonth, curDay,curHour];
      this.triggerEvent('sureclick', {
        value: value,
      });
    },
    year_onChange: function (e) {
      //年改变，月要滑到一月，天要重新计算该年该月多少天
      var days = [];
      var curYear = this.data.years[e.detail.value];
      days = this.getDays(curYear, 1);
      this.setData({
        days: days,
        tempYearPos: e.detail.value,
        tempMonthPos: [0],
        tempDayPos: [0],
        tempHourPos:[0]
      });
    },
    month_onChange: function (e) {
      var days = [];
      var curYear = this.data.years[this.data.tempYearPos];
      var curMonth = this.data.months[e.detail.value];
      days = this.getDays(curYear, curMonth);
      this.setData({
        days: days,
        tempMonthPos: e.detail.value,
        tempDayPos: [0],
        tempHourPos:[0]
      });
    },
    day_onChange: function (e) {
      this.setData({
        tempDayPos: e.detail.value,
        tempHourPos:[0]
      });
    },
    hour_onChange: function (e) {
      this.setData({
        tempHourPos: e.detail.value,
      });
    },

    onValue() {
      //通过传进来的年月日,计算对应的index
      var data = this.getRefreshData();
      this.setData(data)
    },
    onShow() {
      var data = this.getRefreshData();
      data.showPicker = this.data.isShow;
      this.setData(data)
    },
    getDays(year, month) {
      var days = [];
      month = parseInt(month, 10);
      var date = new Date(year, month, 0);
      var maxDay = date.getDate();
      for (let i = 1; i <= maxDay; i++) {
        let day = 0;
        day = i < 10 ? '0' + i : i;
        days.push(day);
      }
      return days;
    },
    getRefreshData() {
      //通过传进来的年月日,计算对应的inde
      if (this.data.years == null || this.data.years.length == 0) {
        return {};
      }

      var date = new Date();

      var tempYearPos = this.data.years.length - 51;
      var tempMonthPos = date.getMonth();
      var tempDayPos = date.getDate() - 1;
      var tempHourPos=date.getHours()-1;

      for (var i = 0; i < this.data.years.length; i++) {
        var item = this.data.years[i];
        if (item == this.data.value[0]) {
          tempYearPos = i;
          break;
        }
      }

      for (var i = 0; i < this.data.months.length; i++) {
        var item = this.data.months[i];
        if (item == this.data.value[1]) {
          tempMonthPos = i;
          break;
        }
      }

      var days = [];
      var curYear = this.data.years[tempYearPos];
      days = this.getDays(curYear, this.data.months[tempMonthPos]);

      for (var i = 0; i < days.length; i++) {
        var item = days[i];
        if (item == this.data.value[2]) {
          tempDayPos = i;
          break;
        }
      }
      for (var i = 0; i < this.data.hours.length; i++) {
        var item = this.data.hours[i];
        if (item == this.data.value[3]) {
          tempHourPos = i;
          break;
        }
      }
      var data = {
        days: days,
        tempYearPos: [tempYearPos],
        tempMonthPos: [tempMonthPos],
        tempDayPos: [tempDayPos],
        tempHourPos:[tempHourPos]
      }
      return data;
    },
  }
});