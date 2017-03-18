/**
 * Created by Administrator on 2017/3/18.
 */
function OneShiftInput(morStart, morEnd, mtValue,Beats) {
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.morning_shift_target_value = mtValue;
    this.morning_shift_standard_beats= Beats;
}
function TwoShiftInput(morStart, morEnd,nigStart,nigEnd ,mtValue,ntValue,Beats) {
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.morning_shift_target_value = mtValue;
    this.night_shift_target_value=ntValue;
    this.morning_shift_standard_beats= Beats;
}

function ThreeShiftInput(morStart, morEnd,midStart,midEnd,nigStart,nigEnd ,mtValue,ntValue,Beats) {
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.middle_shift_start=midStart;
    this.middle_shift_end=midEnd;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.morning_shift_target_value = mtValue;
    this.night_shift_target_value=ntValue;
    this.morning_shift_standard_beats= Beats;
}
function  eventInput(type,event,eventStart,eventEnd) {
    this.shift_type=type;
    this.event=event;
    this.event_start_time=eventStart;
    this.event_end_time=eventEnd;
}

