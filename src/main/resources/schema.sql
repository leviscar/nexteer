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
  year  NCHAR(4) NOT NULL,
  month NCHAR(2) NOT NULL,
  day   NCHAR(2) NOT NULL,
  value INT,
  PRIMARY KEY (year, month, day)
);