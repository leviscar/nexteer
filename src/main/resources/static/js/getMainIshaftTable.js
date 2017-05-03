/**
 * Created by Administrator on 2017/4/2.
 */
var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
var targetOut = [0,0,0,0];
var nowOut = [0,0,0,0];
var achevive = ["00%","00%","00%","00%"];
var status = [0,1,0,1];
var titleLink = ["http://10.1.0.40:8080/nexteer/IshaftYieldWeek.html ","http://10.1.0.40:8080/nexteer/IshaftYieldWeek.html ","http://10.1.0.40:8080/nexteer/IshaftYieldWeek.html ","http://10.1.0.40:8080/nexteer/IshaftYieldWeek.html ","http://10.1.0.40:8080/nexteer/IshaftYieldWeek.html "];
var link = ["http://10.1.0.40:8080/nexteer/IshaftOneUnit.html","http://10.1.0.40:8080/nexteer/IshaftOneUnit.html","http://10.1.0.40:8080/nexteer/IshaftTwoUnit.html","http://10.1.0.40:8080/nexteer/IshaftTwoUnit.html"];

function change(n){
    getMainOee();
    if(n>IshaftTitle.length-1) n=0;  //
    $("#showIshaft").replaceWith("<div class=\"col-md-8 ftqTitle text-center\" id=\"showIshaft\"><a href="+IshaftOEEHref[n]+">"+IshaftTitle[n]+"</a></div>");
    $("#showIshaftValue").replaceWith("<div class=\"ftqNumCon text-center\" id=\"showIshaftValue\">"+IshaftOEEValue[n]+"%"+"</div>");
    $("#IshaftTable").replaceWith("<tr id=\"IshaftTable\"><td><a href="+titleLink[n]+">"+IshaftTitle[n]+"</a></td><td>"+targetOut[n]+"</td><td>"+nowOut[n]+"</td><td>"+achevive[n]+"</td><td><span class=\"glyphicon glyphicon-thumbs-up\"></span></td><td><a href="+link[n]+">进入"+IshaftTitle[n]+"单元</a></td></tr>");
    n++;
    setTimeout("change("+n+")",1000*2);
}
window.onload = function(){
    setTimeout("change(1)", 1000*2);
};