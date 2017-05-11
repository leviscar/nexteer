/**
 * Created by Administrator on 2017/4/23.
 */
$(".form_datetime_year").datetimepicker({
    language:  'zh-CN',
    format: 'yyyy',
    autoclose: true,
    todayBtn: true,
    startView: 'decade',
    minView:'decade',
    maxView:'decade'
});
$(".form_datetime_month").datetimepicker({
    language:  'zh-CN',
    format: 'yyyy-mm',
    autoclose: true,
    todayBtn: true,
    startView: 'year',
    minView:'year',
    maxView:'decade'
});
$(".form_datetime_time").datetimepicker({
    language:  'zh-CN',
    format: 'hh:ii',
    autoclose: true,
    todayBtn: true,
    startView: 'day',
    minView:'hour',
    maxView:'day'
});
