CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT,
    value TEXT
);

ALTER TABLE subjects ADD COLUMN med_name TEXT;
ALTER TABLE subjects ADD COLUMN med_service TEXT;

insert into settings (key,value) values ('entity_name','');
insert into settings (key,value) values ('entity_address','');
insert into settings (key,value) values ('entity_logo','');