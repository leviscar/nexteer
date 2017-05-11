
/**
 * Created by Administrator on 2017/5/3.
 */
/**
 * Created by Administrator on 2017/5/2.
 */


function judgeMyTime(time) {
    var timeStr="";
    if (time<10){
        timeStr="0"+time.toString()
    }
    else {
        timeStr=time.toString()
    }
    return timeStr;
}
function transferDate(date) {
    var yearTemp = date.getFullYear();
    var monthTemp = date.getMonth()+1;
    var dayTemp = date.getDate();
    if(parseInt(monthTemp) < 10) {
        monthTemp = "0" + monthTemp;
    }

    if(parseInt(dayTemp) < 10) {
        dayTemp = "0" + dayTemp;
    }
    return yearTemp + "-" + monthTemp + "-" + dayTemp;
}
function formOnload()
{
//按周日为一周的最后一天计算
    var date = new Date();
    var this_day = date.getDay(); //今天是这周的第几天
    var step_s = -this_day+1; //上周日距离今天的天数（负数表示）
    if (this_day == 0) {
        step_s = -7; // 如果今天是周日
    }
    var step_m = 7 - this_day; // 周日距离今天的天数（负数表示）
    var thisTime = date.getTime();
    var Monday = transferDate(new Date(thisTime +  step_s * 24 * 3600* 1000));
    var Tuesday= transferDate(new Date(thisTime +  (step_s+1) * 24 * 3600* 1000));
    var Wednesday= transferDate(new Date(thisTime +  (step_s+2) * 24 * 3600* 1000));
    var Thursday= transferDate(new Date(thisTime +  (step_s+3) * 24 * 3600* 1000));
    var Friday= transferDate(new Date(thisTime +  (step_s+4) * 24 * 3600* 1000));
    var Saturday= transferDate(new Date(thisTime +  (step_s+5) * 24 * 3600* 1000));
    var Sunday = transferDate(new Date(thisTime +  step_m * 24 * 3600* 1000));
    return [Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday];
}


console.log('start');
// 基于准备好的dom，初始化echarts实例
var IsOnescrapChart=echarts.init(document.getElementById('showIsOneWeekSheet'));

var myMonthTitle= {
    text: 'ISHAFT3报废金额月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: 'ISHAFT3报废金额周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: 'ISHAFT3报废金额年视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myPeriod={
    text: 'ISHAFT3报废金额时间段视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYaxis= [{
    type:'value',
    name:'报废金额（元）',
    position:'left',
    nameTextStyle:{
        fontStyle:'normal',
        fontWeight:'bold',
        fontSize:'20'
    },
    axisLabel:{
        textStyle:{
            fontSize:20
        }
    }
}];
var myGrid= {
    containLabel: true,
    left:'4%',
    right:'5%',
    bottom:'2%'
};
var myLengend = {
    data:['Ishaft3','Ishaft3_target'],
    align: 'right',
    right: '9%',
    top:'6%'
};
function showDataView(opt) {
    var axisData = opt.xAxis[0].data;
    var series = opt.series;
    var table = '<table style="width:100%;text-align:center"><tbody><tr>'
        + '<td>时间</td>'
        + '<td>' + series[0].name + '</td>'
        + '<td>' + series[1].name + '</td>'
        + '<td>' + series[2].name + '</td>'
        + '<td>' + series[3].name + '</td>'
        + '<td>' + series[4].name + '</td>'
        + '<td>' + series[5].name + '</td>'
        + '</tr>';
    for (var i = 0, l = axisData.length; i < l; i++) {
        table += '<tr>'
            + '<td>' + axisData[i] + '</td>'
            + '<td>' + series[0].data[i] + '</td>'
            + '<td>' + series[1].data[i] + '</td>'
            + '<td>' + series[2].data[i] + '</td>'
            + '<td>' + series[3].data[i] + '</td>'
            + '<td>' + series[4].data[i] + '</td>'
            + '<td>' + series[5].data[i] + '</td>'
            + '</tr>';
    }
    table += '</tbody></table>';
    return table;
}
function showWeek() {
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=0;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    $.get("http://10.1.0.40:8080/nexteer/scrap-amount/week?date="+WeekDate[6], function (data) {
        $.each($.parseJSON(data), function (i, model) {
            switch (model.addDate){
                case WeekDate[0]:
                    console.log("ncie");
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[1]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[2]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[3]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[4]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[5]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[6]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[1][0]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][0]=model.value;
                            myData[3][0]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][0]=model.value;
                            myData[5][0]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][0]=model.value;
                            myData[7][0]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][0]=model.value;
                            myData[9][0]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][0]=model.value;
                            myData[11][0]=model.targetValue;
                            break;
                    }
                    break;


            }
        });
        console.log(myData);

        // 指定图表的配置项和数据
        var firstOption = {
            title: myWeekTitle,
            tooltip: {
                trigger: 'axis',
                axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            grid: myGrid,
            legend: myLengend,

            xAxis: {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                nameTextStyle:{
                    fontStyle:'italic',
                    fontWeight:'bold'
                },
                axisLabel:{
                    textStyle:{

                        fontSize:20
                    }
                },
                data: ["周一","周二","周三","周四","周五","周六","周日"]
            },
            yAxis:myYaxis,

            series: [
                {
                    name: 'Ishaft3',
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
                    data: myData[4]
                },
                {
                    name: 'Ishaft3_target',
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
                    data: myData[5]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        IsOnescrapChart.setOption(firstOption);

    });
}

showWeek();
