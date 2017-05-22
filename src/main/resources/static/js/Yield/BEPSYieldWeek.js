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
        step_s = -7; // 如果今天是周日
    }
    var step_m = 7 - this_day; // 周日距离今天的天数（负数表示）
    var thisTime = date.getTime();
    var Monday = transferDate(new Date(thisTime +  step_s * 24 * 3600* 1000));
    var Tuesday= transferDate(new Date(thisTime +  (step_s+1) * 24 * 3600* 1000));
    var Wednesday= transferDate(new Date(thisTime +  (step_s+2) * 24 * 3600* 1000));
    var Thursday= transferDate(new Date(thisTime +  (step_s+3) * 24 * 3600* 1000));
    var Friday= transferDate(new Date(thisTime +  (step_s+4) * 24 * 3600* 1000));
    var Saturday= transferDate(new Date(thisTime +  (step_s+5) * 24 * 3600* 1000));
    var Sunday = transferDate(new Date(thisTime +  step_m * 24 * 3600* 1000));
    return [Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday];
}
// function endTime(endTime) {
//     this.end_time = endTime;
// }
// var getIshaftOneWeekJson= new endTime(Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Uday));
var endtime= Uyear+"-"+judgeMyTime(Umonth)+"-"+judgeMyTime(Uday);
//    var getIshaftOneWeekJson =new endTime("2017-04-06");
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('IshaftOneWeekChart'));
//    var myDataOne= [];
//    var worker = new Worker('http://10.1.0.40:8080/nexteer/IshaftYieldWeekFirstWork.js');

function getIshaftOneWeekData() {
    var proIDMsg=[];
    var proNameMsg=[];
    var myData=[];
    var myAjaxData=[];
    for(var i=0;i<30;i++){    //一维长度为i,i为变量，可以根据实际情况改变
        myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var myJ=0;myJ<7;myJ++){
            myData[i][myJ]=null;
        }
    }
    var WeekDate=formOnload();
    console.log(WeekDate);
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
        url: "http://10.1.0.40:8080/nexteer/output-info/BEPS/week?date="+endtime,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            myAjaxData = JSON.stringify(data);
            console.log(typeof (data));
            for(var j=0,len=proIDMsg.length;j<len;j++){
//                    for(var myIndex = 0,myLen = myAjaxData.length;myIndex<myLen;myIndex++){
//                        if(myAjaxData[myIndex].)
//                        myData[j].push({"addDate":myAjaxData[myIndex].addDate,"count":myAjaxData[myIndex].count});
//                    }
                $.each(data,function (index,model) {
                    if(data[index].modelId==proIDMsg[j]){
//                            myData[j].push(data[index].count);
                        for(var MDIndex=0;MDIndex<7;MDIndex++){
                            if (data[index].addDate==WeekDate[MDIndex]){
                                myData[j][MDIndex]=data[index].count;
                            }
                        }
                    }

                })
            }
//                for(var jD=0,jLen = myData[iD].length;jD<jLen;jD++){
//                }
//                for(var iD=0;iD<30;iD++){
//
//                }

            var myTitle= {
                text: '有刷产量信息展示（周视图）',
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
                                var table = '<table class="table" style="width:100%;text-align:center"><tbody><tr><td>型号/时间</td>';
                                for (var i = 0, l = axisData.length; i < l; i++){
                                    table += '<td>' + axisData[i]+ '</td>'

                                }
                                table += '</tr>';
                                for (var j = 0, len = series.length; j < len; j++) {
                                    table += '<tr>'
                                        + '<td>' + series[j].name + '</td>';
                                    for(var k=0,secLen = 7;k<secLen;k++){
                                        if(series[j].data[k]==undefined){
                                            table +='<td>'+'</td>'
                                        }
                                        else {
                                            table += '<td>' + series[j].data[k] + '</td>'
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
                    data: ['周一', '周二','周三', '周四', '周五','周六','周天']
                }],
                yAxis: myYaxis,
                series: sData
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);


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
getIshaftOneWeekData();
