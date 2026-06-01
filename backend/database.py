import sqlite3

conn = sqlite3.connect(
    "mediintel.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS prescriptions (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_email TEXT,

    diagnosis TEXT,

    medicines_count INTEGER,

    tests_count INTEGER,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

conn.commit()