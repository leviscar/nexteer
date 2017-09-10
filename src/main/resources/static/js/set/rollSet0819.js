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
            $(".rollTbody").find("tr").eq(0).find("td").eq(1).replaceWith(" <td  class='switch switch-large' data-on='danger' data-off='primary' > <input id='mySwitch'type='checkbox' name='my-checkbox' /></td>");
            $("[name='my-checkbox']").bootstrapSwitch();
            $(".rollTbody").find("tr").eq(1).find("td").eq(1).replaceWith(" <td  class='switch switch-large' data-on='danger' data-off='primary' > <input id='myIndexSwitch'type='checkbox' name='my-checkbox' /></td>");
            $("[name='my-checkbox']").bootstrapSwitch();
            $.each(data,function (i,model) {

                if(data[i].cellName=="welcome"&&data[i].isPolling==true){
                    console.log(data[i].cellName+":"+data[i].isPolling);
                    $(".rollTbody").find("tr").eq(0).find("td").eq(1).replaceWith(" <td class='switch switch-large' data-on='danger' data-off='primary' > <input id='mySwitch' type='checkbox' name='my-checkbox' checked/></td>");
                    $("[name='my-checkbox']").bootstrapSwitch();
                }
                if(data[i].cellName=="index"&&data[i].isPolling==true){
                    console.log(data[i].cellName+":"+data[i].isPolling);
                    $(".rollTbody").find("tr").eq(1).find("td").eq(1).replaceWith(" <td class='switch switch-large' data-on='danger' data-off='primary' > <input id='myIndexSwitch' type='checkbox' name='my-checkbox' checked/></td>");
                    $("[name='my-checkbox']").bootstrapSwitch();
                }
            });


        })

    }
    getPollStatus();
    function addWelcomeInput(name,image) {
        this.name=name;
        this.image=image;
    }

    function checkButton() {
        console.log($(".rollTbody").find("tr").eq(0).find("input").is(':checked'));
        var pollAdd=new pollInput("welcome",true,10);

        // var curTime="2017-03-23 19:00:00";
        var curTime= year+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
        var urlString = "http://10.1.0.40:8080/nexteer/unit-status/"+cell+"?curr_time="+curTime;
        console.log(urlString);
        $.get(urlString,function (data) {
            if (data.curr_shift_info.id != null) {
                if (data.curr_shift_info.open == true) {
                    $(".rollTbody").find("tr").eq(index).find("td").eq(1).replaceWith("<td class='switch switch-large' data-on='danger' data-off='primrya' > <input type='checkbox' name='my-checkbox'  /></td>");

                    if ($(".rollTbody").find("tr").eq(0).find("input").is(':checked') == true) {
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
                    } else {
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
            }
        });
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
    $('#mySwitch').bind("click",function(){
        console.log("switch");
    }) ;

    $("#addPollSub").bind("click",function () {
        var pollAdd=new pollInput("welcome",true,10);
        console.log("添加Poll");
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
    $("#delPollSub").bind("click",function () {
        var pollAdd=new pollInput("welcome",true,10);
        console.log("添加Poll");
        $.ajax({
            type: "DELETE",
            url: "http://10.1.0.40:8080/nexteer/polling-page/WELCOME",
            success: function (data) {
                console.log("删除成功");
                getPollStatus();

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    });

    $("#addMainSub").bind("click",function () {
        var pollAdd=new pollInput("index",true,10);
        console.log("添加Poll");
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
    $("#delMainSub").bind("click",function () {
        var pollAdd=new pollInput("index",true,10);
        console.log("添加Poll");
        $.ajax({
            type: "DELETE",
            url: "http://10.1.0.40:8080/nexteer/polling-page/index",
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