ALTER TABLE subjects ADD COLUMN status TEXT;
update subjects set status = 'active';