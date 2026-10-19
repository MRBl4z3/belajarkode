---
title: "Build an Expense Tracker with Python and JSON"
description: "Learn how to build a command-line expense tracker using Python, functions, lists, dictionaries, and JSON file storage."
summary: Build a practical Python expense tracker that records expenses, calculates totals, and saves data between sessions.
authors:
  - royy
categories:
  - python
tags:
  - python
  - expense-tracker
  - json
  - file-handling
  - beginner-projects
keywords:
  - python expense tracker
  - python json tutorial
  - python file handling
  - python beginner project
  - command line application python
thumbnail: /images/python-expense-tracker-thumbnail.jpg
heroImage: /images/python-expense-tracker-hero.jpg
customOgImage: /images/python-expense-tracker-og.jpg
featured: true
draft: false
difficulty: beginner
links:
  website: https://www.python.org/
  documentation: https://docs.python.org/3/library/json.html
references:
  - https://docs.python.org/3/library/json.html
  - https://docs.python.org/3/tutorial/inputoutput.html
license: MIT
language: English
---

# Build an Expense Tracker with Python and JSON

Learning Python becomes more interesting when you stop writing isolated examples and start building something useful.

In this tutorial, you will create a command-line expense tracker that allows users to record expenses, view transaction history, calculate total spending, and save data so it remains available after the program closes.

You will practice Python functions, lists, dictionaries, loops, conditional statements, and JSON file handling in one small project.

## What Are We Building?

Our application will support four main features:

- Add a new expense with a description and amount.
- Display all recorded expenses.
- Calculate the total amount spent.
- Save and load expense records using a JSON file.

We will use Python's built-in modules, so no third-party packages are required.

## 1. Understanding the Data Structure

Each expense will be stored as a Python dictionary.

```python
expense = {
    "description": "Lunch",
    "amount": 25000
}

print(expense["description"])
print(expense["amount"])
```

A dictionary stores information as key-value pairs. In this example, `description` identifies the expense name, while `amount` stores its cost.

Multiple expenses can be stored inside a list.

```python
expenses = [
    {"description": "Lunch", "amount": 25000},
    {"description": "Transport", "amount": 10000}
]
```

This structure makes it easy to add records, display transactions, and calculate totals.

## 2. Saving Data with JSON

Variables disappear when a program terminates. To preserve our records, we need to store them in a file.

JSON is a text format commonly used to store structured data.

```python
import json

expenses = [
    {"description": "Lunch", "amount": 25000}
]

with open("expenses.json", "w") as file:
    json.dump(expenses, file, indent=4)
```

The `json.dump()` function writes Python data into a JSON file. The `indent=4` argument makes the file easier to read.

To load the records later, we can use `json.load()`.

```python
import json

with open("expenses.json", "r") as file:
    expenses = json.load(file)

print(expenses)
```

Our application can now preserve its data between sessions.

## 3. Creating the Expense Tracker

Create a file named `expense_tracker.py` and add the following code.

```python
import json
from pathlib import Path

DATA_FILE = Path("expenses.json")


def load_expenses():
    if not DATA_FILE.exists():
        return []

    try:
        with DATA_FILE.open("r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        print("Warning: Could not read saved expenses.")
        return []


def save_expenses(expenses):
    with DATA_FILE.open("w", encoding="utf-8") as file:
        json.dump(expenses, file, indent=4)


def add_expense(expenses):
    description = input("Expense description: ").strip()

    if not description:
        print("Description cannot be empty.")
        return

    try:
        amount = int(input("Amount (IDR): "))

        if amount <= 0:
            print("Amount must be greater than zero.")
            return

    except ValueError:
        print("Please enter a valid whole number.")
        return

    expenses.append({
        "description": description,
        "amount": amount
    })

    save_expenses(expenses)
    print("Expense added successfully!")


def show_expenses(expenses):
    if not expenses:
        print("No expenses recorded yet.")
        return

    print("\n--- EXPENSE HISTORY ---")

    for index, expense in enumerate(expenses, start=1):
        print(
            f"{index}. {expense['description']} "
            f"- Rp{expense['amount']:,}"
        )

    print(f"Total: Rp{calculate_total(expenses):,}")


def calculate_total(expenses):
    return sum(expense["amount"] for expense in expenses)


def main():
    expenses = load_expenses()

    while True:
        print("\n=== PYTHON EXPENSE TRACKER ===")
        print("1. Add expense")
        print("2. View expenses")
        print("3. View total spending")
        print("4. Exit")

        choice = input("Choose an option: ").strip()

        if choice == "1":
            add_expense(expenses)

        elif choice == "2":
            show_expenses(expenses)

        elif choice == "3":
            print(f"Total spending: Rp{calculate_total(expenses):,}")

        elif choice == "4":
            print("Goodbye!")
            break

        else:
            print("Invalid option. Please try again.")


if __name__ == "__main__":
    main()
```

## 4. Running the Program

Open your terminal in the directory containing `expense_tracker.py`.

```bash
python expense_tracker.py
```

Depending on your environment, you may need to use `python3` instead.

The application will display a menu:

```text
=== PYTHON EXPENSE TRACKER ===
1. Add expense
2. View expenses
3. View total spending
4. Exit

Choose an option:
```

Choose option `1` to add an expense, option `2` to display transaction history, or option `3` to calculate total spending.

The program automatically creates `expenses.json` when the first expense is saved.

## 5. Understanding the Important Functions

### `load_expenses()`

Checks whether the JSON file exists and loads previously saved records. If the file is missing, the program starts with an empty list.

### `save_expenses()`

Writes the current expense list to the JSON file. Every successful addition is saved immediately.

### `add_expense()`

Collects user input, validates the description and amount, and adds a new dictionary to the expense list.

### `calculate_total()`

Uses Python's built-in `sum()` function to calculate the total spending.

```python
def calculate_total(expenses):
    return sum(expense["amount"] for expense in expenses)
```

The expression inside `sum()` retrieves the amount from every expense record and adds the values together.

### `main()`

Controls the application menu using a `while` loop and conditional statements.

The condition `if __name__ == "__main__":` ensures that the main program runs when the file is executed directly.

## 6. Python Concepts Used in This Project

| Concept | Purpose |
|---|---|
| Variables | Store data and configuration |
| Lists | Hold multiple expense records |
| Dictionaries | Represent individual expenses |
| Functions | Organize reusable operations |
| Loops | Keep the menu running |
| Conditionals | Process user choices |
| Exception handling | Handle invalid input and file errors |
| JSON | Store structured data between sessions |
| `pathlib` | Work with file paths |

These concepts form the foundation of many larger applications, including inventory systems, transaction managers, and simple financial tools.

## 7. Challenges to Try Next

Once the basic application works, extend it with these features:

1. Add expense categories such as food, transport, and entertainment.
2. Display expenses by category.
3. Add a monthly spending limit and warn users when they exceed it.
4. Implement an option to delete an expense.
5. Export transaction history to a CSV file.
6. Add dates so users can review spending over time.

Try implementing one feature at a time. Debugging a small feature is much easier than debugging six features that broke each other.

## Conclusion

You have built a functional command-line expense tracker using Python's standard library.

The project demonstrates how basic programming concepts can work together to solve a practical problem. More importantly, you now have a foundation for developing larger applications with databases, graphical interfaces, or web frameworks.

For further reading, explore the official Python documentation on [JSON](https://docs.python.org/3/library/json.html) and [input and output](https://docs.python.org/3/tutorial/inputoutput.html).