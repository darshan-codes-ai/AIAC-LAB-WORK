"""Shared helpers: load/save students from a JSON file."""
import json, os

FILE = "students.json"

def load(path=None):
    path = path or FILE
    if not os.path.exists(path):
        return {}
    with open(path, "r") as f:
        return json.load(f)

def save(data, path=None):
    with open(path or FILE, "w") as f:
        json.dump(data, f, indent=2)
