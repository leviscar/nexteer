/**
 * Created by Administrator on 2017/3/18.
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
var status=0;

// var curTimeJson=new curTimeInput("2016"+"-"+"08"+"-"+"14"+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds()));
// var curTimeJson={
//     "curr_time":"2016-08-14 21:00:00"
// };
function getNowStatus() {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    // var curTime="2017-03-23 19:00:00";
    var curTime= year+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    var curTimeJson= new curTimeInput(curTime);
    var timeRow=[];
    var hourlyTar=[];
    var hourlyOut=[];
    var hourlyTime=[];
    console.log(curTime);
    console.log("start");

    var myLegend={
        right: '9%',data:['小时产量','小时目标值'],
        textStyle:{
            // color:"#ffffff"
            fontSize:22
        }
    };
    var myyAxis=[{
        type: 'value',
        name: '产量（件）',
        position: 'left',
        nameTextStyle:{
            fontStyle:'normal',
            fontWeight:'bold',
            // color:"#ffffff",
            fontSize:22
        },
        axisLabel:{interval:0,
            textStyle:{
                fontSize:22,
                fontWeight:'bold'
                // color:"#ffffff"
            }
        }
    }];
    var myGrid= {
        containLabel: true,
        left:'4%',
        bottom:'2%'
    };
// // 基于准备好的dom，初始化echarts实例
    $.get("http://localhost:8080/nexteer/unit-status/BEPS3?curr_time="+curTime,function (data) {
        console.log($.parseJSON(data));
        if($.parseJSON(data).system_status == false){
            console.log("当前时间不在班次内");
        }else if($.parseJSON(data).curr_shift_info.open==true){
            {
                console.log("操作正常");
                console.log($.parseJSON(data).shiftType);
                if($.parseJSON(data).curr_shift_info.shiftType=="Cshift"){
                    $("#banci").html("C");
                    $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                }
                if($.parseJSON(data).curr_shift_info.shiftType=="Ashift"){
                    $("#banci").html("A");
                    $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                }
                if($.parseJSON(data).curr_shift_info.shiftType=="Bshift"){
                    $("#banci").html("B");
                    $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                }

                $("#finish").html($.parseJSON(data).curr_num);
                $("#defct").html($.parseJSON(data).defective_num);
                // $("#status").html($.parseJSON(data).status);
                switch ($.parseJSON(data).status ){
                    case 1:
                        $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Sunny.png\" alt=\"NICE\"></td>");
                        break;
                    case 0:
                        $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Cloudy.png\" alt=\"NICE\"></td>");
                        break;
                    case -1:
                        $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Rainy.png\" alt=\"NICE\"></td>");
                        break;

                }
                $("#personUse").html($.parseJSON(data).hce.toFixed(2));
                $("#curBeats").html($.parseJSON(data).curr_beats);
                $("#lossTime").html($.parseJSON(data).loss_time);
                $("#movRate").html($.parseJSON(data).movable_rate);
                var line=[];line=$.parseJSON(data).lastOffLine.split(" ");$("#offline").html(line[1]);
                var i=0;
                for (key in $.parseJSON(data).hourly_output){
                    hourlyOut[i]=$.parseJSON(data).hourly_output[key];
                    hourlyTime[i]=key;
                    i++;
                }
                var j=0;
                for (key in $.parseJSON(data).hourly_target){
                    hourlyTar[j]=$.parseJSON(data).hourly_target[key];
                    var keyRow = key.split(":");
                    timeRow[j]=key+"-"+judgeTime(Number(keyRow[0])+1)+":"+keyRow[1];
                    j++;
                }
                $("#target").html($.parseJSON(data).calculatedTarget);$("#cTarget").html($.parseJSON(data).target);
                console.log(hourlyOut);
                console.log(hourlyTime);
                console.log(hourlyTar);
                console.log(timeRow);
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));

                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type:'shadow'}
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false,
                                optionToContent: function (opt) {
                                    var axisData = opt.xAxis[0].data;
                                    var series = opt.series;
                                    var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                        + '<td>时间</td>'
                                        + '<td>' + series[0].name + '</td>'
                                        + '<td>' + series[1].name + '</td>'
                                        + '</tr>';
                                    for (var i = 0, l = axisData.length; i < l; i++) {
                                        table += '<tr>'
                                            + '<td>' + axisData[i] + '</td>'
                                            + '<td>' + series[0].data[i] + '</td>'
                                            + '<td>' + series[1].data[i] + '</td>'
                                            + '</tr>';
                                    }
                                    table += '</tbody></table>';
                                    return table;
                                }
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: myLegend,
                    grid:myGrid,
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel:{interval:0,
                            textStyle:{
                                fontWeight:'bold',
                                fontSize:16
                                // color:"#ffffff"
                            }
                        },
                        // data: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']
                        data: timeRow
                    }],
                    yAxis: myyAxis,
                    series: [{
                        name: '小时产量',
                        type: 'bar',
                        barMaxWidth:60,
                        itemStyle: {
                            normal: {textStyle:{fontSize:22},
                                barBorderRadius: 5
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 0, 1,
                                //     [
                                //         {offset: 0, color: '#14c8d4'},
                                //         {offset: 1, color: '#43eec6'}
                                //     ]
                                // )
                            }
                        },
                        label: {
                            normal: {textStyle:{fontSize:22},
                                show: true,
                                position: 'top'
                            }
                        },
                        data: hourlyOut
                    },
                        {
                            name: '小时目标值',
                            type: 'line',lineStyle:{normal:{width:6}},
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            label: {
                                normal: {textStyle:{fontSize:22},
                                    show: true,
                                    position: 'top'
                                }
                            },

                            data:hourlyTar
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }



    });
}

$("#selectHistory").bind("click",function () {
    window.location.assign("../../html/unitHistory/BEPS3His.html");
});

$("#CN").bind("click",function () {
    window.location.reload();
});
$("#EN").bind("click",function () {
    status=1;
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    // var curTime="2017-03-23 19:00:00";
    var curTime= year+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    var curTimeJson= new curTimeInput(curTime);
    var timeRow=[];
    var hourlyTar=[];
    var hourlyOut=[];
    var hourlyTime=[];
    console.log(curTime);
    console.log("start");

    var myLegend={
        right: '9%',data:['Output per Hour','Hourly Target'],
        textStyle:{
            // color:"#ffffff"
            fontSize:22
        }
    };
    var myyAxis=[{
        type: 'value',
        name: 'Output',
        position: 'left',
        nameTextStyle:{
            fontStyle:'normal',
            fontWeight:'bold',
            // color:"#ffffff",
            fontSize:22
        },
        axisLabel:{interval:0,
            textStyle:{
                fontSize:22,
                fontWeight:'bold'
                // color:"#ffffff"
            }
        }
    }];
    var myGrid= {
        containLabel: true,
        left:'4%',
        bottom:'2%'
    };
// // 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));
    $.get("http://localhost:8080/nexteer/unit-status/BEPS3?curr_time="+curTime,function (data) {
        console.log($.parseJSON(data));
        if($.parseJSON(data).system_status == false){
            console.log("当前时间不在班次内");
        }else {
            {
                console.log("操作正常");
                console.log($.parseJSON(data).shiftType);
                if($.parseJSON(data).curr_shift_info.shiftType=="Cshift"){
                    $("#banci").html("C");
                    $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                }
                if($.parseJSON(data).curr_shift_info.shiftType=="Ashift"){
                    $("#banci").html("A");
                    $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                }
                if($.parseJSON(data).curr_shift_info.shiftType=="Bshift"){
                    $("#banci").html("B");
                    $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                }

                $("#finish").html($.parseJSON(data).curr_num);
                $("#defct").html($.parseJSON(data).defective_num);
                // $("#status").html($.parseJSON(data).status);
                switch ($.parseJSON(data).status ){
                    case 1:
                        $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Sunny.png\" alt=\"NICE\"></td>");
                        break;
                    case 0:
                        $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Cloudy.png\" alt=\"NICE\"></td>");
                        break;
                    case -1:
                        $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Rainy.png\" alt=\"NICE\"></td>");
                        break;

                }
                $("#personUse").html($.parseJSON(data).hce.toFixed(2));
                $("#curBeats").html($.parseJSON(data).curr_beats);
                $("#lossTime").html($.parseJSON(data).loss_time);
                $("#movRate").html($.parseJSON(data).movable_rate);
                var line=[];line=$.parseJSON(data).lastOffLine.split(" ");$("#offline").html(line[1]);
                var i=0;
                for (key in $.parseJSON(data).hourly_output){
                    hourlyOut[i]=$.parseJSON(data).hourly_output[key];
                    hourlyTime[i]=key;
                    i++;
                }
                var j=0;
                for (key in $.parseJSON(data).hourly_target){
                    hourlyTar[j]=$.parseJSON(data).hourly_target[key];
                    var keyRow = key.split(":");
                    timeRow[j]=key+"-"+judgeTime(Number(keyRow[0])+1)+":"+keyRow[1];
                    j++;
                }
                $("#target").html($.parseJSON(data).calculatedTarget);$("#cTarget").html($.parseJSON(data).target);
                console.log(hourlyOut);
                console.log(hourlyTime);
                console.log(hourlyTar);
                console.log(timeRow);
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));

                // 指定图表的配置项和数据
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type:'shadow'}
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false,
                                optionToContent: function (opt) {
                                    var axisData = opt.xAxis[0].data;
                                    var series = opt.series;
                                    var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                        + '<td>时间</td>'
                                        + '<td>' + series[0].name + '</td>'
                                        + '<td>' + series[1].name + '</td>'
                                        + '</tr>';
                                    for (var i = 0, l = axisData.length; i < l; i++) {
                                        table += '<tr>'
                                            + '<td>' + axisData[i] + '</td>'
                                            + '<td>' + series[0].data[i] + '</td>'
                                            + '<td>' + series[1].data[i] + '</td>'
                                            + '</tr>';
                                    }
                                    table += '</tbody></table>';
                                    return table;
                                }
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: myLegend,
                    grid:myGrid,
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel:{interval:0,
                            textStyle:{
                                fontWeight:'bold',
                                fontSize:16
                                // color:"#ffffff"
                            }
                        },
                        // data: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']
                        data: timeRow
                    }],
                    yAxis: myyAxis,
                    series: [{
                        name: 'Output per Hour',
                        type: 'bar',
                        barMaxWidth:60,
                        itemStyle: {
                            normal: {textStyle:{fontSize:22},
                                barBorderRadius: 5
                                // color: new echarts.graphic.LinearGradient(
                                //     0, 0, 0, 1,
                                //     [
                                //         {offset: 0, color: '#14c8d4'},
                                //         {offset: 1, color: '#43eec6'}
                                //     ]
                                // )
                            }
                        },
                        label: {
                            normal: {textStyle:{fontSize:22},
                                show: true,
                                position: 'top'
                            }
                        },
                        data: hourlyOut
                    },
                        {
                            name: 'Hourly Target',
                            type: 'line',lineStyle:{normal:{width:6}},
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            label: {
                                normal: {textStyle:{fontSize:22},
                                    show: true,
                                    position: 'top'
                                }
                            },

                            data:hourlyTar
                        }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }



    });
    $(".unitTitle").replaceWith("<p class=\"unitTitle\">BEPS Final Asm Cell Realtime Data Board</p>");
    $(".firstTable>tbody>tr:nth-child(1)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current Shift</td>");
    $(".firstTable>tbody>tr:nth-child(2)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Target  Output</td>");
    $(".firstTable>tbody>tr:nth-child(3)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Planned Output</td>");
    $(".firstTable>tbody>tr:nth-child(4)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current Output</td>");
    $(".firstTable>tbody>tr:nth-child(5)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current  Status</td>");
    $(".secTable>thead>tr:nth-child(1)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current Cycle(s)</td>");
    $(".secTable>thead>tr:nth-child(1)>td:nth-child(2)").replaceWith("<td style='font-size:2.2em '>Cycle Time(s)</td>");
    $(".secTable>thead>tr:nth-child(1)>td:nth-child(3)").replaceWith("<td style='font-size:2.2em '> Lose Time(s)</td>");
    $(".secTable>thead>tr:nth-child(1)>td:nth-child(4)").replaceWith("<td style='font-size:2.2em '>OEE(%)</td>");
    $(".secTable>thead>tr:nth-child(1)>td:nth-child(5)").replaceWith("<td style='font-size:2.2em '>HCE(%)</td>");
    $(".secTable>thead>tr:nth-child(1)>td:nth-child(6)").replaceWith("<td style='font-size:2.2em '>Last Part</td>");
});
function getENStatus(){
    {
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        // var curTime="2017-03-23 19:00:00";
        var curTime= year+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
        var curTimeJson= new curTimeInput(curTime);
        var timeRow=[];
        var hourlyTar=[];
        var hourlyOut=[];
        var hourlyTime=[];
        console.log(curTime);
        console.log("start");

        var myLegend={
            right: '9%',data:['Output per Hour','Hourly Target'],
            textStyle:{
                // color:"#ffffff"
                fontSize:22
            }
        };
        var myyAxis=[{
            type: 'value',
            name: 'Output',
            position: 'left',
            nameTextStyle:{
                fontStyle:'normal',
                fontWeight:'bold',
                // color:"#ffffff",
                fontSize:22
            },
            axisLabel:{interval:0,
                textStyle:{
                    fontSize:22,
                    fontWeight:'bold'
                    // color:"#ffffff"
                }
            }
        }];
        var myGrid= {
            containLabel: true,
            left:'4%',
            bottom:'2%'
        };
// // 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));
        $.get("http://localhost:8080/nexteer/unit-status/BEPS3?curr_time="+curTime,function (data) {
            console.log($.parseJSON(data));
            if($.parseJSON(data).system_status == false){
                console.log("当前时间不在班次内");
            }else {
                {
                    console.log("操作正常");
                    console.log($.parseJSON(data).shiftType);
                    if($.parseJSON(data).curr_shift_info.shiftType=="Cshift"){
                        $("#banci").html("C");
                        $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                    }
                    if($.parseJSON(data).curr_shift_info.shiftType=="Ashift"){
                        $("#banci").html("A");
                        $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                    }
                    if($.parseJSON(data).curr_shift_info.shiftType=="Bshift"){
                        $("#banci").html("B");
                        $("#stdBeats").html($.parseJSON(data).curr_shift_info.standardBeat);
                    }

                    $("#finish").html($.parseJSON(data).curr_num);
                    $("#defct").html($.parseJSON(data).defective_num);
                    // $("#status").html($.parseJSON(data).status);
                    switch ($.parseJSON(data).status ){
                        case 1:
                            $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Sunny.png\" alt=\"NICE\"></td>");
                            break;
                        case 0:
                            $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Cloudy.png\" alt=\"NICE\"></td>");
                            break;
                        case -1:
                            $("#status").replaceWith("<td id=\"status \"><img src=\"../../images/Rainy.png\" alt=\"NICE\"></td>");
                            break;

                    }
                    $("#personUse").html($.parseJSON(data).hce.toFixed(2));
                    $("#curBeats").html($.parseJSON(data).curr_beats);
                    $("#lossTime").html($.parseJSON(data).loss_time);
                    $("#movRate").html($.parseJSON(data).movable_rate);
                    var line=[];line=$.parseJSON(data).lastOffLine.split(" ");$("#offline").html(line[1]);
                    var i=0;
                    for (key in $.parseJSON(data).hourly_output){
                        hourlyOut[i]=$.parseJSON(data).hourly_output[key];
                        hourlyTime[i]=key;
                        i++;
                    }
                    var j=0;
                    for (key in $.parseJSON(data).hourly_target){
                        hourlyTar[j]=$.parseJSON(data).hourly_target[key];
                        var keyRow = key.split(":");
                        timeRow[j]=key+"-"+judgeTime(Number(keyRow[0])+1)+":"+keyRow[1];
                        j++;
                    }
                    $("#target").html($.parseJSON(data).calculatedTarget);$("#cTarget").html($.parseJSON(data).target);
                    console.log(hourlyOut);
                    console.log(hourlyTime);
                    console.log(hourlyTar);
                    console.log(timeRow);
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));

                    // 指定图表的配置项和数据
                    var option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { type:'shadow'}
                        },
                        toolbox: {
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: false,
                                    optionToContent: function (opt) {
                                        var axisData = opt.xAxis[0].data;
                                        var series = opt.series;
                                        var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                            + '<td>时间</td>'
                                            + '<td>' + series[0].name + '</td>'
                                            + '<td>' + series[1].name + '</td>'
                                            + '</tr>';
                                        for (var i = 0, l = axisData.length; i < l; i++) {
                                            table += '<tr>'
                                                + '<td>' + axisData[i] + '</td>'
                                                + '<td>' + series[0].data[i] + '</td>'
                                                + '<td>' + series[1].data[i] + '</td>'
                                                + '</tr>';
                                        }
                                        table += '</tbody></table>';
                                        return table;
                                    }
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        legend: myLegend,
                        grid:myGrid,
                        xAxis: [{
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel:{interval:0,
                                textStyle:{
                                    fontWeight:'bold',
                                    fontSize:16
                                    // color:"#ffffff"
                                }
                            },
                            // data: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']
                            data: timeRow
                        }],
                        yAxis: myyAxis,
                        series: [{
                            name: 'Output per Hour',
                            type: 'bar',
                            barMaxWidth:60,
                            itemStyle: {
                                normal: {textStyle:{fontSize:22},
                                    barBorderRadius: 5
                                    // color: new echarts.graphic.LinearGradient(
                                    //     0, 0, 0, 1,
                                    //     [
                                    //         {offset: 0, color: '#14c8d4'},
                                    //         {offset: 1, color: '#43eec6'}
                                    //     ]
                                    // )
                                }
                            },
                            label: {
                                normal: {textStyle:{fontSize:22},
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: hourlyOut
                        },
                            {
                                name: 'Hourly Target',
                                type: 'line',lineStyle:{normal:{width:6}},
                                smooth: true,
                                showAllSymbol: true,
                                symbol: 'emptyCircle',
                                label: {
                                    normal: {textStyle:{fontSize:22},
                                        show: true,
                                        position: 'top'
                                    }
                                },

                                data:hourlyTar
                            }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                }
            }



        });
        $(".unitTitle").replaceWith("<p class=\"unitTitle\">BEPS Final Asm Cell Realtime Data Board</p>");
        $(".firstTable>tbody>tr:nth-child(1)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current Shift</td>");
        $(".firstTable>tbody>tr:nth-child(2)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Target  Output</td>");
        $(".firstTable>tbody>tr:nth-child(3)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current Output</td>");
        $(".firstTable>tbody>tr:nth-child(4)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current  Status</td>");
        $(".secTable>thead>tr:nth-child(1)>td:nth-child(1)").replaceWith("<td style='font-size:2.2em '>Current Cycle(s)</td>");
        $(".secTable>thead>tr:nth-child(1)>td:nth-child(2)").replaceWith("<td style='font-size:2.2em '>Cycle Time(s)</td>");
        $(".secTable>thead>tr:nth-child(1)>td:nth-child(3)").replaceWith("<td style='font-size:2.2em '> Lose Time(s)</td>");
        $(".secTable>thead>tr:nth-child(1)>td:nth-child(4)").replaceWith("<td style='font-size:2.2em '>OEE(%)</td>");
        $(".secTable>thead>tr:nth-child(1)>td:nth-child(5)").replaceWith("<td style='font-size:2.2em '>HCE(%)</td>");
        $(".secTable>thead>tr:nth-child(1)>td:nth-child(6)").replaceWith("<td style='font-size:2.2em '>Last Part</td>");
    }
}

getNowStatus();
setInterval(function () {
    if(status==1){
        getENStatus();
    }
    else {
        getNowStatus();
    }

},1000*60);






