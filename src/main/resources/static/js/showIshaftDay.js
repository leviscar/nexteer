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
Udate=new Date();
Uyear=Udate.getFullYear();
Umonth=Udate.getMonth()+1;
Uday=Udate.getDate();

// var curTimeJson=new curTimeInput("2016"+"-"+"08"+"-"+"14"+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds()));
// var curTimeJson={
//     "curr_time":"2016-08-14 21:00:00"
// };
var curTime="2016-08-14 21:00:00";
var curTimeJson= new curTimeInput(curTime.toString());
var timeRow=[];
var hourlyTar=[];
var hourlyOut=[];
var hourlyTime=[];
console.log("start");
// // 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));
$.ajax({
    type: "POST",
    url: "http://localhost:8080/ishaft1-unit-status/getByCurTime",
    data: JSON.stringify(curTimeJson),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        console.log(JSON.stringify(data));
        console.log("操作正常");
        console.log(data.shift_type);
        if(data.shift_type="NIGHT_SHIFT"){
            $("#banci").html("夜班");
            $("#stdBeats").html(data.curr_shift_info.night_shift_standard_beats);
        }
        if(data.shift_type="MORNING_SHIFT"){
            $("#banci").html("早班");
            $("#stdBeats").html(data.curr_shift_info.morning_shift_standard_beats);
        }
        if(data.shift_type="MIDDLE_SHIFT"){
            $("#banci").html("中班");
            $("#stdBeats").html(data.curr_shift_info.middle_shift_standard_beats);
        }
        // var hourlyTarget=data.hourly_target.toFixed(2);
        // $("#target").html(data.hourly_target);
        $("#finish").html(data.curr_num);
        $("#defct").html(data.defective_num);
        $("#status").html(data.status);

        $("#curBeats").html(data.curr_beats);
        $("#lossTime").html(data.loss_time);
        $("#movRate").html(data.movable_rate);
        var i=0;
        for (key in data.hourly_output){
            hourlyOut[i]=data.hourly_output[key];
            hourlyTime[i]=key;
            i++;
        }
        var j=0;
        for (key in data.hourly_target){
            hourlyTar[j]=data.hourly_target[key];
            timeRow[j]=key;
            j++;
        }

        console.log(hourlyOut);
        console.log(hourlyTime);
        console.log(hourlyTar);
        console.log(timeRow);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('IshaftOneYieldDayChart'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);


    },
    failure: function (errMsg) {
        console.log(errMsg);
        console.log('fail');
    }
});

//
// //配置echarts
// option = {
//     title: {
//         text: 'Ishaft1报废金额时间段视图'
//     },
//     tooltip: {
//         trigger: 'axis'
//     },
//     toolbox: {
//         feature: {
//             dataView: {
//                 show: true,
//                 readOnly: false
//             },
//             saveAsImage: {
//                 show: true
//             }
//         }
//     },
//     grid: {
//         containLabel: true
//     },
//     legend: {
//         data: ['AccOutput','Output per Hour','Hourly Target']
//     },
//     xAxis: [{
//         type: 'category',
//         axisTick: {
//             alignWithLabel: true
//         },
//         data: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00']
//         // data: timeRow
//     }],
//     yAxis: [{
//         type: 'value',
//         name: '产品数（件）',
//         position: 'left'
//     }],
//     series: [{
//         name: 'AccOutput',
//         type: 'line',
//         stack: '总量',
//         label: {
//             normal: {
//                 show: true,
//                 position: 'top'
//             }
//         },
//         lineStyle: {
//             normal: {
//                 width: 3,
//                 shadowColor: 'rgba(0,0,0,0.4)',
//                 shadowBlur: 10,
//                 shadowOffsetY: 10
//             }
//         },
//         data: [1,13,37,35,15,13,25,21,6,45,32,2]
//     },
//         {
//             name: 'Output per Hour',
//             type: 'bar',
//             yAxisIndex: 1,
//             stack: '总量',
//             label: {
//                 normal: {
//                     show: true,
//                     position: 'top'
//                 }
//             }
//             // data: hourlyOut
//         },
//         {
//             name: 'Hourly Target',
//             type: 'line',
//             yAxisIndex: 1,
//             stack: '总量',
//             label: {
//                 normal: {
//                     show: true,
//                     position: 'top'
//                 }
//             },
//             data: [300,330,325,300,400,676,822,979,1038,1464,1906,1951,1931]
//             // data:hourlyTar
//         }]
// };
//
// //使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);
