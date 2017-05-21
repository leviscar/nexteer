/**
 * Created by Administrator on 2017/5/20.
 */
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
        step_s = -6; // 如果今天是周日
    }
    var step_m = 7 - this_day; // 周日距离今天的天数（负数表示）
    var thisTime = date.getTime();
    var Monday = transferDate(new Date(thisTime +  step_s * 24 * 3600* 1000));
    var Tuesday= transferDate(new Date(thisTime +  (step_s+1) * 24 * 3600* 1000));
    var Wednesday= transferDate(new Date(thisTime +  (step_s+2) * 24 * 3600* 1000));
    var Thursday= transferDate(new Date(thisTime +  (step_s+3) * 24 * 3600* 1000));
    var Friday= transferDate(new Date(thisTime +  (step_s+4) * 24 * 3600* 1000));
    var Saturday= transferDate(new Date(thisTime +  (step_s+5) * 24 * 3600* 1000));
    var Sunday = transferDate(new Date(thisTime +  (step_s+6) * 24 * 3600* 1000));
    return [Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday];
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
var obj={cell:"ISHAFT4"};
// 基于准备好的dom，初始化echarts实例
function showWeek(event) {
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
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
    var myWeekTitle= {

        text: cellName+'人员利用率周视图',
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
    var showoeeJson = new oeeInput(curr_time,event.data.cell);
    var IshaftOneoeeValueArr=[];
    var IshaftOneoeeTarArr=[];
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<2;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=null;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    var urlString = "http://10.1.0.40:8080/nexteer/hce/week/"+event.data.cell+"?date="+curr_time;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: urlString,
        success: function (data) {
            console.log(data);
            $.each(data, function (i, model) {
                oeeDate[i]=data[i].addDate;
                IshaftOneoeeValueArr[i]=model.hce;
                IshaftOneoeeTarArr[i]=model.targetHce;
                switch (model.addDate){
                    case WeekDate[0]:
                        console.log("ncie");
                        myData[0][0]=model.hce;
                        myData[1][0]=model.targetHce;
                        break;
                    case WeekDate[1]:
                        myData[0][1]=model.hce;
                        myData[1][1]=model.targetHce;
                        break;
                    case WeekDate[2]:
                        myData[0][2]=model.hce;
                        myData[1][2]=model.targetHce;
                        break;
                    case WeekDate[3]:
                        myData[0][3]=model.hce;
                        myData[1][3]=model.targetHce;
                        break;
                    case WeekDate[4]:
                        myData[0][4]=model.hce;
                        myData[1][4]=model.targetHce;
                        break;
                    case WeekDate[5]:
                        myData[0][5]=model.hce;
                        myData[1][5]=model.targetHce;
                        break;
                    case WeekDate[6]:
                        myData[0][6]=model.hce;
                        myData[1][6]=model.targetHce;
                        break;


                }
            });
            console.log(JSON.stringify(data));
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
                        data: myData[0]
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
                        data: myData[1]
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
function showWeekMain(cell) {
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
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
    var myWeekTitle= {

        text: cellName+'人员利用率周视图',
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
    var showoeeJson = new oeeInput(curr_time,cell);
    var IshaftOneoeeValueArr=[];
    var IshaftOneoeeTarArr=[];
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<2;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=null;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    var urlString = "http://10.1.0.40:8080/nexteer/hce/week/"+cell+"?date="+curr_time;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: urlString,
        success: function (data) {
            console.log(data);
            $.each(data, function (i, model) {
                oeeDate[i]=data[i].addDate;
                IshaftOneoeeValueArr[i]=model.hce;
                IshaftOneoeeTarArr[i]=model.targetHce;
                switch (model.addDate){
                    case WeekDate[0]:
                        console.log("ncie");
                        myData[0][0]=model.hce;
                        myData[1][0]=model.targetHce;
                        break;
                    case WeekDate[1]:
                        myData[0][1]=model.hce;
                        myData[1][1]=model.targetHce;
                        break;
                    case WeekDate[2]:
                        myData[0][2]=model.hce;
                        myData[1][2]=model.targetHce;
                        break;
                    case WeekDate[3]:
                        myData[0][3]=model.hce;
                        myData[1][3]=model.targetHce;
                        break;
                    case WeekDate[4]:
                        myData[0][4]=model.hce;
                        myData[1][4]=model.targetHce;
                        break;
                    case WeekDate[5]:
                        myData[0][5]=model.hce;
                        myData[1][5]=model.targetHce;
                        break;
                    case WeekDate[6]:
                        myData[0][6]=model.hce;
                        myData[1][6]=model.targetHce;
                        break;


                }
            });
            console.log(JSON.stringify(data));
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
                        data: myData[0]
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
                        data: myData[1]
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
showWeekMain("ISHAFT4");
$("#showWeek").bind("click",obj,showWeek);


function showMonth(event){
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
        text: cellName+'人员利用率月视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myWeekTitle= {

        text: obj.cellName+'人员利用率周视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myYearTitle={
        text: cellName+'人员利用率年视图',
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
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
            myMonthTitle.text = cellName+'人员利用率'+ Uyear+"-"+judgeTime(Umonth)+ '月视图';
            var urlString = "http://10.1.0.40:8080/nexteer/hce/month/"+obj.cell+"?date="+curr_time;
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
                        OeeArr.push(model.hce);
                        OeeTarArr.push(model.targetHce);
                        NowDate.push(model.addDate);
                    });


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
        text: cellName+'人员利用率月视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myWeekTitle= {

        text: obj.cellName+'人员利用率周视图',
        left:'40%',
        textStyle:{
            fontSize:24
        }
    };
    var myYearTitle={
        text: cellName+'人员利用率年视图',
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
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var data = $("#selectMonth").val().split("-");
            var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
            // var curr_time="2017-04-04";
            myMonthTitle.text = cellName+'人员利用率'+ data[0]+'-'+data[1]+ '月视图';
            var urlString = "http://10.1.0.40:8080/nexteer/hce/month/"+obj.cell+"?date="+curr_time;
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
                        OeeArr.push(model.hce);
                        OeeTarArr.push(model.targetHce);
                        NowDate.push(model.addDate);
                    });


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

function showYear(event){
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
    var myYearTitle={
        text: cellName+'人员利用率年视图',
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
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
            myYearTitle.text = cellName+'人员利用率'+ Uyear+ '年视图';
            var urlString = "http://10.1.0.40:8080/nexteer/hce/year/"+obj.cell+"?date="+curr_time;
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
                        OeeArr.push(model.hce);
                        OeeTarArr.push(model.targetHce);
                        NowDate.push(model.addDate);
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

function showSelectYear(event){
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
    var myYearTitle={
        text: cellName+'人员利用率年视图',
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
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var curr_time=$("#selectYear").val()+"-12-31";
            // var curr_time="2017-04-04";
            myYearTitle.text = cellName+'人员利用率'+ $("#selectYear").val() + '年视图';
            var urlString = "http://10.1.0.40:8080/nexteer/hce/year/"+obj.cell+"?date="+curr_time;
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
                        OeeArr.push(model.hce);
                        OeeTarArr.push(model.targetHce);
                        NowDate.push(model.addDate);
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
$("#showMonth").bind("click",obj,showMonth);

$("#selectMonthSub").bind("click",obj,showSelectMonth);

$("#showYear").bind("click",obj,showYear);

$("#selectYearSub").bind("click",obj,showSelectYear);


