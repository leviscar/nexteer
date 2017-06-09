/**
 * Created by Administrator on 2017/5/20.
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

var shift=["CEPS5","BEPS3","ISHAFT1","ISHAFT2","ISHAFT3","ISHAFT4"];
var shiftType = ["Ashift","Bshift","Cshift"];
var shiftTable=["#showCEPSTable","#showBEPSTable","#showIshaft1Table","#showIshaft2Table","#showIshaft3Table","#showIshaft4Table"];

function newBind() {
    var tdNods = $(".banci li table:nth-child(1) tbody tr td:nth-child(5)");
    tdNods.click(tdClick);
}
//显示班次按钮
function showShift() {
    $("#showISHAFT1Event").find("tbody").remove();
    $("#showISHAFT2Event").find("tbody").remove();
    $("#showISHAFT3Event").find("tbody").remove();
    $("#showISHAFT4Event").find("tbody").remove();
    $("#showCEPS5Event").find("tbody").remove();
    $("#showBEPS3Event").find("tbody").remove();

    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT1?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);

        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT1",data.id);
        if (data.open ==true){
            $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT1?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT1",data.id);
        if (data.open ==true){
            $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT1?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT1",data.id);
        if (data.open ==true){
            $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });

    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT2?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT2",data.id);
        if (data.open ==true){
            $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT2?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT2",data.id);
        if (data.open ==true){
            $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT2?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT2",data.id);
        if (data.open ==true){
            $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });

    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT3?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT3",data.id);
        if (data.open ==true){
            $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT3?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT3",data.id);
        if (data.open ==true){
            $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT3?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT3",data.id);
        if (data.open ==true){
            $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });

    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT4?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT4",data.id);
        if (data.open ==true){
            $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT4?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT4",data.id);
        if (data.open ==true){
            $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/ISHAFT4?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("ISHAFT4",data.id);
        if (data.open ==true){
            $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });

    $.get("http://10.1.0.40:8080/nexteer/work-shift/BEPS3?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("BEPS3",data.id);
        if (data.open ==true){
            $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/BEPS3?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("BEPS3",data.id);
        if (data.open ==true){
            $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/BEPS3?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("BEPS3",data.id);
        if (data.open ==true){
            $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });

    $.get("http://10.1.0.40:8080/nexteer/work-shift/CEPS5?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("CEPS5",data.id);
        if (data.open ==true){
            $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/CEPS5?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("CEPS5",data.id);
        if (data.open ==true){
            $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
    $.get("http://10.1.0.40:8080/nexteer/work-shift/CEPS5?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data.id);
        console.log(data);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(4).text(data.standardBeat==0?"":data.standardBeat);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(6).text(data.overtimeWorkerNum==0?"":data.overtimeWorkerNum);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(7).text(data.target==0?"":data.target);
        showEvent("CEPS5",data.id);
        if (data.open ==true){
            $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\"  checked/> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();

        }
        else{
            $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(8).replaceWith("<td class=\"switch switch-large\" data-on=\"danger\" data-off=\"primary\" > <input type=\"checkbox\" name=\"my-checkbox\" /> </td>");
            $("[name='my-checkbox']").bootstrapSwitch();
        }

    });
}
showShift();

//添加班次按钮
$(document).ready(function(){


    $('#showShiftLi').on('click','.shiftSub',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).attr("class");
        var shiftType = $(this).parent().parent().find("td").eq(1).text();
        var startTime = $(this).parent().parent().find("td").eq(2).find("input").val();
        var endTime = $(this).parent().parent().find("td").eq(3).find("input").val();
        var standardBeat= $(this).parent().parent().find("select").val();
        var normalWorkerNum= $(this).parent().parent().find("td").eq(5).text();
        var overtimeWorkerNum= $(this).parent().parent().find("td").eq(6).text();
        var target= $(this).parent().parent().find("td").eq(7).text();
        var open= $(this).parent().parent().find("td").eq(8).find("input").is(':checked');
        var addDate = Uyear+"-"+Umonth+"-"+Uday;

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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");



                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");

                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
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
                        $(".showStatus").html("班次信息更新完成");


                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                        console.log('fail');
                        $(".showStatus").html("班次信息更新失败");
                    }

                });
        }
        showShift();
        setInterval(function () {
            $(".showStatus").html("");
        },1000*3)

    });

});

function showEvent(cell,idInput) {
    $.get("http://10.1.0.40:8080/nexteer/rest-event?work_shift_id="+idInput, function (data) {
        console.log(data);
        var title= "#show"+cell+"Event";
        $.each(data, function (i, model) {
            console.log(idInput+":"+title);
            var line;
            switch (data[i].cellName){
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
            $(title).prepend("<tbody><tr><td>"+line+"</td><td>"+data[i].shiftType+"</td><td>"+data[i].event+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr></tbody>");
        });

    });

}

$('#showShiftLi').on('click','.eventSub',function(){
    $("#eventCell").attr("class",$(this).parent().parent().find("td").eq(0).attr("class"));
    $("#eventCell").html($(this).parent().parent().find("td").eq(0).text());
    $("#eventShift").html($(this).parent().parent().find("td").eq(1).text());

});

$("#addEventSub").bind("click",function () {
    {
        var addEventJson= new eventInput($("#eventShift").text().toString(),$("#eventCell").attr("class").toString(),$("#eventIn").val().toString(),$("#eventStart").val().toString(),$("#eventEnd").val().toString());
        console.log(addEventJson);
        switch ($("#eventCell").attr("class").toString()){
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
        showShift();

        setInterval(function () {
            $("#addThiStatus").html("");
        },1000*5);
    }

});

$('#eventIn').editableSelect({
    effects: 'slide'
});
$("[name='my-checkbox']").bootstrapSwitch();

