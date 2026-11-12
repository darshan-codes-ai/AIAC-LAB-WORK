"""Student Management System - menu driver."""
import member1_ops as m1
import member2_ops as m2

MENU = """
1. Add student   2. Display all   3. Search by ID
4. Update marks  5. Delete        6. Exit"""

def main():
    while True:
        print(MENU)
        ch = input("Choice: ").strip()
        try:
            if ch == "1":
                m1.add_student(input("ID: "), input("Name: "), input("Branch: "), float(input("Marks: ")))
                print("Added.")
            elif ch == "2":
                m1.display_students()
            elif ch == "3":
                s = m1.search_student(input("ID: "))
                print(s if s else "Not found.")
            elif ch == "4":
                m2.update_marks(input("ID: "), float(input("New marks: ")))
                print("Updated.")
            elif ch == "5":
                m2.delete_student(input("ID: "))
                print("Deleted.")
            elif ch == "6":
                break
            else:
                print("Invalid choice.")
        except (ValueError, KeyError) as e:
            print("Error:", e)

if __name__ == "__main__":
    main()
