
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
role VARCHAR (5) NOT NULL,
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
ON DELETE SET NULL
);

CREATE TABLE Measures (
value double NOT NULL,
timestamp INT,
location VARCHAR(40) NOT NULL,
sensorID VARCHAR(10) NOT NULL,
PRIMARY KEY (timestamp),
FOREIGN KEY (sensorID) REFERENCES Sensors(id)
);


########## USERS ##########
# ADMIN (don't have sensors - only management)
# Admin  --> mail: admin@admin  password: admin
INSERT INTO Users (mail, name, surnames, password, secret_code, reg_date, role, account_status) VALUES ('admin@admin', 'Daghdha', 'Alderson', '$2y$10$m.IAnLCSMxLfd8bp/hvUh.B2FeObQF9vwFwVIWNfhktIb6G77e2Ze', 23342, 1620203039, 'admin', 'active');

# USER (use these data for registration)
# Adrián  --> mail: adrian@dev.com    activation_key: 1d2d92g6  for sensor 1
# Marcelo --> mail: marcelo@dev.com   activation_key: 20kDÑ2ln  for sensor 2
# Marta   --> mail: marta@dev.com     activation_key: KD82mA8f  for sensor 3
# Miguel  --> mail: miguel@dev.com    activation_key: kÑA232r1  for sensor 4, 4d2jj345 for sensor 7, 8k2Jsa23 for sensor 8
# María   --> mail: maria@dev.com     activation_key: 9slñE2k6  for sensor 5
# Test    --> mail: test@test	  	  activation_key: t5lbh2k9  for sensor 6
INSERT INTO Users (mail, name, surnames, password, secret_code, last_conn, reg_date, role, account_status) VALUES ('test@test', 'Test', 'Testing', '$2y$10$ipjTNAzIDRVQTMqRJtoRUeUkoLxRfmEkvpNh13/qZwB9As7i9jsiG', 19872, 1620202038, 1620202031, 'user', 'active');
INSERT INTO Users (mail, name, surnames, password, secret_code, last_conn, reg_date, role, account_status) VALUES ('miguel@dev.com', 'Miguel', 'Alvarez', '$2y$10$4J5Pkkb81ctZ7ZodCPKmjuqf/E8CDDbcx0g.M4JvvkBV5Mqmj7qbu', 22961, 1610467728, 1610467724, 'user', 'active');

########### SENSORS ##########
# CO
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('1', NULL, 'CO', '1d2d92g6', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('2', NULL, 'CO', '20kDÑ2ln', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('3', NULL, 'CO', 'KD82mA8f', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('4', 'miguel@dev.com', 'CO', 'kÑA232r1', 1);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('5', NULL, 'CO', '9slñE2k6', 0);
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('6', 'test@test', 'CO', 't5lbh2k9', 1);
# NO2
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('7', 'miguel@dev.com', 'NO2', '4d2jj345', 1);
# 03
INSERT INTO Sensors (id, mail, type, activation_key, state) VALUES ('8', 'miguel@dev.com', 'O3', '8k2Jsa23', 1);

# MEASURES #
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.12, '1606409912', '38.995876, -0.167057', '4');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1606410000', '38.999622, -0.166512', '4');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10.5, '1606411000', '39.001105, -0.164135', '4');
-- 10 / 01
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (2.5, '1610293637', '39.002082, -0.162310', '4');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.5, '1610292637', '39.001227, -0.163908', '4');
-- 09 / 01
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (3.5, '1610034437', '39.002082, -0.162310', '4');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (3.5, '1610032437', '38.999076, -0.162704', '4');



# MEASURES FOR TEST #
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (15.12, '1609934461', '38.99026988407104,-0.16149044036865237', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.45, '1609934662', '38.99657390099929,-0.16550302505493164', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609934863', '38.98843527630966,-0.1731204986572266', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.12, '1609933864', '39.00054280875106,-0.16582489013671878', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (5.3, '1609932665', '39.0055786653419,-0.16745567321777344', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.3, '1609932966', '39.00551196759707,-0.1872825622558594', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.12, '1609932867', '39.0077463078146,-0.1828622817993164', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.45, '1609931768', '39.001776793522026,-0.17582416534423828', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1.5, '1609931869', '38.99550659370692,-0.17852783203125003', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4.5, '1609931970', '39.01418214711184,-0.17509460449218753', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (2.5, '1609931971', '39.01744986205095,-0.17706871032714844', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931972', '39.016983054876086,-0.18857002258300784', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (3.5, '1609931960', '38.999875780995005,-0.1646232604980469', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (3.5, '1609931959', '39.000309349751745,-0.1641941070556641', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.5, '1609931973', '38.97888537015195,-0.18947984674014154', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.5, '1609931974', '38.993038383938284,-0.19123077392578125', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931975', '38.99597354262809,-0.20599365234375003', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (5, '1609931976', '38.9854998049844,-0.18320560455322268', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931977', '38.97022004566849,-0.16153335571289065', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931978', '38.962211868378226,-0.20762443542480472', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931979', '38.96287925106271,-0.20771026611328128', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931981', '38.9791948016909,-0.19084453582763675', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931982', '38.9858333874019,-0.19878387451171878', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1, '1609931983', '38.98993632256045,-0.19449234008789065', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (10, '1609931984', '38.96940258572784,-0.17977237701416018', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (4, '1609931985', '38.96975292685763,-0.19603729248046875', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931986', '38.94692708461065,-0.20453453063964844', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931987', '38.95153289047218,-0.17535209655761722', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (1, '1609931988', '38.97869438055453,-0.15552520751953128', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931989', '38.974891064341726,-0.13338088989257815', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0, '1609931990', '38.970987448455716,-0.12956142425537112', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.1, '1609931991', '38.96754449755618, -0.19311904907226565', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.1, '1609931992', '38.966476752560204, -0.18891334533691406', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (0.1, '1610703814', '38.966476752560204, -0.18891334533691406', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (2, '1609931993',  '38.96064036588376, -0.19054412841796878', '6');
INSERT INTO Measures (value, timestamp, location, sensorID) VALUES (2, '1610703514',  '38.96064036588376, -0.19054412841796878', '6');

select * from Users;