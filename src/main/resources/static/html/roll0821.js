/**
 * Created by Administrator on 2017/8/21.
 */
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


function getPollStatus() {
    $.get("http://10.1.0.40:8080/nexteer/polling-page/",function (data) {
        url.remove('welcome');
        url.remove('index');
        url.remove('ISHAFT1');
        url.remove('ISHAFT2');
        url.remove('ISHAFT3');
        url.remove('ISHAFT4');
        url.remove('BEPS1');
        url.remove('BEPS2');
        url.remove('BEPS3');
        url.remove('CEPS1');
        url.remove('CEPS2');
        url.remove('CEPS3');
        url.remove('CEPS4');
        url.remove('CEPS5');
        console.log(data[0]);
        $.each(data,function (i,model) {

            if(data[i].isPolling==true){
                switch (data[i].cellName){
                    case "welcome":url.push('welcome');break;
                    case "index":url.push('index');break;
                    case "ISHAFT1":url.push("ISHAFT1");break;
                    case "ISHAFT2":url.push("ISHAFT2");break;
                    case "ISHAFT3":url.push("ISHAFT3");break;
                    case "ISHAFT4":url.push("ISHAFT4");break;
                    case "BEPS1":url.push("BEPS1");break;
                    case "BEPS2":url.push("BEPS2");break;
                    case "BEPS3":url.push("BEPS3");break;
                    case "CEPS1":url.push("CEPS1");break;
                    case "CEPS2":url.push("CEPS2");break;
                    case "CEPS3":url.push("CEPS3");break;
                    case "CEPS4":url.push("CEPS4");break;
                    case "CEPS5":url.push("CEPS5");break;
                }
            }


        });

    })

}
function getAll() {
    getPollStatus();

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
setInterval( "changeSrc() ",2*1000);
