CREATE TABLE TestModel(
  id INT IDENTITY,
  firstName VARCHAR(30) NOT NULL ,
  lastName VARCHAR(30) NOT NULL
);
CREATE TABLE SafetyDate(
  id INT IDENTITY,
  year CHAR(4) NOT NULL ,
  month CHAR(2) NOT NULL ,
  day CHAR(2) NOT NULL,
  Primary Key(year, month, day),
  safeDates INT,
  isSafe INT
);