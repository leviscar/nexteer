/**
 * Created by Administrator on 2017/3/16.
 */
scrapYearArr=[];
scrapMonthArr=[];
scrapDayArr=[];

function getDateJson(){
    showScrapDay=Uday-1;
    var UscrapMonth=Umonth.toString();
    var UscrapDay=showScrapDay.toString();
    if(Umonth<10&&Umonth>0){
        UscrapMonth="0"+UscrapMonth;
    }
    if(Uday<10&&Uday>0){
        UscrapDay="0"+UscrapDay;
    }
    var showScrapJson = new safety_date(Uyear.toString(), UscrapMonth.toString(), UscrapDay.toString());
    return showScrapJson;
}
showScrapJson=getDateJson();

console.log('start');
// 基于准备好的dom，初始化echarts实例
var IsOnescrapChart=echarts.init(document.getElementById('showIsOneWeekSheet'));

// colorOne=['#293c55','#000000'];
// colorTwo=['#483D8B','#000000'];
// colorThr=['#243c25','#000000'];
// colorFor=['#2b271f','#000000'];
// colorFir=['#442323','#000000'];
// colorSix=['#383838','#000000'];
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
    data:['Ishaft1','Ishaft2','Ishaft3','Ishaft4','BEPS','CEPS'],
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
    var IshaftOnescrapValueArr=[];
    var IsTwoscrapValueArr=[];
    var IsThrscrapValueArr=[];
    var IsForscrapValueArr=[];
    var BEPSscrapValueArr=[];
    var CEPSscrapValueArr=[];
    var scrapShowX=[];
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/getByWeek",
        data: JSON.stringify(showScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, model) {
                scrapYearArr[i]=model.year;
                scrapMonthArr[i]=model.month;
                scrapDayArr[i]=model.day;
                IshaftOnescrapValueArr[i]=model.ishaft1_value;
                IsTwoscrapValueArr[i]=model.ishaft2_value;
                IsThrscrapValueArr[i]=model.ishaft3_value;
                IsForscrapValueArr[i]=model.ishaft4_value;
                BEPSscrapValueArr[i]=model.beps_value;
                CEPSscrapValueArr[i]=model.ceps_value;
                scrapShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(scrapYearArr);
            console.log(IshaftOnescrapValueArr);
            console.log(IsTwoscrapValueArr);
            console.log(IsThrscrapValueArr);
            console.log(IsForscrapValueArr);
            console.log(BEPSscrapValueArr);
            console.log(CEPSscrapValueArr);
            console.log(scrapShowX);
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
                        name: 'Ishaft1',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnescrapValueArr
                    },
                    {
                        name: 'Ishaft2',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwoscrapValueArr
                    },
                    {
                        name: 'Ishaft3',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrscrapValueArr
                    },
                    {
                        name: 'Ishaft4',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForscrapValueArr
                    },
                    {
                        name: 'BEPS',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPSscrapValueArr
                    },
                    {
                        name: 'CEPS',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: CEPSscrapValueArr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnescrapChart.setOption(firstOption);

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
    var IshaftOnescrapValueArr=[];
    var IsTwoscrapValueArr=[];
    var IsThrscrapValueArr=[];
    var IsForscrapValueArr=[];
    var BEPSscrapValueArr=[];
    var CEPSscrapValueArr=[];
    var scrapShowX=[];
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/getByWeek",
        data: JSON.stringify(showScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, model) {
                scrapYearArr[i]=model.year;
                scrapMonthArr[i]=model.month;
                scrapDayArr[i]=model.day;
                IshaftOnescrapValueArr[i]=model.ishaft1_value;
                IsTwoscrapValueArr[i]=model.ishaft2_value;
                IsThrscrapValueArr[i]=model.ishaft3_value;
                IsForscrapValueArr[i]=model.ishaft4_value;
                BEPSscrapValueArr[i]=model.beps_value;
                CEPSscrapValueArr[i]=model.ceps_value;
                scrapShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(scrapYearArr);
            console.log(IshaftOnescrapValueArr);
            console.log(IsTwoscrapValueArr);
            console.log(IsThrscrapValueArr);
            console.log(IsForscrapValueArr);
            console.log(BEPSscrapValueArr);
            console.log(CEPSscrapValueArr);
            console.log(scrapShowX);
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
                            readOnly: false,
                            optionToContent: function (opt) {
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
                        name: 'Ishaft1',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnescrapValueArr
                    },
                    {
                        name: 'Ishaft2',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwoscrapValueArr
                    },
                    {
                        name: 'Ishaft3',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrscrapValueArr
                    },
                    {
                        name: 'Ishaft4',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForscrapValueArr
                    },
                    {
                        name: 'BEPS',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPSscrapValueArr
                    },
                    {
                        name: 'CEPS',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: CEPSscrapValueArr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnescrapChart.setOption(firstOption);

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
        var IshaftOnescrapValueArr=[];
        var IsTwoscrapValueArr=[];
        var IsThrscrapValueArr=[];
        var IsForscrapValueArr=[];
        var BEPSscrapValueArr=[];
        var CEPSscrapValueArr=[];
        var scrapShowX=[];
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/scrap-amount/getByMonth",
            data: JSON.stringify(showScrapJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, model) {
                    scrapYearArr[i]=model.year;
                    scrapMonthArr[i]=model.month;
                    scrapDayArr[i]=model.day;
                    IshaftOnescrapValueArr[i]=model.ishaft1_value;
                    IsTwoscrapValueArr[i]=model.ishaft2_value;
                    IsThrscrapValueArr[i]=model.ishaft3_value;
                    IsForscrapValueArr[i]=model.ishaft4_value;
                    BEPSscrapValueArr[i]=model.beps_value;
                    CEPSscrapValueArr[i]=model.ceps_value;
                    scrapShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log('nice');
                console.log(scrapYearArr);
                console.log(IshaftOnescrapValueArr);
                console.log(IsTwoscrapValueArr);
                console.log(IsThrscrapValueArr);
                console.log(IsForscrapValueArr);
                console.log(BEPSscrapValueArr);
                console.log(CEPSscrapValueArr);
                console.log(scrapShowX);
                // 指定图表的配置项和数据
                var firstOption = {
                    title:myMonthTitle,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
                            },
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
                        data: scrapShowX
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
                            data: IshaftOnescrapValueArr
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
                            data: IsTwoscrapValueArr
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
                            data: IsThrscrapValueArr
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
                            data: IsForscrapValueArr
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
                            data: BEPSscrapValueArr
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
                            data: CEPSscrapValueArr
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                IsOnescrapChart.setOption(firstOption);

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
        var IshaftOnescrapValueArr=[];
        var IsTwoscrapValueArr=[];
        var IsThrscrapValueArr=[];
        var IsForscrapValueArr=[];
        var BEPSscrapValueArr=[];
        var CEPSscrapValueArr=[];
        var scrapShowX=[];
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/scrap-amount/getByYear",
            data: JSON.stringify(showScrapJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $.each(data, function (i, model) {
                    scrapYearArr[i]=model.year;
                    scrapMonthArr[i]=model.month;
                    scrapDayArr[i]=model.day;
                    IshaftOnescrapValueArr[i]=model.ishaft1_value;
                    IsTwoscrapValueArr[i]=model.ishaft2_value;
                    IsThrscrapValueArr[i]=model.ishaft3_value;
                    IsForscrapValueArr[i]=model.ishaft4_value;
                    BEPSscrapValueArr[i]=model.beps_value;
                    CEPSscrapValueArr[i]=model.ceps_value;
                    scrapShowX[i]=model.year+"."+model.month+"."+model.day;
                });
                console.log(JSON.stringify(data));
                console.log('nice');
                console.log(scrapYearArr);
                console.log(IshaftOnescrapValueArr);
                console.log(IsTwoscrapValueArr);
                console.log(IsThrscrapValueArr);
                console.log(IsForscrapValueArr);
                console.log(BEPSscrapValueArr);
                console.log(CEPSscrapValueArr);
                console.log(scrapShowX);
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
                                readOnly: false,
                                optionToContent: function (opt) {
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
                        data: scrapShowX
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
                            data: IshaftOnescrapValueArr
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
                            data: IsTwoscrapValueArr
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
                            data: IsThrscrapValueArr
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
                            data: IsForscrapValueArr
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
                            data: BEPSscrapValueArr
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
                            data: CEPSscrapValueArr
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                IsOnescrapChart.setOption(firstOption);

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
    var IshaftOnescrapValueArr=[];
    var IsTwoscrapValueArr=[];
    var IsThrscrapValueArr=[];
    var IsForscrapValueArr=[];
    var BEPSscrapValueArr=[];
    var CEPSscrapValueArr=[];
    var scrapShowX=[];
    var startScrapTime=$("#startScrapTime").val().split("-");
    var endScrapTIme=$("#endScrapTime").val().split("-");
    console.log(startScrapTime);
    console.log(endScrapTIme);

    var startyear=startScrapTime[0];
    var startmonth=startScrapTime[1];
    var startday=startScrapTime[2];
    var endyear=endScrapTIme[0];
    var endmonth=endScrapTIme[1];
    var endday=endScrapTIme[2];
    var showPeriodJson=new showPeriodTime(startScrapTime[0].toString(),startScrapTime[1].toString(),startScrapTime[2].toString(),endScrapTIme[0].toString(),endScrapTIme[1].toString(),endScrapTIme[2].toString());
    console.log(startyear);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/getByPeriod",
        data: JSON.stringify(showPeriodJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, model) {
                scrapYearArr[i]=model.year;
                scrapMonthArr[i]=model.month;
                scrapDayArr[i]=model.day;
                IshaftOnescrapValueArr[i]=model.ishaft1_value;
                IsTwoscrapValueArr[i]=model.ishaft2_value;
                IsThrscrapValueArr[i]=model.ishaft3_value;
                IsForscrapValueArr[i]=model.ishaft4_value;
                BEPSscrapValueArr[i]=model.beps_value;
                CEPSscrapValueArr[i]=model.ceps_value;
                scrapShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(scrapYearArr);
            console.log(IshaftOnescrapValueArr);
            console.log(IsTwoscrapValueArr);
            console.log(IsThrscrapValueArr);
            console.log(IsForscrapValueArr);
            console.log(BEPSscrapValueArr);
            console.log(CEPSscrapValueArr);
            console.log(scrapShowX);
            // 指定图表的配置项和数据
            var firstOption = {
                title: myPeriod,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
                    data: scrapShowX
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
                        data: IshaftOnescrapValueArr
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
                        data: IsTwoscrapValueArr
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
                        data: IsThrscrapValueArr
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
                        data: IsForscrapValueArr
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
                        data: BEPSscrapValueArr
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
                        data: CEPSscrapValueArr
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            IsOnescrapChart.setOption(firstOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
});