# Q1 – AI-Assisted Bubble Sort Analysis

print("Q1 – AI-Assisted Bubble Sort Analysis")
def bubble_sort_original(numbers):
    """Sort a copy of numbers with Bubble Sort and count its operations."""
    values = numbers.copy()
    comparisons = 0
    swaps = 0

    # Each pass moves the largest remaining value to the end.
    for pass_number in range(len(values) - 1):
        # The last pass_number values are already in their correct positions.
        for index in range(len(values) - 1 - pass_number):
            comparisons += 1

            # Swap neighboring values if they are in the wrong order.
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swaps += 1

    return values, comparisons, swaps


def bubble_sort_optimized(numbers):
    """Sort a copy of numbers, stopping if a pass makes no swaps."""
    values = numbers.copy()
    comparisons = 0
    swaps = 0

    # Each pass moves the largest remaining value to the end.
    for pass_number in range(len(values) - 1):
        swapped = False

        # The last pass_number values are already in their correct positions.
        for index in range(len(values) - 1 - pass_number):
            comparisons += 1

            # Swap neighboring values if they are in the wrong order.
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swaps += 1
                swapped = True

        # If nothing moved, the list was already sorted; no more passes are needed.
        if not swapped:
            break

    return values, comparisons, swaps


if __name__ == "__main__":
    # The first case is the list from the assignment.
    test_cases = [
        ("Unsorted", [64, 34, 25, 12, 22, 11, 90]),
        ("Already sorted", [1, 2, 3, 4, 5]),
        ("Reverse-sorted", [5, 4, 3, 2, 1]),
    ]

    print("BUBBLE SORT: ORIGINAL AND EARLY-EXIT VERSIONS")

    for case_name, original_list in test_cases:
        print(f"\n{case_name} test")
        print("Input list:   ", original_list)

        # Run the version that always completes all its passes.
        original_result, original_comparisons, original_swaps = (
            bubble_sort_original(original_list)
        )
        print("Original version:")
        print("  Sorted list: ", original_result)
        print("  Comparisons: ", original_comparisons)
        print("  Swaps:       ", original_swaps)

        # Run the version that can stop after a pass with no swaps.
        improved_result, improved_comparisons, improved_swaps = (
            bubble_sort_optimized(original_list)
        )
        print("Improved version:")
        print("  Sorted list: ", improved_result)
        print("  Comparisons: ", improved_comparisons)
        print("  Swaps:       ", improved_swaps)



# Q2 – Linear Search vs Binary Search

print("Q2 – Linear Search vs Binary Search")
def linear_search(numbers, target):
    """Return the target index and the number of value comparisons."""
    comparisons = 0

    # Check each value from the beginning of the list.
    for index in range(len(numbers)):
        comparisons += 1
        if numbers[index] == target:
            return index, comparisons

    # The target was not found after checking every value.
    return -1, comparisons


def binary_search(numbers, target):
    """Search a sorted list and count each equality or ordering comparison."""
    low = 0
    high = len(numbers) - 1
    comparisons = 0

    # Continue while there is still a portion of the list to search.
    while low <= high:
        mid = (low + high) // 2

        # First check whether the middle value is the target.
        comparisons += 1
        if numbers[mid] == target:
            return mid, comparisons

        # If not equal, compare their order to choose the next half.
        comparisons += 1
        if target < numbers[mid]:
            high = mid - 1
        else:
            low = mid + 1

    # The target is not in the list.
    return -1, comparisons


if __name__ == "__main__":
    # Binary Search requires this list to be in ascending sorted order.
    numbers = [5, 12, 18, 23, 31, 45, 56, 72, 89]

    # Include the starter target, followed by the four required test targets.
    targets = [45, 5, 31, 89, 100]

    print("Linear Search vs Binary Search")
    print("Sorted list:", numbers)
    print("Comparisons count each equality or ordering test in the code.")
    print()
    print(
        f"{'Target':>6} | {'Linear index':>12} | {'Linear comparisons':>18} | "
        f"{'Binary index':>12} | {'Binary comparisons':>18} | {'Result'}"
    )
    print("-" * 100)

    for target in targets:
        linear_index, linear_comparisons = linear_search(numbers, target)
        binary_index, binary_comparisons = binary_search(numbers, target)

        if linear_index == -1:
            result = "Not Found"
        else:
            result = "Found"

        print(
            f"{target:>6} | {linear_index:>12} | {linear_comparisons:>18} | "
            f"{binary_index:>12} | {binary_comparisons:>18} | {result}"
        )




# Q3 – Compare Sorting Algorithms

print("Q3 – Compare Sorting Algorithms")
def bubble_sort(data):
    """Return a sorted copy, element comparisons, and swaps."""
    values = data.copy()
    comparisons = 0
    swaps = 0

    # Each pass moves the largest unsorted value to the end.
    for pass_number in range(len(values) - 1):
        swapped = False

        # The values after this boundary are already in sorted positions.
        for index in range(len(values) - 1 - pass_number):
            comparisons += 1
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swaps += 1
                swapped = True

        # Stop if a complete pass did not need any swaps.
        if not swapped:
            break

    return values, comparisons, swaps


def selection_sort(data):
    """Return a sorted copy, element comparisons, and actual swaps."""
    values = data.copy()
    comparisons = 0
    swaps = 0

    # Find the smallest remaining value for each position.
    for current_index in range(len(values) - 1):
        minimum_index = current_index

        for index in range(current_index + 1, len(values)):
            comparisons += 1
            if values[index] < values[minimum_index]:
                minimum_index = index

        # Count a swap only when two different positions are exchanged.
        if minimum_index != current_index:
            values[current_index], values[minimum_index] = (
                values[minimum_index],
                values[current_index],
            )
            swaps += 1

    return values, comparisons, swaps


def insertion_sort(data):
    """Return a sorted copy, element comparisons, and rightward shifts."""
    values = data.copy()
    comparisons = 0
    shifts = 0

    # Insert each value into its correct place in the sorted left portion.
    for current_index in range(1, len(values)):
        key = values[current_index]
        previous_index = current_index - 1

        # Shift larger values one position to the right to make room for key.
        while previous_index >= 0:
            comparisons += 1
            if values[previous_index] > key:
                values[previous_index + 1] = values[previous_index]
                shifts += 1
                previous_index -= 1
            else:
                break

        values[previous_index + 1] = key

    return values, comparisons, shifts


if __name__ == "__main__":
    # The exact same starter list is passed to all three algorithms.
    data = [45, 12, 78, 34, 23, 89, 5, 67, 10, 56]

    bubble_result, bubble_comparisons, bubble_swaps = bubble_sort(data)
    selection_result, selection_comparisons, selection_swaps = selection_sort(data)
    insertion_result, insertion_comparisons, insertion_shifts = insertion_sort(data)

    print("Original data:", data)
    print()
    print(
        f"{'Algorithm':<18} {'Sorted Data':<42} "
        f"{'Comparisons':>11} {'Swaps/Shifts':>13}"
    )
    print("-" * 88)
    print(
        f"{'Bubble Sort':<18} {str(bubble_result):<42} "
        f"{bubble_comparisons:>11} {bubble_swaps:>13} swaps"
    )
    print(
        f"{'Selection Sort':<18} {str(selection_result):<42} "
        f"{selection_comparisons:>11} {selection_swaps:>13} swaps"
    )
    print(
        f"{'Insertion Sort':<18} {str(insertion_result):<42} "
        f"{insertion_comparisons:>11} {insertion_shifts:>13} shifts"
    )


# Q4 - Optimising a Student Search and Sort Program

print("Q4 - Optimising a Student Search and Sort Program")
def find_highest_mark(students):
    """Return the student tuple with the highest mark, or None if empty."""
    if len(students) == 0:
        return None

    highest_student = students[0]

    # Keep track of the highest mark seen while scanning once.
    for index in range(1, len(students)):
        student = students[index]
        if student[1] > highest_student[1]:
            highest_student = student

    return highest_student


def sort_students_by_mark(students):
    """Return a copy of students sorted by mark using Selection Sort."""
    values = students.copy()

    # Find and place the lowest remaining mark at each position.
    for current_index in range(len(values) - 1):
        minimum_index = current_index

        for index in range(current_index + 1, len(values)):
            if values[index][1] < values[minimum_index][1]:
                minimum_index = index

        if minimum_index != current_index:
            values[current_index], values[minimum_index] = (
                values[minimum_index],
                values[current_index],
            )

    return values


def search_student(students, name):
    """Return the first student with this name, or None if not found."""
    for student in students:
        if student[0] == name:
            return student

    return None


def insertion_sort_students_by_mark(students):
    """Return a copy sorted by mark using beginner-friendly Insertion Sort."""
    values = students.copy()

    # Insert each student into the correct place in the sorted left portion.
    for current_index in range(1, len(values)):
        key_student = values[current_index]
        previous_index = current_index - 1

        while (
            previous_index >= 0
            and values[previous_index][1] > key_student[1]
        ):
            values[previous_index + 1] = values[previous_index]
            previous_index -= 1

        values[previous_index + 1] = key_student

    return values


def prepare_student_data(students):
    """Find the highest student and build a name dictionary in one scan."""
    highest_student = None
    students_by_name = {}

    for student in students:
        name, mark = student
        students_by_name[name] = student

        if highest_student is None or mark > highest_student[1]:
            highest_student = student

    # Sorting is performed because the program must display the sorted list.
    sorted_students = insertion_sort_students_by_mark(students)
    return highest_student, sorted_students, students_by_name


def search_student_by_name(students_by_name, name):
    """Look up a name in a dictionary; returns None when it is absent."""
    return students_by_name.get(name)


if __name__ == "__main__":
    # Use the exact student records from the assignment.
    students = [
        ("Arun", 82),
        ("Bala", 65),
        ("Chitra", 91),
        ("Divya", 74),
        ("Esha", 88),
    ]

    # Original solution: each operation performs its own straightforward work.
    original_highest = find_highest_mark(students)
    original_sorted = sort_students_by_mark(students)
    original_chitra = search_student(students, "Chitra")
    original_arun = search_student(students, "Arun")
    original_rahul = search_student(students, "Rahul")

    print("\nOriginal solution")
    print("Highest mark:", original_highest)
    print("Students sorted by mark:", original_sorted)
    print("Search for Chitra:", original_chitra)
    print("Search for Arun:", original_arun)
    print("Search for Rahul:", original_rahul)

    # Improved solution: find the maximum and build a reusable name lookup
    # during one scan; sort only because sorted output is also required.
    improved_highest, improved_sorted, students_by_name = prepare_student_data(
        students
    )
    improved_chitra = search_student_by_name(students_by_name, "Chitra")
    improved_arun = search_student_by_name(students_by_name, "Arun")
    improved_rahul = search_student_by_name(students_by_name, "Rahul")

    print("\nImproved solution")
    print("Highest mark:", improved_highest)
    print("Students sorted by mark:", improved_sorted)
    print("Search for Chitra:", improved_chitra)
    print("Search for Arun:", improved_arun)
    print("Search for Rahul:", improved_rahul)




# Q5 – Optimisation Challenge: Best Combination


print("Q5 – Optimisation Challenge: Best Combination")
def find_best_combination_brute_force(items, budget):
    """Check every subset and return the best affordable one."""
    best_items = []
    best_total = 0
    number_of_items = len(items)

    # Each bit pattern represents one possible include/exclude combination.
    for choice_number in range(2 ** number_of_items):
        chosen_items = []
        total_price = 0

        for index in range(number_of_items):
            # If this bit is 1, include this item in the current combination.
            if choice_number & (1 << index):
                chosen_items.append(items[index])
                total_price += items[index][1]

        if total_price <= budget and total_price > best_total:
            best_items = chosen_items
            best_total = total_price

    return best_items, best_total


def find_best_combination_dp(items, budget):
    """Use a 2D 0/1 Knapsack table and return the chosen items and total."""
    number_of_items = len(items)

    # dp[i][capacity] is the best total using the first i items
    # without exceeding capacity.
    dp = []
    for _ in range(number_of_items + 1):
        dp.append([0] * (budget + 1))

    for item_count in range(1, number_of_items + 1):
        item_name, price = items[item_count - 1]

        for capacity in range(budget + 1):
            # First consider not including this item.
            dp[item_count][capacity] = dp[item_count - 1][capacity]

            # If it fits, consider including it once.
            if price <= capacity:
                total_with_item = (
                    price + dp[item_count - 1][capacity - price]
                )
                if total_with_item > dp[item_count][capacity]:
                    dp[item_count][capacity] = total_with_item

    # Trace back through the table to find which items make the best total.
    selected_items = []
    capacity = budget
    for item_count in range(number_of_items, 0, -1):
        if dp[item_count][capacity] != dp[item_count - 1][capacity]:
            item = items[item_count - 1]
            selected_items.append(item)
            capacity -= item[1]

    # Backtracking discovers items from last to first; restore input order.
    selected_items.reverse()
    maximum_total = dp[number_of_items][budget]
    return selected_items, maximum_total


if __name__ == "__main__":
    # Use the exact item data and budget from the assignment.
    items = [
        ("Laptop", 60000),
        ("Phone", 30000),
        ("Tablet", 20000),
        ("Watch", 10000),
        ("Headphones", 5000),
    ]
    budget = 50000

    brute_items, brute_total = find_best_combination_brute_force(items, budget)
    print("\nBrute Force result for budget", budget)
    print("Selected items:", brute_items)
    print("Total price:", brute_total)
    print("Remaining budget:", budget - brute_total)

    # Run the optimal DP method for all required budgets.
    print("\nDynamic Programming results")
    for current_budget in [50000, 75000, 100000]:
        selected_items, total_price = find_best_combination_dp(
            items, current_budget
        )
        print("\nBudget:", current_budget)
        print("Selected Items:", selected_items)
        print("Total Price:", total_price)
        print("Remaining Budget:", current_budget - total_price)
