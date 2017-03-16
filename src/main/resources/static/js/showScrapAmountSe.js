/**
 * Created by Administrator on 2017/3/16.
 */
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
var IsTwoscrapChart=echarts.init(document.getElementById('showIsTwoWeekSheet'));
var IsThrscrapChart=echarts.init(document.getElementById('showIsThrWeekSheet'));
var IsForscrapChart=echarts.init(document.getElementById('showIsForWeekSheet'));
var BEPSscrapChart=echarts.init(document.getElementById('showBEPSWeekSheet'));
var CEPSscrapChart=echarts.init(document.getElementById('showCEPSWeekSheet'));
colorOne=['#293c55','#000000'];
colorTwo=['#483D8B','#000000'];
colorThr=['#243c25','#000000'];
colorFor=['#2b271f','#000000'];
colorFir=['#442323','#000000'];
colorSix=['#383838','#000000'];

var startScrapTime=$("#startScrapTime").val();
var endScrapTIme=$("#endScrapTime").val();
console.log(startScrapTime);
console.log(endScrapTIme);

function showWeek() {

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
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%',
                    backgroudColor:'#ffffff'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                      fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorOne,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var SecOption= {
                title: {
                    text: 'Ishaft2报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorTwo,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwoscrapValueArr
                    }
                ]
            };
            var ThrOption= {
                title: {
                    text: 'Ishaft3报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorThr,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrscrapValueArr
                    }
                ]
            };
            var ForOption= {
                title: {
                    text: 'Ishaft3报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFor,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForscrapValueArr
                    }
                ]
            };
            var BEPSOption={
                title: {
                    text: 'BEPS报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFir,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPSscrapValueArr
                    }
                ]
            };
            var CEPSOption={
                title: {
                    text: 'CEPS报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorSix,
                series: [

                    {
                        name: '报废金额',
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
            IsTwoscrapChart.setOption(SecOption);
            IsThrscrapChart.setOption(ThrOption);
            IsForscrapChart.setOption(ForOption);
            BEPSscrapChart.setOption(BEPSOption);
            CEPSscrapChart.setOption(CEPSOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
}
function showMonth() {

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
                title: {
                    text: 'Ishaft1报废金额月视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorOne,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var SecOption= {
                title: {
                    text: 'Ishaft2报废金额月视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorTwo,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwoscrapValueArr
                    }
                ]
            };
            var ThrOption= {
                title: {
                    text: 'Ishaft3报废金额月视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorThr,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrscrapValueArr
                    }
                ]
            };
            var ForOption= {
                title: {
                    text: 'Ishaft3报废金额月视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data:scrapShowX
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFor,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForscrapValueArr
                    }
                ]
            };
            var BEPSOption={
                title: {
                    text: 'BEPS报废金额月视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFir,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPSscrapValueArr
                    }
                ]
            };
            var CEPSOption={
                title: {
                    text: 'CEPS报废金额月视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorSix,
                series: [

                    {
                        name: '报废金额',
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
            IsTwoscrapChart.setOption(SecOption);
            IsThrscrapChart.setOption(ThrOption);
            IsForscrapChart.setOption(ForOption);
            BEPSscrapChart.setOption(BEPSOption);
            CEPSscrapChart.setOption(CEPSOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
}
function showYear() {

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
                title: {
                    text: 'Ishaft1报废金额年视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%',
                    backgroudColor:'#ffffff'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorOne,
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var SecOption= {
                title: {
                    text: 'Ishaft2报废金额年视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorTwo,
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwoscrapValueArr
                    }
                ]
            };
            var ThrOption= {
                title: {
                    text: 'Ishaft3报废金额年视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorThr,
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrscrapValueArr
                    }
                ]
            };
            var ForOption= {
                title: {
                    text: 'Ishaft3报废金额年视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFor,
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForscrapValueArr
                    }
                ]
            };
            var BEPSOption={
                title: {
                    text: 'BEPS报废金额年视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

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
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFir,
                series: [

                    {
                        name: '报废金额',
                        type: 'line',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPSscrapValueArr
                    }
                ]
            };
            var CEPSOption={
                title: {
                    text: 'CEPS报废金额年视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data:scrapShowX
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorSix,
                series: [

                    {
                        name: '报废金额',
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
            IsTwoscrapChart.setOption(SecOption);
            IsThrscrapChart.setOption(ThrOption);
            IsForscrapChart.setOption(ForOption);
            BEPSscrapChart.setOption(BEPSOption);
            CEPSscrapChart.setOption(CEPSOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
}
function showPeriod() {

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/getByPeriod",
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
                title: {
                    text: 'Ishaft1报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%',
                    backgroudColor:'#ffffff'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorOne,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IshaftOnescrapValueArr
                    }
                ]
            };
            var SecOption= {
                title: {
                    text: 'Ishaft2报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorTwo,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsTwoscrapValueArr
                    }
                ]
            };
            var ThrOption= {
                title: {
                    text: 'Ishaft3报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorThr,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsThrscrapValueArr
                    }
                ]
            };
            var ForOption= {
                title: {
                    text: 'Ishaft3报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFor,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: IsForscrapValueArr
                    }
                ]
            };
            var BEPSOption={
                title: {
                    text: 'BEPS报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorFir,
                series: [

                    {
                        name: '报废金额',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: BEPSscrapValueArr
                    }
                ]
            };
            var CEPSOption={
                title: {
                    text: 'CEPS报废金额周视图'
                },
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
                grid: {
                    containLabel: true,
                    left:'4%',
                    bottom:'2%'
                },
                legend: {
                    data:['报废金额'],
                    align: 'right',
                    right: '15%',
                    top:'3%'
                },

                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    nameTextStyle:{
                        fontStyle:'italic',
                        fontWeight:'bold'
                    },
                    data: ["周一","周二","周三","周四","周五","周六","周日"]
                },
                yAxis:[{
                    type:'value',
                    name:'报废金额（元）',
                    position:'left',
                    nameTextStyle:{
                        fontStyle:'normal',
                        fontWeight:'bold'
                    }
                }],
                color:colorSix,
                series: [

                    {
                        name: '报废金额',
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
            IsTwoscrapChart.setOption(SecOption);
            IsThrscrapChart.setOption(ThrOption);
            IsForscrapChart.setOption(ForOption);
            BEPSscrapChart.setOption(BEPSOption);
            CEPSscrapChart.setOption(CEPSOption);

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
        }

    });
}
// showWeek();
// showMonth();
showYear();
//按周显示
// $("#showWeek").bind("click",showWeek);
// $("#showWeek").click(showWeek());
//按月显示
// $("#showMonth").bind("click",function (){showMonth();});

//按年显示
// $("#showYear").bind("click", function () {
//
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/scrap-amount/getByYear",
//         data: JSON.stringify(showScrapJson),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//             $.each(data, function (i, model) {
//                 scrapYearArr[i]=model.year;
//                 scrapMonthArr[i]=model.month;
//                 scrapDayArr[i]=model.day;
//                 scrapValueArr[i]=model.value;
//                 scrapShowX[i]=model.year+"."+model.month+"."+model.day;
//             });
//             console.log(JSON.stringify(data));
//             console.log('nice');
//             console.log(scrapYearArr);
//             console.log(scrapValueArr);
//             console.log(scrapShowX);
//             // 指定图表的配置项和数据
//             var option = {
//                 title: {
//                     text: '报废金额年视图'
//                 },
//                 tooltip: {},
//                 legend: {
//                     data:['报废金额（元）']
//                 },
//                 xAxis: {
//                     data: scrapShowX
//                 },
//                 yAxis: {},
//                 series: [
//
//                     {
//                         name: '报废金额',
//                         type: 'line',
//                         data: scrapValueArr
//                     }
//                 ]
//             };
//             // 使用刚指定的配置项和数据显示图表。
//             scrapChart.setOption(option);
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//         }
//
//     });
// });

//按时期显示
// $("#showPeriod").bind("click", function () {
//     function showPeriodTime(startyear, startmonth, startday,endyear, endmonth, endday) {
//         this.startyear = startyear;
//         this.startmonth = startmonth;
//         this.startday = startday;
//         this.endyear = endyear;
//         this.endmonth = endmonth;
//         this.endday=endday;
//     }
//     var startyear=$("#showStartYear").val();
//     var startmonth=$("#showStartMonth").val();
//     var startday=$("#showStartDay").val();
//     var endyear=$("#showEndYear").val();
//     var endmonth=$("#showEndMonth").val();
//     var endday=$("#showEndDay").val();
//     var showPeriodJson=showPeriodTime(startyear.toString(),startmonth.toString(),startday.toString(),endyear.toString(),endmonth.toString(),endday.toString());
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/scrap-amount/getByPeriod",
//         data: JSON.stringify(showPeriodJson),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//             $.each(data, function (i, model) {
//                 scrapYearArr[i]=model.year;
//                 scrapMonthArr[i]=model.month;
//                 scrapDayArr[i]=model.day;
//                 scrapValueArr[i]=model.value;
//                 scrapShowX[i]=model.year+"."+model.month+"."+model.day;
//             });
//             console.log(JSON.stringify(data));
//             console.log('nice');
//             console.log(scrapYearArr);
//             console.log(scrapValueArr);
//             console.log(scrapShowX);
//             // 指定图表的配置项和数据
//             var option = {
//                 title: {
//                     text: '报废金额指定起止日期视图'
//                 },
//                 tooltip: {},
//                 legend: {
//                     data:['报废金额（元）']
//                 },
//                 xAxis: {
//                     data: scrapShowX
//                 },
//                 yAxis: {},
//                 series: [
//
//                     {
//                         name: '报废金额',
//                         type: 'line',
//                         data: scrapValueArr
//                     }
//                 ]
//             };
//             // 使用刚指定的配置项和数据显示图表。
//             scrapChart.setOption(option);
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//         }
//
//     });
// });