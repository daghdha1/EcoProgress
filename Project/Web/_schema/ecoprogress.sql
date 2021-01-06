CREATE DATABASE IF NOT EXISTS ecoprogress;

USE ecoprogress;

DROP TABLE IF EXISTS Measures;
DROP TABLE IF EXISTS Sensors;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS RegCodes;

CREATE TABLE Users (
mail VARCHAR (40),
name VARCHAR (20) NOT NULL,
surnames VARCHAR (40),
password CHAR (72) NOT NULL,
secret_code SMALLINT NOT NULL, 
last_conn INT DEFAULT NULL,
reg_date INT NOT NULL,
role VARCHAR (4) NOT NULL,
account_status VARCHAR (10) NOT NULL,
PRIMARY KEY (mail)
);

CREATE TABLE Sensors (
id VARCHAR(10),
mail VARCHAR (40),
type VARCHAR (15) NOT NULL,
activation_key VARCHAR(8) NOT NULL,
state BIT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (mail) REFERENCES Users(mail)
);

CREATE TABLE Measures (
value double NOT NULL,
timestamp INT,
location VARCHAR(40) NOT NULL,
sensorID VARCHAR(10) NOT NULL,
PRIMARY KEY (timestamp),
FOREIGN KEY (sensorID) REFERENCES Sensors(id)
);

# ADMIN (don't have sensors - only management)
# Admin  --> mail: admin@admin  password: admin
INSERT INTO Users (mail, name, surnames, password, secret_code, reg_date, role, account_status) VALUES ('admin@admin', 'Adrian', 'Soler Navarro', '$2y$10$m.IAnLCSMxLfd8bp/hvUh.B2FeObQF9vwFwVIWNfhktIb6G77e2Ze', 23342, 1620203039, 'root', 'active');
INSERT INTO Users (mail, name, surnames, password, secret_code, last_conn, reg_date, role, account_status) VALUES ('test@test', 'Test', 'Testing', '$2y$10$ipjTNAzIDRVQTMqRJtoRUeUkoLxRfmEkvpNh13/qZwB9As7i9jsiG', 19872, 1620202038, 1620202031, 'user', 'active');

# USER (use these data for registration)
# Adrián  --> mail: daghdha@dev.com   activation_key: 1d2d92g6  for sensor 1
# Marcelo --> mail: marcelo@dev.com   activation_key: 20kDÑ2ln  for sensor 2
# Marta   --> mail: marta@dev.com     activation_key: KD82mA8f  for sensor 3
# Miguel  --> mail: miguel@dev.com    activation_key: kÑA232r1  for sensor 4
# María   --> mail: maria@dev.com     activation_key: 9slñE2k6  for sensor 5
# Test    --> mail: test@test	  	  activation_key: t5lbh2k9  for sensor 6

# SENSORS
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('1', NULL, 'CO', '1d2d92g6', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('2', NULL, 'CO', '20kDÑ2ln', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('3', NULL, 'CO', 'KD82mA8f', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('4', NULL, 'CO', 'kÑA232r1', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('5', NULL, 'CO', '9slñE2k6', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('6', 'test@test', 'CO', 't5lbh2k9', 1);

# MEASURES
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.12, '1606409912', '38.995823,-0.177517', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1606237107', '38.995823,-0.177517', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10.5, '1606150707', '38.995823,-0.177517', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (20.5, '1606064307', '38.995823,-0.177517', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (35.12, '1608144531', '38.995823,-0.177517', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (56.3, '1608144831','38.9955, 0.1661','1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (63.3, '1608145131', '38.9973, 0.1662', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (33.3, '1608145431', '38.995823,-0.177517', '1');

INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.12, '1606409917', '38.995823,-0.177517', '2');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1606237120', '38.995823,-0.177517', '2');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10.5, '1606150777', '38.995823,-0.177517', '2');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (20.5, '1606064397', '38.995823,-0.177517', '2');

# MEASURES FOR TEST
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.12, '1609934467', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1609934667', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10.5, '1609934167', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (20.5, '1609934867', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (35.12, '1609933867', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (56.3, '1609933767','38.9955, 0.1661','6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (63.3, '1609932667', '38.9973, 0.1662', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (33.3, '1609932967', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.12, '1609932867', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1609931767', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10.5, '1609931867', '38.995823,-0.177517', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (20.5, '1609931967', '38.995823,-0.177517', '6');