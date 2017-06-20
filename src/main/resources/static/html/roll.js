/**
 * Created by Administrator on 2017/5/15.
 */

function  curTimeInput(currTime) {
    this.curr_time=currTime;
}
function judgeTime(time) {
    var timeStr="";
    if (time<10){
        timeStr="0"+time.toString()
    }
    else {
        timeStr=time.toString()
    }
    return timeStr;
}
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

var url = ['index','BEPS1','BEPS2','BEPS3','CEPS1','CEPS2','CEPS3','CEPS4','CEPS5','ISHAFT1','ISHAFT2','ISHAFT3','ISHAFT4','welcome'];
var urlStr = [{'index':"../../index.html"},
    {'BEPS1':"../../html/Unit/BEPS1Unit.html"},
    {'BEPS2':"../../html/Unit/BEPS2Unit.html"},
    {'BEPS3':"../../html/Unit/BEPS3Unit.html"},
    {'CEPS1':"../../html/Unit/CEPS1Unit.html"},
    {'CEPS2':"../../html/Unit/CEPS1Unit.html"},
    {'CEPS3':"../../html/Unit/CEPS1Unit.html"},
    {'CEPS4':"../../html/Unit/CEPS1Unit.html"},
    {'CEPS5':"../../html/Unit/CEPS1Unit.html"},
    {'ISHAFT1':"../../html/Unit/Ishaft1Unit.html"},
    {'ISHAFT2':"../../html/Unit/Ishaft2Unit.html"},
    {'ISHAFT3':"../../html/Unit/Ishaft3Unit.html"},
    {'ISHAFT4':"../../html/Unit/Ishaft4Unit.html"},
    {'welcome':"../../html/welcome.html"}];

function urlObj() {
    this.index="../index.html";
    this.BEPS1="../html/Unit/BEPS1Unit.html";
    this.BEPS2="../html/Unit/BEPS2Unit.html";
    this.BEPS3="../html/Unit/BEPS3Unit.html";
    this.CEPS1="../html/Unit/CEPS1Unit.html";
    this.CEPS2="../html/Unit/CEPS1Unit.html";
    this.CEPS3="../html/Unit/CEPS1Unit.html";
    this.CEPS4="../html/Unit/CEPS1Unit.html";
    this.CEPS5="../html/Unit/CEPS1Unit.html";
    this.ISHAFT1="../html/Unit/Ishaft1Unit.html";
    this.ISHAFT2="../html/Unit/Ishaft2Unit.html";
    this.ISHAFT3="../html/Unit/Ishaft3Unit.html";
    this.ISHAFT4="../html/Unit/Ishaft4Unit.html";
    this.welcome="../html/welcome.html";
}


localStorage.index="../index.html";
localStorage.BEPS1="../../nexteer/html/Unit/BEPS1Unit.html";
localStorage.BEPS2="../../nexteer/html/Unit/BEPS2Unit.html";
localStorage.BEPS3="../../nexteer/html/Unit/BEPS3Unit.html";

localStorage.CEPS1="../../nexteer/html/Unit/CEPS1Unit.html";
localStorage.CEPS2="../../nexteer/html/Unit/CEPS2Unit.html";
localStorage.CEPS3="../../nexteer/html/Unit/CEPS3Unit.html";
localStorage.CEPS4="../../nexteer/html/Unit/CEPS4Unit.html";
localStorage.CEPS5="../../nexteer/html/Unit/CEPS5Unit.html";

localStorage.ISHAFT1="../../nexteer/html/Unit/Ishaft1Unit.html";
localStorage.ISHAFT2="../../nexteer/html/Unit/Ishaft2Unit.html";
localStorage.ISHAFT3="../../nexteer/html/Unit/Ishaft3Unit.html";
localStorage.ISHAFT4="../../nexteer/html/Unit/Ishaft4Unit.html";
localStorage.welcome="../../nexteer/html/welcome.html";

var count = 0;

var urlObjData=new urlObj();

function getRunStatus(cell) {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();

    var index;
    var urlIndex;
    switch (cell){
        case "ISHAFT1":
            index=1;
            urlIndex=urlObjData.ISHAFT1;
            break;
        case "ISHAFT2":
            index=2;
            urlIndex=urlObjData.ISHAFT2;
            break;
        case "ISHAFT3":
            index=3;
            urlIndex=urlObjData.ISHAFT3;
            break;
        case "ISHAFT4":
            index=4;
            urlIndex=urlObjData.ISHAFT4;
            break;
        case "BEPS1":
            index=5;
            urlIndex=urlObjData.BEPS1;
            break;
        case "BEPS2":
            index=6;
            urlIndex=urlObjData.BEPS2;
            break;
        case "BEPS3":
            index=7;
            urlIndex=urlObjData.BEPS3;
            break;

        case "CEPS1":
            index=8;
            urlIndex=urlObjData.CEPS1;
            break;
        case "CEPS2":
            index=9;
            urlIndex=urlObjData.CEPS2;
            break;
        case "CEPS3":
            index=10;
            urlIndex=urlObjData.CEPS3;
            break;
        case "CEPS4":
            index=11;
            urlIndex=urlObjData.CEPS4;
            break;
        case "CEPS5":
            index=12;
            urlIndex=urlObjData.CEPS5;
            break;

    }
    var curTime= year+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    var urlString = "http://localhost:8080/nexteer/unit-status/"+cell+"?curr_time="+curTime;
    console.log(urlString);
    console.log(url);
    $.get(urlString,function (data) {
        localStorage.removeItem(cell);
        url.remove(cell);

        console.log("nice");
        console.log($.parseJSON(data).curr_shift_info);
        if($.parseJSON(data).id!=null){
            if($.parseJSON(data).curr_shift_info.open==true){
                localStorage.setItem(cell,urlIndex);
                console.log("in");
                console.log(urlIndex);
                url.push(cell);

            }
            else {
                localStorage.removeItem(cell);
            }
            console.log(cell+":"+$.parseJSON(data).curr_shift_info.open);
            console.log(localStorage.getItem(cell));
        }

    })
}

function getPollStatus() {
    $.get("http://localhost:8080/nexteer/polling-page/",function (data) {
        url.remove('welcome');
        console.log(data[0]);
        if(data[0]==undefined){
        }
        else if(data[0].cellName=="welcome"&&data[0].isPolling==true){
            url.push('welcome');

        }

    })

}
function getAll() {
    getPollStatus();
    getRunStatus("ISHAFT1");
    getRunStatus("ISHAFT2");
    getRunStatus("ISHAFT3");
    getRunStatus("ISHAFT4");
    getRunStatus("BEPS1");
    getRunStatus("BEPS2");
    getRunStatus("BEPS3");
    getRunStatus("CEPS1");
    getRunStatus("CEPS2");
    getRunStatus("CEPS3");
    getRunStatus("CEPS4");
    getRunStatus("CEPS5");
}

getAll();


function changeSrc () {
    getAll();
    console.log("当前网址数组："+url);
    if (count >= url.length) count = 0;
    $("#iframe1").replaceWith("<iframe id=\"iframe1\" src="+localStorage.getItem(url[count])+"></iframe>");
    count ++;
}
$("#exitRoll").bind("click",function () {
    window.location.assign("../index.html");

});
setInterval( "changeSrc() ",20*1000);
