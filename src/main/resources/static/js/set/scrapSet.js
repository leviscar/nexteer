/**
 * Created by Administrator on 2017/3/29.
 */
function addIs1Scrap(year, month, day,is1Value,is1Tar) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.ishaft1_value = is1Value;
    this.ishaft1_target_value = is1Tar;

}
function addIs2Scrap(year, month, day, is2Value,is2Tar) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.ishaft2_value = is2Value;
    this.ishaft2_target_value = is2Tar;

}
function addIs3Scrap(year, month, day,is3Value,is3Tar) {
    this.year = year;
    this.month = month;
    this.day = day;

    this.ishaft3_value= is3Value;
    this.ishaft3_target_value = is3Tar;

}
function addIs4Scrap(year, month, day,is4Value,is4Tar) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.ishaft4_value = is4Value;
    this.ishaft1_target_value = is4Tar;

}
function addCEPSScrap(year, month, day,cepsValue,cepsTar) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.ceps_value = cepsValue;
    this.ceps_target_value = cepsTar;
}
function addBEPSScrap(year, month, day,bepsValue,bepsTar) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.beps_value = bepsValue;
    this.beps_target_value = bepsTar;
}
//添加Is1报废金额
$("#addIs1Scrap").bind("click",function () {


    var addScrapTime=$("#Is1ScrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addIs1ScrapJson=new addIs1Scrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#Is1ScrapAddValue").val()),Number($("#Is1ScrapTarValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(addIs1ScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#addIs1ScrapStu").html("添加成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addIs1ScrapStu").html("添加失败");
        }

    });
    setInterval(function () {
        $("#addIs1ScrapStu").html("");
    },1000*3)
});
//添加Is2报废金额
$("#addIs2Scrap").bind("click",function () {


    var addScrapTime=$("#Is2ScrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addIs2ScrapJson=new addIs2Scrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#Is2ScrapAddValue").val()),Number($("#Is2ScrapTarValue").val()));


    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(addIs2ScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#addIs2ScrapStu").html("添加成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addIs2ScrapStu").html("添加失败");
        }

    });
    setInterval(function () {
        $("#addIs2ScrapStu").html("");
    },1000*3)
});
//添加Is3报废金额
$("#addIs3Scrap").bind("click",function () {


    var addScrapTime=$("#Is3ScrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addIs3ScrapJson=new addIs3Scrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#Is3ScrapAddValue").val()),Number($("#Is3ScrapTarValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(addIs3ScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#addIs3ScrapStu").html("添加成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addIs3ScrapStu").html("添加失败");
        }

    });
    setInterval(function () {
        $("#addIs3ScrapStu").html("");
    },1000*3)
});
//添加Is4报废金额
$("#addIs4Scrap").bind("click",function () {


    var addScrapTime=$("#Is4ScrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addIs4ScrapJson=new addIs4Scrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#Is4ScrapAddValue").val()),Number($("#Is4ScrapTarValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(addIs4ScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#addIs4ScrapStu").html("添加成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addIs4ScrapStu").html("添加失败");
        }

    });
    setInterval(function () {
        $("#addIs4ScrapStu").html("");
    },1000*3)
});
//添加BEPS报废金额
$("#addBEPSScrap").bind("click",function () {


    var addScrapTime=$("#BEPSScrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addBEPSScrapJson=new addBEPSScrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#BEPSScrapAddValue").val()),Number($("#BEPSScrapTarValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(addBEPSScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#addBEPSScrapStu").html("添加成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addBEPSScrapStu").html("添加失败");
        }

    });
    setInterval(function () {
        $("#addBEPSScrapStu").html("");
    },1000*3)
});
//添加CEPS报废金额
$("#addCEPSScrap").bind("click",function () {


    var addScrapTime=$("#CEPSScrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addCEPSScrapJson=new addCEPSScrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#CEPSScrapAddValue").val()),Number($("#CEPSScrapTarValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(addCEPSScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#addCEPSScrapStu").html("添加成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addCEPSScrapStu").html("添加失败");
        }

    });
    setInterval(function () {
        $("#addCEPSScrapStu").html("");
    },1000*3)
});



//添加报废金额
// $("#addScrap").bind("click",function () {
//
//
//     var addScrapTime=$("#scrapAddTime").val().split("-");
//     console.log(addScrapTime);
//
//     var year=addScrapTime[0];
//     var month=addScrapTime[1];
//     var startday=addScrapTime[2];
//     var addScrapJson=new addScrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#scrapIshaft1AddValue").val()),Number($("#scrapIshaft2AddValue").val()),Number($("#scrapIshaft3AddValue").val()),Number($("#scrapIshaft4AddValue").val()),Number($("#scrapCEPSAddValue").val()),Number($("#scrapBEPSAddValue").val()));
//     console.log(year);
//
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/nexteer/scrap-amount/add",
//         data: JSON.stringify(addScrapJson),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//
//             console.log(JSON.stringify(data));
//             console.log('nice');
//             if(data.system_status==true){
//                 $("#addScrapStu").html("添加报废金额成功");
//             }
//
//
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//             console.log('fail');
//             $("#addScrapStu").html("添加报废金额失败");
//         }
//
//     });
//     setInterval(function () {
//         $("#addScrapStu").html("");
//     },1000*3)
// });

//更新Is1报废金额
$("#resetIs1Scrap").bind("click",function () {


    var resScrapTime=$("#Is1ScrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addIs1Scrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#Is1ScrapResValue").val()),Number($("#Is1ScrapResTarValue").val()));
    console.log(year);

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#resIs1ScrapStu").html("更新成功");
            }
            if(data.system_status==false){
                $("#resIs1ScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#resIs1ScrapStu").html("更新失败");
        }

    });
    setInterval(function () {
        $("#resIs1ScrapStu").html("");
    },1000*3)
});
//更新Is2报废金额
$("#resetIs2Scrap").bind("click",function () {


    var resScrapTime=$("#Is2ScrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addIs2Scrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#Is2ScrapResValue").val()),Number($("#Is2ScrapResTarValue").val()));
    console.log(year);

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#resIs2ScrapStu").html("更新成功");
            }
            if(data.system_status==false){
                $("#resIs2ScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#resIs2ScrapStu").html("更新失败");
        }

    });
    setInterval(function () {
        $("#resIs2ScrapStu").html("");
    },1000*3)
});
//更新Is3报废金额
$("#resetIs3Scrap").bind("click",function () {


    var resScrapTime=$("#Is3ScrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addIs3Scrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#Is3ScrapResValue").val()),Number($("#Is3ScrapResTarValue").val()));
    console.log(year);

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#resIs3ScrapStu").html("更新成功");
            }
            if(data.system_status==false){
                $("#resIs3ScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#resIs3ScrapStu").html("更新失败");
        }

    });
    setInterval(function () {
        $("#resIs3ScrapStu").html("");
    },1000*3)
});
//更新Is4报废金额
$("#resetIs4Scrap").bind("click",function () {


    var resScrapTime=$("#Is4ScrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addIs4Scrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#Is4ScrapResValue").val()),Number($("#Is4ScrapResTarValue").val()));
    console.log(year);

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#resIs4ScrapStu").html("更新成功");
            }
            if(data.system_status==false){
                $("#resIs4ScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#resIs4ScrapStu").html("更新失败");
        }

    });
    setInterval(function () {
        $("#resIs4ScrapStu").html("");
    },1000*3)
});
//更新BEPS报废金额
$("#resetBEPSScrap").bind("click",function () {


    var resScrapTime=$("#BEPSScrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addBEPSScrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#BEPSScrapResValue").val()),Number($("#BEPSScrapResTarValue").val()));
    console.log(year);

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#resBEPSScrapStu").html("更新成功");
            }
            if(data.system_status==false){
                $("#resBEPSScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#resBEPSScrapStu").html("更新失败");
        }

    });
    setInterval(function () {
        $("#resBEPSScrapStu").html("");
    },1000*3)
});
//更新CEPS报废金额
$("#resetCEPSScrap").bind("click",function () {


    var resScrapTime=$("#CEPSScrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addCEPSScrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#CEPSScrapResValue").val()),Number($("#CEPSScrapResTarValue").val()));
    console.log(year);

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/scrap-amount",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.system_status==true){
                $("#resCEPSScrapStu").html("更新成功");
            }
            if(data.system_status==false){
                $("#resCEPSScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#resCEPSScrapStu").html("更新失败");
        }

    });
    setInterval(function () {
        $("#resCEPSScrapStu").html("");
    },1000*3)
});
// //更新报废金额
// $("#resetScrap").bind("click",function () {
//
//
//     var resScrapTime=$("#scrapResTime").val().split("-");
//     console.log(resScrapTime);
//
//     var year=resScrapTime[0];
//     var month=resScrapTime[1];
//     var startday=resScrapTime[2];
//     var resScrapJson=new addScrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#scrapIshaft1ResValue").val()),Number($("#scrapIshaft2ResValue").val()),Number($("#scrapIshaft3ResValue").val()),Number($("#scrapIshaft4ResValue").val()),Number($("#scrapCEPSResValue").val()),Number($("#scrapBEPSResValue").val()));
//     console.log(year);
//
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/nexteer/scrap-amount/add",
//         data: JSON.stringify(resScrapJson),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//
//             console.log(JSON.stringify(data));
//             console.log('nice');
//             if(data.system_status==true){
//                 $("#resScrapStu").html("更新报废金额成功");
//             }
//             if(data.system_status==false){
//                 $("#resScrapStu").html(data.log);
//             }
//
//
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//             console.log('fail');
//             $("#addScrapStu").html("添加报废金额失败");
//         }
//
//     });
//     setInterval(function () {
//         $("#addScrapStu").html("");
//     },1000*3)
// });