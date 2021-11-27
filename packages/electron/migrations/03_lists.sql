CREATE TABLE IF NOT EXISTS lists (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
    list_key TEXT,
    key TEXT,  
    value TEXT,
    sort INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active'
);