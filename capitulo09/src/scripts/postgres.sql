drop table if exists heroes
create table heroes (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL, 
    name TEXT NOT NULL,
    power TEXT NOT NULL
)

--create
insert into heroes (name, power) values ('Flash', 'Speed'), ('Aquaman', 'Talk with fish'), ('Batman', 'Money')

--read
select * from heroes

--update 
update heroes set name='Goku', power='God' where ID = 3

--delete
delete from heroes where ID = 3