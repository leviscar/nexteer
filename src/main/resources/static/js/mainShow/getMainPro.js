/**
 * Created by Administrator on 2017/3/30.
 */
function mainProInput( curr_time,cell_name) {
    this.curr_time=curr_time;
    this.cell_name=cell_name;
}
var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
var IshaftValue=["94%","89%","76%","54%"];
var targetOut = [1000,2000,3000,4000];
var nowOut = [720,820,920,1020];
var achevive = ["72%","82%","92%","102%"];
var status = [0,1,0,1];
var titleLink = ["http://localhost:8080/nexteer/Ishaft1YieldWeek.html ","http://localhost:8080/nexteer/Ishaft1YieldWeek.html ","http://localhost:8080/nexteer/Ishaft1YieldWeek.html ","http://localhost:8080/nexteer/Ishaft1YieldWeek.html ","http://localhost:8080/nexteer/Ishaft1YieldWeek.html "];
var link = ["http://localhost:8080/nexteer/IshaftOneUnit.html","http://localhost:8080/nexteer/IshaftOneUnit.html","http://localhost:8080/nexteer/IshaftTwoUnit.html","http://localhost:8080/nexteer/IshaftTwoUnit.html"];
function change(n){
    if(n>IshaftTitle.length-1) n=0;  //
    $("#showIshaft").replaceWith("<a href=\"\" id=\"showIshaft\">"+IshaftTitle[n]+"</a>");
    $("#showIshaftValue").replaceWith("<div class=\"ftqNumCon text-center\" id=\"showIshaftValue\">"+IshaftValue[n]+"</div>");
    $("#IshaftTable").replaceWith("<tr id=\"IshaftTable\"><td><a href="+titleLink[n]+">"+IshaftTitle[n]+"</a></td><td>"+targetOut[n]+"</td><td>"+nowOut[n]+"</td><td>"+achevive[n]+"</td><td><span class=\"glyphicon glyphicon-thumbs-up\"></span></td><td><a href="+link[n]+">进入"+IshaftTitle[n]+"单元</a></td></tr>");
    n++;
    setTimeout("change("+n+")",1000*2);
}

console.log("getMainPro开始运行");
$.ajax({
    type:"POST",
    url:"http://localhost:8080/nexteer/dashboard/output",
    data:JSON.stringify(),
    contentType:"application/json;charset=utf-8",
    sync : false,
    dataType:"json",
    success:function (data) {
        console.log(JSON.stringify(data));
        console.log(data.status);
        switch(data.cellName) {
            case "ishaft1":{
                targetOut[0]=data.targetOutput;
                nowOut[0]=data.curOutput;
                achevive[0]=data.reachRate;
                status[0]=data.status;
            }
            break;
            case "ishaft2":{
                targetOut[1]=data.targetOutput;
                nowOut[1]=data.curOutput;
                achevive[1]=data.reachRate;
                status[1]=data.status;
            }
            break;
            case "ishaft3":{
                targetOut[1]=data.targetOutput;
                nowOut[1]=data.curOutput;
                achevive[1]=data.reachRate;
                status[1]=data.status;
            }
            break;
            case "ishaft4":{
                targetOut[3]=data.targetOutput;
                nowOut[3]=data.curOutput;
                achevive[3]=data.reachRate;
                status[3]=data.status;
            }
            break;
            default:
                break;
        }


    }
});

window.onload = function(){
    setTimeout("change(1)", 1000*2);
};