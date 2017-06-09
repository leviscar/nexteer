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
var shiftISHAFT=["ISHAFT1","ISHAFT2","ISHAFT3","ISHAFT4"];
var shiftCEPS=["CEPS1","CEPS2","CEPS3","CEPS4","CEPS5"];
var shiftBEPS=["BEPS1","BEPS2","BEPS3"];
var shiftType = ["Ashift","Bshift","Cshift"];

//添加休息事件
$("#thiEventSub").bind("click",function () {
    var addEventJson= new eventInput($("#addThiType").val().toString(),$("#eventCellName").val().toString(),$("#addThiEvent").val().toString(),$("#addThiStart").val().toString(),$("#addThiEnd").val().toString());
    console.log(addEventJson);
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
                showEvent(data.cellName,data.workShiftId);
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
    setInterval(function () {
        $("#addThiStatus").html("");
    },1000*5);
    showshift();
});
function showEvent(cell,idInput) {
    $.get("http://10.1.0.40:8080/nexteer/rest-event?work_shift_id="+idInput, function (data) {
        $.each(data, function (i, model) {
            var title= "#show"+cell+"Event";

            $(title).append("<tbody><tr><td>"+data[i].shiftType+"</td><td>"+data[i].cellName+"</td><td>"+data[i].event+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr></tbody>");
        });

    });

}
$('#addThiEvent').editableSelect({
    effects: 'slide'
});
//添加班次按钮
$(document).ready(function(){
    $('#addISHAFT1Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addISHAFT2Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addISHAFT3Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addISHAFT4Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addCEPS1Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addCEPS2Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addCEPS3Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addCEPS4Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addCEPS5Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addBEPS1Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addBEPS2Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });
    $('#addBEPS3Table').on('click','.addShift',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var addDate = $(this).parent().parent().find("td").eq(2).find("input").val();
        var startTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(4).find("input").val();
        var standardBeat= $(this).parent().parent().find("td").eq(5).find("input").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(6).find("input").val();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(7).find("input").val();
        var target= $(this).parent().parent().find("td").eq(8).find("input").val();
        var open= $(this).parent().parent().find("td").eq(9).find("select").val();

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log(addInputJson);
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
                showShift();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(10).html("");
        },1000*3)

    });

});

//显示班次按钮
function showShift() {
    $("#showISHAFT1Table").find("tbody").remove();
    $("#showISHAFT2Table").find("tbody").remove();
    $("#showISHAFT3Table").find("tbody").remove();
    $("#showISHAFT4Table").find("tbody").remove();
    $("#showCEPS1Table").find("tbody").remove();
    $("#showCEPS2Table").find("tbody").remove();
    $("#showCEPS3Table").find("tbody").remove();
    $("#showCEPS4Table").find("tbody").remove();
    $("#showCEPS5Table").find("tbody").remove();
    $("#showBEPS1Table").find("tbody").remove();
    $("#showBEPS2Table").find("tbody").remove();
    $("#showBEPS3Table").find("tbody").remove();
    for (var i in shiftISHAFT){
        for(var j in shiftType){
            $.get("http://10.1.0.40:8080/nexteer/work-shift/"+shiftISHAFT[i]+"?shift_type="+shiftType[j], function (data) {
                console.log(typeof (data));
                console.log(data.id);
                var stringArray="#show"+data.cellName+"Table";

                $(stringArray).append("<tbody><tr><td>"+data.shiftType+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td><td>"+data.standardBeat+"</td><td>"+data.normalWorkerNum
                    +"</td><td>"+data.overtimeWorkerNum+"</td><td>"+data.target+"</td><td>"+data.cellName+"</td><td>"+data.open+"</td></tr></tbody>");
            });
        }
    }

    for (var m in shiftCEPS){
        for(var n in shiftType){
            $.get("http://10.1.0.40:8080/nexteer/work-shift/"+shiftCEPS[i]+"?shift_type="+shiftType[j], function (data) {
                var stringArray="#show"+data.cellName+"Table";
                $(stringArray).append("<tbody><tr><td>"+data.shiftType+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td><td>"+data.standardBeat+"</td><td>"+data.normalWorkerNum
                    +"</td><td>"+data.overtimeWorkerNum+"</td><td>"+data.target+"</td><td>"+data.cellName+"</td><td>"+data.open+"</td></tr></tbody>");
            });
        }
    }

    for (var x in shiftBEPS){
        for(var y in shiftType){
            $.get("http://10.1.0.40:8080/nexteer/work-shift/"+shiftBEPS[i]+"?shift_type="+shiftType[j], function (data) {
                var stringArray="#show"+data.cellName+"Table";
                $(stringArray).append("<tbody><tr><td>"+data.shiftType+"</td><td>"+data.startTime+"</td><td>"+data.endTime+"</td><td>"+data.standardBeat+"</td><td>"+data.normalWorkerNum
                    +"</td><td>"+data.overtimeWorkerNum+"</td><td>"+data.target+"</td><td>"+data.cellName+"</td><td>"+data.open+"</td></tr></tbody>");

            });
        }
    }


}
showShift();