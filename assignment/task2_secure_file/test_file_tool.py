import io, contextlib, vulnerable_file_tool as vul, secure_file_tool as sec

cases = [
    ("Valid file",            "notes.txt"),
    ("Valid csv",             "data.csv"),
    ("Command injection",     "notes.txt; echo HACKED"),
    ("Path traversal",        "../secret.txt"),
    ("Absolute path",         "/etc/passwd"),
    ("Pipe injection",        "notes.txt | ls"),
    ("Empty input",           ""),
    ("Missing file",          "nothere.txt"),
    ("Disallowed extension",  "script.py"),
]
for label, name in cases:
    print(f"\n=== {label}: {name!r} ===")
    print("[vulnerable]")
    buf = io.StringIO()
    vul.show_file(name)
    print("[secure]")
    try:
        r = sec.process_file(name)
        print("  OK ->", r["content"].splitlines()[0], "| wc:", r["wc"])
    except Exception as e:
        print(f"  BLOCKED ({type(e).__name__}): {e}")
