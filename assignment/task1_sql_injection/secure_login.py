"""SECURE login using parameterized queries."""
import sqlite3

def login(username, password, db="student.db"):
    conn = sqlite3.connect(db)
    cur = conn.cursor()
    # FIX: ? placeholders - input is sent as DATA, never parsed as SQL
    query = "SELECT * FROM users WHERE username = ? AND password = ?"
    try:
        cur.execute(query, (username, password))
        return cur.fetchone() is not None
    except sqlite3.Error as e:
        print("Database error:", e)
        return False
    finally:
        conn.close()

if __name__ == "__main__":
    u = input("Username: ")
    p = input("Password: ")
    print("Login successful" if login(u, p) else "Login failed")
