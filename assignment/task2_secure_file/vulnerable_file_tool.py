"""VULNERABLE file tool (typical AI-generated code). DO NOT USE IN PRODUCTION."""
import os

def show_file(filename):
    # BUG 1: command injection  ->  "notes.txt; echo HACKED"
    # BUG 2: path traversal     ->  "../secret.txt"
    # BUG 3: no validation / no exception handling
    os.system("cat safe_files/" + filename)

if __name__ == "__main__":
    show_file(input("Enter file name: "))
