"""Student 2: calculation + reporting modules."""
from collections import defaultdict


def total_expenses(expenses):
    return round(sum(e["amount"] for e in expenses), 2)


def category_totals(expenses):
    totals = defaultdict(float)
    for e in expenses:
        totals[e["category"]] += e["amount"]
    return {k: round(v, 2) for k, v in totals.items()}


def monthly_summary(expenses, year, month):
    prefix = f"{year:04d}-{month:02d}"
    month_exp = [e for e in expenses if e["date"].startswith(prefix)]
    return {"month": prefix, "count": len(month_exp),
            "total": total_expenses(month_exp), "by_category": category_totals(month_exp)}


def print_category_report(expenses):
    print("\nCategory-wise expenses")
    print("-" * 28)
    for cat, amt in sorted(category_totals(expenses).items()):
        print(f"{cat:<12}{amt:>14.2f}")
    print("-" * 28)
    print(f"{'TOTAL':<12}{total_expenses(expenses):>14.2f}")


def print_monthly_summary(expenses, year, month):
    s = monthly_summary(expenses, year, month)
    print(f"\nMonthly summary for {s['month']}  ({s['count']} expenses)")
    print("-" * 28)
    for cat, amt in sorted(s["by_category"].items()):
        print(f"{cat:<12}{amt:>14.2f}")
    print("-" * 28)
    print(f"{'TOTAL':<12}{s['total']:>14.2f}")
