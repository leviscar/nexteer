/**
 * Created by Administrator on 2017/4/4.
 */
var oeeYearArr=[];
var oeeMonthArr=[];
var oeeDayArr=[];
var oeeDate =[];

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
function oeeInput(curr_time,cell_name) {
    this.curr_time=curr_time;
    this.cell_name=cell_name;
}


console.log('start');
// 基于准备好的dom，初始化echarts实例
var IsOneOeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));

var myMonthTitle= {
    text: '可动率月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: '可动率周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: '可动率年视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myPeriod={
    text: '可动率时间段视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYaxis= [{
    type:'value',
    name:'可动率（%）',
    position:'left',
    min:0,

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
    data:['oee','target'],
    align: 'right',
    right: '9%',
    top:'6%'
};

function showWeek() {
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showOeeJson = new oeeInput(curr_time,"ISHAFT1");
    var IshaftOneOeeValueArr=[];
    var IshaftOneOeeTarArr= [];
    var IsTwoOeeValueArr=[];
    var IsThrOeeValueArr=[];
    var IsForOeeValueArr=[];
    var BEPSOeeValueArr=[];
    var CEPSOeeValueArr=[];
    var OeeShowX=[];
    var urlString = "http://localhost:8080/nexteer/oee/week/ISHAFT1?date="+curr_time;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: urlString,
        success: function (data) {
            $.each(data, function (i, model) {
                oeeDate[i]=data[i].addDate;

                IshaftOneOeeValueArr[i]=model.oee;
                IshaftOneOeeTarArr[i] = model.targetOee;
                // IsTwoOeeValueArr[i]=model.ishaft2_value;
                // IsThrOeeValueArr[i]=model.ishaft3_value;
                // IsForOeeValueArr[i]=model.ishaft4_value;
                // BEPSOeeValueArr[i]=model.beps_value;
                // CEPSOeeValueArr[i]=model.ceps_value;
                // OeeShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log(IshaftOneOeeValueArr);
            // console.log(IsTwoOeeValueArr);
            // console.log(IsThrOeeValueArr);
            // console.log(IsForOeeValueArr);
            // console.log(BEPSOeeValueArr);
            // console.log(CEPSOeeValueArr);
            // console.log(OeeShowX);
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
                        name: 'oee',
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
                        data: IshaftOneOeeValueArr
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
                        data: IshaftOneOeeTarArr
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
                    //     data: IsTwoOeeValueArr
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
                    //     data: IsThrOeeValueArr
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
                    //     data: IsForOeeValueArr
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
                    //     data: BEPSOeeValueArr
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
                    //     data: CEPSOeeValueArr
                    // }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOneOeeChart.setOption(firstOption);

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
    window.location.assign("../../html/oeeSec/ishaft1OEESec.html");
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var urlString = "http://localhost:8080/nexteer/oee/week/ISHAFT1?date="+curr_time;
    var showOeeJson = new oeeInput(curr_time,"ISHAFT1");
    var IshaftOneOeeValueArr=[];
    var IshaftOneOeeTarArr= [];
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: urlString,
        success: function (data) {
            {
                $.each(data, function (i, model) {
                    oeeDate[i]=data[i].addDate;

                    IshaftOneOeeValueArr[i] = model.oee;
                    IshaftOneOeeTarArr[i] = model.targetOee;

                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneOeeValueArr);

                var firstOption = {
                    title: myWeekTitle,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {}// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
                        nameTextStyle: {
                            fontStyle: 'italic',
                            fontWeight: 'bold'
                        },
                        axisLabel: {
                            textStyle: {

                                fontSize: 20
                            }
                        },
                        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                    },
                    yAxis: myYaxis,
                    series: [

                        {
                            name: 'oee',
                            type: 'line',
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            barMaxWidth: 40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: IshaftOneOeeValueArr
                        },
                        {
                            name: 'target',
                            type: 'line',
                            smooth: true,
                            showAllSymbol: true,
                            symbol: 'emptyCircle',
                            barMaxWidth: 40,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: IshaftOneOeeTarArr
                        }

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                IsOneOeeChart.setOption(firstOption);

            }
        }
    });
    // $.get("http://localhost:8080/nexteer/oee/week/ISHAFT1?date="+curr_time,function (data) {
    //     {
    //         $.each($.parseJSON(data), function (i, model) {
    //             // oeeDate[i]=data[i].addDate;
    //
    //             IshaftOneOeeValueArr[i]=model.oee;
    //             IshaftOneOeeTarArr[i] = model.targetOee;
    //
    //         });
    //         console.log(JSON.stringify(data));
    //         console.log(IshaftOneOeeValueArr);
    //
    //         var firstOption = {
    //             title: myWeekTitle,
    //             tooltip: {
    //                 trigger: 'axis',
    //                 axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //             },
    //             toolbox: {
    //                 feature: {
    //                     dataView: {
    //                         show: true,
    //                         readOnly: false
    //                     },
    //                     saveAsImage: {
    //                         show: true
    //                     }
    //                 }
    //             },
    //             grid: myGrid,
    //             legend: myLengend,
    //
    //             xAxis: {
    //                 type: 'category',
    //                 axisTick: {
    //                     alignWithLabel: true
    //                 },
    //                 nameTextStyle:{
    //                     fontStyle:'italic',
    //                     fontWeight:'bold'
    //                 },
    //                 axisLabel:{
    //                     textStyle:{
    //
    //                         fontSize:20
    //                     }
    //                 },
    //                 data: ["周一","周二","周三","周四","周五","周六","周日"]
    //             },
    //             yAxis:myYaxis,
    //             series: [
    //
    //                 {
    //                     name: 'oee',
    //                     type: 'line',
    //                     barMaxWidth:40,
    //                     label: {
    //                         normal: {
    //                             show: true,
    //                             position: 'top'
    //                         }
    //                     },
    //                     data: IshaftOneOeeValueArr
    //                 },
    //                 {
    //                     name: 'target',
    //                     type: 'line',
    //                     barMaxWidth:40,
    //                     label: {
    //                         normal: {
    //                             show: true,
    //                             position: 'top'
    //                         }
    //                     },
    //                     data: IshaftOneOeeTarArr
    //                 }
    //
    //             ]
    //         };
    //         // 使用刚指定的配置项和数据显示图表。
    //         IsOneOeeChart.setOption(firstOption);
    //
    //     }
    // });
});
//按月显示
$("#showMonth").bind("click",function (){
    window.location.assign("../../html/oeeSec/ishaft1OEESec.html");
    {
        var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
        // var curr_time="2017-03-13";
        myMonthTitle.text = '可动率'+ Uyear+"-"+judgeTime(Umonth)+ '月视图';
        var showOeeJson = new oeeInput(curr_time,"ISHAFT1");
        var IshaftOneOeeValueArr=[];
        var IshaftOneOeeTarArr = [];
        var IsTwoOeeValueArr=[];
        var IsThrOeeValueArr=[];
        var IsForOeeValueArr=[];
        var BEPSOeeValueArr=[];
        var CEPSOeeValueArr=[];
        var OeeShowX=[];
        var urlString = "http://localhost:8080/nexteer/oee/month/ISHAFT1?date="+curr_time;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: urlString,
            success: function (data) {
                $.each(data, function (i, model) {
                    oeeDate[i]=data[i].addDate;
                    IshaftOneOeeValueArr[i]=model.oee;
                    IshaftOneOeeTarArr[i]=model.targetOee;
                    // IsTwoOeeValueArr[i]=model.ishaft2_value;
                    // IsThrOeeValueArr[i]=model.ishaft3_value;
                    // IsForOeeValueArr[i]=model.ishaft4_value;
                    // BEPSOeeValueArr[i]=model.beps_value;
                    // CEPSOeeValueArr[i]=model.ceps_value;
                    // OeeShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneOeeValueArr);
                // console.log(IsTwoOeeValueArr);
                // console.log(IsThrOeeValueArr);
                // console.log(IsForOeeValueArr);
                // console.log(BEPSOeeValueArr);
                // console.log(CEPSOeeValueArr);
                // console.log(OeeShowX);
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
                        data: oeeDate
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
                            name: 'oee',
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
                            data: IshaftOneOeeValueArr
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
                            data: IshaftOneOeeTarArr
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
                        //     data: IsTwoOeeValueArr
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
                        //     data: IsThrOeeValueArr
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
                        //     data: IsForOeeValueArr
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
                        //     data: BEPSOeeValueArr
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
                        //     data: CEPSOeeValueArr
                        // }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                IsOneOeeChart.setOption(firstOption);

            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
            }

        });
    }
});
$("#selectMonthSub").bind("click",function (){
    window.location.assign("../../html/oeeSec/ishaft1OEESec.html");
    {
        var data = $("#selectMonth").val().split("-");
        var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
        // var curr_time="2017-04-04";
        myMonthTitle.text = '可动率'+ data[0]+'-'+data[1]+ '月视图';
        var showOeeJson = new oeeInput(curr_time,"ISHAFT1");
        var IshaftOneOeeValueArr=[];
        var IshaftOneOeeTarArr = [];
        var IsTwoOeeValueArr=[];
        var IsThrOeeValueArr=[];
        var IsForOeeValueArr=[];
        var BEPSOeeValueArr=[];
        var CEPSOeeValueArr=[];
        var OeeShowX=[];
        var urlString = "http://localhost:8080/nexteer/oee/month/ISHAFT1?date="+curr_time;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: urlString,
            success: function (data) {
                $.each(data, function (i, model) {
                    oeeDate[i]=data[i].addDate;
                    IshaftOneOeeValueArr[i]=model.oee;
                    IshaftOneOeeTarArr[i]=model.targetOee;
                    // IsTwoOeeValueArr[i]=model.ishaft2_value;
                    // IsThrOeeValueArr[i]=model.ishaft3_value;
                    // IsForOeeValueArr[i]=model.ishaft4_value;
                    // BEPSOeeValueArr[i]=model.beps_value;
                    // CEPSOeeValueArr[i]=model.ceps_value;
                    // OeeShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneOeeValueArr);
                // console.log(IsTwoOeeValueArr);
                // console.log(IsThrOeeValueArr);
                // console.log(IsForOeeValueArr);
                // console.log(BEPSOeeValueArr);
                // console.log(CEPSOeeValueArr);
                // console.log(OeeShowX);
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
                        data: oeeDate
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
                            name: 'oee',
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
                            data: IshaftOneOeeValueArr
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
                            data: IshaftOneOeeTarArr
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
                        //     data: IsTwoOeeValueArr
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
                        //     data: IsThrOeeValueArr
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
                        //     data: IsForOeeValueArr
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
                        //     data: BEPSOeeValueArr
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
                        //     data: CEPSOeeValueArr
                        // }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                IsOneOeeChart.setOption(firstOption);

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
    window.location.assign("../../html/oeeSec/ishaft1OEESec.html");
    {
        var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
        myYearTitle.text = '可动率'+ Uyear + '年视图';
        // var curr_time="2017-04-04";
        var showOeeJson = new oeeInput(curr_time,"ISHAFT1");
        var IshaftOneOeeValueArr=[];
        var IshaftOneOeeTarArr=[];
        var IsTwoOeeValueArr=[];
        var IsThrOeeValueArr=[];
        var IsForOeeValueArr=[];
        var BEPSOeeValueArr=[];
        var CEPSOeeValueArr=[];
        var OeeShowX=[];
        var urlString = "http://localhost:8080/nexteer/oee/year/ISHAFT1?date="+curr_time;

        // $("#selection").replaceWith("<form class=\"navbar-form navbar-right\" id=\"selection\"><select  id=\"selectYear\"></select><button type=\"button\" class=\"btn btn-danger btn-xs \" id=\"selectYearSub\">年份选择</button></form>");
        // $("#selectYear").replaceWith("<select  id=\"selectYear\"><option>"+(Uyear-5)+"<option>"+(Uyear-4)+"</option>"+"<option>"+(Uyear-3)+"</option>"
        //     +"<option>"+(Uyear-2)+"</option>"+"<option>"+(Uyear-1)+"</option>"+"<option>"+(Uyear)+"</option>"+"<option>"+(Uyear+1)+"</option>"
        //     +"<option>"+(Uyear+2)+"</option>"+"<option>"+(Uyear+3)+"</option>"+"<option>"+(Uyear+4)+"</option>"+"<option>"+(Uyear+5)+"</option>"
        //     +"<option>"+(Uyear+6)+"</option>"+"<option>"+(Uyear+7)+"</option>"+"<option>"+(Uyear+8)+"</option>"+"<option>"+(Uyear+9)+"</option>"
        //     +"</option></select>");
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: urlString,
            success: function (data) {
                $.each(data, function (i, model) {
                    oeeDate[i]=data[i].addDate;
                    IshaftOneOeeValueArr[i]=model.oee;
                    IshaftOneOeeTarArr[i] = model.targetOee;
                    // IsTwoOeeValueArr[i]=model.ishaft2_value;
                    // IsThrOeeValueArr[i]=model.ishaft3_value;
                    // IsForOeeValueArr[i]=model.ishaft4_value;
                    // BEPSOeeValueArr[i]=model.beps_value;
                    // CEPSOeeValueArr[i]=model.ceps_value;
                    // OeeShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneOeeValueArr);
                // console.log(IsTwoOeeValueArr);
                // console.log(IsThrOeeValueArr);
                // console.log(IsForOeeValueArr);
                // console.log(BEPSOeeValueArr);
                // console.log(CEPSOeeValueArr);
                // console.log(OeeShowX);
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
                        data: oeeDate
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
                            name: 'oee',
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
                            data: IshaftOneOeeValueArr
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
                            data: IshaftOneOeeTarArr
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
                        //     data: IsTwoOeeValueArr
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
                        //     data: IsThrOeeValueArr
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
                        //     data: IsForOeeValueArr
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
                        //     data: BEPSOeeValueArr
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
                        //     data: CEPSOeeValueArr
                        // }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                IsOneOeeChart.setOption(firstOption);

            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
            }

        });
    }
});
$("#selectYearSub").bind("click",function () {
    window.location.assign("../../html/oeeSec/ishaft1OEESec.html");
    {
        var curr_time=$("#selectYear").val()+"-12-31";
        // var curr_time="2017-04-04";
        myYearTitle.text = '可动率'+ $("#selectYear").val() + '年视图';
        var showOeeJson = new oeeInput(curr_time,"ISHAFT1");
        var IshaftOneOeeValueArr=[];
        var IshaftOneOeeTarArr=[];
        var urlString = "http://localhost:8080/nexteer/oee/year/ISHAFT1?date="+curr_time;
        console.log("切换年份");
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: urlString,
            success: function (data) {
                $.each(data, function (i, model) {
                    oeeDate[i]=data[i].addDate;
                    IshaftOneOeeValueArr[i]=model.oee;
                    IshaftOneOeeTarArr[i] = model.targetOee;
                    // IsTwoOeeValueArr[i]=model.ishaft2_value;
                    // IsThrOeeValueArr[i]=model.ishaft3_value;
                    // IsForOeeValueArr[i]=model.ishaft4_value;
                    // BEPSOeeValueArr[i]=model.beps_value;
                    // CEPSOeeValueArr[i]=model.ceps_value;
                    // OeeShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneOeeValueArr);
                // console.log(IsTwoOeeValueArr);
                // console.log(IsThrOeeValueArr);
                // console.log(IsForOeeValueArr);
                // console.log(BEPSOeeValueArr);
                // console.log(CEPSOeeValueArr);
                // console.log(OeeShowX);
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
                        data: oeeDate
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
                            name: 'oee',
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
                            data: IshaftOneOeeValueArr
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
                            data: IshaftOneOeeTarArr
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
                        //     data: IsTwoOeeValueArr
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
                        //     data: IsThrOeeValueArr
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
                        //     data: IsForOeeValueArr
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
                        //     data: BEPSOeeValueArr
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
                        //     data: CEPSOeeValueArr
                        // }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                IsOneOeeChart.setOption(firstOption);

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
    var IshaftOneOeeValueArr=[];
    var IsTwoOeeValueArr=[];
    var IsThrOeeValueArr=[];
    var IsForOeeValueArr=[];
    var BEPSOeeValueArr=[];
    var CEPSOeeValueArr=[];
    var OeeShowX=[];
    var startOeeTime=$("#startOeeTime").val().split("-");
    var endOeeTIme=$("#endOeeTime").val().split("-");
    console.log(startOeeTime);
    console.log(endOeeTIme);

    var startyear=startOeeTime[0];
    var startmonth=startOeeTime[1];
    var startday=startOeeTime[2];
    var endyear=endOeeTIme[0];
    var endmonth=endOeeTIme[1];
    var endday=endOeeTIme[2];
    var showPeriodJson=new showPeriodTime(startOeeTime[0].toString(),startOeeTime[1].toString(),startOeeTime[2].toString(),endOeeTIme[0].toString(),endOeeTIme[1].toString(),endOeeTIme[2].toString());
    console.log(startyear);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/Oee-amount/getByPeriod",
        data: JSON.stringify(showPeriodJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, model) {
                OeeYearArr[i]=model.year;
                OeeMonthArr[i]=model.month;
                OeeDayArr[i]=model.day;
                IshaftOneOeeValueArr[i]=model.ishaft1_value;
                IsTwoOeeValueArr[i]=model.ishaft2_value;
                IsThrOeeValueArr[i]=model.ishaft3_value;
                IsForOeeValueArr[i]=model.ishaft4_value;
                BEPSOeeValueArr[i]=model.beps_value;
                CEPSOeeValueArr[i]=model.ceps_value;
                OeeShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(OeeYearArr);
            console.log(IshaftOneOeeValueArr);
            console.log(IsTwoOeeValueArr);
            console.log(IsThrOeeValueArr);
            console.log(IsForOeeValueArr);
            console.log(BEPSOeeValueArr);
            console.log(CEPSOeeValueArr);
            console.log(OeeShowX);
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
                    data: OeeShowX
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
                        data: IshaftOneOeeValueArr
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
                        data: IsTwoOeeValueArr
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
                        data: IsThrOeeValueArr
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
                        data: IsForOeeValueArr
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
                        data: BEPSOeeValueArr
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
                        data: CEPSOeeValueArr
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            IsOneOeeChart.setOption(firstOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
});