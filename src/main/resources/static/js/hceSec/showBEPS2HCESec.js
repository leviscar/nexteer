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
    text: 'BEPS2人员利用率月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: 'BEPS2人员利用率周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: 'BEPS2人员利用率年视图',
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
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showhceJson = new hceInput(curr_time,"BEPS2");
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
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
    var urlString = "http://10.1.0.40:8080/nexteer/hce/week/BEPS2?date="+curr_time;
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
                hceDate[i]=data[i].addDate;
                IshaftOnehceValueArr[i]=model.hce;
                IshaftOnehceTarArr[i]=model.targetHce;
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
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    // window.location.reload();
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showhceJson = new hceInput(curr_time,"BEPS2");
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
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
    var urlString = "http://10.1.0.40:8080/nexteer/hce/week/BEPS2?date="+curr_time;
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
                hceDate[i]=data[i].addDate;
                IshaftOnehceValueArr[i]=model.hce;
                IshaftOnehceTarArr[i]=model.targetHce;
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
    // window.location.reload();
    // $("#showIsOneWeekSheet").empty();
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
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
            myMonthTitle.text = 'BEPS2人员利用率'+ Uyear+"-"+judgeTime(Umonth)+ '月视图';
            var IshaftOnehceValueArr=[];
            var IshaftOnehceTarArr=[];
            var urlString = "http://10.1.0.40:8080/nexteer/hce/month/BEPS2?date="+curr_time;
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
                        for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
                            if(MonthDate[monIndex]==model.addDate){
                                myData[0][monIndex]=model.hce;
                                myData[1][monIndex]=model.targetHce;
                                percent=monIndex*100/30;
                            }

                        }
                    });
                    console.log(JSON.stringify(data));
                    console.log(IshaftOnehceValueArr);
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
                    IsOnehceChart.setOption(firstOption);

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
    // window.location.assign("../../html/hceSec/BEPS2HceSec.html");
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var myData=[];
    var percent=50;
    {
        var data = $("#selectMonth").val().split("-");
        var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
        // var curr_time="2017-04-04";
        myMonthTitle.text = 'BEPS2人员利用率'+ data[0]+'-'+data[1]+ '月视图';

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
        var IshaftOnehceValueArr=[];
        var IshaftOnehceTarArr=[];
        var urlString = "http://10.1.0.40:8080/nexteer/hce/month/BEPS2?date="+curr_time;
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
                    for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
                        if(MonthDate[monIndex]==model.addDate){
                            myData[0][monIndex]=model.hce;
                            myData[1][monIndex]=model.targetHce;
                            percent=monIndex*100/30;
                        }

                    }
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOnehceValueArr);
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
    // window.location.assign("../../html/hceSec/BEPS2HceSec.html");
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
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
        myYearTitle.text = 'BEPS2人员利用率'+ Uyear + '年视图';
        var showhceJson = new hceInput(curr_time,"BEPS2");
        var IshaftOnehceValueArr=[];
        var IshaftOnehceTarArr=[];
        var urlString = "http://10.1.0.40:8080/nexteer/hce/year/BEPS2?date="+curr_time;
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
                    for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
                        if (YearDate[monIndex] == model.addDate) {
                            myData[0][monIndex] = model.hce;
                            myData[1][monIndex] = model.targetHce;
                            percent=monIndex*100/365;
                        }
                    }
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOnehceValueArr);
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
                IsOnehceChart.setOption(firstOption);

            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
            }

        });
    }
});
$("#selectYearSub").bind("click",function () {
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    {
        var curr_time=$("#selectYear").val()+"-12-31";
        // var curr_time="2017-04-04";
        myYearTitle.text = 'BEPS2人员利用率'+ $("#selectYear").val() + '年视图';
        var showhceJson = new hceInput(curr_time,"BEPS2");
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
        var IshaftOnehceValueArr=[];
        var IshaftOnehceTarArr=[];
        var urlString = "http://10.1.0.40:8080/nexteer/hce/year/BEPS2?date="+curr_time;
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
                    for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
                        if (YearDate[monIndex] == model.addDate) {
                            myData[0][monIndex] = model.hce;
                            myData[1][monIndex] = model.targetHce;
                            percent=monIndex*100/365;
                        }
                    }
                });
                console.log(JSON.stringify(data));
                console.log(IshaftOnehceValueArr);
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
        url: "http://10.1.0.40:8080/nexteer/hce-amount/getByPeriod",
        data: JSON.stringify(showPeriodJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, model) {
                hceYearArr[i]=model.year;
                hceMonthArr[i]=model.month;
                hceDayArr[i]=model.day;
                IshaftOnehceValueArr[i]=model.BEPS2_value;
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
                        name: 'BEPS2',
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
