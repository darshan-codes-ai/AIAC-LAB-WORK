# AI Assisted Coding – Assignment 20-21 (Report)

## Task 1 – SQL Injection (`task1_sql_injection/`)
**Run:** `python3 setup_db.py` then `python3 test_login.py`

| Bug | Cause | Fix | Test result |
|---|---|---|---|
| SQL injection in login | User input concatenated into the query with an f-string | Parameterized query with `?` placeholders | `' OR '1'='1`, `admin' --`, `' OR 1=1 --` log in on the vulnerable version, all denied on the secure one |

**Test output**
```
Test                        Vulnerable    Secure
Valid user                  LOGGED IN     LOGGED IN
Wrong password              denied        denied
Injection: ' OR '1'='1      LOGGED IN     denied
Injection: comment --       LOGGED IN     denied
Injection: username OR      LOGGED IN     denied
```
**How parameterized queries prevent SQL injection:** the SQL statement (with `?` placeholders) is parsed and compiled first.
The user values are then bound afterwards as plain data, so characters like `'`, `--` or `OR` can never change the structure
of the query. An attacker's `' OR '1'='1` is just compared literally as a password string and matches nothing.

**Extra improvement (mention in viva):** real systems should store salted password hashes (e.g. `bcrypt`/`argon2`), not plaintext.

## Task 2 – Secure file handling (`task2_secure_file/`)
**Run:** `python3 test_file_tool.py` (or `python3 secure_file_tool.py`)

### Security report
| # | Vulnerability | Example attack | Correction |
|---|---|---|---|
| 1 | Command injection (`os.system` + string concat) | `notes.txt; echo HACKED` ran an extra command | Removed `os.system`; use `subprocess.run([...], shell=False)` with an argument list |
| 2 | Path traversal | `../secret.txt` leaked a file outside the folder | Regex whitelist for names + `Path.resolve()` and check that parent == `BASE_DIR` |
| 3 | No input validation | empty name, `/etc/passwd`, `\| ls` | Whitelist pattern, length limit, extension whitelist, size limit |
| 4 | No exception handling | crashes / error leakage | Specific `except` blocks (ValueError, FileNotFoundError, PermissionError, SubprocessError) and a generic fallback that does not leak internals |

Valid files (`notes.txt`, `data.csv`) work; all 7 malicious/invalid inputs are blocked with a clear message.

## Task 3 – Student Management System (`task3_student_mgmt/`)
**Run:** `python3 main.py`, tests: `python3 test_students.py`
* Member 1: `member1_ops.py` (add, display, search by ID). Member 2: `member2_ops.py` (update marks, delete).
* Shared: `storage.py` (JSON), `main.py` (menu).
* `git_log_output.txt` shows the branch/merge graph from a real run of the workflow below.

### Git commands to do on YOUR GitHub (do this with your partner)
```bash
# --- Member 1 ---
git clone https://github.com/<user>/student-management-system.git   # after creating the empty repo on GitHub
cd student-management-system
# add storage.py, commit and push to main first
git add storage.py && git commit -m "Initial commit: shared storage module"
git push origin main
git checkout -b member1-add-display-search
git add member1_ops.py && git commit -m "Member 1: add, display, search"
git push -u origin member1-add-display-search

# --- Member 2 (own laptop) ---
git clone <same repo url> && cd student-management-system
git checkout -b member2-update-delete
git add member2_ops.py && git commit -m "Member 2: update marks and delete"
git push -u origin member2-update-delete

# --- Merge (either member, or via Pull Requests on GitHub) ---
git checkout main && git pull origin main
git merge --no-ff member1-add-display-search -m "Merge member1 branch"
git merge --no-ff member2-update-delete -m "Merge member2 branch"
git add main.py test_students.py && git commit -m "Add menu driver and tests"
git push origin main
git log --graph --oneline --all          # screenshot this
```
Each member must commit with their own `git config user.name/email` so the contributions show separately.

## Task 4 – Expense Tracker (`task4_expense_tracker/`)
**Run:** `python3 main.py`, tests: `python3 test_expense.py`
* Student 1: `storage.py` (entry, validation, CSV storage). Student 2: `reports.py` (total, category-wise, monthly summary).
* `main.py` integrates both. Categories: Food, Travel, Shopping, Education.
* Use the same Git workflow as Task 3 (branches `student1-storage`, `student2-reports`, pull requests on GitHub, code review comments, merge to `main`).
* Suggested review notes to record: (1) amount must be > 0, (2) date format validation, (3) category normalised with `.title()`: these are the logic errors the AI review catches.

## Bug / test record template (required by the general instructions)
| Bug | Cause | Fix | Test result |
|---|---|---|---|
| (fill in what YOU find while running the original code) | | | |

> Honest note: the instructions say to run the original program first, find bugs yourself, and verify every AI suggestion.
> Run the vulnerable files, try the attacks yourself, and write the results in your own words.
