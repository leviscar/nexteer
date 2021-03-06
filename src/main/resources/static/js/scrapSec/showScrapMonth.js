/**
 * Created by Administrator on 2017/5/6.
 */
//升序排序
function up(x, y) {
    var xTime=new Date(x);
    var yTime=new Date(y);
    return (xTime.getTime() > yTime.getTime()) ? 1 : -1

}

function unique1(arr){
    var newArr = [];//新建一个数组
    for(var i=0,len=arr.length;i<len;i++){
        if(newArr.indexOf(arr[i]) == -1){//若新数组中未包含该项则将其存入新数组
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
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
    text: '报废金额月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: '报废金额周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: '报废金额年视图',
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
    data:['Ishaft1','Ishaft1_target','Ishaft2','Ishaft2_target','Ishaft3','Ishaft3_target','Ishaft4','Ishaft4_target','CEPS','CEPS_target','BEPS','BEPS_target'],
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


function showMonth() {
    var percent = 50;
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<31;myJ++){
            myData[i][myJ]=null;
        }
    }
    var MonthDate=[];
    var d=new Date(Uyear,Umonth,0);
    for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
        MonthDate.push(Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Mindex))
    }
    console.log("当前月份天数"+MonthDate);

    $.get("http://10.1.0.40:8080/nexteer/scrap-amount/month?date="+MonthDate[d.getDate()-1], function (data) {
        console.log(data);
        var MonthDate = [];
        $.each($.parseJSON(data),function (i,model) {
            MonthDate.push(model.addDate);
        });
        MonthDate= unique1(MonthDate);
        MonthDate.sort(up);
        console.log(MonthDate);
        $.each($.parseJSON(data), function (i, model) {
            for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
                if(MonthDate[monIndex]==model.addDate){
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][monIndex]=model.value;
                            myData[1][monIndex]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][monIndex]=model.value;
                            myData[3][monIndex]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][monIndex]=model.value;
                            myData[5][monIndex]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][monIndex]=model.value;
                            myData[7][monIndex]=model.targetValue;
                            break;
                        case "CEPS1":
                            myData[8][monIndex]=model.value;
                            myData[9][monIndex]=model.targetValue;
                            break;
                        case "BEPS1":
                            myData[10][monIndex]=model.value;
                            myData[11][monIndex]=model.targetValue;
                            break;

                    }
                }

            }




        });
        console.log(myData);

        // 指定图表的配置项和数据
        var firstOption = {
            title: myMonthTitle,
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
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                    start: 1,
                    end: 100
                }],
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
                data: MonthDate
            },
            yAxis:myYaxis,

            series: [

                {
                    name: 'Ishaft1',
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
                    name: 'Ishaft1_target',
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
                },
                {
                    name: 'Ishaft2',
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
                    data: myData[2]
                },
                {
                    name: 'Ishaft2_target',
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
                    data: myData[3]
                },
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
                },
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
                    data: myData[6]
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
                    data: myData[7]
                },
                {
                    name: 'CEPS',
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
                    data: myData[8]
                },
                {
                    name: 'CEPS_target',
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
                    data: myData[9]
                },
                {
                    name: 'BEPS',
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
                    data: myData[10]
                },
                {
                    name: 'BEPS_target',
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
                    data: myData[11]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        IsOnescrapChart.setOption(firstOption);

    });
}
showMonth();


$("#selectMonthSub").bind("click",function (){
    var data = $("#selectMonth").val().split("-");
    var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
    // var curr_time="2017-04-04";
    myMonthTitle.text = '报废金额'+ data[0]+'-'+data[1]+ '月视图';
    {
        var percent = 50;
        var myData=[];
        console.log("开始传输数据");
        for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
            myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var myJ=0;myJ<31;myJ++){
                myData[i][myJ]=null;
            }
        }
        var MonthDate=[];
        var d=new Date(data[0],data[1],0);
        for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
            MonthDate.push(data[0]+"-"+data[1]+"-"+judgeMyTime(Mindex));
        }

        console.log(MonthDate);
        $.get("http://10.1.0.40:8080/nexteer/scrap-amount/month?date="+MonthDate[d.getDate()-1], function (data) {
            console.log(data);
            $.each($.parseJSON(data), function (i, model) {
                for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
                    if(MonthDate[monIndex]==model.addDate){
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][monIndex]=model.value;
                                myData[1][monIndex]=model.targetValue;
                                break;
                            case "ISHAFT2":
                                myData[2][monIndex]=model.value;
                                myData[3][monIndex]=model.targetValue;
                                break;
                            case "ISHAFT3":
                                myData[4][monIndex]=model.value;
                                myData[5][monIndex]=model.targetValue;
                                break;
                            case "ISHAFT4":
                                myData[6][monIndex]=model.value;
                                myData[7][monIndex]=model.targetValue;
                                break;
                            case "CEPS1":
                                myData[8][monIndex]=model.value;
                                myData[9][monIndex]=model.targetValue;
                                break;
                            case "BEPS1":
                                myData[10][monIndex]=model.value;
                                myData[11][monIndex]=model.targetValue;
                                break;

                        }
                    }

                }




            });
            console.log(myData);

            // 指定图表的配置项和数据
            var firstOption = {
                title: myMonthTitle,
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
                    data: MonthDate
                },
                yAxis:myYaxis,

                series: [

                    {
                        name: 'Ishaft1',
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
                        name: 'Ishaft1_target',
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
                    },
                    {
                        name: 'Ishaft2',
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
                        data: myData[2]
                    },
                    {
                        name: 'Ishaft2_target',
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
                        data: myData[3]
                    },
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
                    },
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
                        data: myData[6]
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
                        data: myData[7]
                    },
                    {
                        name: 'CEPS',
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
                        data: myData[8]
                    },
                    {
                        name: 'CEPS_target',
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
                        data: myData[9]
                    },
                    {
                        name: 'BEPS',
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
                        data: myData[10]
                    },
                    {
                        name: 'BEPS_target',
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
                        data: myData[11]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnescrapChart.setOption(firstOption);

        });
    }
});

