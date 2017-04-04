/**
 * Created by Administrator on 2017/4/3.
 */
self.onmessage = function(event) {
    var proNameMsg = event.data.proNameMsg;
    var myAjaxData = event.data.myAjaxData;
    var myData = event.data.myData;

    self.postMessage({method: method, reply: reply});
};
for(var j=0,len=proNameMsg.length;j<len;j++){
    for(var myIndex = 0,myLen = myAjaxData.length;myIndex<myLen;myIndex++){
        myData[j].push({"add_date":myAjaxData[i].add_date,"output_count":myAjaxData[i].output_count});
        console.log({"add_date":myAjaxData[i].add_date,"output_count":myAjaxData[i].output_count});
        console.log("开始执行");
    }
    console.log("开始执行");
}