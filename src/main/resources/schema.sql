CREATE TABLE safety_date (
  year       CHAR(4) NOT NULL,
  month      CHAR(2) NOT NULL,
  day        CHAR(2) NOT NULL,
  safe_dates INT,
  is_safe    INT,
  log        VARCHAR(255) DEFAULT'Today is running safe!',
  PRIMARY KEY (year, month, day),
);