/**
 * Created by Administrator on 2017/5/3.
 */
//获取BEPS的周数据ajax请求函数
function judgeMyTime(time) {
    var timeStr="";
    if (time<10){
        timeStr="0"+time.toString()
    }
    else {
        timeStr=time.toString()
    }
    return timeStr;
}
// function endTime(endTime) {
//     this.end_time = endTime;
// }
// var getIshaftOneMonthJson= new endTime(Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Uday));
// //    var getIshaftOneMonthJson =new endTime("2017-04-08");
var endtime= Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Uday);
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('IshaftOneYieldMonthBar'));
var myPieChart = echarts.init(document.getElementById('IshaftOneYieldMonthPie'));
//    var myDataOne= [];
//    var worker = new Worker('http://10.1.0.40:8080/nexteer/IshaftYieldWeekFirstWork.js');
var myTitle= {
    text: 'BEPS产量信息展示（月视图）',
    left:'40%',
    textStyle:{
        fontSize:24
    }
};
var myYaxis= [{
    type:'value',
    name:'产品数（件）',
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
    data:[],
    align: 'right',
    right: '9%',
    top:'6%'
};

function getIshaftOneMonthData() {
    var proIDMsg=[];
    var proNameMsg=[];
    var myData=[];
    var myAjaxData=[];
    var sum=[];
    var myPieData=[];
    var perCent=50;
    for(var i=0;i<30;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        sum[i]=0;
        for(var myJ=0;myJ<31;myJ++){
            myData[i][myJ]=0;
        }
    }
    var myXDate=[];
    for(var jX=0;jX<30;jX++){    //一维长度为i,i为变量，可以根据实际情况改变
        myXDate[jX]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
    }
    var MonthDate=[];
    var d=new Date(Uyear,Umonth,0);
    for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
        MonthDate.push(Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Mindex))
    }
    console.log("当前月份天数"+MonthDate);



    $.get("http://10.1.0.40:8080/nexteer/product-model", function (data) {
        $.each(data, function (i, model) {
            if(model.cellName=="BEPS"){
//                    ProMsg.push({"modelId":model.modelId,"modelName":model.modelName})
                proIDMsg.push(model.modelId);
                proNameMsg.push(model.modelName);
            }
        });
    });
    $.ajax({
        type: "GET",
        url: "http://10.1.0.40:8080/nexteer/output-info/BEPS/month?date="+endtime,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            myAjaxData = JSON.stringify(data);
            for(var j=0,len=proIDMsg.length;j<len;j++){
//                    for(var myIndex = 0,myLen = myAjaxData.length;myIndex<myLen;myIndex++){
//                        if(myAjaxData[myIndex].)
//                        myData[j].push({"addDate":myAjaxData[myIndex].addDate,"count":myAjaxData[myIndex].count});
//                    }
                $.each(data,function (index,model) {
                    if(data[index].modelId==proIDMsg[j]){
                        for(var MDIndex=0;MDIndex<31;MDIndex++){
                            if (data[index].addDate==MonthDate[MDIndex]){
                                myData[j][MDIndex]=data[index].count;
                                sum[j]+=data[index].count;
                                perCent = 100*MDIndex/31
                            }

                        }
//                            myXDate[j].push(data[index].addDate);
//                            myData[j].push(data[index].count);
//                            myData[j].push(data[index].count);
                    }

                })
            }
//                for(var jD=0,jLen = myData[iD].length;jD<jLen;jD++){
//                }
//                for(var iD=0;iD<30;iD++){
//
//                }
            for(var sumIndex=0;sumIndex<proNameMsg.length;sumIndex++){
                myPieData[sumIndex]={value:sum[sumIndex],name:proNameMsg[sumIndex]};
            }




            myLengend.data=proNameMsg;
            var sData=[];
            for(var pI in proNameMsg){
                sData[pI]={name:proNameMsg[pI],type:'line',smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',data:myData[pI]};
            }
            console.log(sData);
//                var mySeriesData =  [{
//                    name: 'F102',
//                    type: 'bar',
//                    data: [20, 12, 31, 34, 31]
//                }, {
//                    name: 'R103',
//                    type: 'bar',
//                    data: [10, 20, 5, 9, 3]
//                }, {
//                    name: 'H50',
//                    type: 'bar',
//                    data: [1, 1, 2, 3, 1]
//                }];

            option = {
                title: myTitle,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            optionToContent: function (opt) {
                                var axisData = opt.xAxis[0].data;
                                var series = opt.series;
                                var table = '<table class="table" style="width:100%;text-align:center"><tbody><tr><td>时间/型号</td>';
                                for (var i = 0, l = series.length; i < l; i++){
                                    table += '<td>' + series[i].name+ '</td>'

                                }
                                table += '</tr>';
                                for (var j = 0, len = axisData.length; j < len; j++) {
                                    table += '<tr>'
                                        + '<td>' + axisData[j] + '</td>';
                                    for(var k=0,secLen = series.length;k<secLen;k++){
                                        if(series[k].data[j]==undefined){
                                            table +='<td>'+'</td>'
                                        }
                                        else {
                                            table += '<td>' + series[k].data[j] + '</td>'
                                        }

                                    }
                                    table +='</tr>';
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
                legend: myLengend,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: MonthDate
                }],
                yAxis: myYaxis,
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                        start: 1,
                        end: perCent
                    }],
                series: sData
            };
            pieOption= {
                title : {
                    text: '产量信息展示当月',
//            subtext: '纯属虚构',
                    x:'right'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: proNameMsg
                },
                series : [
                    {
                        name: 'BEPS',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:myPieData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myPieChart.setOption(pieOption);

            console.log(proNameMsg);
            console.log(proIDMsg);
            console.log(myData);
            console.log(myAjaxData);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
}
getIshaftOneMonthData();
$("#selectMonthSub").bind("click",function (){
    var data = $("#selectMonth").val().split("-");
    var endtime = data[0] + "-" + data[1] + "-" + new Date(data[0], data[1], 0).getDate();
    // var curr_time="2017-04-04";
    myTitle.text = '可动率' + data[0] + '-' + data[1] + '月视图';
    var proIDMsg=[];
    var proNameMsg=[];
    var myData=[];
    var myAjaxData=[];
    var sum=[];
    var myPieData=[];
    var perCent=50;
    for(var i=0;i<30;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        sum[i]=0;
        for(var myJ=0;myJ<31;myJ++){
            myData[i][myJ]=0;
        }
    }
    var myXDate=[];
    for(var jX=0;jX<30;jX++){    //一维长度为i,i为变量，可以根据实际情况改变
        myXDate[jX]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
    }
    var MonthDate=[];
    var d=new Date(data[0],data[1],0);
    for(var Mindex=1;Mindex<d.getDate()+1;Mindex++){
        MonthDate.push(data[0]+"-"+data[1]+"-"+judgeMyTime(Mindex))
    }
    console.log("当前月份天数"+MonthDate);



    $.get("http://10.1.0.40:8080/nexteer/product-model", function (data) {
        $.each(data, function (i, model) {
            if(model.cellName=="BEPS"){
//                    ProMsg.push({"modelId":model.modelId,"modelName":model.modelName})
                proIDMsg.push(model.modelId);
                proNameMsg.push(model.modelName);
            }
        });
    });
    $.ajax({
        type: "GET",
        url: "http://10.1.0.40:8080/nexteer/output-info/BEPS/month?date="+endtime,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            myAjaxData = JSON.stringify(data);
            for(var j=0,len=proIDMsg.length;j<len;j++){
//                    for(var myIndex = 0,myLen = myAjaxData.length;myIndex<myLen;myIndex++){
//                        if(myAjaxData[myIndex].)
//                        myData[j].push({"addDate":myAjaxData[myIndex].addDate,"count":myAjaxData[myIndex].count});
//                    }
                $.each(data,function (index,model) {
                    if(data[index].modelId==proIDMsg[j]){
                        for(var MDIndex=0;MDIndex<31;MDIndex++){
                            if (data[index].addDate==MonthDate[MDIndex]){
                                myData[j][MDIndex]=data[index].count;
                                sum[j]+=data[index].count;
                                perCent = 100*MDIndex/31
                            }

                        }
//                            myXDate[j].push(data[index].addDate);
//                            myData[j].push(data[index].count);
//                            myData[j].push(data[index].count);
                    }

                })
            }
//                for(var jD=0,jLen = myData[iD].length;jD<jLen;jD++){
//                }
//                for(var iD=0;iD<30;iD++){
//
//                }
            for(var sumIndex=0;sumIndex<proNameMsg.length;sumIndex++){
                myPieData[sumIndex]={value:sum[sumIndex],name:proNameMsg[sumIndex]};
            }




            myLengend.data=proNameMsg;
            var sData=[];
            for(var pI in proNameMsg){
                sData[pI]={name:proNameMsg[pI],type:'line',smooth: true,
                    showAllSymbol: true,
                    symbol: 'emptyCircle',data:myData[pI]};
            }
            console.log(sData);
//                var mySeriesData =  [{
//                    name: 'F102',
//                    type: 'bar',
//                    data: [20, 12, 31, 34, 31]
//                }, {
//                    name: 'R103',
//                    type: 'bar',
//                    data: [10, 20, 5, 9, 3]
//                }, {
//                    name: 'H50',
//                    type: 'bar',
//                    data: [1, 1, 2, 3, 1]
//                }];

            option = {
                title: myTitle,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            optionToContent: function (opt) {
                                var axisData = opt.xAxis[0].data;
                                var series = opt.series;
                                var table = '<table class="table" style="width:100%;text-align:center"><tbody><tr><td>时间/型号</td>';
                                for (var i = 0, l = series.length; i < l; i++){
                                    table += '<td>' + series[i].name+ '</td>'

                                }
                                table += '</tr>';
                                for (var j = 0, len = axisData.length; j < len; j++) {
                                    table += '<tr>'
                                        + '<td>' + axisData[j] + '</td>';
                                    for(var k=0,secLen = series.length;k<secLen;k++){
                                        if(series[k].data[j]==undefined){
                                            table +='<td>'+'</td>'
                                        }
                                        else {
                                            table += '<td>' + series[k].data[j] + '</td>'
                                        }

                                    }
                                    table +='</tr>';
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
                legend: myLengend,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: MonthDate
                }],
                yAxis: myYaxis,
                dataZoom: [
                    {
                        id: 'dataZoomX',
                        type: 'slider',
                        xAxisIndex: [0],
                        filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                        start: 1,
                        end: perCent
                    }],
                series: sData
            };
            pieOption= {
                title : {
                    text: '产量信息展示当月',
//            subtext: '纯属虚构',
                    x:'right'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: proNameMsg
                },
                series : [
                    {
                        name: 'BEPS',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:myPieData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            myPieChart.setOption(pieOption);

            console.log(proNameMsg);
            console.log(proIDMsg);
            console.log(myData);
            console.log(myAjaxData);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});


