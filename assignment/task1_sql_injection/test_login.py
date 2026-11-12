"""Runs the same inputs against vulnerable and secure versions."""
import setup_db, vulnerable_login, secure_login

setup_db.setup()
tests = [
    ("Valid user",                "darshan",       "pass123"),
    ("Wrong password",            "darshan",       "wrong"),
    ("Injection: ' OR '1'='1",    "admin",         "' OR '1'='1"),
    ("Injection: comment --",     "admin' --",     "anything"),
    ("Injection: username OR",    "' OR 1=1 --",   "x"),
]
print(f"{'Test':<28}{'Vulnerable':<14}{'Secure':<10}")
print("-" * 52)
for name, u, p in tests:
    v = vulnerable_login.login(u, p)
    s = secure_login.login(u, p)
    print(f"{name:<28}{'LOGGED IN' if v else 'denied':<14}{'LOGGED IN' if s else 'denied':<10}")
