$(document).ready(function () {
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
    function getScrapData() {
        console.log("报废金额");
        var url1="http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT1/latest";
        var url2="http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT2/latest";
        var url3="http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT3/latest";
        var url4="http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT4/latest";
        var url5="http://10.1.0.40:8080/nexteer/scrap-amount/CEPS5/latest";
        var url6="http://10.1.0.40:8080/nexteer/scrap-amount/BEPS3/latest";
        $.get(url1,function (data) {
                var line;
                switch (data.cellName){
                    case "ISHAFT1": line="第一条中间轴";
                        break;
                    case "ISHAFT2": line="第二条中间轴";
                        break;
                    case "ISHAFT3": line="第三条中间轴";
                        break;
                    case "ISHAFT4": line="第四条中间轴";
                        break;
                    case "BEPS3": line="有刷产线";
                        break;
                    case "CEPS5": line="无刷产线";
                        break;
                }
                $("#scrapIshaftTable").find("tbody").find("tr").eq(0).replaceWith("<tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
                    +"</td></tr>");

        });
        $.get(url2,function (data) {
            var line;
            switch (data.cellName){
                case "ISHAFT1": line="第一条中间轴";
                    break;
                case "ISHAFT2": line="第二条中间轴";
                    break;
                case "ISHAFT3": line="第三条中间轴";
                    break;
                case "ISHAFT4": line="第四条中间轴";
                    break;
                case "BEPS3": line="有刷产线";
                    break;
                case "CEPS5": line="无刷产线";
                    break;
            }
            // $("#scrapIshaftTable").prepend("<tbody><tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
            //     +"</td></tr></tbody>");
            $("#scrapIshaftTable").find("tbody").find("tr").eq(1).replaceWith("<tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
                +"</td></tr>");

        });
        $.get(url3,function (data) {
            var line;
            switch (data.cellName){
                case "ISHAFT1": line="第一条中间轴";
                    break;
                case "ISHAFT2": line="第二条中间轴";
                    break;
                case "ISHAFT3": line="第三条中间轴";
                    break;
                case "ISHAFT4": line="第四条中间轴";
                    break;
                case "BEPS3": line="有刷产线";
                    break;
                case "CEPS5": line="无刷产线";
                    break;
            }
            $("#scrapIshaftTable").find("tbody").find("tr").eq(2).replaceWith("<tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
                +"</td></tr>");

        });
        $.get(url4,function (data) {
            var line;
            switch (data.cellName){
                case "ISHAFT1": line="第一条中间轴";
                    break;
                case "ISHAFT2": line="第二条中间轴";
                    break;
                case "ISHAFT3": line="第三条中间轴";
                    break;
                case "ISHAFT4": line="第四条中间轴";
                    break;
                case "BEPS3": line="有刷产线";
                    break;
                case "CEPS5": line="无刷产线";
                    break;
            }
            $("#scrapIshaftTable").find("tbody").find("tr").eq(3).replaceWith("<tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
                +"</td></tr>");

        });
        $.get(url5,function (data) {
            var line;
            switch (data.cellName){
                case "ISHAFT1": line="第一条中间轴";
                    break;
                case "ISHAFT2": line="第二条中间轴";
                    break;
                case "ISHAFT3": line="第三条中间轴";
                    break;
                case "ISHAFT4": line="第四条中间轴";
                    break;
                case "BEPS3": line="有刷产线";
                    break;
                case "CEPS5": line="无刷产线";
                    break;
            }
            $("#scrapIshaftTable").find("tbody").find("tr").eq(4).replaceWith("<tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
                +"</td></tr>");

        });
        $.get(url6,function (data) {
            var line;
            switch (data.cellName){
                case "ISHAFT1": line="第一条中间轴";
                    break;
                case "ISHAFT2": line="第二条中间轴";
                    break;
                case "ISHAFT3": line="第三条中间轴";
                    break;
                case "ISHAFT4": line="第四条中间轴";
                    break;
                case "BEPS3": line="有刷产线";
                    break;
                case "CEPS5": line="无刷产线";
                    break;
            }
            $("#scrapIshaftTable").find("tbody").find("tr").eq(5).replaceWith("<tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.value+"</td><td>"+data.targetValue
                +"</td></tr>");

        });
    }
    getScrapData();

    $.get("http://10.1.0.40:8080/nexteer/scrap-amount/ISHAFT1/latest", function (data) {
        $("#scrapTable").find("tbody").find("td").eq(3).find("input").val(data.targetValue);
    });
//添加按钮
    $(document).ready(function(){
        $('#scrapTable').on('click','.addScrap',function(){
            var cellName = $(this).parent().parent().find("td").eq(0).find("select").val();
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
                url: "http://10.1.0.40:8080/nexteer/scrap-amount",
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
            var cellName = $(this).parent().parent().find("td").eq(0).find("select").val();
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
                url: "http://10.1.0.40:8080/nexteer/scrap-amount",
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



});
function newScrap(self) {
    var cell=$(self).parent().find("select").val();
    console.log(cell) ;
    console.log("td开始工作");
    $.get("http://10.1.0.40:8080/nexteer/scrap-amount/"+cell+"/latest", function (data) {
        $(self).parent().parent().find("td").eq(3).find("input").val(data.targetValue);
    });

}