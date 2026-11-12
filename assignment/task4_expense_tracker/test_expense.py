import os, tempfile, storage, reports

p = os.path.join(tempfile.mkdtemp(), "e.csv")
data = [("2026-11-01", "Food", "Lunch", 120), ("2026-11-02", "travel", "Bus", 40.5),
        ("2026-11-05", "Shopping", "Shirt", 799), ("2026-11-09", "Education", "Book", 350),
        ("2026-10-28", "Food", "Dinner", 200)]
for d in data:
    storage.add_expense(*d, path=p)
ex = storage.load_expenses(p)

assert reports.total_expenses(ex) == 1509.5
assert reports.category_totals(ex)["Food"] == 320
nov = reports.monthly_summary(ex, 2026, 11)
assert nov["total"] == 1309.5 and nov["count"] == 4
reports.print_category_report(ex)
reports.print_monthly_summary(ex, 2026, 11)

for bad in [("2026-13-01", "Food", "x", 10), ("2026-11-01", "Games", "x", 10),
            ("2026-11-01", "Food", "x", -5), ("2026-11-01", "Food", "x", "abc"),
            ("01/11/2026", "Food", "x", 10)]:
    try: storage.add_expense(*bad, path=p); raise SystemExit(f"FAILED to reject {bad}")
    except ValueError as e: print("Rejected:", bad[:3], "->", e)
print("\nAll tests passed.")
