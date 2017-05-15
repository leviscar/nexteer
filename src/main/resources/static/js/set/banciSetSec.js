/**
 * Created by Administrator on 2017/5/1.
 */
function shiftInput(setTime,shiftType,morStart, morEnd,Beats,morWorkNum,morWorkOverNum,morTar , cellName,open) {
    this.addDate = setTime;
    this.shiftType = shiftType;
    this.startTime  = morStart;
    this.endTime = morEnd;
    this.standardBeat= Beats;
    this.normalWorkerNum = morWorkNum;
    this.overtimeWorkerNum = morWorkOverNum;
    this.target =morTar;
    this.cellName = cellName;
    this.open = open;
}

function  eventInput(type,cellName,event,eventStart,eventEnd) {
    this.shiftType=type;
    this.cellName = cellName;
    this.event=event;
    this.startTime=eventStart;
    this.endTime=eventEnd;
}

var shiftType = ["Ashift","Bshift","Cshift"];

//添加休息事件
$("#thiEventSub").bind("click",function () {
    var addEventJson= new eventInput($("#addThiType").val().toString(),$("#eventCellName").val().toString(),$("#addThiEvent").val().toString(),$("#addThiStart").val().toString(),$("#addThiEnd").val().toString());
    console.log(addEventJson);
    switch ($("#eventCellName").val().toString()){
        case "CEPS5":
            addEventJson.cellName="CEPS1";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            addEventJson.cellName="CEPS2";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            addEventJson.cellName="CEPS3";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            addEventJson.cellName="CEPS4";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            addEventJson.cellName="CEPS5";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                        var line;
                        switch (data.cellName){
                            case "ISHAFT1": line="第一条中间轴";
                                break;
                            case "ISHAFT2": line="第二条中间轴";
                                break;
                            case "ISHAFT3": line="第三条中间轴";
                                break;
                            case "ISHAFT4": line="第四条中间轴";
                                break;
                            case "BEPS3": line="有刷产线";
                                break;
                            case "CEPS5": line="无刷产线";
                                break;
                        }
                        $("#showISHAFT1Event").prepend("<tbody><tr><td>"+data.shiftType+"</td><td>"+line+"</td><td>"+data.event+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td></tr></tbody>");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            break;
        case "BEPS3":
            addEventJson.cellName="BEPS1";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            addEventJson.cellName="BEPS2";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            addEventJson.cellName="BEPS3";
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                        var line;
                        switch (data.cellName){
                            case "ISHAFT1": line="第一条中间轴";
                                break;
                            case "ISHAFT2": line="第二条中间轴";
                                break;
                            case "ISHAFT3": line="第三条中间轴";
                                break;
                            case "ISHAFT4": line="第四条中间轴";
                                break;
                            case "BEPS3": line="有刷产线";
                                break;
                            case "CEPS5": line="无刷产线";
                                break;
                        }
                        $("#showISHAFT1Event").prepend("<tbody><tr><td>"+data.shiftType+"</td><td>"+line+"</td><td>"+data.event+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td></tr></tbody>");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
            break;
        default:
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/rest-event",
                data: JSON.stringify(addEventJson),
                dataType: "json",
                success: function (data) {
                    if(data.id != null) {
                        $("#addThiStatus").html("成功");
                        var line;
                        switch (data.cellName){
                            case "ISHAFT1": line="第一条中间轴";
                                break;
                            case "ISHAFT2": line="第二条中间轴";
                                break;
                            case "ISHAFT3": line="第三条中间轴";
                                break;
                            case "ISHAFT4": line="第四条中间轴";
                                break;
                            case "BEPS3": line="有刷产线";
                                break;
                            case "CEPS5": line="无刷产线";
                                break;
                        }
                        $("#showISHAFT1Event").prepend("<tbody><tr><td>"+data.shiftType+"</td><td>"+line+"</td><td>"+data.event+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td></tr></tbody>");
                    }
                    else{
                        $("#addThiStatus").html("请先添加班次");
                    }
                    console.log(data.event);
                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
    }

    setInterval(function () {
        $("#addThiStatus").html("");
    },1000*5);
});


$('#addThiEvent').editableSelect({
    effects: 'slide'
});


//添加班次按钮
$(document).ready(function(){

    $('#addISHAFT1Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).find("select").val();
        var shiftType = $(this).parent().parent().find("td").eq(1).find("select").val();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("input").is(':checked');

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
        switch (cellName){
            case "CEPS5":
                addInputJson.cellName="CEPS1";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                addInputJson.cellName="CEPS2";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                addInputJson.cellName="CEPS3";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                addInputJson.cellName="CEPS4";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                addInputJson.cellName="CEPS5";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");
                        var line;
                        switch (data.cellName){
                            case "ISHAFT1": line="第一条中间轴";
                                break;
                            case "ISHAFT2": line="第二条中间轴";
                                break;
                            case "ISHAFT3": line="第三条中间轴";
                                break;
                            case "ISHAFT4": line="第四条中间轴";
                                break;
                            case "BEPS3": line="有刷产线";
                                break;
                            case "CEPS5": line="无刷产线";
                                break;
                        }
                        $("#showISHAFT1Table").prepend("<tbody><tr><td>"+line+"</td><td>"+data.shiftType+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td><td>"+data.standardBeat+"</td><td>"+data.normalWorkerNum
                            +"</td><td>"+data.overtimeWorkerNum+"</td><td>"+data.target+"</td><td>"+data.open+"</td></tr></tbody>");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                break;
            case "BEPS3":
                addInputJson.cellName="BEPS1";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                addInputJson.cellName="BEPS2";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                addInputJson.cellName="BEPS3";
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");
                        var line;
                        switch (data.cellName){
                            case "ISHAFT1": line="第一条中间轴";
                                break;
                            case "ISHAFT2": line="第二条中间轴";
                                break;
                            case "ISHAFT3": line="第三条中间轴";
                                break;
                            case "ISHAFT4": line="第四条中间轴";
                                break;
                            case "BEPS3": line="有刷产线";
                                break;
                            case "CEPS5": line="无刷产线";
                                break;
                        }
                        $("#showISHAFT1Table").prepend("<tbody><tr><td>"+line+"</td><td>"+data.shiftType+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td><td>"+data.standardBeat+"</td><td>"+data.normalWorkerNum
                            +"</td><td>"+data.overtimeWorkerNum+"</td><td>"+data.target+"</td><td>"+data.open+"</td></tr></tbody>");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
                break;
            default:
                $.ajax({
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/work-shift",
                    data: JSON.stringify(addInputJson),
                    dataType: "json",
                    success: function (data) {

                        console.log(JSON.stringify(data));
                        console.log('nice');
                        $(this).parent().parent().find("td").eq(10).html("添加成功");
                        var line;
                        switch (data.cellName){
                            case "ISHAFT1": line="第一条中间轴";
                                break;
                            case "ISHAFT2": line="第二条中间轴";
                                break;
                            case "ISHAFT3": line="第三条中间轴";
                                break;
                            case "ISHAFT4": line="第四条中间轴";
                                break;
                            case "BEPS3": line="有刷产线";
                                break;
                            case "CEPS5": line="无刷产线";
                                break;
                        }
                        $("#showISHAFT1Table").prepend("<tbody><tr><td>"+line+"</td><td>"+data.shiftType+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td><td>"+data.standardBeat+"</td><td>"+data.normalWorkerNum
                            +"</td><td>"+data.overtimeWorkerNum+"</td><td>"+data.target+"</td><td>"+data.open+"</td></tr></tbody>");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(this).parent().parent().find("td").eq(4).html("添加失败");
                    }

                });
        }
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });

});

$("[name='my-checkbox']").bootstrapSwitch();
