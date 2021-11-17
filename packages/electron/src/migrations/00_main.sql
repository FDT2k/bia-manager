
CREATE TABLE IF NOT EXISTS subjects (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
   	lastname TEXT ,
	firstname TEXT,
    birthdate TEXT,
    gender TEXT,
    mesures_dates TEXT, 
    groups_path TEXT,
    groups_ethno TEXT,
    search_terms TEXT,
    usual_height FLOAT,
    usual_weight FLOAT,
    medical_data TEXT
);

CREATE TABLE IF NOT EXISTS mesures (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    mesure_id INTEGER,
   	date TEXT,
    examinator TEXT,
    medical_data: TEXT
);