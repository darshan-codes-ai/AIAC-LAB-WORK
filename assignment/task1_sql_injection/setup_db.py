"""Creates student.db with a users table and sample data."""
import sqlite3

def setup(db_name="student.db"):
    conn = sqlite3.connect(db_name)
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS users")
    cur.execute("CREATE TABLE users (username TEXT NOT NULL, password TEXT NOT NULL)")
    cur.executemany("INSERT INTO users VALUES (?, ?)",
                    [("admin", "admin@123"), ("darshan", "pass123"), ("ravi", "ravi456")])
    conn.commit()
    conn.close()

if __name__ == "__main__":
    setup()
    print("student.db created with table 'users'.")
