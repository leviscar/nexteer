/**
 * Created by Administrator on 2017/4/30.
 */
function scrapInput(addDate,cellName,value,targetValue) {
    this.addDate=addDate;
    this.cellName = cellName;
    this.value =value;
    this.targetValue= targetValue;
    
}
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

//输出显示
function getScrapData() {
    var WeekDate=formOnload();
    console.log(WeekDate);
    $.get("http://localhost:8080/nexteer/scrap-amount/week?date="+WeekDate[6], function (data) {
        console.log(data);
        var myData=[];
        var myCEPSData=[];
        var myBEPSData=[];
        console.log("开始传输数据");
        for(var i=0;i<7;i++){    //一维长度为i,i为变量，可以根据实际情况改变
            myData[i]=[];  //声明二维，每一个一维数组里面的一个元素都是一个数组；
            myCEPSData[i]=[];
            myBEPSData[i]=[];
            for(var myJ=0;myJ<10;myJ++){
                myData[i][myJ]=null;
                myCEPSData[i][myJ]=0;
                myBEPSData[i][myJ]=0;
            }
        }

        $("#scrapIshaftTable").find("tbody").remove();
        $("#scrapCEPS").find("tbody").remove();
        $("#scrapBEPS").find("tbody").remove();
        $.each($.parseJSON(data), function (i, model) {
            switch (model.addDate){
                case WeekDate[0]:
                    console.log("ncie");
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[0][0]=model.value;
                            myData[0][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[0][2]=model.value;
                            myData[0][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[0][4]=model.value;
                            myData[0][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[0][6]=model.value;
                            myData[0][7]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[1]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[1][0]=model.value;
                            myData[1][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[1][2]=model.value;
                            myData[1][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[1][4]=model.value;
                            myData[1][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[1][6]=model.value;
                            myData[1][7]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[2]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[2][0]=model.value;
                            myData[2][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[2][2]=model.value;
                            myData[2][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[2][4]=model.value;
                            myData[2][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[2][6]=model.value;
                            myData[2][7]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[3]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[3][0]=model.value;
                            myData[3][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[3][2]=model.value;
                            myData[3][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[3][4]=model.value;
                            myData[3][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[3][6]=model.value;
                            myData[3][7]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[4]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[4][0]=model.value;
                            myData[4][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[4][2]=model.value;
                            myData[4][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[4][4]=model.value;
                            myData[4][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[4][6]=model.value;
                            myData[4][7]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[5]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[5][0]=model.value;
                            myData[5][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[5][2]=model.value;
                            myData[5][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[5][4]=model.value;
                            myData[5][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[5][6]=model.value;
                            myData[5][7]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[6]:
                    switch (model.cellName){
                        case "ISHAFT1":
                            myData[6][0]=model.value;
                            myData[6][1]=model.targetValue;
                            break;
                        case "ISHAFT2":
                            myData[6][2]=model.value;
                            myData[6][3]=model.targetValue;
                            break;
                        case "ISHAFT3":
                            myData[6][4]=model.value;
                            myData[6][5]=model.targetValue;
                            break;
                        case "ISHAFT4":
                            myData[6][6]=model.value;
                            myData[6][7]=model.targetValue;
                            break;
                    }
                    break;


            }
            // $("#productIs2Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
        $.each($.parseJSON(data), function (i, model) {
            switch (model.addDate){
                case WeekDate[0]:
                    console.log("ncie");
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[0][0]=model.value;
                            myCEPSData[0][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[0][2]=model.value;
                            myCEPSData[0][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[0][4]=model.value;
                            myCEPSData[0][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[0][6]=model.value;
                            myCEPSData[0][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[0][8]=model.value;
                            myCEPSData[0][9]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[1]:
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[1][0]=model.value;
                            myCEPSData[1][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[1][2]=model.value;
                            myCEPSData[1][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[1][4]=model.value;
                            myCEPSData[1][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[1][6]=model.value;
                            myCEPSData[1][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[1][8]=model.value;
                            myCEPSData[1][9]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[2]:
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[2][0]=model.value;
                            myCEPSData[2][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[2][2]=model.value;
                            myCEPSData[2][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[2][4]=model.value;
                            myCEPSData[2][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[2][6]=model.value;
                            myCEPSData[2][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[2][8]=model.value;
                            myCEPSData[2][9]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[3]:
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[3][0]=model.value;
                            myCEPSData[3][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[3][2]=model.value;
                            myCEPSData[3][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[3][4]=model.value;
                            myCEPSData[3][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[3][6]=model.value;
                            myCEPSData[3][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[3][8]=model.value;
                            myCEPSData[3][9]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[4]:
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[4][0]=model.value;
                            myCEPSData[4][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[4][2]=model.value;
                            myCEPSData[4][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[4][4]=model.value;
                            myCEPSData[4][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[4][6]=model.value;
                            myCEPSData[4][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[4][8]=model.value;
                            myCEPSData[4][9]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[5]:
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[5][0]=model.value;
                            myCEPSData[5][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[5][2]=model.value;
                            myCEPSData[5][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[5][4]=model.value;
                            myCEPSData[5][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[5][6]=model.value;
                            myCEPSData[5][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[5][8]=model.value;
                            myCEPSData[5][9]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[6]:
                    switch (model.cellName){
                        case "CEPS1":
                            myCEPSData[6][0]=model.value;
                            myCEPSData[6][1]=model.targetValue;
                            break;
                        case "CEPS2":
                            myCEPSData[6][2]=model.value;
                            myCEPSData[6][3]=model.targetValue;
                            break;
                        case "CEPS3":
                            myCEPSData[6][4]=model.value;
                            myCEPSData[6][5]=model.targetValue;
                            break;
                        case "CEPS4":
                            myCEPSData[6][6]=model.value;
                            myCEPSData[6][7]=model.targetValue;
                            break;
                        case "CEPS5":
                            myCEPSData[6][8]=model.value;
                            myCEPSData[6][9]=model.targetValue;
                            break;
                    }
                    break;


            }
            // $("#productIs2Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
        $.each($.parseJSON(data), function (i, model) {
            switch (model.addDate){
                case WeekDate[0]:
                    console.log("ncie");
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[0][0]=model.value;
                            myBEPSData[0][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[0][2]=model.value;
                            myBEPSData[0][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[0][4]=model.value;
                            myBEPSData[0][5]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[1]:
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[1][0]=model.value;
                            myBEPSData[1][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[1][2]=model.value;
                            myBEPSData[1][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[1][4]=model.value;
                            myBEPSData[1][5]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[2]:
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[2][0]=model.value;
                            myBEPSData[2][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[2][2]=model.value;
                            myBEPSData[2][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[2][4]=model.value;
                            myBEPSData[2][5]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[3]:
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[3][0]=model.value;
                            myBEPSData[3][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[3][2]=model.value;
                            myBEPSData[3][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[3][4]=model.value;
                            myBEPSData[3][5]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[4]:
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[4][0]=model.value;
                            myBEPSData[4][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[4][2]=model.value;
                            myBEPSData[4][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[4][4]=model.value;
                            myBEPSData[4][5]=model.targetValue;
                            break;
                    }
                    break;
                case WeekDate[5]:
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[5][0]=model.value;
                            myBEPSData[5][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[5][2]=model.value;
                            myBEPSData[5][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[5][4]=model.value;
                            myBEPSData[5][5]=model.targetValue;
                            break;

                    }
                    break;
                case WeekDate[6]:
                    switch (model.cellName){
                        case "BEPS1":
                            myBEPSData[6][0]=model.value;
                            myBEPSData[6][1]=model.targetValue;
                            break;
                        case "BEPS2":
                            myBEPSData[6][2]=model.value;
                            myBEPSData[6][3]=model.targetValue;
                            break;
                        case "BEPS3":
                            myBEPSData[6][4]=model.value;
                            myBEPSData[6][5]=model.targetValue;
                            break;
                    }
                    break;


            }
            // $("#productIs2Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
        for(var iIndex=0;iIndex<7;iIndex++){
            $("#scrapIshaftTable").append("<tbody><tr><td>"+WeekDate[iIndex]+"</td><td>"+myData[iIndex][0]+"</td><td>"+myData[iIndex][1]+"</td><td>"+myData[iIndex][2]+"</td><td>"+myData[iIndex][3]
                +"</td><td>"+myData[iIndex][4] +"</td><td>"+myData[iIndex][5]+"</td><td>"+myData[iIndex][6]+"</td><td>"+myData[iIndex][7]+"</td></tr></tbody>");
            $("#scrapCEPS").append("<tbody><tr><td>"+WeekDate[iIndex]+"</td><td>"+myCEPSData[iIndex][0]+"</td><td>"+myCEPSData[iIndex][1]+"</td><td>"+myCEPSData[iIndex][2]+"</td><td>"+myCEPSData[iIndex][3]
                +"</td><td>"+myCEPSData[iIndex][4] +"</td><td>"+myCEPSData[iIndex][5]+"</td><td>"+myCEPSData[iIndex][6]+"</td><td>"+myCEPSData[iIndex][7]+"</td><td>"+myCEPSData[iIndex][8]+"</td><td>"+myCEPSData[iIndex][9]+"</td></tr></tbody>");

            $("#scrapBEPS").append("<tbody><tr><td>"+WeekDate[iIndex]+"</td><td>"+myBEPSData[iIndex][0]+"</td><td>"+myBEPSData[iIndex][1]+"</td><td>"+myBEPSData[iIndex][2]+"</td><td>"+myBEPSData[iIndex][3]
                +"</td><td>"+myBEPSData[iIndex][4] +"</td><td>"+myBEPSData[iIndex][5]+"</td></tr></tbody>");
        }
    });

}
getScrapData();
//添加按钮
$(document).ready(function(){
    $('#scrapTable').on('click','.addScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        console.log(cellName);
        var addDate = $(this).parent().parent().find("td").eq(1).find("input").val();
        console.log(addDate);
        var value = $(this).parent().parent().find("td").eq(2).find("input").val();
        console.log(value);
        var tarValue = $(this).parent().parent().find("td").eq(3).find("input").val();
        console.log(tarValue);

        var addInputJson = new scrapInput(addDate,cellName,Number(value),Number(tarValue));
        console.log(addInputJson);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/nexteer/scrap-amount",
            data: JSON.stringify(addInputJson),
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                    $(this).parent().parent().find("td").eq(4).html("添加成功");
                getScrapData();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(4).html("");
        },1000*3)

    });
    $('#scrapCEPSTable').on('click','.addScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        console.log(cellName);
        var addDate = $(this).parent().parent().find("td").eq(1).find("input").val();
        console.log(addDate);
        var value = $(this).parent().parent().find("td").eq(2).find("input").val();
        console.log(value);
        var tarValue = $(this).parent().parent().find("td").eq(3).find("input").val();
        console.log(tarValue);

        var addInputJson = new scrapInput(addDate,cellName,Number(value),Number(tarValue));
        console.log(addInputJson);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/nexteer/scrap-amount",
            data: JSON.stringify(addInputJson),
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                $(this).parent().parent().find("td").eq(4).html("添加成功");
                getScrapData();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(4).html("");
        },1000*3)

    });
    $('#scrapBEPSTable').on('click','.addScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        console.log(cellName);
        var addDate = $(this).parent().parent().find("td").eq(1).find("input").val();
        console.log(addDate);
        var value = $(this).parent().parent().find("td").eq(2).find("input").val();
        console.log(value);
        var tarValue = $(this).parent().parent().find("td").eq(3).find("input").val();
        console.log(tarValue);

        var addInputJson = new scrapInput(addDate,cellName,Number(value),Number(tarValue));
        console.log(addInputJson);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/nexteer/scrap-amount",
            data: JSON.stringify(addInputJson),
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                $(this).parent().parent().find("td").eq(4).html("添加成功");
                getScrapData();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("添加失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(4).html("");
        },1000*3)

    });
});
//更新按钮
$(document).ready(function(){
    $('#scrapTable').on('click','.resetScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        console.log(cellName);
        var addDate = $(this).parent().parent().find("td").eq(1).find("input").val();
        console.log(addDate);
        var value = $(this).parent().parent().find("td").eq(2).find("input").val();
        console.log(value);
        var tarValue = $(this).parent().parent().find("td").eq(3).find("input").val();
        console.log(tarValue);

        var addInputJson = new scrapInput(addDate,cellName,Number(value),Number(tarValue));
        console.log(addInputJson);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PATCH",
            url: "http://localhost:8080/nexteer/scrap-amount",
            data: JSON.stringify(addInputJson),
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                if(data.cellName != null){
                    $(this).parent().parent().find("td").eq(4).html("更新成功");
                }
                getScrapData();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("更新失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(4).html("");
        },1000*3)

    });
    $('#scrapCEPSTable').on('click','.resetScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        console.log(cellName);
        var addDate = $(this).parent().parent().find("td").eq(1).find("input").val();
        console.log(addDate);
        var value = $(this).parent().parent().find("td").eq(2).find("input").val();
        console.log(value);
        var tarValue = $(this).parent().parent().find("td").eq(3).find("input").val();
        console.log(tarValue);

        var addInputJson = new scrapInput(addDate,cellName,Number(value),Number(tarValue));
        console.log(addInputJson);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PATCH",
            url: "http://localhost:8080/nexteer/scrap-amount",
            data: JSON.stringify(addInputJson),
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                if(data.cellName != null){
                    $(this).parent().parent().find("td").eq(4).html("更新成功");
                }
                getScrapData();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("更新失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(4).html("");
        },1000*3)

    });
    $('#scrapBEPSTable').on('click','.resetScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(0).text();
        console.log(cellName);
        var addDate = $(this).parent().parent().find("td").eq(1).find("input").val();
        console.log(addDate);
        var value = $(this).parent().parent().find("td").eq(2).find("input").val();
        console.log(value);
        var tarValue = $(this).parent().parent().find("td").eq(3).find("input").val();
        console.log(tarValue);

        var addInputJson = new scrapInput(addDate,cellName,Number(value),Number(tarValue));
        console.log(addInputJson);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PATCH",
            url: "http://localhost:8080/nexteer/scrap-amount",
            data: JSON.stringify(addInputJson),
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                if(data.cellName != null){
                    $(this).parent().parent().find("td").eq(4).html("更新成功");
                }
                getScrapData();


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $(this).parent().parent().find("td").eq(4).html("更新失败");
            }

        });
        setInterval(function () {
            $(this).parent().parent().find("td").eq(4).html("");
        },1000*3)

    });
});

