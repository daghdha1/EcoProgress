-- create database if not exists ecoprogress;

 use ecoprogress;

drop table if exists Measures;
drop table if exists Sensors;
drop table if exists Users;

CREATE TABLE Users (
mail varchar (40),
name varchar (20),
surnames varchar (40),
password varchar (20) not null,
PRIMARY KEY (mail)
);

CREATE TABLE Sensors (
id varchar(10),
mail varchar (40),
type varchar (15),
PRIMARY KEY (id),
foreign key (mail) references Users(mail)
);

CREATE TABLE Measures (
value double,
timestamp int,
location varchar(40),
sensorID varchar(10) not null,
PRIMARY KEY (timestamp),
foreign key (sensorID) references Sensors(id)
);

insert into Users (mail, name, surnames, password) values ('miguel@developer.com', 'Miguel', 'Alvarez', 'ecoprogress');
insert into Users (mail, name, surnames, password) values ('marta@developer.com', 'Marta', 'García', 'ecoprogress');
insert into Users (mail, name, surnames, password) values ('marcelo@developer.com', 'Marcelo', 'Espinola', 'ecoprogress');
insert into Users (mail, name, surnames, password) values ('sotito@developer.com', 'Maria', 'Soto', 'ecoprogress');
insert into Users (mail, name, surnames, password) values ('daghdha@developer.com', 'Adrian', 'Soler Navarro', 'ecoprogress');

insert into Sensors (id, mail, type) values ('1', 'sotito@developer.com', 'CO00001');
insert into Sensors (id, mail, type) values ('2', 'daghdha@developer.com', 'CO00001');
insert into Sensors (id, mail, type) values ('3', 'marta@developer.com', 'CO00001');
insert into Sensors (id, mail, type) values ('4', 'miguel@developer.com', 'CO00001');
insert into Sensors (id, mail, type) values ('5', 'marcelo@developer.com', 'CO00001');

insert into Measures (value, timestamp, location, sensorID) values (1.12, '1606409912', '38.995823,-0.177517', '1');
insert into Measures (value, timestamp, location, sensorID) values (4.45, '1606237107', '38.995823,-0.177517', '3');
insert into Measures (value, timestamp, location, sensorID) values (10.5, '1606150707', '38.995823,-0.177517', '4');
insert into Measures (value, timestamp, location, sensorID) values (20.5, '1606064307', '38.995823,-0.177517', '5');

insert into Measures (value, timestamp, location, sensorID) values (35.12, '1608144531', '38.995823,-0.177517', '2');
insert into Measures (value, timestamp, location, sensorID) values (56.3, '1608144831','38.9955, 0.1661','2');
insert into Measures (value, timestamp, location, sensorID) values (63.3, '1608145131', '38.9973, 0.1662', '2');
insert into Measures (value, timestamp, location, sensorID) values (33.3, '1608145431', '38.995823,-0.177517', '2');

select * from Measures;

select * from Sensors;

SELECT * FROM Measures m, Sensors s where m.sensorID = s.id and s.mail = "daghdha@developer.com";

select * from measures order by sensorID;

select ST_Distance(
    point(38.995823, -0.177517),
    point(38.9955, 0.1661)
);

SELECT 
	sensorID,
    value  location
FROM 
   Measures
   CROSS APPLY STRING_SPLIT(location, ',');

