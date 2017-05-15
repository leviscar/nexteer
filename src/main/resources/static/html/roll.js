/**
 * Created by Administrator on 2017/5/15.
 */

var url = [];

url.push ( 'http://10.1.0.40:8080/nexteer/html/Yield/Ishaft1YieldWeek.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/hceSec/ishaft1HceSec.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/oeeSec/ishaft1OEESec.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/Unit/Ishaft1Unit.html');
url.push ( 'http://10.1.0.40:8080/nexteer/html/scrapSec/scrapWeek.html');
url.push ( 'http://10.1.0.40:8080/nexteer/index.html');

var count = 0;

function changeSrc () {
    if (count >= url.length) count = 0;
    $("#iframe1").replaceWith("<iframe id=\"iframe1\" src="+url[count]+"></iframe>");
    count ++;
}

setInterval( "changeSrc() ",20*1000);
