import os, tempfile, member1_ops as m1, member2_ops as m2

p = os.path.join(tempfile.mkdtemp(), "t.json")
m1.add_student("S1", "Darshan", "CSE-AIML", 90, p)
m1.add_student("S2", "Ravi", "CSE", 75, p)
m1.display_students(p)
assert m1.search_student("S1", p)["name"] == "Darshan"
assert m1.search_student("S9", p) is None
m2.update_marks("S2", 82, p);  assert m1.search_student("S2", p)["marks"] == 82
m2.delete_student("S1", p);    assert m1.search_student("S1", p) is None
for bad in (lambda: m1.add_student("S2", "X", "Y", 50, p),     # duplicate
            lambda: m1.add_student("S3", "X", "Y", 150, p),    # bad marks
            lambda: m2.update_marks("NOPE", 50, p),            # missing id
            lambda: m2.delete_student("NOPE", p)):             # missing id
    try: bad(); raise SystemExit("FAILED: no error raised")
    except (ValueError, KeyError): pass
print("\nAll tests passed.")
