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
//数组去重
Array.prototype.unique1 = function()
{
    var n = []; //一个新的临时数组
    for(var i = 0; i < this.length; i++) //遍历当前数组
    {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
    }
    return n;
}

console.log('start');
// 基于准备好的dom，初始化echarts实例


var myMonthTitle= {
    text: '全产线人员利用率月视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myWeekTitle= {
    text: '全产线人员利用率周视图',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYearTitle={
    text: '全产线人员利用率年视图',
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
    data:['Ishaft1','Ishaft1_target','Ishaft2','Ishaft2_target','Ishaft3','Ishaft3_target','Ishaft4','Ishaft4_target',
        'BEPS','BEPS_target','CEPS','CEPS_target'],
    align: 'right',
    right: '9%',
    top:'6%'
};

function showWeek() {
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showhceJson = new hceInput(curr_time,"ISHAFT1");
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=null;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    var urlString = "http://10.1.0.40:8080/nexteer/hce/week/ISHAFT1?date="+curr_time;
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
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
                        break;
                    case WeekDate[1]:
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
                        break;
                    case WeekDate[2]:
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
                        break;
                    case WeekDate[3]:
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
                        break;
                    case WeekDate[4]:
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
                        break;
                    case WeekDate[5]:
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
                        break;
                    case WeekDate[6]:
                        switch (model.cellName){
                            case "ISHAFT1":
                                myData[0][0]=model.hce;
                                myData[1][0]=model.targetHce;
                                break;
                            case "ISHAFT2":
                                myData[2][0]=model.hce;
                                myData[3][0]=model.targetHce;
                                break;
                            case "ISHAFT3":
                                myData[4][0]=model.hce;
                                myData[5][0]=model.targetHce;
                                break;
                            case "ISHAFT4":
                                myData[6][0]=model.hce;
                                myData[7][0]=model.targetHce;
                                break;
                            case "BEPS1":
                                myData[8][0]=model.hce;
                                myData[9][0]=model.targetHce;
                                break;
                            case "BEPS2":
                                myData[10][0]=model.hce;
                                myData[11][0]=model.targetHce;
                                break;
                            case "BEPS3":
                                myData[12][0]=model.hce;
                                myData[13][0]=model.targetHce;
                                break;
                            case "CEPS1":
                                myData[14][0]=model.hce;
                                myData[15][0]=model.targetHce;
                                break;
                            case "CEPS2":
                                myData[16][0]=model.hce;
                                myData[17][0]=model.targetHce;
                                break;
                            case "CEPS3":
                                myData[18][0]=model.hce;
                                myData[19][0]=model.targetHce;
                                break;
                            case "CEPS4":
                                myData[20][0]=model.hce;
                                myData[21][0]=model.targetHce;
                                break;
                            case "CEPS5":
                                myData[22][0]=model.hce;
                                myData[23][0]=model.targetHce;
                                break;
                        }
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
                        name: 'Ishaft1',
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
                        name: 'Ishaft1_target',
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
                    },
                    {
                        name: 'Ishaft2',
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
                        data: myData[2]
                    },
                    {
                        name: 'Ishaft2_target',
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
                        data: myData[3]
                    },
                    {
                        name: 'Ishaft3',
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
                        data: myData[4]
                    },
                    {
                        name: 'Ishaft3_target',
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
                        data: myData[5]
                    },
                    {
                        name: 'Ishaft4',
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
                        data: myData[6]
                    },
                    {
                        name: 'Ishaft4_target',
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
                        data: myData[7]
                    },
                    {
                        name: 'BEPS3',
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
                        data: myData[12]
                    },
                    {
                        name: 'BEPS3_target',
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
                        data: myData[13]
                    },
                    {
                        name: 'CEPS5',
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
                        data: myData[22]
                    },
                    {
                        name: 'CEPS5_target',
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
                        data: myData[23]
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
    var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
    // var curr_time="2017-03-09";
    var showhceJson = new hceInput(curr_time,"ISHAFT1");
    var IshaftOnehceValueArr=[];
    var IshaftOnehceTarArr=[];
    var myData=[];
    console.log("开始传输数据");
    for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=null;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
    var urlString = "http://10.1.0.40:8080/nexteer/hce/week?date="+curr_time;
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
                switch (model.cellName){
                    case "ISHAFT1":
                        myData[0][monIndex]=model.hce;
                        myData[1][monIndex]=model.targetHce;
                        break;
                    case "ISHAFT2":
                        myData[2][monIndex]=model.hce;
                        myData[3][monIndex]=model.targetHce;
                        break;
                    case "ISHAFT3":
                        myData[4][monIndex]=model.hce;
                        myData[5][monIndex]=model.targetHce;
                        break;
                    case "ISHAFT4":
                        myData[6][monIndex]=model.hce;
                        myData[7][monIndex]=model.targetHce;
                        break;
                    case "BEPS1":
                        myData[8][monIndex]=model.hce;
                        myData[9][monIndex]=model.targetHce;
                        break;
                    case "BEPS2":
                        myData[10][monIndex]=model.hce;
                        myData[11][monIndex]=model.targetHce;
                        break;
                    case "BEPS3":
                        myData[12][monIndex]=model.hce;
                        myData[13][monIndex]=model.targetHce;
                        break;
                    case "CEPS1":
                        myData[14][monIndex]=model.hce;
                        myData[15][monIndex]=model.targetHce;
                        break;
                    case "CEPS2":
                        myData[16][monIndex]=model.hce;
                        myData[17][monIndex]=model.targetHce;
                        break;
                    case "CEPS3":
                        myData[18][monIndex]=model.hce;
                        myData[19][monIndex]=model.targetHce;
                        break;
                    case "CEPS4":
                        myData[20][monIndex]=model.hce;
                        myData[21][monIndex]=model.targetHce;
                        break;
                    case "CEPS5":
                        myData[22][monIndex]=model.hce;
                        myData[23][monIndex]=model.targetHce;
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
                        name: 'Ishaft1',
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
                        name: 'Ishaft1_target',
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
                    },
                    {
                        name: 'Ishaft2',
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
                        data: myData[2]
                    },
                    {
                        name: 'Ishaft2_target',
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
                        data: myData[3]
                    },
                    {
                        name: 'Ishaft3',
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
                        data: myData[4]
                    },
                    {
                        name: 'Ishaft3_target',
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
                        data: myData[5]
                    },
                    {
                        name: 'Ishaft4',
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
                        data: myData[6]
                    },
                    {
                        name: 'Ishaft4_target',
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
                        data: myData[7]
                    },
                    {
                        name: 'BEPS3',
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
                        data: myData[12]
                    },
                    {
                        name: 'BEPS3_target',
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
                        data: myData[13]
                    },
                    {
                        name: 'CEPS5',
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
                        data: myData[22]
                    },
                    {
                        name: 'CEPS5_target',
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
                        data: myData[23]
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
    var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
    $(document).ready(function () {
        {
            var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
            myMonthTitle.text = '全产线人员利用率'+ Uyear+"-"+judgeTime(Umonth)+ '月视图';
            var myIshaft1=[];
            var myIshaft1Value=[];
            var myIshaft1Tar=[];
            var myIshaft2=[];
            var myIshaft2Value=[];
            var myIshaft2Tar=[];
            var myIshaft3=[];
            var myIshaft3Value=[];
            var myIshaft3Tar=[];
            var myIshaft4=[];
            var myIshaft4Value=[];
            var myIshaft4Tar=[];
            var myCEPS=[];
            var myCEPSValue=[];
            var myCEPSTar=[];
            var myBEPS=[];
            var myBEPSValue=[];
            var myBEPSTar=[];
            var Mdate=[];
            var urlString = "http://10.1.0.40:8080/nexteer/hce/month?date="+curr_time;
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: 'GET',
                url: urlString,
                success: function (data) {
                    $.each(data, function (i, model) {
                        switch (model.cellName){
                            case "ISHAFT1":
                                myIshaft1.push(data[i]);
                                break;
                            case "ISHAFT2":
                                myIshaft2.push(data[i]);
                                break;
                            case "ISHAFT3":
                                myIshaft3.push(data[i]);
                                break;
                            case "ISHAFT4":
                                myIshaft4.push(data[i]);
                                break;
                            case "BEPS3":
                                myBEPS.push(data[i]);
                                break;
                            case "CEPS5":
                                myCEPS.push(data[i]);
                                break;
                        }
                        Mdate.push(model.addDate);
                    });
                    Mdate.unique1();
                    console.log(Mdate);
                    myIshaft1.sort(up);
                    myIshaft2.sort(up);
                    myIshaft3.sort(up);
                    myIshaft4.sort(up);
                    myBEPS.sort(up);
                    myCEPS.sort(up);
                    $.each(myIshaft1,function (i,model) {
                        myIshaft1Value.push(model.hce);
                        myIshaft1Tar.push(model.targetHce);
                    });
                    $.each(myIshaft2,function (i,model) {
                        myIshaft2Value.push(model.hce);
                        myIshaft2Tar.push(model.targetHce);

                    });
                    $.each(myIshaft3,function (i,model) {
                        myIshaft3Value.push(model.hce);
                        myIshaft3Tar.push(model.targetHce);
                    });
                    $.each(myIshaft4,function (i,model) {
                        myIshaft4Value.push(model.hce);
                        myIshaft4Tar.push(model.targetHce);
                    });
                    $.each(myBEPS,function (i,model) {
                        myBEPSValue.push(model.hce);
                        myBEPSTar.push(model.targetHce);
                    });
                    $.each(myCEPS,function (i,model) {
                        myCEPSValue.push(model.hce);
                        myCEPSTar.push(model.targetHce);
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
                            data: Mdate
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
                                name: 'Ishaft1',
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
                                data: myIshaft1Value
                            },
                            {
                                name: 'Ishaft1_target',
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
                                data: myIshaft1Tar
                            },
                            {
                                name: 'Ishaft2',
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
                                data: myIshaft2Value
                            },
                            {
                                name: 'Ishaft2_target',
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
                                data: myIshaft2Tar
                            },
                            {
                                name: 'Ishaft3',
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
                                data: myIshaft3Value
                            },
                            {
                                name: 'Ishaft3_target',
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
                                data: myIshaft3Tar
                            },
                            {
                                name: 'Ishaft4',
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
                                data: myIshaft4Value
                            },
                            {
                                name: 'Ishaft4_target',
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
                                data: myIshaft4Tar
                            },
                            {
                                name: 'BEPS3',
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
                                data: myBEPSValue
                            },
                            {
                                name: 'BEPS3_target',
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
                                data: myBEPSTar
                            },
                            {
                                name: 'CEPS5',
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
                                data: myCEPSValue
                            },
                            {
                                name: 'CEPS5_target',
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
                                data: myCEPSTar
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
// $("#selectMonthSub").bind("click",function (){
//     // window.location.assign("../../html/hceSec/ishaft1HceSec.html");
//     var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
//     var myData=[];
//     var percent=50;
//     {
//         var data = $("#selectMonth").val().split("-");
//         var curr_time=data[0]+"-"+data[1]+"-"+new Date(data[0],data[1],0).getDate();
//         // var curr_time="2017-04-04";
//         myMonthTitle.text = '全产线人员利用率'+ data[0]+'-'+data[1]+ '月视图';
//
//         for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
//             myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
//             for(var myJ=0;myJ<31;myJ++){
//                 myData[i][myJ]=null;
//             }
//         }
//         var MonthDate=[];
//         var d=new Date(data[0],data[1],0);
//         for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
//             MonthDate.push(data[0]+"-"+data[1]+"-"+judgeTime(Mindex));
//         }
//
//         console.log(MonthDate);
//         var IshaftOnehceValueArr=[];
//         var IshaftOnehceTarArr=[];
//         var urlString = "http://10.1.0.40:8080/nexteer/hce/month?date="+curr_time;
//         $.ajax({
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             type: 'GET',
//             url: urlString,
//             success: function (data) {
//                 $.each(data, function (i, model) {
//                     hceDate[i]=data[i].addDate;
//                     IshaftOnehceValueArr[i]=model.hce;
//                     IshaftOnehceTarArr[i]=model.targetHce;
//                     for(var monIndex=0;monIndex<MonthDate.length;monIndex++){
//                         if(MonthDate[monIndex]==model.addDate){
//                             switch (model.cellName){
//                                 case "ISHAFT1":
//                                     myData[0][monIndex]=model.hce;
//                                     myData[1][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT2":
//                                     myData[2][monIndex]=model.hce;
//                                     myData[3][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT3":
//                                     myData[4][monIndex]=model.hce;
//                                     myData[5][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT4":
//                                     myData[6][monIndex]=model.hce;
//                                     myData[7][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS1":
//                                     myData[8][monIndex]=model.hce;
//                                     myData[9][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS2":
//                                     myData[10][monIndex]=model.hce;
//                                     myData[11][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS3":
//                                     myData[12][monIndex]=model.hce;
//                                     myData[13][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS1":
//                                     myData[14][monIndex]=model.hce;
//                                     myData[15][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS2":
//                                     myData[16][monIndex]=model.hce;
//                                     myData[17][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS3":
//                                     myData[18][monIndex]=model.hce;
//                                     myData[19][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS4":
//                                     myData[20][monIndex]=model.hce;
//                                     myData[21][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS5":
//                                     myData[22][monIndex]=model.hce;
//                                     myData[23][monIndex]=model.targetHce;
//                                     break;
//                             }
//                             percent=monIndex*100/30;
//                         }
//
//                     }
//                 });
//                 console.log(JSON.stringify(data));
//                 console.log(IshaftOnehceValueArr);
//                 // 指定图表的配置项和数据
//                 var firstOption = {
//                     title:myMonthTitle,
//                     tooltip: {
//                         trigger: 'axis',
//                         axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//                     },
//                     toolbox: {
//                         feature: {
//                             saveAsImage: {
//                                 show: true
//                             }
//
//                         }
//                     },
//                     grid:myGrid,
//                     legend: myLengend,
//
//                     xAxis: {
//                         type: 'category',
//                         name:'Time',
//                         axisTick: {
//                             alignWithLabel: true
//                         },
//                         nameTextStyle:{
//                             fontStyle:'italic',
//                             fontWeight:'bold'
//                         },
//                         axisLabel:{
//                             textStyle:{
//
//                                 fontSize:20
//                             }
//                         },
//                         data: MonthDate
//                     },
//                     yAxis:myYaxis,
//                     dataZoom: [
//                         {
//                             id: 'dataZoomX',
//                             type: 'slider',
//                             xAxisIndex: [0],
//                             filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
//                             start: 1,
//                             end: percent
//                         }],
//                     series: [
//
//                         {
//                             name: 'Ishaft1',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[0]
//                         },
//                         {
//                             name: 'Ishaft1_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[1]
//                         },
//                         {
//                             name: 'Ishaft2',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[2]
//                         },
//                         {
//                             name: 'Ishaft2_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[3]
//                         },
//                         {
//                             name: 'Ishaft3',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[4]
//                         },
//                         {
//                             name: 'Ishaft3_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[5]
//                         },
//                         {
//                             name: 'Ishaft4',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[6]
//                         },
//                         {
//                             name: 'Ishaft4_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[7]
//                         },
//                         {
//                             name: 'BEPS3',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[12]
//                         },
//                         {
//                             name: 'BEPS3_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[13]
//                         },
//                         {
//                             name: 'CEPS5',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[22]
//                         },
//                         {
//                             name: 'CEPS5_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[23]
//                         }
//                     ]
//                 };
//
//                 // 使用刚指定的配置项和数据显示图表。
//                 IsOnehceChart.setOption(firstOption);
//
//             },
//             failure: function (errMsg) {
//                 console.log(errMsg);
//                 console.log('fail');
//             }
//
//         });
//     }
// });
// //按年显示
// $("#showYear").bind("click",function () {
//     // window.location.assign("../../html/hceSec/ishaft1HceSec.html");
//     var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
//     var percent=99;
//     var myData=[];
//     console.log("开始传输数据");
//     for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
//         myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
//         for(var myJ=0;myJ<366;myJ++){
//             myData[i][myJ]=null;
//         }
//     }
//     var YearDate=[];
//     for(var yIndex=1;yIndex<13;yIndex++){
//         var d=new Date($("#selectYear").val(),yIndex,0);
//         for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
//             YearDate.push($("#selectYear").val()+"-"+judgeTime(yIndex)+"-"+judgeTime(Mindex))
//         }
//     }
//
//     console.log(YearDate);
//     {
//         var curr_time=Uyear+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
//         myYearTitle.text = '第一条中间轴人员利用率'+ Uyear + '年视图';
//         var showhceJson = new hceInput(curr_time,"ISHAFT1");
//         var IshaftOnehceValueArr=[];
//         var IshaftOnehceTarArr=[];
//         var urlString = "http://10.1.0.40:8080/nexteer/hce/year?date="+curr_time;
//         $.ajax({
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             type: 'GET',
//             url: urlString,
//             success: function (data) {
//                 $.each(data, function (i, model) {
//                     hceDate[i]=data[i].addDate;
//                     IshaftOnehceValueArr[i]=model.hce;
//                     IshaftOnehceTarArr[i]=model.targetHce;
//                     for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
//                         if (YearDate[monIndex] == model.addDate) {
//                             switch (model.cellName){
//                                 case "ISHAFT1":
//                                     myData[0][monIndex]=model.hce;
//                                     myData[1][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT2":
//                                     myData[2][monIndex]=model.hce;
//                                     myData[3][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT3":
//                                     myData[4][monIndex]=model.hce;
//                                     myData[5][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT4":
//                                     myData[6][monIndex]=model.hce;
//                                     myData[7][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS1":
//                                     myData[8][monIndex]=model.hce;
//                                     myData[9][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS2":
//                                     myData[10][monIndex]=model.hce;
//                                     myData[11][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS3":
//                                     myData[12][monIndex]=model.hce;
//                                     myData[13][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS1":
//                                     myData[14][monIndex]=model.hce;
//                                     myData[15][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS2":
//                                     myData[16][monIndex]=model.hce;
//                                     myData[17][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS3":
//                                     myData[18][monIndex]=model.hce;
//                                     myData[19][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS4":
//                                     myData[20][monIndex]=model.hce;
//                                     myData[21][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS5":
//                                     myData[22][monIndex]=model.hce;
//                                     myData[23][monIndex]=model.targetHce;
//                                     break;
//                             }
//                             percent=monIndex*100/365;
//                         }
//                     }
//                 });
//                 console.log(JSON.stringify(data));
//                 console.log(IshaftOnehceValueArr);
//                 // 指定图表的配置项和数据
//                 var firstOption = {
//                     title: myYearTitle,
//                     tooltip: {
//                         trigger: 'axis',
//                         axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//                     },
//                     toolbox: {
//                         feature: {
//                             saveAsImage: {
//                                 show: true
//                             }
//                         }
//                     },
//                     grid: myGrid,
//                     legend: myLengend,
//
//                     xAxis: {
//                         type: 'category',
//                         name:'Time',
//                         axisTick: {
//                             alignWithLabel: true
//                         },
//                         nameTextStyle:{
//                             fontStyle:'italic',
//                             fontWeight:'bold'
//                         },
//                         axisLabel:{
//                             textStyle:{
//
//                                 fontSize:20
//                             }
//                         },
//                         data: YearDate
//                     },
//                     yAxis:myYaxis,
//                     dataZoom: [
//                         {
//                             id: 'dataZoomX',
//                             type: 'slider',
//                             xAxisIndex: [0],
//                             filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
//                             start: 1,
//                             end: percent
//                         }],
//                     series: [
//
//                         {
//                             name: 'Ishaft1',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[0]
//                         },
//                         {
//                             name: 'Ishaft1_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[1]
//                         },
//                         {
//                             name: 'Ishaft2',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[2]
//                         },
//                         {
//                             name: 'Ishaft2_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[3]
//                         },
//                         {
//                             name: 'Ishaft3',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[4]
//                         },
//                         {
//                             name: 'Ishaft3_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[5]
//                         },
//                         {
//                             name: 'Ishaft4',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[6]
//                         },
//                         {
//                             name: 'Ishaft4_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[7]
//                         },
//                         {
//                             name: 'BEPS3',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[12]
//                         },
//                         {
//                             name: 'BEPS3_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[13]
//                         },
//                         {
//                             name: 'CEPS5',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[22]
//                         },
//                         {
//                             name: 'CEPS5_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[23]
//                         }
//                     ]
//                 };
//                 // 使用刚指定的配置项和数据显示图表。
//                 IsOnehceChart.setOption(firstOption);
//
//             },
//             failure: function (errMsg) {
//                 console.log(errMsg);
//                 console.log('fail');
//             }
//
//         });
//     }
// });
// $("#selectYearSub").bind("click",function () {
//     var IsOnehceChart=echarts.init(document.getElementById('showIsOneWeekSheet'));
//     {
//         var curr_time=$("#selectYear").val()+"-12-31";
//         // var curr_time="2017-04-04";
//         myYearTitle.text = '全产线人员利用率'+ $("#selectYear").val() + '年视图';
//         var showhceJson = new hceInput(curr_time,"ISHAFT1");
//         var percent=99;
//         var myData=[];
//         console.log("开始传输数据");
//         for(var i=0;i<24;i++){    //一维长度为i,i为变量，可以根据实际情况改变
//             myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
//             for(var myJ=0;myJ<366;myJ++){
//                 myData[i][myJ]=null;
//             }
//         }
//         var YearDate=[];
//         for(var yIndex=1;yIndex<13;yIndex++){
//             var d=new Date($("#selectYear").val(),yIndex,0);
//             for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
//                 YearDate.push($("#selectYear").val()+"-"+judgeTime(yIndex)+"-"+judgeTime(Mindex))
//             }
//         }
//
//         console.log(YearDate);
//         var IshaftOnehceValueArr=[];
//         var IshaftOnehceTarArr=[];
//         var urlString = "http://10.1.0.40:8080/nexteer/hce/year?date="+curr_time;
//         $.ajax({
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             type: 'GET',
//             url: urlString,
//             success: function (data) {
//                 $.each(data, function (i, model) {
//                     hceDate[i]=data[i].addDate;
//                     IshaftOnehceValueArr[i]=model.hce;
//                     IshaftOnehceTarArr[i]=model.targetHce;
//                     for(var monIndex=0;monIndex<YearDate.length;monIndex++) {
//                         if (YearDate[monIndex] == model.addDate) {
//                             switch (model.cellName){
//                                 case "ISHAFT1":
//                                     myData[0][monIndex]=model.hce;
//                                     myData[1][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT2":
//                                     myData[2][monIndex]=model.hce;
//                                     myData[3][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT3":
//                                     myData[4][monIndex]=model.hce;
//                                     myData[5][monIndex]=model.targetHce;
//                                     break;
//                                 case "ISHAFT4":
//                                     myData[6][monIndex]=model.hce;
//                                     myData[7][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS1":
//                                     myData[8][monIndex]=model.hce;
//                                     myData[9][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS2":
//                                     myData[10][monIndex]=model.hce;
//                                     myData[11][monIndex]=model.targetHce;
//                                     break;
//                                 case "BEPS3":
//                                     myData[12][monIndex]=model.hce;
//                                     myData[13][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS1":
//                                     myData[14][monIndex]=model.hce;
//                                     myData[15][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS2":
//                                     myData[16][monIndex]=model.hce;
//                                     myData[17][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS3":
//                                     myData[18][monIndex]=model.hce;
//                                     myData[19][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS4":
//                                     myData[20][monIndex]=model.hce;
//                                     myData[21][monIndex]=model.targetHce;
//                                     break;
//                                 case "CEPS5":
//                                     myData[22][monIndex]=model.hce;
//                                     myData[23][monIndex]=model.targetHce;
//                                     break;
//                             }
//                             percent=monIndex*100/365;
//                         }
//                     }
//                 });
//                 console.log(JSON.stringify(data));
//                 console.log(IshaftOnehceValueArr);
//                 // 指定图表的配置项和数据
//                 var firstOption = {
//                     title: myYearTitle,
//                     tooltip: {
//                         trigger: 'axis',
//                         axisPointer: { }// 坐标轴指示器，坐标轴触发有效// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//                     },
//                     toolbox: {
//                         feature: {
//                             saveAsImage: {
//                                 show: true
//                             }
//                         }
//                     },
//                     grid: myGrid,
//                     legend: myLengend,
//
//                     xAxis: {
//                         type: 'category',
//                         name:'Time',
//                         axisTick: {
//                             alignWithLabel: true
//                         },
//                         nameTextStyle:{
//                             fontStyle:'italic',
//                             fontWeight:'bold'
//                         },
//                         axisLabel:{
//                             textStyle:{
//
//                                 fontSize:20
//                             }
//                         },
//                         data: YearDate
//                     },
//                     yAxis:myYaxis,
//                     dataZoom: [
//                         {
//                             id: 'dataZoomX',
//                             type: 'slider',
//                             xAxisIndex: [0],
//                             filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
//                             start: 1,
//                             end: percent
//                         }],
//                     series: [
//
//                         {
//                             name: 'Ishaft1',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[0]
//                         },
//                         {
//                             name: 'Ishaft1_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[1]
//                         },
//                         {
//                             name: 'Ishaft2',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[2]
//                         },
//                         {
//                             name: 'Ishaft2_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[3]
//                         },
//                         {
//                             name: 'Ishaft3',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[4]
//                         },
//                         {
//                             name: 'Ishaft3_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[5]
//                         },
//                         {
//                             name: 'Ishaft4',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[6]
//                         },
//                         {
//                             name: 'Ishaft4_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[7]
//                         },
//                         {
//                             name: 'BEPS3',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[12]
//                         },
//                         {
//                             name: 'BEPS3_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[13]
//                         },
//                         {
//                             name: 'CEPS5',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[22]
//                         },
//                         {
//                             name: 'CEPS5_target',
//                             type: 'line',
//                             smooth: true,
//                             showAllSymbol: true,
//                             symbol: 'emptyCircle',
//                             barMaxWidth:40,
//                             label: {
//                                 normal: {
//                                     show: true,
//                                     position: 'top'
//                                 }
//                             },
//                             data: myData[23]
//                         }
//                     ]
//                 };
//                 // 使用刚指定的配置项和数据显示图表。
//                 IsOnehceChart.setOption(firstOption);
//
//             },
//             failure: function (errMsg) {
//                 console.log(errMsg);
//                 console.log('fail');
//             }
//
//         });
//     }
// });

