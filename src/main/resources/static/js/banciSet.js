/**
 * Created by Administrator on 2017/3/18.
 */
function OneShiftInput(morStart, morEnd,Beats,morWorkNum,morWorkOverNum) {
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.morning_shift_standard_beats= Beats;
    this.morning_worker_num = morWorkNum;
    this.morning_overtime_worker_num = morWorkOverNum;
}
function TwoShiftInput(morStart, morEnd,nigStart,nigEnd ,MBeats,NBeats,MWorkNum,NWorkNum,MWorkOverNum,NWorkOverNum) {
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.morning_shift_standard_beats= MBeats;
    this.night_shift_standard_beats= NBeats;
    this.morning_worker_num=MWorkNum;
    this.night_worker_num = NWorkNum;
    this.morning_overtime_worker_num=MWorkOverNum;
    this.night_overtime_worker_num=NWorkOverNum;
}

function ThreeShiftInput(morStart, morEnd,midStart,midEnd,nigStart,nigEnd ,morBeats,midBeats,nBeats,morWorkNum,midWorkNum,ntWorkNum,morWorkOverNum,midWorkOverNum,ntWorkOverNum) {
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.middle_shift_start=midStart;
    this.middle_shift_end=midEnd;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.morning_shift_standard_beats=morBeats;
    this.middle_shift_standard_beats=midBeats;
    this.night_shift_standard_beats= nBeats;
    this.morning_worker_num=morWorkNum;
    this.middle_worker_num=midWorkNum;
    this.night_worker_num=ntWorkNum;
    this.morning_overtime_worker_num = morWorkOverNum;
    this.middle_overtime_worker_num = midWorkOverNum;
    this.night_overtime_worker_num = ntWorkOverNum;
}
function  eventInput(type,event,eventStart,eventEnd) {
    this.shift_type=type;
    this.event=event;
    this.event_start_time=eventStart;
    this.event_end_time=eventEnd;
}
console.log("开始运行");
$("#oneSub").bind("click", function () {

    var OneshiftJson=new OneShiftInput($("#oneStart").val().toString(),$("#oneEnd").val().toString(),$("#oneStdBeats").val(),$("#oneWorkNum").val(),$("#oneWorkOverNum").val());
    console.log("start");
    console.log(JSON.stringify(OneshiftJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/work-shift/addOneShift",
        data:JSON.stringify(OneshiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#oneStatus").html("添加班次信息成功");
            }
            else{
                $("#oneStatus").html("添加班次信息失败");
            }
            console.log(data.status);
            console.log("nice");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

$("#twoSub").bind("click", function () {
    var TwoshiftJson =new TwoShiftInput($("#twoMStart").val().toString(),$("#twoMEnd").val().toString(),$("#twoNStart").val().toString(),$("#twoNEnd").val().toString(),$("#twoMStdBeats").val(),$("#twoNStdBeats").val(),$("#twoMWorkNum").val(),$("#twoNWorkNum").val(),$("#twoMWorkOverNum").val(),$("#twoNWorkOverNum").val());

    console.log( JSON.stringify(TwoshiftJson));

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/work-shift/addTwoShift",
        data: JSON.stringify(TwoshiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#twoStatus").html("添加班次信息成功");
            }
            else{
                $("#twoStatus").html("添加班次信息失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

$("#thiSub").bind("click", function () {


    var ThishiftJson=new ThreeShiftInput($("#thiMorStart").val(),$("#thiMorEnd").val(),$("#thiMidStart").val(),
        $("#thiMidEnd").val(),$("#thiNStart").val(),$("#thiNEnd").val(), Number($("#thiMorBeats").val()),Number($("#thiMidBeats").val()),Number($("#thiNBeats").val()),
        Number($("#thiMWorkNum").val()),Number($("#thiMidWorkNum").val()),Number($("#thiNWorkNum").val()),Number($("#thiMWorkOverNum").val()),Number($("#thiMidWorkOverNum").val()),Number($("#thiNWorkOverNum").val()));

    // $("#thiMorStart").val(),$("#thiMorEnd").val(),$("#thiMidStart").val(),
    //     $("#thiMidEnd").val(),$("#thiNStart").val(),$("#thiNEnd").val(),parseInt($("#thiMorTar").val()),parseInt($("#thiMidTar").val()),parseInt($("#thiNTar").
    // val()),parseInt($("#thiMorBeats").val()),parseInt($("#thiMidBeats").val()),parseInt($("#thiNBeats").val())

    console.log( JSON.stringify(ThishiftJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/work-shift/addThreeShift",
        data: JSON.stringify(ThishiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#thiStatus").html("添加班次信息成功");
            }
            else{
                $("#thiStatus").html("添加班次信息失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

$("#oneEventSub").bind("click",function () {
    var addEventJson=new eventInput("早班",$("#addEvent").val().toString(),$("#addStart").val().toString(),$("#addEnd").val().toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/rest-event/addEvent",
        data: JSON.stringify(addEventJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#addStatus").html("添加事件成功");
            }
            else{
                $("#addStatus").html("添加事件失败");
            }
            console.log(data.status);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

$("#twoEventSub").bind("click",function () {
    var addEventJson=new eventInput($("#addSecType").val().toString(),$("#addSecEvent").val().toString(),$("#addSecStart").val().toString(),$("#addSecEnd").val().toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/rest-event/addEvent",
        data: JSON.stringify(addEventJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status== true) {
                $("#addSecStatus").html("添加事件成功");
            }
            else{
                $("#addSecStatus").html("添加事件失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addSecStatus").html("");
    },1000*3)
});

$("#thiEventSub").bind("click",function () {
    var addEventJson= new eventInput($("#addThiType").val().toString(),$("#addThiEvent").val().toString(),$("#addThiStart").val().toString(),$("#addThiEnd").val().toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/rest-event/addEvent",
        data: JSON.stringify(addEventJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#addThiStatus").html("添加事件成功");
            }
            else{
                $("#addThiStatus").html("添加事件失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});
