CREATE TABLE safety_date (
  year       NCHAR(4) NOT NULL,
  month      NCHAR(2) NOT NULL,
  day        NCHAR(2) NOT NULL,
  safe_dates INT,
  is_safe    INT,
  log        NVARCHAR(255) DEFAULT 'Today is running safe!',
  PRIMARY KEY (year, month, day)
);
CREATE TABLE scrap_amount (
  year          NCHAR(4) NOT NULL,
  month         NCHAR(2) NOT NULL,
  day           NCHAR(2) NOT NULL,
  ishaft1_value INT,
  ishaft2_value INT,
  ishaft3_value INT,
  ishaft4_value INT,
  ceps_value    INT,
  beps_value    INT,
  PRIMARY KEY (year, month, day)
);
CREATE TABLE work_shift (
  id                           INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  morning_shift_start          VARCHAR(5), --早班开始
  morning_shift_end            VARCHAR(5), --早班结束
  middle_shift_start           VARCHAR(5), --中班开始
  middle_shift_end             VARCHAR(5), --中班结束
  night_shift_start            VARCHAR(5), --晚班开始
  night_shift_end              VARCHAR(5), --晚班结束
  morning_shift_target_value   INT, -- 早班目标数量
  middle_shift_target_value    INT, -- 中班目标数量
  night_shift_target_value     INT, -- 晚班目标数量
  morning_shift_standard_beats INT, -- 早班标准节拍
  middle_shift_standard_beats  INT, -- 中班标准节拍
  night_shift_standard_beats   INT, -- 晚班标准节拍
  setting_time                 DATETIME --设置班次的时间
);
CREATE TABLE rest_event (
  id               INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  shift_type       NVARCHAR(2),
  event            NVARCHAR(255),
  event_start_time VARCHAR(5),
  event_end_time   VARCHAR(5)
);
CREATE TABLE rest_event_with_work_shift (
  id            INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  rest_event_id INT,
  work_shift_id INT
);