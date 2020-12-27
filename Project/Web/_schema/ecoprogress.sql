CREATE DATABASE IF NOT EXISTS ecoprogress;

USE ecoprogress;

DROP TABLE IF EXISTS Measures;
DROP TABLE IF EXISTS Sensors;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
mail VARCHAR (40),
name VARCHAR (20),
surnames VARCHAR (40),
password VARCHAR (20) NOT NULL,
PRIMARY KEY (mail)
);

CREATE TABLE Sensors (
id VARCHAR(10),
mail VARCHAR (40) NOT NULL,
type VARCHAR (15) NOT NULL,
active_key VARCHAR(30) NOT NULL,
state BIT DEFAULT 0 NOT NULL,
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

INSERT INTO Users (mail, name, surnames, password) VALUES ('miguel@developer.com', 'Miguel', 'Alvarez', 'ecoprogress');
INSERT INTO Users (mail, name, surnames, password) VALUES ('marta@developer.com', 'Marta', 'García', 'ecoprogress');
INSERT INTO Users (mail, name, surnames, password) VALUES ('marcelo@developer.com', 'Marcelo', 'Espinola', 'ecoprogress');
INSERT INTO Users (mail, name, surnames, password) VALUES ('sotito@developer.com', 'Maria', 'Soto', 'ecoprogress');
INSERT INTO Users (mail, name, surnames, password) VALUES ('daghdha@developer.com', 'Adrian', 'Soler Navarro', 'ecoprogress');

INSERT INTO Sensors (id, mail, type, active_key, state) VALUES ('1', 'sotito@developer.com', 'CO', '1d2d92', 0);
INSERT INTO Sensors (id, mail, type, active_key, state) VALUES ('2', 'daghdha@developer.com', 'CO', '20kDÑ2', 0);
INSERT INTO Sensors (id, mail, type, active_key, state) VALUES ('3', 'marta@developer.com', 'CO', 'KD82mA', 0);
INSERT INTO Sensors (id, mail, type, active_key, state) VALUES ('4', 'miguel@developer.com', 'CO', 'kÑA232', 0);
INSERT INTO Sensors (id, mail, type, active_key, state) VALUES ('5', 'marcelo@developer.com', 'CO', '9slñE2', 0);

INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.12, '1606409912', '38.995823,-0.177517', '1');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1606237107', '38.995823,-0.177517', '3');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10.5, '1606150707', '38.995823,-0.177517', '4');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (20.5, '1606064307', '38.995823,-0.177517', '5');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (35.12, '1608144531', '38.995823,-0.177517', '2');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (56.3, '1608144831','38.9955, 0.1661','2');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (63.3, '1608145131', '38.9973, 0.1662', '2');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (33.3, '1608145431', '38.995823,-0.177517', '2');



