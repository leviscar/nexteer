/**
 * Created by Administrator on 2017/4/9.
 */
function loginInput(user,pass) {
    this.username = user;
    this.password = pass;
}
$("#loginSub").bind("click",function () {
    var loginJson = new loginInput($("#userName").val(),$("#passWord").val());
    $.ajax({
        type: "POST",
        url: "http://10.1.0.40:8080/nexteer/users/user",
        data: JSON.stringify(loginJson),
        contentType: "application/json; charset=utf-8",
        sync : false,
        dataType: "json",
        success: function (data) {
            if(data.valid==true){
                window.location.assign("http://10.1.0.40:8080/nexteer/html/basicConfTest.html");
            }
            else {
                $("#loginStu").html("用户名或者密码错误")
            }
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});