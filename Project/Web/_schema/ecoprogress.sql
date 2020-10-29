create database ecoprogress;

use ecoprogress;

drop table if exists Measures;
drop table if exists Users;

CREATE TABLE Users (
mail varchar (40),
name varchar (20),
PRIMARY KEY (mail)
);

CREATE TABLE Measures (
value double,
instant int,
location varchar(27),
user varchar(40) not null,
PRIMARY KEY (instant),
foreign key (user) references Users(mail)
);

insert into Users (mail, name) values ('rmiguialvz0@ask.com', 'Miguel Alvarez');
insert into Users (mail, name) values ('nmorfey1@slate.com', 'Nicola Morfey');
insert into Users (mail, name) values ('MEspinola@dot.gov', 'Marcelo Espinola');
insert into Users (mail, name) values ('hfernyhough3@acquirethisname.com', 'Herta Fernyhough');
insert into Users (mail, name) values ('daghdha@developer.com', 'Adrian Soler Navarro');

insert into Measures (value, instant, location, user) values (1286, '1595559902', '38.995823, -0.177517', 'daghdha@developer.com');
insert into Measures (value, instant, location, user) values (1206, '1573702829', '38.995823, -0.177517', 'daghdha@developer.com');

select * from Measures;
