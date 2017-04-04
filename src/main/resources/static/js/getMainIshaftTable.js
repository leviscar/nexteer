/**
 * Created by Administrator on 2017/4/2.
 */
var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
var targetOut = [1000,2000,3000,4000];
var nowOut = [720,820,920,1020];
var achevive = ["72%","82%","92%","102%"];
var status = [0,1,0,1];
var titleLink = ["http://localhost:8080/IshaftYieldWeek.html ","http://localhost:8080/IshaftYieldWeek.html ","http://localhost:8080/IshaftYieldWeek.html ","http://localhost:8080/IshaftYieldWeek.html ","http://localhost:8080/IshaftYieldWeek.html "];
var link = ["http://localhost:8080/IshaftOneUnit.html","http://localhost:8080/IshaftOneUnit.html","http://localhost:8080/IshaftTwoUnit.html","http://localhost:8080/IshaftTwoUnit.html"];

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