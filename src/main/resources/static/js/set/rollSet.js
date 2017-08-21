/**
 * Created by Administrator on 2017/8/21.
 */
/**
 * Created by Administrator on 2017/8/19.
 */
$(document).ready(function () {
    /**
     * Created by Administrator on 2017/6/5.
     */

    function  curTimeInput(currTime) {
        this.curr_time=currTime;
    }
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
    function pollInput(cell,is,interval) {
        this.cellName=cell;
        this.isPolling=is;
        this.interval=interval;
    }
    function getPollStatus() {
        $.get("http://10.1.0.40:8080/nexteer/polling-page/",function (data) {
            console.log(data);

            for(var len=0;len<$(".rollTbody").find("tr").length;len++){
                $(".rollTbody").find("tr").eq(len).find("td").eq(1).replaceWith(" <td  class='switch switch-large' data-on='danger' data-off='primary' > <input id='myIndexSwitch'type='checkbox' name='my-checkbox' /></td>");
                $("[name='my-checkbox']").bootstrapSwitch();
            }
            function showStatus(i) {
                $(".rollTbody").find("tr").eq(i).find("td").eq(1).replaceWith(" <td class='switch switch-large' data-on='danger' data-off='primary' > <input  type='checkbox' name='my-checkbox' checked/></td>");
                $("[name='my-checkbox']").bootstrapSwitch();
            }
            $.each(data,function (i,model) {
                if(data[i].isPolling==true){
                    switch (data[i].cellName){
                        case "welcome":showStatus(0);break;
                        case "index":showStatus(1);break;
                        case "ISHAFT1":showStatus(2);break;
                        case "ISHAFT2":showStatus(3);break;
                        case "ISHAFT3":showStatus(4);break;
                        case "ISHAFT4":showStatus(5);break;
                        case "BEPS1":showStatus(6);break;
                        case "BEPS2":showStatus(7);break;
                        case "BEPS3":showStatus(8);break;
                        case "CEPS1":showStatus(9);break;
                        case "CEPS2":showStatus(10);break;
                        case "CEPS3":showStatus(11);break;
                        case "CEPS4":showStatus(12);break;
                        case "CEPS5":showStatus(13);break;

                    }
                }
            });


        })

    }
    getPollStatus();
    function addWelcomeInput(name,image) {
        this.name=name;
        this.image=image;
    }

    function checkNew(status) {
        console.log("checkNew-Status:"+status);
        if(status==true){
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://10.1.0.40:8080/nexteer/polling-page/",
                data: JSON.stringify(pollAdd),
                dataType: "json",
                success: function (data) {
                    console.log(data);

                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
        }else{
            $.ajax({
                type: "DELETE",
                url: "http://10.1.0.40:8080/nexteer/polling-page/WELCOME",
                success: function (data) {
                    console.log("删除成功");

                },
                failure: function (errMsg) {
                    console.log(errMsg);
                }
            });
        }
    }

    $(".addRoll").bind("click",function () {
        var name=$(this).parent().parent().find("td").eq(0).text();
        var rollName;
        switch (name){
            case "欢迎页面":rollName="welcome";break;
            case "主页面":rollName="index";break;
            case "第一条中间轴产线实时数据看板":rollName="ISHAFT1"; break;
            case "第二条中间轴产线实时数据看板":rollName="ISHAFT2"; break;
            case "第三条中间轴产线实时数据看板":rollName="ISHAFT3"; break;
            case "第四条中间轴产线实时数据看板":rollName="ISHAFT4"; break;
            case "有刷助力器组装线实时数据看板":rollName="BEPS1"; break;
            case "有刷传感器组装线实时数据看板":rollName="BEPS2"; break;
            case "有刷总组装线实时数据看板":rollName="BEPS3"; break;
            case "无刷助力轴组装线实时数据看板":rollName="CEPS1"; break;
            case "无刷助力器组装线实时数据看板":rollName="CEPS2"; break;
            case "无刷传感器组装线实时数据看板":rollName="CEPS3"; break;
            case "无刷护管组装线实时数据看板":rollName="CEPS4"; break;
            case "无刷总组装线实时数据看板":rollName="CEPS5"; break;
        }
        var pollAdd=new pollInput(rollName,true,10);
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://10.1.0.40:8080/nexteer/polling-page/",
            data: JSON.stringify(pollAdd),
            dataType: "json",
            success: function (data) {
                console.log(data);
                getPollStatus();

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    });
    $(".delRoll").bind("click",function () {
        var name=$(this).parent().parent().find("td").eq(0).text();
        var rollName;
        switch (name){
            case "欢迎页面":rollName="welcome";break;
            case "主页面":rollName="index";break;
            case "第一条中间轴产线实时数据看板":rollName="ISHAFT1"; break;
            case "第二条中间轴产线实时数据看板":rollName="ISHAFT2"; break;
            case "第三条中间轴产线实时数据看板":rollName="ISHAFT3"; break;
            case "第四条中间轴产线实时数据看板":rollName="ISHAFT4"; break;
            case "有刷助力器组装线实时数据看板":rollName="BEPS1"; break;
            case "有刷传感器组装线实时数据看板":rollName="BEPS2"; break;
            case "有刷总组装线实时数据看板":rollName="BEPS3"; break;
            case "无刷助力轴组装线实时数据看板":rollName="CEPS1"; break;
            case "无刷助力器组装线实时数据看板":rollName="CEPS2"; break;
            case "无刷传感器组装线实时数据看板":rollName="CEPS3"; break;
            case "无刷护管组装线实时数据看板":rollName="CEPS4"; break;
            case "无刷总组装线实时数据看板":rollName="CEPS5"; break;
        }
        var pollAdd=new pollInput(rollName,true,10);
        console.log("添加Poll");
        $.ajax({
            type: "DELETE",
            url: "http://10.1.0.40:8080/nexteer/polling-page/"+rollName,
            success: function (data) {
                console.log("删除成功");
                getPollStatus();

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    });

    function ProcessFile( e ) {
        var file = document.getElementById('file').files[0];
        if ( file ) {

            var reader = new FileReader();
            reader.onload = function ( event ) {
                var txt = event.target.result;
                // localStorage.txt=event.target.result;
                var img = document.createElement("img");
                img.src = localStorage.txt;
                $("#result").empty();
                // document.getElementById("result").appendChild( img );
                var welcome = new addWelcomeInput("welcome.png",txt);
                console.log(welcome);
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    url: "http://10.1.0.40:8080/nexteer/welcome",
                    data: JSON.stringify(welcome),
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        getImage();
                    },
                    failure: function (errMsg) {
                        console.log(errMsg);
                    }
                });
            };
        }
        reader.readAsDataURL( file );
    }
    function contentLoaded() {
        document.getElementById('file').addEventListener( 'change' ,
            ProcessFile , false );
    }
    window.addEventListener( "DOMContentLoaded" , contentLoaded , false );
    function getImage() {
        $.get("http://10.1.0.40:8080/nexteer/welcome?name=welcome.png",function (data) {
            var img=document.createElement("img");
            var txt=data.toString();
            var txtData=txt.split("base64/");
            var basic=txtData[1];
            var txt="data:image/png;base64,"+basic;
            img.src=txt;
            img.alt="请插入图片";
            document.getElementById("result").appendChild(img);
        });
        var total = document.documentElement.clientHeight;
        document.getElementById("result").style.height=total*7/10+"px";
    }
    getImage();
});