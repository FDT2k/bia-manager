

CREATE TABLE IF NOT EXISTS mesures (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_id INTEGER,
    mesure_id INTEGER,
   	date TEXT,
    examinator TEXT,
    height FLOAT,
    weight FLOAT,
    bmi FLOAT,
    left_side INTEGER,
    machine TEXT,
    smoker INTEGER,
    bmi_ref FLOAT,
    status TEXT,
    ideal_weight FLOAT,
    pct_ideal_weight FLOAT,
    most_accurate_formula TEXT,
    current_age INTEGER,
    data TEXT,
    sport TEXT,
    fds TEXT,
    uuid TEXT


);