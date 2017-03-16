/**
 * Created by Administrator on 2017/3/8.
 */
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
scrapYearArr=[];
scrapMonthArr=[];
scrapDayArr=[];
IshaftOnescrapValueArr=[];
IsTwoscrapValueArr=[];
IsThrscrapValueArr=[];
IsThrscrapValueArr=[];
IsForscrapValueArr=[];
BEPSscrapValueArr=[];
CEPSscrapValueArr=[];
scrapShowX=[];

// 基于准备好的dom，初始化echarts实例
var IsOnescrapChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
var IsTwoscrapChart=echarts.init(document.getElementById('showIsTwoWeekSheet'));
var IsThrscrapChart=echarts.init(document.getElementById('showIsThrWeekSheet'));
var IsForscrapChart=echarts.init(document.getElementById('showIsForWeekSheet'));
var BEPSscrapChart=echarts.init(document.getElementById('showBEPSWeekSheet'));
var CEPSscrapChart=echarts.init(document.getElementById('showCEPSWeekSheet'));
//按周显示
$("#showWeek").bind("click", function () {

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
            console.log(scrapShowX);
            // 指定图表的配置项和数据
            var Firstoption = {
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                legend: {
                    data:['报废金额（元）'],
                    align: 'right',
                    right: 10
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var SecOption= {
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                legend: {
                    data:['报废金额（元）'],
                    align: 'right',
                    right: 10
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var ThrOption= {
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                legend: {
                    data:['报废金额（元）'],
                    align: 'right',
                    right: 10
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var ForOption= {
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                legend: {
                    data:['报废金额（元）'],
                    align: 'right',
                    right: 10
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var BEPSOption={
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                legend: {
                    data:['报废金额（元）'],
                    align: 'right',
                    right: 10
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var CEPSOption={
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                legend: {
                    data:['报废金额（元）'],
                    align: 'right',
                    right: 10
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            IsOnescrapChart.setOption(Firstoption);
            IsTwoscrapChart.setOption(SecOption);
            IsThrscrapChart.setOption(ThrOption);
            IsForscrapChart.setOption(ForOption);
            BEPSscrapChart.setOption(BEPSOption);
            CEPSscrapChart.setOption(CEPSOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }

    });
});

//按月显示
$("#showMonth").bind("click", function () {

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
                scrapValueArr[i]=model.value;
                scrapShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(scrapYearArr);
            console.log(scrapValueArr);
            console.log(scrapShowX);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '报废金额月视图'
                },
                tooltip: {},
                legend: {
                    data:['报废金额（元）']
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: scrapValueArr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            scrapChart.setOption(option);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }

    });
});

//按年显示
$("#showYear").bind("click", function () {

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
                scrapValueArr[i]=model.value;
                scrapShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(scrapYearArr);
            console.log(scrapValueArr);
            console.log(scrapShowX);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '报废金额年视图'
                },
                tooltip: {},
                legend: {
                    data:['报废金额（元）']
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: scrapValueArr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            scrapChart.setOption(option);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }

    });
});

//按时期显示
$("#showPeriod").bind("click", function () {
    function showPeriodTime(startyear, startmonth, startday,endyear, endmonth, endday) {
        this.startyear = startyear;
        this.startmonth = startmonth;
        this.startday = startday;
        this.endyear = endyear;
        this.endmonth = endmonth;
        this.endday=endday;
    }
    var startyear=$("#showStartYear").val();
    var startmonth=$("#showStartMonth").val();
    var startday=$("#showStartDay").val();
    var endyear=$("#showEndYear").val();
    var endmonth=$("#showEndMonth").val();
    var endday=$("#showEndDay").val();
    var showPeriodJson=showPeriodTime(startyear.toString(),startmonth.toString(),startday.toString(),endyear.toString(),endmonth.toString(),endday.toString());
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
                scrapValueArr[i]=model.value;
                scrapShowX[i]=model.year+"."+model.month+"."+model.day;
            });
            console.log(JSON.stringify(data));
            console.log('nice');
            console.log(scrapYearArr);
            console.log(scrapValueArr);
            console.log(scrapShowX);
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '报废金额指定起止日期视图'
                },
                tooltip: {},
                legend: {
                    data:['报废金额（元）']
                },
                xAxis: {
                    data: scrapShowX
                },
                yAxis: {},
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        data: scrapValueArr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            scrapChart.setOption(option);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }

    });
});