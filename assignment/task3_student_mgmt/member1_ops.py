"""Member 1: Add, Display, Search."""
import storage

def add_student(sid, name, branch, marks, path=None):
    data = storage.load(path)
    if sid in data:
        raise ValueError(f"Student ID {sid} already exists.")
    if not (0 <= marks <= 100):
        raise ValueError("Marks must be between 0 and 100.")
    data[sid] = {"name": name, "branch": branch, "marks": marks}
    storage.save(data, path)

def display_students(path=None):
    data = storage.load(path)
    if not data:
        print("No student records.")
        return
    print(f"{'ID':<8}{'Name':<15}{'Branch':<10}{'Marks':<6}")
    for sid, s in data.items():
        print(f"{sid:<8}{s['name']:<15}{s['branch']:<10}{s['marks']:<6}")

def search_student(sid, path=None):
    return storage.load(path).get(sid)
