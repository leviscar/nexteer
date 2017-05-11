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


// var curTimeJson=new curTimeInput("2016"+"-"+"08"+"-"+"14"+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds()));
// var curTimeJson={
//     "curr_time":"2016-08-14 21:00:00"
// };
function getNowStatus() {
    var shift=$("#nowShift").val();
    var nowTime = $("#nowDate").val();
    $("#showDate").html(nowTime);
    var getString="http://localhost:8080/nexteer/unit-status/record/CEPS5?date="+nowTime+"&shift_type="+shift;
    console.log(getString);
    var timeRow=[];
    var hourlyTar=[];
    var hourlyOut=[];
    var hourlyTime=[];
    console.log("start");

    var myLegend={
        data:['Output per Hour','Hourly Target'],
        textStyle:{
            // color:"#ffffff"
            fontSize:22
        }
    };
    var myyAxis=[{
        type: 'value',
        name: '产品数（件）',
        position: 'left',
        nameTextStyle:{
            fontStyle:'normal',
            fontWeight:'bold',
            // color:"#ffffff",
            fontSize:22
        },
        axisLabel:{
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
// var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));
    $.ajax({
        type: "GET",
        url: getString,
        async : false,
        success: function (data) {
            console.log(data);
            if(data.id == null){
                console.log("当前时间不在班次内");
            }else {
                {
                    console.log("操作正常");
                    console.log(data.shiftType);
                    if(data.curr_shift_info.shiftType=="Cshift"){
                        $("#banci").html("C");
                        $("#stdBeats").html(data.curr_shift_info.standardBeat);
                    }
                    if(data.curr_shift_info.shiftType=="Ashift"){
                        $("#banci").html("A");
                        $("#stdBeats").html(data.curr_shift_info.standardBeat);
                    }
                    if(data.curr_shift_info.shiftType=="Bshift"){
                        $("#banci").html("B");
                        $("#stdBeats").html(data.curr_shift_info.standardBeat);
                    }

                    $("#finish").html(data.curr_num);
                    $("#defct").html(data.defective_num);
                    // $("#status").html(data.status);
                    switch (data.status ){
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
                    $("#personUse").html(data.hce.toFixed(2));
                    $("#curBeats").html(data.curr_beats);
                    $("#lossTime").html(data.loss_time);
                    $("#movRate").html(data.movable_rate);
                    $("#offline").html(data.lastOffLine);
                    $("#target").html(data.target);
                    var i=0;
                    for (key in data.hourly_output){
                        hourlyOut[i]=data.hourly_output[key];
                        hourlyTime[i]=key;
                        i++;
                    }
                    var j=0;
                    for (key in data.hourly_target){
                        hourlyTar[j]=data.hourly_target[key];
                        var keyRow = key.split(":");
                        timeRow[j]=key+"-"+judgeTime(Number(keyRow[0])+1)+":"+keyRow[1];
                        j++;
                    }
                    // $("#target").html(hourlyTar[i-1]);
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
                            axisLabel:{
                                textStyle:{
                                    // fontWeight:'bold',
                                    fontSize:14
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
                            barMaxWidth:40,
                            itemStyle: {
                                normal: {
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
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: hourlyOut
                        },
                            {
                                name: 'Hourly Target',
                                type: 'line',
                                smooth: true,
                                showAllSymbol: true,
                                symbol: 'emptyCircle',
                                label: {
                                    normal: {
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
        },
        failure: function (errMsg) {
            console.log(errMsg);
            // window.location.reload();
            console.log("failed");
            $(".main").empty();
        }
    });

}
$("#selectShift").bind("click",function () {
    getNowStatus();
});







