/**
 * Created by Administrator on 2017/5/15.
 */

var url = [];


url.push ( 'http://10.1.0.40:8080/nexteer/index.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/BEPS1Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/BEPS2Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/BEPS3Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/CEPS1Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/CEPS2Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/CEPS3Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/CEPS4Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/CEPS5Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/Ishaft1Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/Ishaft2Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/Ishaft3Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/Ishaft4Unit.html');


var count = 0;

function changeSrc () {
    if (count >= url.length) count = 0;
    $("#iframe1").replaceWith("<iframe id=\"iframe1\" src="+url[count]+"></iframe>");
    count ++;
}
$("#exitRoll").bind("click",function () {
    window.location.assign("http://10.1.0.40:8080/nexteer/index.html");

});
setInterval( "changeSrc() ",8*1000);
