/**
 * Created by Administrator on 2017/9/10.
 */
/**
 * Created by Administrator on 2017/7/27.
 */
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
var shiftTime=new Object();
shiftTime.ISHAFT1A="";
shiftTime.ISHAFT1B="";
shiftTime.ISHAFT1C="";
shiftTime.ISHAFT2A="";
shiftTime.ISHAFT2B="";
shiftTime.ISHAFT2C="";
shiftTime.ISHAFT3A="";
shiftTime.ISHAFT3B="";
shiftTime.ISHAFT3C="";
shiftTime.ISHAFT4A="";
shiftTime.ISHAFT4B="";
shiftTime.ISHAFT4C="";
shiftTime.BEPS3A="";
shiftTime.BEPS3B="";
shiftTime.BEPS3C="";
shiftTime.CEPS3A="";
shiftTime.CEPS3B="";
shiftTime.CEPS3C="";




function newBind() {
    var tdNods = $(".banci li table:nth-child(1) tbody tr td:nth-child(5)");
    tdNods.click(tdClick);
}
function selectTrue(selectbox) {

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
        localStorage.ISHAFT1A=data.standardBeat;
        shiftTime.ISHAFT1A=data.addDate;
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(localStorage.ISHAFT1A);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.ISHAFT1B=data.standardBeat;
        shiftTime.ISHAFT1B=data.addDate;
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(localStorage.ISHAFT1B);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft1Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.ISHAFT1C=data.standardBeat;
        shiftTime.ISHAFT1C=data.addDate;
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(localStorage.ISHAFT1C);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft1Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT2A=data.standardBeat;
        shiftTime.ISHAFT2A=data.addDate;
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(localStorage.ISHAFT2A);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft2Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.ISHAFT2B=data.standardBeat;
        shiftTime.ISHAFT2B=data.addDate;
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(localStorage.ISHAFT2B);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft2Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT2C=data.standardBeat;
        shiftTime.ISHAFT2C=data.addDate;
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(localStorage.ISHAFT2C);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft2Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT3A=data.standardBeat;
        shiftTime.ISHAFT3A=data.addDate;
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(localStorage.ISHAFT3A);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft3Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT3B=data.standardBeat;
        shiftTime.ISHAFT3B=data.addDate;
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(localStorage.ISHAFT3B);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft3Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT3C=data.standardBeat;
        shiftTime.ISHAFT3C=data.addDate;
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(localStorage.ISHAFT3C);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft3Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT4A=data.standardBeat;
        shiftTime.ISHAFT4A=data.addDate;
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(localStorage.ISHAFT4A);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft4Table").find("tbody").find("tr").eq(0).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT4B=data.standardBeat;
        shiftTime.ISHAFT4B=data.addDate;
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(localStorage.ISHAFT4B);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft4Table").find("tbody").find("tr").eq(1).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.ISHAFT4C=data.standardBeat;
        shiftTime.ISHAFT4C=data.addDate;
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(localStorage.ISHAFT4C);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        // $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);        $("#showIshaft4Table").find("tbody").find("tr").eq(2).find("td").eq(5).text(data.normalWorkerNum==0?"":data.normalWorkerNum);
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
        localStorage.BEPS3A=data.standardBeat;
        shiftTime.BEPS3A=data.addDate;
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(localStorage.BEPS3A);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        // $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.BEPS3B=data.standardBeat;
        shiftTime.BEPS3B=data.addDate;
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(localStorage.BEPS3B);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        // $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.BEPS3C=data.standardBeat;
        shiftTime.BEPS3C=data.addDate;
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(localStorage.BEPS3C);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showBEPS3Table").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        // $("#showBEPS3Table").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.CEPS3A=data.standardBeat;
        shiftTime.CEPS3A=data.addDate;
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(localStorage.CEPS3A);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(2).find("input").val(data.startTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(3).find("input").val(data.endTime);
        // $("#showCEPSTable").find("tbody").find("tr").eq(0).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        localStorage.CEPS3B=data.standardBeat;
        shiftTime.CEPS3B=data.addDate;
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(localStorage.CEPS3B);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(2).find("input").val(data.startTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(3).find("input").val(data.endTime);
        // $("#showCEPSTable").find("tbody").find("tr").eq(1).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        shiftTime.CEPS3C=data.addDate;
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(localStorage.CEPS3C);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(2).find("input").val(data.startTime);
        $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(3).find("input").val(data.endTime);
        // $("#showCEPSTable").find("tbody").find("tr").eq(2).find("td").eq(4).find("select").val(data.standardBeat==0?"":data.standardBeat);
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
        var addDate;
        var shiftName=shiftType.slice(0,1);
        var shiftLastName=cellName+shiftName;
        if(shiftTime[shiftLastName]!=null){
            addDate=shiftTime[shiftLastName];
        }else{
            addDate = Uyear+"-"+Umonth+"-"+Uday;
        }
        console.log("当前班次时间:"+shiftTime);

        var addInputJson = new shiftInput(addDate,shiftType,startTime,endTime,Number(standardBeat),Number(normalWorkerNum),Number(overtimeWorkerNum),Number(target),cellName,open);
        console.log("班次输入:"+addInputJson);
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
        },1000*3);


    });


});

function showEvent(cell,idInput) {
    $.get("http://10.1.0.40:8080/nexteer/rest-event?work_shift_id="+idInput, function (data) {

        var title= "#show"+cell+"Event";
        // $(title).find("tbody").remove();
        console.log("showEvent"+idInput);
        $.each(data, function (i, model) {

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
            // $(title).prepend("<tbody><tr><td>"+line+"</td><td>"+data[i].shiftType+"</td><td>"+data[i].event+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td></tr></tbody>");
            $(title).prepend("<tbody><tr><td>"+line+"</td><td>"+data[i].shiftType+"</td><td>"+data[i].event+"</td><td>"+data[i].startTime+"</td><td>"+data[i].endTime+"</td><td><button class=\"eventDel btn btn-primary\">删除</button></td></tr></tbody>");

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
$(document).ready(function(){
    $('#showShiftLi').on('click','.eventDel',function(){
        console.log("del start");

        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var type = $(this).parent().parent().find("td").eq(1).text();
        var cell=$(this).parent().parent().find("td").eq(0).text();
        var event=$(this).parent().parent().find("td").eq(2).text();
        var start=$(this).parent().parent().find("td").eq(3).text();
        var end=$(this).parent().parent().find("td").eq(4).text();
        var Input=new eventInput(type,cell,event,start,end);
        console.log(Input);
        var urlString = "http://10.1.0.40:8080/nexteer/rest-event";
        console.log(urlString);
        switch (cell){
            case "有刷产线":
                Input.cellName="BEPS1";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                Input.cellName="BEPS2";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                Input.cellName="BEPS3";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                break;
            case "无刷产线":
                Input.cellName="CEPS1";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                Input.cellName="CEPS2";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                Input.cellName="CEPS3";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                Input.cellName="CEPS4";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                Input.cellName="CEPS5";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                break;
            case "第一条中间轴":
                Input.cellName="ISHAFT1";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                break;
            case "第二条中间轴":
                Input.cellName="ISHAFT2";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                break;
            case "第三条中间轴":
                Input.cellName="ISHAFT3";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                break;
            case "第四条中间轴":
                Input.cellName="ISHAFT4";
                $.ajax({
                    url: urlString,
                    type: 'DELETE',
                    data:JSON.stringify(Input),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(result) {
                        console.log("删除成功");

                    }
                });
                break;
        }


        showShift();
    });
    showShift();


});
$('#eventIn').editableSelect({
    effects: 'slide'
});
$("[name='my-checkbox']").bootstrapSwitch();


