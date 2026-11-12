"""Student 1: expense entry + storage modules."""
import csv, os
from datetime import datetime

CATEGORIES = ["Food", "Travel", "Shopping", "Education"]
FILE = "expenses.csv"
FIELDS = ["date", "category", "description", "amount"]


def validate_expense(date_str, category, amount):
    """Return (date_str, category, amount) cleaned, or raise ValueError."""
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
    except ValueError:
        raise ValueError("Date must be in YYYY-MM-DD format.")
    category = category.strip().title()
    if category not in CATEGORIES:
        raise ValueError(f"Category must be one of {CATEGORIES}.")
    try:
        amount = float(amount)
    except (TypeError, ValueError):
        raise ValueError("Amount must be a number.")
    if amount <= 0:
        raise ValueError("Amount must be greater than 0.")
    return date_str, category, round(amount, 2)


def add_expense(date_str, category, description, amount, path=FILE):
    date_str, category, amount = validate_expense(date_str, category, amount)
    new_file = not os.path.exists(path)
    with open(path, "a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        if new_file:
            w.writeheader()
        w.writerow({"date": date_str, "category": category,
                    "description": description.strip(), "amount": amount})


def load_expenses(path=FILE):
    if not os.path.exists(path):
        return []
    with open(path, newline="") as f:
        rows = list(csv.DictReader(f))
    for r in rows:
        r["amount"] = float(r["amount"])
    return rows
