/**
 * Created by Administrator on 2017/5/20.
 */


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

//降序排序
function down(x, y) {
    var xTime=new Date(x.addDate);
    var yTime=new Date(y.addDate);
    return (xTime.getTime() < yTime.getTime()) ? 1 : -1

}

//升序排序
function up(x, y) {
    var xTime=new Date(x.addDate);
    var yTime=new Date(y.addDate);
    return (xTime.getTime() > yTime.getTime()) ? 1 : -1

}
console.log('start');
var obj={cell:"CEPS5"};


function showMonth(cell){
    var cellName;
    switch(cell) {
        case "ISHAFT1":
            cellName="第一条中间轴";
            break;
        case "ISHAFT2":
            cellName="第二条中间轴";
            break;
        case "ISHAFT3":
            cellName="第三条中间轴";
            break;
        case "ISHAFT4":
            cellName="第四条中间轴";
            break;
        case "CEPS5":
            cellName="无刷产线";
            break;
        case "BEPS3":
            cellName="有刷产线";
            break;

    }
    var myMonthTitle= {
        text: cellName+'报废金额月视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myWeekTitle= {

        text: obj.cellName+'报废金额周视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myYearTitle={
        text: cellName+'报废金额年视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myYaxis= [{
        type:'value',
        name:'报废金额（%）',
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
        data:['scrap','target'],
        align: 'right',
        right: '9%',
        top:'6%'
    };
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
            myMonthTitle.text = cellName+'报废金额'+ Uyear+"-"+judgeTime(Umonth)+ '月视图';
            var urlString = "http://10.1.0.40:8080/nexteer/scrap-amount/"+cell+"/year/?date="+curr_time;
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: 'GET',
                url: urlString,
                success: function (data) {
                    var OeeArr=[];
                    var OeeTarArr=[];
                    var NowDate=[];
                    console.log(JSON.stringify(data));
                    data.sort(up);
                    $.each(data, function (i, model) {
                        if(Number(model.value)!=0){
                            OeeArr.push(model.value);
                            OeeTarArr.push(model.targetValue);
                            NowDate.push(model.addDate);
                        }
                    });


                    // 指定图表的配置项和数据
                    var firstOption = {
                        title:myYearTitle,
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
                            data: NowDate
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
                                name: 'scrap',
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
                                data: OeeArr
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
                                data: OeeTarArr
                            }
                        ]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    IsOneoeeChart.setOption(firstOption);

                },
                failure: function (errMsg) {
                    console.log(errMsg);
                    console.log('fail');
                }

            });
        }

    })
}

function showSelectMonth(event){
    var obj=event.data;
    var cellName;
    switch(event.data.cell) {
        case "ISHAFT1":
            cellName="第一条中间轴";
            break;
        case "ISHAFT2":
            cellName="第二条中间轴";
            break;
        case "ISHAFT3":
            cellName="第三条中间轴";
            break;
        case "ISHAFT4":
            cellName="第四条中间轴";
            break;
        case "CEPS5":
            cellName="无刷产线";
            break;
        case "BEPS3":
            cellName="有刷产线";
            break;

    }
    var myMonthTitle= {
        text: cellName+'报废金额月视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myWeekTitle= {

        text: obj.cellName+'报废金额周视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myYearTitle={
        text: cellName+'报废金额年视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myYaxis= [{
        type:'value',
        name:'报废金额（%）',
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
        data:['scrap','target'],
        align: 'right',
        right: '9%',
        top:'6%'
    };
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var data = $("#selectMonth").val().split("-");
            var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
            // var curr_time="2017-04-04";
            myMonthTitle.text = cellName+'报废金额'+ data[0]+'-'+data[1]+ '月视图';
            var urlString = "http://10.1.0.40:8080/nexteer/scrap-amount/"+event.data.cell+"/year/?date="+curr_time;
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: 'GET',
                url: urlString,
                success: function (data) {
                    var OeeArr=[];
                    var OeeTarArr=[];
                    var NowDate=[];
                    console.log(JSON.stringify(data));
                    data.sort(up);
                    $.each(data, function (i, model) {
                        if(Number(model.value)!=0){
                            OeeArr.push(model.value);
                            OeeTarArr.push(model.targetValue);
                            NowDate.push(model.addDate);
                        }
                    });


                    // 指定图表的配置项和数据
                    var firstOption = {
                        title:myYearTitle,
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
                            data: NowDate
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
                                name: 'scrap',
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
                                data: OeeArr
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
                                data: OeeTarArr
                            }
                        ]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    IsOneoeeChart.setOption(firstOption);

                },
                failure: function (errMsg) {
                    console.log(errMsg);
                    console.log('fail');
                }

            });
        }

    })
}


//按月显示
showMonth("CEPS5");


$("#selectMonthSub").bind("click",obj,showSelectMonth);




