CREATE TABLE IF NOT EXISTS lists (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    list_key TEXT,
    key TEXT,  
    value TEXT,
    sort INTEGER DEFAULT 999,
    status TEXT DEFAULT 'active',
    default_value INTEGER DEFAULT 0
);

insert into lists (list_key, key,value)  values('genders','F','F');
insert into lists (list_key, key,value)  values('genders','M','M');
insert into lists (list_key, key,value)  values('physical_activity_rate','-','-');
insert into lists (list_key, key,value)  values('physical_activity_type','-','-');
insert into lists (list_key, key,value)  values('machines','-','-');
insert into lists (list_key, key,value)  values('pathological_groups','-','-');
insert into lists (list_key, key,value)  values('ethnological_groups','-','-');
insert into lists (list_key, key,value)  values('examinators','-','-');
