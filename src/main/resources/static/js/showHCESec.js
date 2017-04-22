/**
 * Created by Administrator on 2017/4/4.
 */

var hceYearArr=[];
var hceMonthArr=[];
var hceDayArr=[];
var hceDate =[];

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
function hceInput(curr_time,cell_name) {
    this.curr_time=curr_time;
    this.cell_name=cell_name;
}


console.log('start');
// 基于准备好的dom，初始化echarts实例
var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));

var myMonthTitle= {
    text: '人员利用率月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: '人员利用率周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: '人员利用率年视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myPeriod={
    text: '人员利用率时间段视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYaxis= [{
    type:'value',
    name:'人员利用率（%）',
    position:'left',
    min:0,
    max:100,
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
    data:['hce','target'],
    align: 'right',
    right: '9%',
    top:'6%'
};

function showWeek() {
    // var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    var curr_time="2017-03-09";
    var showhceJson = new hceInput(curr_time,"ISHAFT1");
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
    var IsTwohceValueArr=[];
    var IsThrhceValueArr=[];
    var IsForhceValueArr=[];
    var BEPShceValueArr=[];
    var CEPShceValueArr=[];
    var hceShowX=[];
    var urlString = "http://localhost:8080/nexteer/hce/week/ISHAFT1?date="+curr_time;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: urlString,
        success: function (data) {
            $.each(data, function (i, model) {
                hceDate[i]=data[i].addDate;
                IshaftOnehceValueArr[i]=model.hce;
                IshaftOnehceTarArr[i]=model.targetHce;
                // IsTwohceValueArr[i]=model.ishaft2_value;
                // IsThrhceValueArr[i]=model.ishaft3_value;
                // IsForhceValueArr[i]=model.ishaft4_value;
                // BEPShceValueArr[i]=model.beps_value;
                // CEPShceValueArr[i]=model.ceps_value;
                // hceShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log(IshaftOnehceValueArr);
            // console.log(IsTwohceValueArr);
            // console.log(IsThrhceValueArr);
            // console.log(IsForhceValueArr);
            // console.log(BEPShceValueArr);
            // console.log(CEPShceValueArr);
            // console.log(hceShowX);
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
                        name: 'hce',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        barMaxWidth:40,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnehceValueArr
                    },
                    {
                        name: 'target',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        barMaxWidth:40,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnehceTarArr
                    }
                    // ,
                    // {
                    //     name: 'Ishaft2',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: IsTwohceValueArr
                    // },
                    // {
                    //     name: 'Ishaft3',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: IsThrhceValueArr
                    // },
                    // {
                    //     name: 'Ishaft4',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: IsForhceValueArr
                    // },
                    // {
                    //     name: 'BEPS',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: BEPShceValueArr
                    // },
                    // {
                    //     name: 'CEPS',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: CEPShceValueArr
                    // }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnehceChart.setOption(firstOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
}

showWeek();

//按周显示
$("#showWeek").bind("click",function () {
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showhceJson = new hceInput(curr_time,"ISHAFT1");
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
    var IsTwohceValueArr=[];
    var IsThrhceValueArr=[];
    var IsForhceValueArr=[];
    var BEPShceValueArr=[];
    var CEPShceValueArr=[];
    var hceShowX=[];
    var urlString = "http://localhost:8080/nexteer/hce/week/ISHAFT1?date="+curr_time;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: urlString,
        success: function (data) {
            $.each(data, function (i, model) {
                hceDate[i]=data[i].addDate;
                IshaftOnehceValueArr[i]=model.hce;
                IshaftOnehceTarArr[i]=model.targetHce;
                // IsTwohceValueArr[i]=model.ishaft2_value;
                // IsThrhceValueArr[i]=model.ishaft3_value;
                // IsForhceValueArr[i]=model.ishaft4_value;
                // BEPShceValueArr[i]=model.beps_value;
                // CEPShceValueArr[i]=model.ceps_value;
                // hceShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log(IshaftOnehceValueArr);
            // console.log(IsTwohceValueArr);
            // console.log(IsThrhceValueArr);
            // console.log(IsForhceValueArr);
            // console.log(BEPShceValueArr);
            // console.log(CEPShceValueArr);
            // console.log(hceShowX);
            // 指定图表的配置项和数据
            var firstOption = {
                title: myWeekTitle,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                toolbox: {
                    feature: {
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
                        name: 'hce',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        barMaxWidth:40,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnehceValueArr
                    },
                    {
                        name: 'target',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        barMaxWidth:40,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnehceTarArr
                    }
                    // ,
                    // {
                    //     name: 'Ishaft2',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: IsTwohceValueArr
                    // },
                    // {
                    //     name: 'Ishaft3',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: IsThrhceValueArr
                    // },
                    // {
                    //     name: 'Ishaft4',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: IsForhceValueArr
                    // },
                    // {
                    //     name: 'BEPS',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: BEPShceValueArr
                    // },
                    // {
                    //     name: 'CEPS',
                    //     type: 'bar',
                    //     label: {
                    //         normal: {
                    //             show: true,
                    //             position: 'top'
                    //         }
                    //     },
                    //     data: CEPShceValueArr
                    // }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnehceChart.setOption(firstOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
});
//按月显示
$("#showMonth").bind("click",function (){
    {
        var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
        // var curr_time="2017-03-13";
        var showhceJson = new hceInput(curr_time,"ISHAFT1");
        var IshaftOnehceValueArr=[];
        var IshaftOnehceTarArr=[];
        var IsTwohceValueArr=[];
        var IsThrhceValueArr=[];
        var IsForhceValueArr=[];
        var BEPShceValueArr=[];
        var CEPShceValueArr=[];
        var hceShowX=[];
        var urlString = "http://localhost:8080/nexteer/hce/month/ISHAFT1?date="+curr_time;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: urlString,
            success: function (data) {
                $.each(data, function (i, model) {
                    hceDate[i]=data[i].addDate;
                    IshaftOnehceValueArr[i]=model.hce;
                    IshaftOnehceTarArr[i]=model.targetHce;
                    // IsTwohceValueArr[i]=model.ishaft2_value;
                    // IsThrhceValueArr[i]=model.ishaft3_value;
                    // IsForhceValueArr[i]=model.ishaft4_value;
                    // BEPShceValueArr[i]=model.beps_value;
                    // CEPShceValueArr[i]=model.ceps_value;
                    // hceShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOnehceValueArr);
                // console.log(IsTwohceValueArr);
                // console.log(IsThrhceValueArr);
                // console.log(IsForhceValueArr);
                // console.log(BEPShceValueArr);
                // console.log(CEPShceValueArr);
                // console.log(hceShowX);
                // 指定图表的配置项和数据
                var firstOption = {
                    title:myMonthTitle,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: true
                            }

                        }
                    },
                    grid:myGrid,
                    legend: myLengend,

                    xAxis: {
                        type: 'category',
                        name:'Time',
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
                        data: hceDate
                    },
                    yAxis:myYaxis,
                    dataZoom: [
                        {
                            id: 'dataZoomX',
                            type: 'slider',
                            xAxisIndex: [0],
                            filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                            start: 1,
                            end: 100
                        }],
                    series: [

                        {
                            name: 'hce',
                            type: 'line',
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            barMaxWidth:40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: IshaftOnehceValueArr
                        },
                        {
                            name: 'target',
                            type: 'line',
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            barMaxWidth:40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: IshaftOnehceTarArr
                        }
                        // ,
                        // {
                        //     name: 'Ishaft2',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: IsTwohceValueArr
                        // },
                        // {
                        //     name: 'Ishaft3',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: IsThrhceValueArr
                        // },
                        // {
                        //     name: 'Ishaft4',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: IsForhceValueArr
                        // },
                        // {
                        //     name: 'BEPS',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: BEPShceValueArr
                        // },
                        // {
                        //     name: 'CEPS',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: CEPShceValueArr
                        // }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                IsOnehceChart.setOption(firstOption);

            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
            }

        });
    }
});

//按年显示
$("#showYear").bind("click",function () {
    {
        var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
        // var curr_time="2017-04-04";
        var showhceJson = new hceInput(curr_time,"ISHAFT1");
        var IshaftOnehceValueArr=[];
        var IshaftOnehceTarArr=[];
        var IsTwohceValueArr=[];
        var IsThrhceValueArr=[];
        var IsForhceValueArr=[];
        var BEPShceValueArr=[];
        var CEPShceValueArr=[];
        var hceShowX=[];
        var urlString = "http://localhost:8080/nexteer/hce/year/ISHAFT1?date="+curr_time;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: urlString,
            success: function (data) {
                $.each(data, function (i, model) {
                    hceDate[i]=data[i].addDate;
                    IshaftOnehceValueArr[i]=model.hce;
                    IshaftOnehceTarArr[i]=model.targetHce;
                    // IsTwohceValueArr[i]=model.ishaft2_value;
                    // IsThrhceValueArr[i]=model.ishaft3_value;
                    // IsForhceValueArr[i]=model.ishaft4_value;
                    // BEPShceValueArr[i]=model.beps_value;
                    // CEPShceValueArr[i]=model.ceps_value;
                    // hceShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOnehceValueArr);
                // console.log(IsTwohceValueArr);
                // console.log(IsThrhceValueArr);
                // console.log(IsForhceValueArr);
                // console.log(BEPShceValueArr);
                // console.log(CEPShceValueArr);
                // console.log(hceShowX);
                // 指定图表的配置项和数据
                var firstOption = {
                    title: myYearTitle,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    grid: myGrid,
                    legend: myLengend,

                    xAxis: {
                        type: 'category',
                        name:'Time',
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
                        data: hceDate
                    },
                    yAxis:myYaxis,
                    dataZoom: [
                        {
                            id: 'dataZoomX',
                            type: 'slider',
                            xAxisIndex: [0],
                            filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                            start: 1,
                            end: 100
                        }],
                    series: [

                        {
                            name: 'hce',
                            type: 'line',
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            barMaxWidth:40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: IshaftOnehceValueArr
                        },
                        {
                            name: 'target',
                            type: 'line',
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            barMaxWidth:40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: IshaftOnehceTarArr
                        }
                        // ,
                        // {
                        //     name: 'Ishaft2',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: IsTwohceValueArr
                        // },
                        // {
                        //     name: 'Ishaft3',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: IsThrhceValueArr
                        // },
                        // {
                        //     name: 'Ishaft4',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: IsForhceValueArr
                        // },
                        // {
                        //     name: 'BEPS',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: BEPShceValueArr
                        // },
                        // {
                        //     name: 'CEPS',
                        //     type: 'line',
                        //     label: {
                        //         normal: {
                        //             show: true,
                        //             position: 'top'
                        //         }
                        //     },
                        //     data: CEPShceValueArr
                        // }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                IsOnehceChart.setOption(firstOption);

            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
            }

        });
    }
});

//按时期显示
$("#showPeriod").bind("click",function () {
    function showPeriodTime(startyear, startmonth, startday,endyear, endmonth, endday) {
        this.startYear = startyear;
        this.startMonth = startmonth;
        this.startDay = startday;
        this.endYear = endyear;
        this.endMonth = endmonth;
        this.endDay=endday;
    }
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
    var IsTwohceValueArr=[];
    var IsThrhceValueArr=[];
    var IsForhceValueArr=[];
    var BEPShceValueArr=[];
    var CEPShceValueArr=[];
    var hceShowX=[];
    var starthceTime=$("#starthceTime").val().split("-");
    var endhceTIme=$("#endhceTime").val().split("-");
    console.log(starthceTime);
    console.log(endhceTIme);

    var startyear=starthceTime[0];
    var startmonth=starthceTime[1];
    var startday=starthceTime[2];
    var endyear=endhceTIme[0];
    var endmonth=endhceTIme[1];
    var endday=endhceTIme[2];
    var showPeriodJson=new showPeriodTime(starthceTime[0].toString(),starthceTime[1].toString(),starthceTime[2].toString(),endhceTIme[0].toString(),endhceTIme[1].toString(),endhceTIme[2].toString());
    console.log(startyear);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/hce-amount/getByPeriod",
        data: JSON.stringify(showPeriodJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, model) {
                hceYearArr[i]=model.year;
                hceMonthArr[i]=model.month;
                hceDayArr[i]=model.day;
                IshaftOnehceValueArr[i]=model.ishaft1_value;
                IsTwohceValueArr[i]=model.ishaft2_value;
                IsThrhceValueArr[i]=model.ishaft3_value;
                IsForhceValueArr[i]=model.ishaft4_value;
                BEPShceValueArr[i]=model.beps_value;
                CEPShceValueArr[i]=model.ceps_value;
                hceShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(hceYearArr);
            console.log(IshaftOnehceValueArr);
            console.log(IsTwohceValueArr);
            console.log(IsThrhceValueArr);
            console.log(IsForhceValueArr);
            console.log(BEPShceValueArr);
            console.log(CEPShceValueArr);
            console.log(hceShowX);
            // 指定图表的配置项和数据
            var firstOption = {
                title: myPeriod,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                toolbox: {
                    feature: {
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
                    data: hceShowX
                },
                yAxis:myYaxis,
                series: [

                    {
                        name: 'Ishaft1',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnehceValueArr
                    },
                    {
                        name: 'Ishaft2',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwohceValueArr
                    },
                    {
                        name: 'Ishaft3',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrhceValueArr
                    },
                    {
                        name: 'Ishaft4',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForhceValueArr
                    },
                    {
                        name: 'BEPS',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPShceValueArr
                    },
                    {
                        name: 'CEPS',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: CEPShceValueArr
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            IsOnehceChart.setOption(firstOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
});