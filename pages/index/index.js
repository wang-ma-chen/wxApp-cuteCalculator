Page({
  data: {
    idd: "delete",
    idc: "clear",
    idp: "%",
    idadd: "＋",
    id9: "9",
    id8: "8",
    id7: "7",
    idj: "-",
    id6: "6",
    id5: "5",
    id4: "4",
    idx: "×",
    id3: "3",
    id2: "2",
    id1: "1",
    iddiv: "÷",
    id0: "0",
    iddot: ".",
    ide: "＝",
    idln:"ln",
    idsin:"sin",
    idcos:"cos",
    idtan:"tan",
    content: "",
    Data:['0'],
    screenData:"0",
    operaSymbo: { "＋": "+", "-": "-", "×": "*", "÷": "/", ".": "."},
    triangle:{"cos":"cos","sin":"sin","tan":"tan"},
    done:[],
    lastIsOperaSymbo: false,
    lastIsTriangle:false,
    lastIsLn:false,
    arr: [],
    divF:false,
    alertF:false,
    start:true,
    triangleF:0,
    curIndex: 0,
    mode:1,
  },
  onLoad: function (options) {
  },
  onReady: function () {
    
    // 页面渲染完成
  },
  onShow: function () {
    var logs = wx.getStorageSync('logs') || [];
    this.setData({ "logs": logs });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  upDateScreen:function(){
    var i;
    var arr=this.data.arr;
    var screenData="";
    for(i=0;i<arr.length;i++){
      screenData+=arr[i];
    }
    this.setData({screenData:screenData});
  },
  change:function(){
    if(this.data.mode==1){
    this.setData({mode:2});}
    else{
      this.setData({ mode:1 });
    }
  },

  del:function(){       //del
    if (this.data.alertF == true){
      this.setData({ "screenData": "0" });
      this.data.arr.length = 0;
      this.data.alertF = false;
    }
    if (this.data.screenData == "0") {
      return;
    }
    var temp=this.data.arr.pop();
    if(temp=="cos"||temp=="sin"||temp=="tan"){
      this.data.triangleF=0;
      this.data.lastIsTriangle = false;
    }
    else if (temp == "ln") this.data.lastIsLn = false;
    else if (this.data.operaSymbo[temp]) this.data.lastIsOperaSymbo = false;
    var temp = this.data.arr[this.data.arr.length - 1];
    if (temp == "cos" || temp == "sin" || temp == "tan"){
      this.data.triangleF = 1;
      this.data.lastIsTriangle = true;
    }
    else if (temp == "ln") this.data.lastIsLn = true;
    else if (this.data.operaSymbo[temp]) this.data.lastIsOperaSymbo = true;
    this.upDateScreen();
    if (this.data.screenData == "" || this.data.screenData == "-") {
      this.data.start = true;
      this.setData({screenData:"0"});
    }
  },

  clear:function(){//清屏C
    this.setData({ "screenData": "0" });
    this.setData({ "done": [] });
    this.data.arr.length = 0;
    this.data.done.length = 0;
    this.data.alertF = false;
    this.data.triangleF=0;
    this.data.start=true;
    this.data.lastIsOperaSymbo=false,
    this.data.lastIsTriangle=false,
    this.data.lastIsLn=false
  },
 getANum:function(arr,i){
   var num = "";
   var k;
   for(k=i;k<arr.length;k++){
     if (!isNaN(arr[k]) || arr[k] == this.data.iddot) {
       num += arr[k];
     }
     else{
       return([num,k]);
     }
   }
   return ([num, k]);
 },
  equal:function(){
    var data = this.data.screenData;
    if (data == "0" || this.data.lastIsOperaSymbo||this.data.lastIsSpecial || this.data.alertF) {
      this.error(); return;
    }
    var lastWord = data.charAt(data.length);
    if (isNaN(lastWord)) {
      this.error(); return;
    }
    var num = "0";
    var _num;
    var arr = this.data.arr;
    var optarr = [];
    var temp=[];
    var i;
    for (i=0; i<arr.length;) {
      if (!isNaN(arr[i])){
        temp = this.getANum(arr, i);
        num = temp[0];
        i = temp[1];
      }
      else if(arr[i]=="ln"){
        temp=this.getANum(arr,i+1);
        _num=temp[0];
        i=temp[1];
        num =Math.log(_num);
      }
      else if (arr[i] == "sin") {
        temp = this.getANum(arr, i + 1);
        _num = temp[0];
        i = temp[1];
        num =Math.sin(_num *Math.PI/180);
      }
      else if (arr[i] == "cos") {
        temp = this.getANum(arr, i + 1);
        _num = temp[0];
        i = temp[1];
        num =Math.cos(_num*Math.PI/180);
      }
      else if (arr[i] == "tan") {
        temp = this.getANum(arr, i + 1);
        _num = temp[0];
        i = temp[1];
        num = Math.tan(_num * Math.PI / 180);
      }
      else if (arr[i] == "%") {
        num = num / 100;
        i++;
      } else {
        optarr.push(Number(num));
        optarr.push(arr[i]);
        num = "";
        i++;
      }
    }
    optarr.push(Number(num));
    var newArr=this.turnReversePolish(optarr);
    var result;
    for (var i = 0; newArr.length>1;) {
      if (isNaN(newArr[i])) {
        if (newArr[i] == this.data.idadd) {
          result = newArr[i - 2] + newArr[i-1];
          newArr.splice(i-2,3,result);
          i--;
        }
        else if (newArr[i] == this.data.idj) {
          result = newArr[i - 2] - newArr[i - 1];
          newArr.splice(i - 2, 3, result);
          i--;
        }
        else if (newArr[i] == this.data.idx) {
          result = newArr[i - 2] * newArr[i - 1];
          newArr.splice(i - 2, 3, result);
          i--;
        }
        else if (newArr[i] == this.data.iddiv) {
          result = newArr[i - 2] / newArr[i - 1];
          newArr.splice(i - 2, 3, result);
          i--;
        }
      }
      else i++;
    }
    result = newArr[0];
    var temp=(result+"").split('.')[1];
    if(temp!=undefined&&temp.length>8){
      result=result.toFixed(8);
      if(result==0)result=0;
    }
    //存储历史记录
    this.data.logs.push(data + '=' + result);
    wx.setStorageSync("logs", this.data.logs);
    this.data.arr.length = 0;
    this.data.arr.push(result);
    this.data.done.push(data + "=" + result);
    if (this.data.done.length > 4) {
      this.data.done.shift();
    }
    this.setData({ "screenData": result + "" });
    this.data.start=true;
    this.setData({ "done": this.data.done });
  },
  other:function(id){
    if (this.data.alertF == true) {
      this.error(); return;
    }
    if (this.data.operaSymbo[id] || id == "%") { //如果是符号+-*/
      if (this.data.lastIsOperaSymbo || this.data.lastIsTriangle || this.data.lastIsLn) {
        this.error(); return;
      }
    }
    if(this.data.triangle[id]||id=="ln"){
      if (this.data.lastIsTriangle || this.data.lastIsLn){
            this.error(); return;}
        if (!isNaN(this.data.arr[this.data.arr.length - 1])){
          this.data.screenData +="×";
          this.data.arr.push("×");
        }
    }
    if (!this.data.triangleF ==0 && this.data.operaSymbo[id]) this.setData({ triangleF:0 });
    var start = this.data.start;
    var sd=this.data.screenData;
    var data;
    if((sd=="0"&&id!="x"&&id!="÷"&&id!="%")||(start&&sd!=0&&!this.data.operaSymbo[id]&&id!="%")){
      data = id;
      if (this.data.triangle[id]) this.lastIsTriangle=true;
      if (id=="ln") this.lastIsLn = true;
      this.setData({ divF: false });
      this.data.arr.length = 0;
    }
    else{
      if (this.data.arr[this.data.arr.length-1]=="%"&&!isNaN(id)){
        this.error(); return;
      }
      if (id == "÷") {
        this.setData({ divF: true });
      }
      else if (id != "÷" && id != "0") {
        this.setData({ divF: false });
      }
      if (this.data.divF && id == "0") {
        this.setData({ "screenData": "不能除以0" });
        this.setData({ alertF: true });
        return;
      }
      if (!this.data.triangleF ==0){
        if (this.data.triangleF ==1) {
          var data = sd+ id + "°";
          this.data.triangleF=2;
        }
        else var data = sd.substring(0,sd.length-1) + id+"°";
      } 
      else data = sd + id;
    }
    this.data.start=false;
    this.setData({ "screenData": data });
    if (this.data.triangle[id]) this.setData({ triangleF:1 });
    this.data.arr.push(id);
    if (this.data.operaSymbo[id]) {
      this.setData({ "lastIsOperaSymbo": true });
    }
    else {
      this.setData({ "lastIsOperaSymbo": false });
    }
    if (this.data.triangle[id]) {
      this.setData({ "lastIsTriangle": true });
    }
    else {
      this.setData({ "lastIsTriangle": false });
    }
    if (id=="ln") {
      this.setData({ "lastIsLn": true });
    }
    else {
      this.setData({ "lastIsLn": false });
    }
  },
  compare:function(firstOperator, secondOperator) {
    if (firstOperator==undefined)return(0);
    if(((firstOperator == "+") || (firstOperator == "-")) && ((secondOperator == "*") ||    (secondOperator == "/"))) {
  return -1; //第一个操作符的优先级较小
} else if ((((firstOperator == "+") || (firstOperator == "-")) && ((secondOperator == "+") || (secondOperator == "-"))) || (
  ((firstOperator == "*") || (firstOperator == "/")) && ((secondOperator == "*") || (secondOperator == "/")))) {
  return 0; //二者具有相等的优先级
} else {
  return 1; //第一个操作符的优先级较大
}
},
  turnReversePolish:function(expression) {
    var i=0;//栈顶指针
    var opertator=[];
    var newArr=[];
    for(var k in expression){
      var temp = expression[k];
      if (!isNaN(temp))newArr.push(temp)
      else{
        if(this.compare(opertator[i],temp)){
          newArr.push(opertator.pop());
          opertator.push(temp);
        }
        else{
          opertator.push(temp);
          i++;
        }
      }  
    }
    while(i>0){
      newArr.push(opertator[--i]);
    }
    return(newArr);
  },
  clickBtn: function (event) {
    var id = event.target.id;
    if (id == this.data.idd) {  //del
      this.del();
    } 
    else if (id == this.data.idc) {  //清屏C
      this.clear();
    } 
    else if (id == this.data.ide) {  //等于＝
      this.equal();
    } 
    else {
      this.other(id);
    }
  },
  error:function(){
    this.setData({ "screenData": "出错" });
    this.setData({ alertF: true });
  }
})