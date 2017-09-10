$(document).ready(function () {
    /**
     * Created by Administrator on 2017/6/5.
     */
    Array.prototype.indexOf = Array.prototype.indexOf || function(item) {
            for (var i = 0, j = this.length; i < j; i++) {
                if (this[i] === item) {
                    return i;
                }
            }
            return -1;
        };

    Array.prototype.forEach = Array.prototype.forEach || function(callback, thisArg) {
            if (!callback || typeof callback !== 'function') return;

            for (var i = 0, j = this.length; i < j; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    function removeDuplicatedItem(ar) {
        var ret = [];
        var flag=0;

        for (var i = 0, j = ar.length; i < j; i++) {
            if (flag!=ar[i]) {
                flag=ar[i];
                ret.push(flag);
            }
        }

        return ret;
    }

    function stdDelInput(cellName,standardBeats) {
        this.cellName=cellName;
        this.standardBeats=standardBeats;
    }
    function stdAddInput(cellName,sd,ui,un) {
        this.cellName=cellName;
        this.standardBeats=sd;
        this.unitId=ui;
        this.unitNum=un;
    }

    function getCEPSSTDData() {
        $.get("http://localhost:8080/nexteer/std-info/CEPS", function (data) {
            var stdBeats=[];

            $.each(data, function (i, model) {
                stdBeats.push(model.standardBeats);
            });

            stdBeats=removeDuplicatedItem(stdBeats);
            $("#BEPSStd").find("li").eq(0).find("div").empty();
            console.log(stdBeats);
            for(var index=0;index<stdBeats.length;index++){
                if(stdBeats[index]!=0&&stdBeats[index]!=null){
                    $("#BEPSStd").find("li").eq(0).find("div").append("<table  class='table  table-bordered black-color table-bordered'> <thead> <tr> <th>标准节拍</th> <th>单元</th> <th>人数</th> <th>删除按钮</th> </tr> </thead> <tbody> <tr> <td rowspan='8'></td> </tr> <tr> <td>housing</td> <td></td> <td rowspan='7'><button type='button' class='btn btn-primary deleteStd' >删除</button></td> </tr> <tr> <td>worm</td> <td></td></tr> <tr> <td>A/S</td> <td></td> </tr> <tr> <td>A/M</td> <td></td> </tr> <tr> <td>Sensor</td> <td></td> </tr> <tr> <td>Jacket</td> <td></td> </tr> <tr> <td>Final</td> <td></td> </tr> </tbody> </table>")

                }
            }
            $.each(data, function (i, model) {
                var unitId=model.unitId;
                for(var j=0;j<stdBeats.length;j++){
                    if(model.standardBeats==stdBeats[j]){
                        $("#BEPSStd").find("li").eq(0).find("table").eq(j).find("tbody").find("tr").eq(0).find("td").text(stdBeats[j]);
                        $("#BEPSStd").find("li").eq(0).find("table").eq(j).find("tbody").find("tr").eq(unitId).find("td").eq(1).text(model.unitNum);
                    }
                }
            });

        });

    }
    function getBEPSSTDData() {
        $.get("http://localhost:8080/nexteer/std-info/BEPS", function (data) {
            var stdBeats=[];

            $.each(data, function (i, model) {
                stdBeats.push(model.standardBeats);
            });

            stdBeats=removeDuplicatedItem(stdBeats);
            $("#BEPSStd").find("li").eq(1).find("div").empty();
            for(var index=0;index<stdBeats.length;index++){
                $("#BEPSStd").find("li").eq(1).find("div").append("<table  class='table  table-bordered black-color table-bordered'> <thead> <tr> <th>标准节拍</th> <th>单元</th> <th>人数</th> <th>删除按钮</th> </tr> </thead> <tbody> <tr> <td rowspan='8'></td> </tr> <tr> <td>housing</td> <td></td> <td rowspan='7'><button type='button' class='btn btn-primary deleteStd' >删除</button></td> </tr> <tr> <td>worm</td> <td></td></tr> <tr> <td>A/S</td> <td></td> </tr> <tr> <td>A/M</td> <td></td> </tr> <tr> <td>Sensor</td> <td></td> </tr> <tr> <td>Jacket</td> <td></td> </tr> <tr> <td>Final</td> <td></td> </tr> </tbody> </table>")
            }
            $.each(data, function (i, model) {
                var unitId=model.unitId;
                for(var j=0;j<stdBeats.length;j++){
                    if(model.standardBeats==stdBeats[j]){
                        $("#BEPSStd").find("li").eq(1).find("table").eq(j).find("tbody").find("tr").eq(0).find("td").text(stdBeats[j]);
                        $("#BEPSStd").find("li").eq(1).find("table").eq(j).find("tbody").find("tr").eq(unitId).find("td").eq(1).text(model.unitNum);
                    }
                }
            });

        });

    }
    function getIshaftData() {
        $("#BEPSStd").find("li").eq(2).find("table").find("tbody").empty();
        $.get("http://localhost:8080/nexteer/std-info/ISHAFT1", function (data) {
            var stdBeats=[];

            $.each(data, function (i, model) {
                stdBeats.push(model.standardBeats);
            });

            stdBeats=removeDuplicatedItem(stdBeats);
            $.each(data, function (i, model) {
                for(var j=0;j<stdBeats.length;j++){
                    if(model.standardBeats==stdBeats[j]){
                        $("#BEPSStd").find("li").eq(2).find("table").find("tbody").append("<tr> <td class='ISHAFT1'>第一条中间轴</td><td>"+model.standardBeats+"</td> <td>"+model.unitNum+"</td><td><button type='button' class='btn btn-primary deleteIShaftStd' >删除</button></td> </tr>");
                    }
                }
            });

        });
        $.get("http://localhost:8080/nexteer/std-info/ISHAFT2", function (data) {
            var stdBeats=[];

            $.each(data, function (i, model) {
                stdBeats.push(model.standardBeats);
            });

            stdBeats=removeDuplicatedItem(stdBeats);

            $.each(data, function (i, model) {
                var unitId=model.unitId;
                for(var j=0;j<stdBeats.length;j++){
                    if(model.standardBeats==stdBeats[j]){
                        $("#BEPSStd").find("li").eq(2).find("table").find("tbody").append("<tr> <td class='ISHAFT2'>第二条中间轴</td><td>"+model.standardBeats+"</td> <td>"+model.unitNum+"</td><td><button type='button' class='btn btn-primary' >删除</button></td> </tr>");
                    }
                }
            });

        });
        $.get("http://localhost:8080/nexteer/std-info/ISHAFT3", function (data) {
            var stdBeats=[];

            $.each(data, function (i, model) {
                stdBeats.push(model.standardBeats);
            });

            stdBeats=removeDuplicatedItem(stdBeats);

            $.each(data, function (i, model) {
                var unitId=model.unitId;
                for(var j=0;j<stdBeats.length;j++){
                    if(model.standardBeats==stdBeats[j]){
                        $("#BEPSStd").find("li").eq(2).find("table").find("tbody").append("<tr> <td class='ISHAFT3'>第三条中间轴</td><td>"+model.standardBeats+"</td> <td>"+model.unitNum+"</td><td><button type='button' class='btn btn-primary' >删除</button></td> </tr>");
                    }
                }
            });

        });
        $.get("http://localhost:8080/nexteer/std-info/ISHAFT4", function (data) {
            var stdBeats=[];

            $.each(data, function (i, model) {
                stdBeats.push(model.standardBeats);
            });

            stdBeats=removeDuplicatedItem(stdBeats);

            $.each(data, function (i, model) {
                var unitId=model.unitId;
                for(var j=0;j<stdBeats.length;j++){
                    if(model.standardBeats==stdBeats[j]){
                        $("#BEPSStd").find("li").eq(2).find("table").find("tbody").append("<tr> <td class='ISHAFT4'>第四条中间轴</td><td>"+model.standardBeats+"</td> <td>"+model.unitNum+"</td><td><button type='button' class='btn btn-primary' >删除</button></td> </tr>");
                    }
                }
            });

        });
    }
    getBEPSSTDData();
    getCEPSSTDData();
    getIshaftData();

//delete按钮
    $(document).ready(function(){
        $('#CEPSStdSet').on('click','.deleteStd',function(){
            console.log("delStd start");
            var modelId = Number($(this).parent().parent().parent().find("tr").eq(0).find("td").text());
            var urlString = "http://localhost:8080/nexteer/std-info/CEPS?standard-beat="+modelId;
            console.log(urlString);
            $.ajax({
                url: urlString,
                type: 'DELETE',
                success: function(result) {
                    console.log("删除成功");
                    getCEPSSTDData();
                }
            });
        });
        $('#BEPSStdSet').on('click','.deleteStd',function(){
            console.log("delStd start");
            var modelId = Number($(this).parent().parent().parent().find("tr").eq(0).find("td").text());
            var urlString = "http://localhost:8080/nexteer/std-info/BEPS?standard-beat="+modelId;
            console.log(urlString);
            $.ajax({
                url: urlString,
                type: 'DELETE',
                success: function(result) {
                    console.log("删除成功");
                    getBEPSSTDData();
                }
            });
        });
        $('#IShaftStdSet').on('click','.deleteIShaftStd',function(){
            console.log("delStd start");
            var cell=$(this).parent().parent().find("td").eq(0).attr("class");
            var sd=Number($(this).parent().parent().find("td").eq(1).text());
            var urlString = "http://localhost:8080/nexteer/std-info/"+cell+"?standard-beat="+sd;
            console.log(urlString);
            $.ajax({
                url: urlString,
                type: 'DELETE',
                success: function(result) {
                    console.log("删除成功");
                    getIshaftData();
                }
            });

        });
    });

//添加按钮
    $("#addCEPSSTDSub").bind("click",function () {
        var one=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),1,Number($(this).parent().parent().parent().find("tr").eq(1).find("td").eq(1).text()));
        var two=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),2,Number($(this).parent().parent().parent().find("tr").eq(2).find("td").eq(1).text()));
        var three=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),3,Number($(this).parent().parent().parent().find("tr").eq(3).find("td").eq(1).text()));
        var four=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),4,Number($(this).parent().parent().parent().find("tr").eq(4).find("td").eq(1).text()));
        var five=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),5,Number($(this).parent().parent().parent().find("tr").eq(5).find("td").eq(1).text()));
        var six=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),6,Number($(this).parent().parent().parent().find("tr").eq(6).find("td").eq(1).text()));
        var seven=new stdAddInput("CEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),7,Number($(this).parent().parent().parent().find("tr").eq(7).find("td").eq(1).text()));
        var all=JSON.stringify([one,two,three,four,five,six,seven]);
        console.log(all);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/nexteer/std-info",
            data: all,
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                getCEPSSTDData();
                $("#addStdStatus").html("STD信息更新完成");


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $("#addStdStatus").html("STD信息更新失败");
            }

        });
    });
    $("#addBEPSSTDSub").bind("click",function () {
        var one=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),1,Number($(this).parent().parent().parent().find("tr").eq(1).find("td").eq(1).text()));
        var two=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),2,Number($(this).parent().parent().parent().find("tr").eq(2).find("td").eq(1).text()));
        var three=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),3,Number($(this).parent().parent().parent().find("tr").eq(3).find("td").eq(1).text()));
        var four=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),4,Number($(this).parent().parent().parent().find("tr").eq(4).find("td").eq(1).text()));
        var five=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),5,Number($(this).parent().parent().parent().find("tr").eq(5).find("td").eq(1).text()));
        var six=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),6,Number($(this).parent().parent().parent().find("tr").eq(6).find("td").eq(1).text()));
        var seven=new stdAddInput("BEPS",$(this).parent().parent().parent().find("tr").eq(0).find("td").text(),7,Number($(this).parent().parent().parent().find("tr").eq(7).find("td").eq(1).text()));
        var all=JSON.stringify([one,two,three,four,five,six,seven]);
        console.log(all);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/nexteer/std-info",
            data: all,
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                getBEPSSTDData();
                $("#addBEPSStdStatus").html("STD信息更新完成");


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $("#addBEPSStdStatus").html("STD信息更新失败");
            }

        });
    });
    $("#addIshaftSTDSub").bind("click",function () {
        var one=new stdAddInput($(this).parent().parent().parent().find("tr").eq(0).find("select").val(),Number($(this).parent().parent().parent().find("tr").eq(0).find("td").eq(1).find("input").val()),1,Number($(this).parent().parent().parent().find("tr").eq(0).find("td").eq(2).find("input").val()));
        var all=JSON.stringify([one]);
        console.log(all);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/nexteer/std-info",
            data: all,
            dataType: "json",
            success: function (data) {

                console.log(JSON.stringify(data));
                console.log('nice');
                getIshaftData();
                $("#addIShaftStdStatus").html("STD信息更新完成");


            },
            failure: function (errMsg) {
                console.log(errMsg);
                console.log('fail');
                $("#addIShaftStdStatus").html("STD信息更新失败");
            }

        });
    });
});