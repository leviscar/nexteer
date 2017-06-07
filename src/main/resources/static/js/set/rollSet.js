/**
 * Created by Administrator on 2017/6/5.
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

function getRunStatus(cell) {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();

    var index;
    switch (cell){
        case "ISHAFT1":
            index=1;
            break;
        case "ISHAFT2":
            index=2;
            break;
        case "ISHAFT3":
            index=3;
            break;
        case "ISHAFT4":
            index=4;
            break;
        case "BEPS1":
            index=5;
            break;
        case "BEPS2":
            index=6;
            break;
        case "BEPS3":
            index=7;
            break;

        case "CEPS1":
            index=8;
            break;
        case "CEPS2":
            index=9;
            break;
        case "CEPS3":
            index=10;
            break;
        case "CEPS4":
            index=11;
            break;
        case "CEPS5":
            index=12;
            break;

    }
    // var curTime="2017-03-23 19:00:00";
    var curTime= year+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    var urlString = "http://10.1.0.40:8080/nexteer/unit-status/"+cell+"?curr_time="+curTime;
    console.log(urlString);
    $.get(urlString,function (data) {
        if(data.curr_shift_info.id!=null){
            if(data.curr_shift_info.open==true){
                $(".rollTbody").find("tr").eq(index).find("td").eq(1).replaceWith("<td class='switch switch-large' data-on='danger' data-off='primrya' > <input type='checkbox' name='my-checkbox'  /></td>");

            }
        }
    })
}

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

var urlData=[];

function checkButton() {
    console.log($(".rollTbody").find("tr").eq(i).find("input").is(':checked'));
    for(var i=0;i<14;i++){
        if( $(".rollTbody").find("tr").eq(i).find("input").is(':checked')==true){
            urlData[i]=$(".rollTbody").find("tr").eq(i).find("td").eq(0).attr("class");
        }else{
            urlData[i]=null;
        }

    }
    console.log(urlData);

}
checkButton();