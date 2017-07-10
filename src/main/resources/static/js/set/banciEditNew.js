/**
 * Created by Administrator on 2017/5/20.
 */
//在页面加载时候，就使td节点具有click点击能力
$(document).ready(function(){
    var tdNods = $(".banci tr td:nth-child(7),.banci tr td:nth-child(8)");
    tdNods.click(tdClick);

    var addStdNods=$(".std .modal-body tbody tr td:nth-child(2),.std .modal-body tbody tr:nth-child(1) td ");
    addStdNods.click(tdClick);

    var stdNode=$(".banci tr td:nth-child(5)");
    stdNode.click(newClick);
    // var stdSelect=$(".banci tbody tr select");
    // stdSelect.change(newSelect);


});
//td的点击事件
function tdClick(){
    //将td的文本内容保存
    var td = $(this);
    var tdText = td.text();
    //将td的内容清空
    td.empty();
    //新建一个输入框
    var input = $("<input>");
    //将保存的文本内容赋值给输入框
    input.attr("value",tdText);
    //将输入框添加到td中
    td.append(input);
    //给输入框注册事件，当失去焦点时就可以将文本保存起来
    input.blur(function(){
        //将输入框的文本保存
        var input = $(this);
        var inputText = input.val();
        //将td的内容，即输入框去掉,然后给td赋值
        var td = input.parent("td");
        td.html(inputText);
        //让td重新拥有点击事件
        td.click(tdClick);
    });
    input.keyup(function(event){
        //1.获取当前用户按下的键值
        //解决不同浏览器获得事件对象的差异,
        // IE用自动提供window.event，而其他浏览器必须显示的提供，即在方法参数中加上event
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        //2.判断是否是ESC键按下
        if(keyCode == 27){
            //将input输入框的值还原成修改之前的值
            input.val(tdText);
        }
    });
    //将输入框中的文本高亮选中
    //将jquery对象转化为DOM对象
    var inputDom = input.get(0);
    inputDom.select();
    //将td的点击事件移除
    td.unbind("click");
}

function newClick() {
    var td = $(this);
    var tdText = td.text();
    var cell=$(this).parent().find("td").eq(0).attr("class");
    console.log(cell);
    if(cell=="BEPS3"){
        cell="BEPS"
    }
    if(cell=="CEPS5"){
        cell="CEPS"
    }
    var input = $("<td><select class='form-control changeSelect' onchange='newSelect(this)'></td>");


    $.get("http://10.1.0.40:8080/nexteer/std-info/standard-beat/"+cell, function (data) {
        $(this).empty();
        //新建一个输入框
        console.log("start");
        $.each(data,function (i,model) {
            if(data[i]!=0&&data[i]!=null){
                if(data[i]==Number(tdText)){
                    input.find("select").append("<option selected>"+data[i]+"</option>");
                }else{
                    input.find("select").append("<option>"+data[i]+"</option>");
                }


            }

        });

    });
    //将输入框添加到td中
    $(this).replaceWith(input);
    var out=$(this);
    var tdNew=out.parent("td");
    // tdNew.bind("click",newClick);
    console.log(tdNew);
    tdNew.unbind("click");
    // var tdLast=$(".banci tr td:nth-child(5)");
    // tdLast.click(newClick);



}

function newSelect(self) {
    // var cell=$(this).parent().text();
    var cell=$(self).parent().parent().find('td').eq(0).attr("class");
    var num=$(self).val();
    if(cell=="BEPS3"){
        cell="BEPS"
    }
    if(cell=="CEPS5"){
        cell="CEPS"
    }
    console.log("td开始工作");
    $.get("http://10.1.0.40:8080/nexteer/std-info/worker-num/"+cell+"?standard-beat="+num, function (data) {
        $(self).parent().parent().find("td").eq(5).html(data);
    });

}
