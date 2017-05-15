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

console.log('start');
// 基于准备好的dom，初始化echarts实例


var myMonthTitle= {
    text: '第一条中间轴可动率月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: '第一条中间轴可动率周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: '第一条中间轴可动率年视图',
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
    data:['oee','target'],
    align: 'right',
    right: '9%',
    top:'6%'
};

function showWeek() {
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showoeeJson = new oeeInput(curr_time,"ISHAFT1");
    var IshaftOneoeeValueArr=[];
    var IshaftOneoeeTarArr=[];
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<2;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=0;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    var urlString = "http://10.1.0.40:8080/nexteer/oee/week/ISHAFT1?date="+curr_time;
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
                IshaftOneoeeValueArr[i]=model.oee;
                IshaftOneoeeTarArr[i]=model.targetOee;
                switch (model.addDate){
                    case WeekDate[0]:
                        console.log("ncie");
                        myData[0][0]=model.oee;
                        myData[1][0]=model.targetOee;
                        break;
                    case WeekDate[1]:
                        myData[0][1]=model.oee;
                        myData[1][1]=model.targetOee;
                        break;
                    case WeekDate[2]:
                        myData[0][2]=model.oee;
                        myData[1][2]=model.targetOee;
                        break;
                    case WeekDate[3]:
                        myData[0][3]=model.oee;
                        myData[1][3]=model.targetOee;
                        break;
                    case WeekDate[4]:
                        myData[0][4]=model.oee;
                        myData[1][4]=model.targetOee;
                        break;
                    case WeekDate[5]:
                        myData[0][5]=model.oee;
                        myData[1][5]=model.targetOee;
                        break;
                    case WeekDate[6]:
                        myData[0][6]=model.oee;
                        myData[1][6]=model.targetOee;
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

showWeek();

//按周显示
$("#showWeek").bind("click",function () {
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    // window.location.reload();
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showoeeJson = new oeeInput(curr_time,"ISHAFT1");
    var IshaftOneoeeValueArr=[];
    var IshaftOneoeeTarArr=[];
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<2;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=0;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    var urlString = "http://10.1.0.40:8080/nexteer/oee/week/ISHAFT1?date="+curr_time;
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
                IshaftOneoeeValueArr[i]=model.oee;
                IshaftOneoeeTarArr[i]=model.targetOee;
                switch (model.addDate){
                    case WeekDate[0]:
                        console.log("ncie");
                        myData[0][0]=model.oee;
                        myData[1][0]=model.targetOee;
                        break;
                    case WeekDate[1]:
                        myData[0][1]=model.oee;
                        myData[1][1]=model.targetOee;
                        break;
                    case WeekDate[2]:
                        myData[0][2]=model.oee;
                        myData[1][2]=model.targetOee;
                        break;
                    case WeekDate[3]:
                        myData[0][3]=model.oee;
                        myData[1][3]=model.targetOee;
                        break;
                    case WeekDate[4]:
                        myData[0][4]=model.oee;
                        myData[1][4]=model.targetOee;
                        break;
                    case WeekDate[5]:
                        myData[0][5]=model.oee;
                        myData[1][5]=model.targetOee;
                        break;
                    case WeekDate[6]:
                        myData[0][6]=model.oee;
                        myData[1][6]=model.targetOee;
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
});
//按月显示
$("#showMonth").bind("click",function (){
    // window.location.reload();
    // $("#showIsOneWeekSheet").empty();
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        var percent = 50;
        var myData=[];
        console.log("开始传输数据");
        for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
            myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var myJ=0;myJ<31;myJ++){
                myData[i][myJ]=0;
            }
        }
        var MonthDate=[];
        var d=new Date(Uyear,Umonth,0);
        for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
            MonthDate.push(Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Mindex))
        }
        for(var perIndex in MonthDate){
            var nowTime=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
            if(MonthDate[perIndex]==nowTime){
                percent=parseInt(perIndex*100/31)+1;
                console.log(percent);
            }

        }
        console.log(MonthDate);
        console.log(MonthDate[d.getDate()-1]);
        {
            var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
            // var curr_time="2017-03-13";
            myMonthTitle.text = '第一条中间轴可动率'+ Uyear+"-"+judgeTime(Umonth)+ '月视图';
            var IshaftOneoeeValueArr=[];
            var IshaftOneoeeTarArr=[];
            var urlString = "http://10.1.0.40:8080/nexteer/oee/month/ISHAFT1?date="+curr_time;
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
                        IshaftOneoeeValueArr[i]=model.oee;
                        IshaftOneoeeTarArr[i]=model.targetOee;
                        for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
                            if(MonthDate[monIndex]==model.addDate){
                                myData[0][monIndex]=model.oee;
                                myData[1][monIndex]=model.targetOee;
                                percent=monIndex*100/30;
                            }

                        }
                    });
                    console.log(JSON.stringify(data));
                    console.log(IshaftOneoeeValueArr);
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
                            data: MonthDate
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

    })
});
$("#selectMonthSub").bind("click",function (){
    // window.location.assign("../../html/oeeSec/ishaft1oeeSec.html");
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var myData=[];
    var percent=50;
    {
        var data = $("#selectMonth").val().split("-");
        var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
        // var curr_time="2017-04-04";
        myMonthTitle.text = '第一条中间轴可动率'+ data[0]+'-'+data[1]+ '月视图';

        for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
            myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var myJ=0;myJ<31;myJ++){
                myData[i][myJ]=0;
            }
        }
        var MonthDate=[];
        var d=new Date(data[0],data[1],0);
        for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
            MonthDate.push(data[0]+"-"+data[1]+"-"+judgeTime(Mindex));
        }

        console.log(MonthDate);
        var IshaftOneoeeValueArr=[];
        var IshaftOneoeeTarArr=[];
        var urlString = "http://10.1.0.40:8080/nexteer/oee/month/ISHAFT1?date="+curr_time;
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
                    IshaftOneoeeValueArr[i]=model.oee;
                    IshaftOneoeeTarArr[i]=model.targetOee;
                    for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
                        if(MonthDate[monIndex]==model.addDate){
                            myData[0][monIndex]=model.oee;
                            myData[1][monIndex]=model.targetOee;
                            percent=monIndex*100/30;
                        }

                    }
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneoeeValueArr);
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
                        data: MonthDate
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
});
//按年显示
$("#showYear").bind("click",function () {
    // window.location.assign("../../html/oeeSec/ishaft1oeeSec.html");
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var percent=99;
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<366;myJ++){
            myData[i][myJ]=0;
        }
    }
    var YearDate=[];
    for(var yIndex=1;yIndex<13;yIndex++){
        var d=new Date($("#selectYear").val(),yIndex,0);
        for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
            YearDate.push($("#selectYear").val()+"-"+judgeTime(yIndex)+"-"+judgeTime(Mindex))
        }
    }

    console.log(YearDate);
    {
        var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
        myYearTitle.text = '第一条中间轴可动率'+ Uyear + '年视图';
        var showoeeJson = new oeeInput(curr_time,"ISHAFT1");
        var IshaftOneoeeValueArr=[];
        var IshaftOneoeeTarArr=[];
        var urlString = "http://10.1.0.40:8080/nexteer/oee/year/ISHAFT1?date="+curr_time;
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
                    IshaftOneoeeValueArr[i]=model.oee;
                    IshaftOneoeeTarArr[i]=model.targetOee;
                    for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
                        if (YearDate[monIndex] == model.addDate) {
                            myData[0][monIndex] = model.oee;
                            myData[1][monIndex] = model.targetOee;
                            percent=monIndex*100/365;
                        }
                    }
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneoeeValueArr);
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
});
$("#selectYearSub").bind("click",function () {
    var IsOneoeeChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    {
        var curr_time=$("#selectYear").val()+"-12-31";
        // var curr_time="2017-04-04";
        myYearTitle.text = '第一条中间轴可动率'+ $("#selectYear").val() + '年视图';
        var showoeeJson = new oeeInput(curr_time,"ISHAFT1");
        var percent=99;
        var myData=[];
        console.log("开始传输数据");
        for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
            myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
            for(var myJ=0;myJ<366;myJ++){
                myData[i][myJ]=0;
            }
        }
        var YearDate=[];
        for(var yIndex=1;yIndex<13;yIndex++){
            var d=new Date($("#selectYear").val(),yIndex,0);
            for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
                YearDate.push($("#selectYear").val()+"-"+judgeTime(yIndex)+"-"+judgeTime(Mindex))
            }
        }

        console.log(YearDate);
        var IshaftOneoeeValueArr=[];
        var IshaftOneoeeTarArr=[];
        var urlString = "http://10.1.0.40:8080/nexteer/oee/year/ISHAFT1?date="+curr_time;
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
                    IshaftOneoeeValueArr[i]=model.oee;
                    IshaftOneoeeTarArr[i]=model.targetOee;
                    for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
                        if (YearDate[monIndex] == model.addDate) {
                            myData[0][monIndex] = model.oee;
                            myData[1][monIndex] = model.targetOee;
                            percent=monIndex*100/365;
                        }
                    }
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOneoeeValueArr);
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
});
