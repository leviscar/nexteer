/**
 * Created by Administrator on 2017/3/8.
 */
function safety_date(year, month, day, is_safe, safety_date, log) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.is_safe = is_safe;
    this.safety_date = safety_date;
    this.log = log;
}
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Udate=new Date();
Uyear=Udate.getFullYear();
Umonth=Udate.getMonth()+1;
Uday=Udate.getDate();
showSeconds= 3;