/**
 * Created by Administrator on 2017/5/25.
 */

var IshaftTitle=["ISHAFT1","ISHAFT2","ISHAFT3","ISHAFT4"];
var IshaftOEEHref=["http://10.1.0.40:8080/nexteer/html/oeeSec/ishaft1OEESec.html","http://10.1.0.40:8080/nexteer/html/oeeSec/ishaft2OEESec.html",
    "http://10.1.0.40:8080/nexteer/html/oeeSec/ishaft1OEESec.html","http://10.1.0.40:8080/nexteer/html/oeeSec/ishaft1OEESec.html"];

var IshaftHCEHref=["http://10.1.0.40:8080/nexteer/html/hceSec/ishaft1HceSec.html","http://10.1.0.40:8080/nexteer/html/hceSec/ishaft2HceSec.html",
    "http://10.1.0.40:8080/nexteer/html/hceSec/ishaft3HceSec.html","http://10.1.0.40:8080/nexteer/html/hceSec/ishaft4HceSec.html"];

function change(n){
    if(n>IshaftTitle.length-1) n=0;
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var currTime = judgeTime(year)+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    $("#showIshaft1OeeValue").html("---");
    $("#oeeIshaft").replaceWith("<div class=\"col-md-8 ftqTitle text-center \" id=\"oeeIshaft\"><a href="+IshaftOEEHref[n]+">"+IshaftTitle[n]+"</a></div>");
    $.get("http://10.1.0.40:8080/nexteer/dashboard/oee/"+IshaftTitle[n]+"?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));
                console.log("获取Oee成功");

                $("#showIshaft1OeeValue").html($.parseJSON(data).oee.toFixed(1)+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $("#hceIshaft").replaceWith("<div class=\"col-md-8 ftqTitle text-center \" id=\"hceIshaft\"><a href="+IshaftHCEHref[n]+">"+IshaftTitle[n]+"</a></div>");
        $("#showMainIshaft1Hce").html("---");
    $.get("http://10.1.0.40:8080/nexteer/dashboard/hce/"+IshaftTitle[n]+"?time="+currTime,function (data) {

        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));

                $("#showMainIshaft1Hce").html($.parseJSON(data).hce.toFixed(1)+"%");
                console.log("获取hce操作成功");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    n++;
    setTimeout("change("+n+")",1000*2);
}
window.onload = function(){
    setTimeout("change(1)", 1000*3);
};