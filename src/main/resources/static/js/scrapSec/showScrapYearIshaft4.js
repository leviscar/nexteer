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

var dataTest = [];

console.log('start');
// 基于准备好的dom，初始化echarts实例
var IsOnescrapChart=echarts.init(document.getElementById('showIsOneWeekSheet'));

var myMonthTitle= {
    text: '第四条中间轴报废金额月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: '第四条中间轴报废金额周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: '第四条中间轴报废金额年视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myPeriod={
    text: '报废金额时间段视图',
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
    data:['Ishaft4','Ishaft4_target'],
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

function showYear() {
    var percent=0;
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<366;myJ++){
            myData[i][myJ]=null;
        }
    }
    var YearDate=[];
    for(var yIndex=1;yIndex<13;yIndex++){
        var d=new Date(Uyear,yIndex,0);
        for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
            YearDate.push(Uyear+"-"+judgeMyTime(yIndex)+"-"+judgeMyTime(Mindex))
        }
    }
    for(var perIndex in YearDate){
        var nowTime =Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Uday);
        if(YearDate[perIndex]==nowTime){
            percent=parseInt(perIndex*100/365)+1;
            console.log(percent);
        }

    }
    console.log(YearDate);
    $.get("http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT4/year?date="+YearDate[YearDate.length-1], function (data) {
        $.each($.parseJSON(data), function (i, model) {
            for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
                if (YearDate[monIndex] == model.addDate) {
                    myData[0][monIndex] = model.value;
                    myData[1][monIndex] = model.targetValue;
                }
            }
        });
        console.log(myData);
        dataTest = myData;
        // 指定图表的配置项和数据
        var firstOption = {
            title: myYearTitle,
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
                data: YearDate
            },
            yAxis:myYaxis,
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                    start: 1,
                    end: percent
                }],

            series: [

                {
                    name: 'Ishaft4',
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
                    data: myData[0]
                },
                {
                    name: 'Ishaft4_target',
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
                    data: myData[1]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        IsOnescrapChart.setOption(firstOption);

    });
}
showYear();

$("#selectYearSub").bind("click",function () {
    var curr_time = $("#selectYear").val() + "-12-31";
    // var curr_time="2017-04-04";
    myYearTitle.text = '第四条中间轴报废金额' + $("#selectYear").val() + '年视图';
    {
        var percent=99;
        var myData=[];
        console.log("开始传输数据");
        for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
            myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var myJ=0;myJ<366;myJ++){
                myData[i][myJ]=null;
            }
        }
        var YearDate=[];
        for(var yIndex=1;yIndex<13;yIndex++){
            var d=new Date($("#selectYear").val(),yIndex,0);
            for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
                YearDate.push($("#selectYear").val()+"-"+judgeMyTime(yIndex)+"-"+judgeMyTime(Mindex))
            }
        }

        console.log(YearDate);
        $.get("http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT4/year?date="+YearDate[YearDate.length-1], function (data) {
            $.each($.parseJSON(data), function (i, model) {
                for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
                    if (YearDate[monIndex] == model.addDate) {
                        myData[0][monIndex] = model.value;
                        myData[1][monIndex] = model.targetValue;
                    }
                }
            });
            console.log(myData);

            // 指定图表的配置项和数据
            var firstOption = {
                title: myYearTitle,
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
                    data: YearDate
                },
                yAxis:myYaxis,
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                        start: 1,
                        end: percent
                    }],

                series: [

                    {
                        name: 'Ishaft4',
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
                        data: myData[0]
                    },
                    {
                        name: 'Ishaft4_target',
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
                        data: myData[1]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnescrapChart.setOption(firstOption);

        });
    }

});

console.log(dataTest);
