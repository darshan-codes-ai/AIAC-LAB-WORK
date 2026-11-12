"""VULNERABLE login (typical AI-generated code). DO NOT USE IN PRODUCTION."""
import sqlite3

def login(username, password, db="student.db"):
    conn = sqlite3.connect(db)
    cur = conn.cursor()
    # BUG: user input is concatenated directly into the SQL string
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    try:
        cur.execute(query)
        return cur.fetchone() is not None
    except sqlite3.Error as e:
        print("   [SQL error]:", e)
        return False
    finally:
        conn.close()

if __name__ == "__main__":
    u = input("Username: ")
    p = input("Password: ")
    print("Login successful" if login(u, p) else "Login failed")
