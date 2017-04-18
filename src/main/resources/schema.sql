CREATE TABLE safety_date (
  year       NCHAR(4) NOT NULL,
  month      NCHAR(2) NOT NULL,
  day        NCHAR(2) NOT NULL,
  safe_dates INT,
  is_safe    INT,
  log        NVARCHAR(255) DEFAULT 'Today is running safe!',
  PRIMARY KEY (year, month, day)
);
DROP TABLE scrap_amount
CREATE TABLE scrap_amount (
  year                 NCHAR(4) NOT NULL,
  month                NCHAR(2) NOT NULL,
  day                  NCHAR(2) NOT NULL,
  ishaft1_value        INT,
  ishaft2_value        INT,
  ishaft3_value        INT,
  ishaft4_value        INT,
  ceps_value           INT,
  beps_value           INT,
  ishaft1_target_value INT,
  ishaft2_target_value INT,
  ishaft3_target_value INT,
  ishaft4_target_value INT,
  ceps_target_value    INT,
  beps_target_value    INT,
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
  setting_time                 DATE, --设置班次的时间
  morning_worker_num           INT, -- 早班工作人次
  middle_worker_num            INT, -- 中班工作人次
  night_worker_num             INT, -- 晚班工作人次
  morning_overtime_worker_num  INT, -- 早班加班工作人次
  middle_overtime_worker_num   INT, -- 中班加班工作人次
  night_overtime_worker_num    INT, -- 晚班加班工作人次
  morning_shift_target         INT, -- 早班目标
  middle_shift_target          INT, -- 中班目标
  night_shift_target           INT, -- 晚班目标
  cell_name                    VARCHAR(10)
);
CREATE TABLE rest_event (
  id               INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  shift_type       VARCHAR(10),
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
  model_name   NVARCHAR(100), -- 型号名称
  output_count INT -- 当天产量
);
CREATE TABLE product_model (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  model_id   VARCHAR(100), -- 型号id
  model_name NVARCHAR(100), -- 型号名
  cell_name  NVARCHAR(100), -- 所属单元名
  std        REAL -- 标准std 用于计算hce
);
CREATE TABLE oee (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  oee        INT,
  target_oee INT,
  cell_name  VARCHAR(10),
  add_date   DATE
);
CREATE TABLE hce (
  id         INT IDENTITY (1, 1) PRIMARY KEY NOT NULL,
  hce        INT,
  target_hce INT,
  cell_name  VARCHAR(10),
  add_date   DATE
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
  add_date    DATE PRIMARY KEY not NULL ,
  no_complain INT,
  count       INT,
  log         NVARCHAR(255)
);

-- Quartz tables
USE [nexteer]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE
            id = OBJECT_ID(N'[dbo].[FK_QRTZ_TRIGGERS_QRTZ_JOB_DETAILS]') AND OBJECTPROPERTY(id, N'ISFOREIGNKEY') = 1)
  ALTER TABLE [dbo].[QRTZ_TRIGGERS]
    DROP CONSTRAINT FK_QRTZ_TRIGGERS_QRTZ_JOB_DETAILS
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE
            id = OBJECT_ID(N'[dbo].[FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISFOREIGNKEY') = 1)
  ALTER TABLE [dbo].[QRTZ_CRON_TRIGGERS]
    DROP CONSTRAINT FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[FK_QRTZ_SIMPLE_TRIGGERS_QRTZ_TRIGGERS]') AND
                OBJECTPROPERTY(id, N'ISFOREIGNKEY') = 1)
  ALTER TABLE [dbo].[QRTZ_SIMPLE_TRIGGERS]
    DROP CONSTRAINT FK_QRTZ_SIMPLE_TRIGGERS_QRTZ_TRIGGERS
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[FK_QRTZ_SIMPROP_TRIGGERS_QRTZ_TRIGGERS]') AND
                OBJECTPROPERTY(id, N'ISFOREIGNKEY') = 1)
  ALTER TABLE [dbo].[QRTZ_SIMPROP_TRIGGERS]
    DROP CONSTRAINT FK_QRTZ_SIMPROP_TRIGGERS_QRTZ_TRIGGERS
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_CALENDARS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_CALENDARS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_CRON_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_CRON_TRIGGERS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_BLOB_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_BLOB_TRIGGERS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_FIRED_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_FIRED_TRIGGERS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_PAUSED_TRIGGER_GRPS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_PAUSED_TRIGGER_GRPS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_SCHEDULER_STATE]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_SCHEDULER_STATE]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_LOCKS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_LOCKS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_JOB_DETAILS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_JOB_DETAILS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_SIMPLE_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_SIMPLE_TRIGGERS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_SIMPROP_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_SIMPROP_TRIGGERS]
GO

IF EXISTS(SELECT *
          FROM dbo.sysobjects
          WHERE id = OBJECT_ID(N'[dbo].[QRTZ_TRIGGERS]') AND OBJECTPROPERTY(id, N'ISUSERTABLE') = 1)
  DROP TABLE [dbo].[QRTZ_TRIGGERS]
GO

CREATE TABLE [dbo].[QRTZ_CALENDARS] (
  [SCHED_NAME]    [VARCHAR](120) NOT NULL,
  [CALENDAR_NAME] [VARCHAR](200) NOT NULL,
  [CALENDAR]      [IMAGE]        NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_CRON_TRIGGERS] (
  [SCHED_NAME]      [VARCHAR](120) NOT NULL,
  [TRIGGER_NAME]    [VARCHAR](200) NOT NULL,
  [TRIGGER_GROUP]   [VARCHAR](200) NOT NULL,
  [CRON_EXPRESSION] [VARCHAR](120) NOT NULL,
  [TIME_ZONE_ID]    [VARCHAR](80)
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_FIRED_TRIGGERS] (
  [SCHED_NAME]        [VARCHAR](120) NOT NULL,
  [ENTRY_ID]          [VARCHAR](95)  NOT NULL,
  [TRIGGER_NAME]      [VARCHAR](200) NOT NULL,
  [TRIGGER_GROUP]     [VARCHAR](200) NOT NULL,
  [INSTANCE_NAME]     [VARCHAR](200) NOT NULL,
  [FIRED_TIME]        [BIGINT]       NOT NULL,
  [SCHED_TIME]        [BIGINT]       NOT NULL,
  [PRIORITY]          [INTEGER]      NOT NULL,
  [STATE]             [VARCHAR](16)  NOT NULL,
  [JOB_NAME]          [VARCHAR](200) NULL,
  [JOB_GROUP]         [VARCHAR](200) NULL,
  [IS_NONCONCURRENT]  [VARCHAR](1)   NULL,
  [REQUESTS_RECOVERY] [VARCHAR](1)   NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_PAUSED_TRIGGER_GRPS] (
  [SCHED_NAME]    [VARCHAR](120) NOT NULL,
  [TRIGGER_GROUP] [VARCHAR](200) NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_SCHEDULER_STATE] (
  [SCHED_NAME]        [VARCHAR](120) NOT NULL,
  [INSTANCE_NAME]     [VARCHAR](200) NOT NULL,
  [LAST_CHECKIN_TIME] [BIGINT]       NOT NULL,
  [CHECKIN_INTERVAL]  [BIGINT]       NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_LOCKS] (
  [SCHED_NAME] [VARCHAR](120) NOT NULL,
  [LOCK_NAME]  [VARCHAR](40)  NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_JOB_DETAILS] (
  [SCHED_NAME]        [VARCHAR](120) NOT NULL,
  [JOB_NAME]          [VARCHAR](200) NOT NULL,
  [JOB_GROUP]         [VARCHAR](200) NOT NULL,
  [DESCRIPTION]       [VARCHAR](250) NULL,
  [JOB_CLASS_NAME]    [VARCHAR](250) NOT NULL,
  [IS_DURABLE]        [VARCHAR](1)   NOT NULL,
  [IS_NONCONCURRENT]  [VARCHAR](1)   NOT NULL,
  [IS_UPDATE_DATA]    [VARCHAR](1)   NOT NULL,
  [REQUESTS_RECOVERY] [VARCHAR](1)   NOT NULL,
  [JOB_DATA]          [IMAGE]        NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_SIMPLE_TRIGGERS] (
  [SCHED_NAME]      [VARCHAR](120) NOT NULL,
  [TRIGGER_NAME]    [VARCHAR](200) NOT NULL,
  [TRIGGER_GROUP]   [VARCHAR](200) NOT NULL,
  [REPEAT_COUNT]    [BIGINT]       NOT NULL,
  [REPEAT_INTERVAL] [BIGINT]       NOT NULL,
  [TIMES_TRIGGERED] [BIGINT]       NOT NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_SIMPROP_TRIGGERS] (
  [SCHED_NAME]    [VARCHAR](120)   NOT NULL,
  [TRIGGER_NAME]  [VARCHAR](200)   NOT NULL,
  [TRIGGER_GROUP] [VARCHAR](200)   NOT NULL,
  [STR_PROP_1]    [VARCHAR](512)   NULL,
  [STR_PROP_2]    [VARCHAR](512)   NULL,
  [STR_PROP_3]    [VARCHAR](512)   NULL,
  [INT_PROP_1]    [INT]            NULL,
  [INT_PROP_2]    [INT]            NULL,
  [LONG_PROP_1]   [BIGINT]         NULL,
  [LONG_PROP_2]   [BIGINT]         NULL,
  [DEC_PROP_1]    [NUMERIC](13, 4) NULL,
  [DEC_PROP_2]    [NUMERIC](13, 4) NULL,
  [BOOL_PROP_1]   [VARCHAR](1)     NULL,
  [BOOL_PROP_2]   [VARCHAR](1)     NULL,
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_BLOB_TRIGGERS] (
  [SCHED_NAME]    [VARCHAR](120) NOT NULL,
  [TRIGGER_NAME]  [VARCHAR](200) NOT NULL,
  [TRIGGER_GROUP] [VARCHAR](200) NOT NULL,
  [BLOB_DATA]     [IMAGE]        NULL
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[QRTZ_TRIGGERS] (
  [SCHED_NAME]     [VARCHAR](120) NOT NULL,
  [TRIGGER_NAME]   [VARCHAR](200) NOT NULL,
  [TRIGGER_GROUP]  [VARCHAR](200) NOT NULL,
  [JOB_NAME]       [VARCHAR](200) NOT NULL,
  [JOB_GROUP]      [VARCHAR](200) NOT NULL,
  [DESCRIPTION]    [VARCHAR](250) NULL,
  [NEXT_FIRE_TIME] [BIGINT]       NULL,
  [PREV_FIRE_TIME] [BIGINT]       NULL,
  [PRIORITY]       [INTEGER]      NULL,
  [TRIGGER_STATE]  [VARCHAR](16)  NOT NULL,
  [TRIGGER_TYPE]   [VARCHAR](8)   NOT NULL,
  [START_TIME]     [BIGINT]       NOT NULL,
  [END_TIME]       [BIGINT]       NULL,
  [CALENDAR_NAME]  [VARCHAR](200) NULL,
  [MISFIRE_INSTR]  [SMALLINT]     NULL,
  [JOB_DATA]       [IMAGE]        NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_CALENDARS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_CALENDARS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [CALENDAR_NAME]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_CRON_TRIGGERS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_CRON_TRIGGERS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_FIRED_TRIGGERS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_FIRED_TRIGGERS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [ENTRY_ID]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_PAUSED_TRIGGER_GRPS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_PAUSED_TRIGGER_GRPS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [TRIGGER_GROUP]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_SCHEDULER_STATE]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_SCHEDULER_STATE] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [INSTANCE_NAME]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_LOCKS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_LOCKS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [LOCK_NAME]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_JOB_DETAILS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_JOB_DETAILS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [JOB_NAME],
      [JOB_GROUP]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_SIMPLE_TRIGGERS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_SIMPLE_TRIGGERS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_SIMPROP_TRIGGERS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_SIMPROP_TRIGGERS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_TRIGGERS]
  WITH NOCHECK ADD
  CONSTRAINT [PK_QRTZ_TRIGGERS] PRIMARY KEY CLUSTERED
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    )
    ON [PRIMARY]
GO

ALTER TABLE [dbo].[QRTZ_CRON_TRIGGERS]
  ADD
  CONSTRAINT [FK_QRTZ_CRON_TRIGGERS_QRTZ_TRIGGERS] FOREIGN KEY
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    ) REFERENCES [dbo].[QRTZ_TRIGGERS] (
    [SCHED_NAME],
    [TRIGGER_NAME],
    [TRIGGER_GROUP]
  )
    ON DELETE CASCADE
GO

ALTER TABLE [dbo].[QRTZ_SIMPLE_TRIGGERS]
  ADD
  CONSTRAINT [FK_QRTZ_SIMPLE_TRIGGERS_QRTZ_TRIGGERS] FOREIGN KEY
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    ) REFERENCES [dbo].[QRTZ_TRIGGERS] (
    [SCHED_NAME],
    [TRIGGER_NAME],
    [TRIGGER_GROUP]
  )
    ON DELETE CASCADE
GO

ALTER TABLE [dbo].[QRTZ_SIMPROP_TRIGGERS]
  ADD
  CONSTRAINT [FK_QRTZ_SIMPROP_TRIGGERS_QRTZ_TRIGGERS] FOREIGN KEY
    (
      [SCHED_NAME],
      [TRIGGER_NAME],
      [TRIGGER_GROUP]
    ) REFERENCES [dbo].[QRTZ_TRIGGERS] (
    [SCHED_NAME],
    [TRIGGER_NAME],
    [TRIGGER_GROUP]
  )
    ON DELETE CASCADE
GO

ALTER TABLE [dbo].[QRTZ_TRIGGERS]
  ADD
  CONSTRAINT [FK_QRTZ_TRIGGERS_QRTZ_JOB_DETAILS] FOREIGN KEY
    (
      [SCHED_NAME],
      [JOB_NAME],
      [JOB_GROUP]
    ) REFERENCES [dbo].[QRTZ_JOB_DETAILS] (
    [SCHED_NAME],
    [JOB_NAME],
    [JOB_GROUP]
  )
GO

