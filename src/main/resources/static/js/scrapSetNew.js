/**
 * Created by Administrator on 2017/4/30.
 */
function scrapInput(addDate,cellName,value,targetValue) {
    this.addDate=addDate;
    this.cellName = cellName;
    this.value =value;
    this.targetValue= targetValue;
    
}

//delete按钮
$(document).ready(function(){
    $('#scrapTable').on('click','.addScrap',function(){
        var cellName = $(this).parent().parent().find("td").eq(1).text();
    })
});