"""Expense Tracker - menu driver (integration of both modules)."""
import storage, reports

MENU = """
1. Add expense        2. Total expenses
3. Category-wise      4. Monthly summary   5. Exit"""

def main():
    while True:
        print(MENU)
        ch = input("Choice: ").strip()
        try:
            if ch == "1":
                storage.add_expense(input("Date (YYYY-MM-DD): "),
                                    input(f"Category {storage.CATEGORIES}: "),
                                    input("Description: "), input("Amount: "))
                print("Expense saved.")
            elif ch == "2":
                print("Total:", reports.total_expenses(storage.load_expenses()))
            elif ch == "3":
                reports.print_category_report(storage.load_expenses())
            elif ch == "4":
                reports.print_monthly_summary(storage.load_expenses(),
                                              int(input("Year: ")), int(input("Month (1-12): ")))
            elif ch == "5":
                break
            else:
                print("Invalid choice.")
        except ValueError as e:
            print("Error:", e)

if __name__ == "__main__":
    main()
