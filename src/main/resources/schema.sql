CREATE TABLE SafetyDate (
  year       CHAR(4) NOT NULL,
  month      CHAR(2) NOT NULL,
  day        CHAR(2) NOT NULL,
  PRIMARY KEY (year, month, day),
  safe_dates INT,
  is_safe    INT
);