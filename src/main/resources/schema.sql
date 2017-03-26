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
  morning_shift_standard_beats INT, -- 早班标准节拍
  middle_shift_standard_beats  INT, -- 中班标准节拍
  night_shift_standard_beats   INT, -- 晚班标准节拍
  setting_time                 DATETIME, --设置班次的时间
  morning_worker_num           INT, -- 早班工作人次
  middle_worker_num            INT, -- 中班工作人次
  night_worker_num             INT, -- 晚班工作人次
  morning_overtime_worker_num  INT, -- 早班加班工作人次
  middle_overtime_worker_num   INT, -- 中班加班工作人次
  night_overtime_worker_num    INT -- 晚班加班工作人次
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
CREATE TABLE ishaft1_output_info (
  id           INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  add_date     DATE,
  model        VARCHAR(100), -- 型号
  model_name NVARCHAR(100), -- 型号名称
  output_count INT -- 当天产量
);
CREATE TABLE product_model (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  model_id   VARCHAR(100), -- 型号id
  model_name NVARCHAR(100), -- 型号名
  cell_name  NVARCHAR(100), -- 所属单元名
  std        REAL -- 标准std 用于计算hce
)