USE nexteer;
DELETE rest_event;
DELETE work_shift;
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
  add_date     DATE,
  cell_name    VARCHAR(10),
  value        INT,
  target_value INT,
  PRIMARY KEY (add_date, cell_name)
);
CREATE TABLE work_shift (
  id                  INT IDENTITY (1, 1) NOT NULL,
  add_date            DATE,
  shift_type          VARCHAR(10),
  cell_name           VARCHAR(10),
  start_time          VARCHAR(5),
  end_time            VARCHAR(5),
  target              INT,
  standard_beat       INT,
  normal_worker_num   INT,
  overtime_worker_num INT,
  is_open             BIT,
  PRIMARY KEY (id)
);
CREATE TABLE rest_event (
  id            INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  work_shift_id INT,
  shift_type    VARCHAR(10),
  cell_name     VARCHAR(10),
  event         NVARCHAR(255),
  start_time    VARCHAR(5),
  end_time      VARCHAR(5),
  CONSTRAINT fk_WorkShift FOREIGN KEY (work_shift_id)
  REFERENCES work_shift (id)
);
CREATE TABLE output_count_info (
  id         INT IDENTITY (1, 1) NOT NULL,
  cell_name  VARCHAR(10),
  add_date   DATE,
  model_id   VARCHAR(100), -- 型号
  model_name NVARCHAR(100), -- 型号名称
  count      INT, -- 当天产量
  PRIMARY KEY (id, add_date, cell_name, model_id)
);
CREATE TABLE product_model (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  model_id   VARCHAR(100), -- 型号id
  model_name NVARCHAR(100), -- 型号名
  cell_name  NVARCHAR(100) -- 所属单元名
);
CREATE TABLE oee (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  oee        INT,
  target_oee INT,
  cell_name  VARCHAR(10),
  add_date   DATE,
  PRIMARY KEY (id, add_date, cell_name)
);
CREATE TABLE hce (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  hce        INT,
  target_hce INT,
  cell_name  VARCHAR(10),
  add_date   DATE,
  PRIMARY KEY (id, add_date, cell_name)
);
CREATE TABLE task_info (
  id          INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  cron        VARCHAR(20),
  cell_name   VARCHAR(10),
  task_name   VARCHAR(200),
  task_status VARCHAR(20)
);
CREATE TABLE shift_unit_status (
  id          INT IDENTITY (1, 1) NOT NULL,
  cell_name   VARCHAR(10),
  shift_type  VARCHAR(10),
  unit_status VARCHAR(4000),
  add_date    DATE,
  PRIMARY KEY (id, add_date, cell_name, shift_type)
);
CREATE TABLE quality_complain (
  add_date    DATE PRIMARY KEY NOT NULL,
  no_complain INT,
  count       INT,
  log         NVARCHAR(255)
);
CREATE TABLE std_info (
  cell_name     VARCHAR(10),
  standard_beat INT,
  unit_id       INT,
  unit_num      INT,
  PRIMARY KEY (cell_name, standard_beat, unit_id)
);
CREATE TABLE polling_page (
  cell_name  VARCHAR(10),
  is_polling BIT,
  interval   INT,
  PRIMARY KEY (cell_name)
);