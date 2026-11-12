"""SECURE file-processing tool with validation, safe subprocess use, error handling."""
import re
import subprocess
from pathlib import Path

BASE_DIR = (Path(__file__).parent / "safe_files").resolve()
ALLOWED_EXT = {".txt", ".csv", ".log"}
NAME_PATTERN = re.compile(r"^[A-Za-z0-9_\-]+\.[A-Za-z0-9]+$")   # no slashes, spaces, ; | & etc.
MAX_SIZE = 1_000_000  # 1 MB


def validate_filename(name: str) -> Path:
    """Return a safe resolved Path inside BASE_DIR or raise ValueError."""
    if not isinstance(name, str) or not name.strip():
        raise ValueError("File name cannot be empty.")
    name = name.strip()
    if len(name) > 100:
        raise ValueError("File name too long.")
    if not NAME_PATTERN.fullmatch(name):
        raise ValueError("Invalid characters in file name (only letters, digits, _ - and one extension allowed).")
    path = (BASE_DIR / name).resolve()
    if path.parent != BASE_DIR:                      # blocks path traversal / symlink escape
        raise ValueError("Access outside the allowed folder is not permitted.")
    if path.suffix.lower() not in ALLOWED_EXT:
        raise ValueError(f"File type not allowed. Allowed: {sorted(ALLOWED_EXT)}")
    return path


def process_file(name: str) -> dict:
    path = validate_filename(name)
    if not path.is_file():
        raise FileNotFoundError(f"'{name}' does not exist.")
    if path.stat().st_size > MAX_SIZE:
        raise ValueError("File too large.")
    # Safe subprocess: argument LIST, shell=False, timeout, fixed command
    result = subprocess.run(["wc", "-l", "-w", "-c", str(path)],
                            capture_output=True, text=True, timeout=5, check=True, shell=False)
    return {"content": path.read_text(encoding="utf-8", errors="replace"),
            "wc": result.stdout.split()[:3]}


def main():
    name = input("Enter file name: ")
    try:
        out = process_file(name)
        print("--- File content ---")
        print(out["content"])
        lines, words, chars = out["wc"]
        print(f"Lines: {lines} | Words: {words} | Bytes: {chars}")
    except ValueError as e:
        print("Invalid input:", e)
    except FileNotFoundError as e:
        print("Error:", e)
    except PermissionError:
        print("Error: permission denied.")
    except subprocess.SubprocessError as e:
        print("Error running command:", e)
    except Exception as e:                       # last resort - do not leak internals
        print("Unexpected error:", type(e).__name__)


if __name__ == "__main__":
    main()
