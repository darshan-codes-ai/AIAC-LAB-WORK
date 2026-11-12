"""Member 2: Update marks, Delete record."""
import storage

def update_marks(sid, new_marks, path=None):
    data = storage.load(path)
    if sid not in data:
        raise KeyError(f"Student ID {sid} not found.")
    if not (0 <= new_marks <= 100):
        raise ValueError("Marks must be between 0 and 100.")
    data[sid]["marks"] = new_marks
    storage.save(data, path)

def delete_student(sid, path=None):
    data = storage.load(path)
    if sid not in data:
        raise KeyError(f"Student ID {sid} not found.")
    del data[sid]
    storage.save(data, path)
