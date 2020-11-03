create database if not exists ecoprogress;

use ecoprogress;

drop table if exists Measures;
drop table if exists Sensors;
drop table if exists Users;

CREATE TABLE Users (
mail varchar (40),
name varchar (20),
surname varchar (40),
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
instant int,
location varchar(27),
idSensor varchar(10) not null,
PRIMARY KEY (instant),
foreign key (idSensor) references Sensors(id)
);

insert into Users (mail, name, surname, password) values ('miguel@developer.com', 'Miguel', 'Alvarez', 'ecoprogress');
insert into Users (mail, name, surname, password) values ('marta@developer.com', 'Marta', 'García', 'ecoprogress');
insert into Users (mail, name, surname, password) values ('marcelo@developer.com', 'Marcelo', 'Espinola', 'ecoprogress');
insert into Users (mail, name, surname, password) values ('sotito@developer.com', 'Maria', 'Soto', 'ecoprogress');
insert into Users (mail, name, surname, password) values ('daghdha@developer.com', 'Adrian', 'Soler Navarro', 'ecoprogress');

insert into Sensors (id, mail, type) values ('1', 'sotito@developer.com', 'CO00001');
insert into Sensors (id, mail, type) values ('2', 'daghdha@developer.com', 'CO00001');

insert into Measures (value, instant, location, idSensor) values (1286, '1595559902', '38.995823, -0.177517', '1');
insert into Measures (value, instant, location, idSensor) values (1206, '1573702829', '38.995823, -0.177517', '2');

select * from Measures;