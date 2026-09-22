## TASK 1 – Tree: Hospital Department Hierarchy

## QUESTION

"""A hospital has a hierarchical structure. Represent the following using a Tree:
Hospital
├── Cardiology
│   ├── ICU
│   └── General Cardiology
├── Neurology
│   ├── Stroke Unit
│   └── Neuro ICU
└── Orthopedics
Requirements
1.	Create tree nodes.
2.	Add child departments.
3.	Display the hierarchy.
4.	Search for a department.
5.	Count total departments.
6.	Test at least three search cases.
"""

## PROMPT

"""create a python tree structure to represent a hospital department heirarchy. Implement adding child node, displaying the heirarchy, search for a department and counting nodes. Explain how a tree is different from a list and provide test cases. 
"""
## CODE

# import unittest


# class DepartmentNode:
# 	"""A node in the hospital department hierarchy."""

# 	def __init__(self, name):
# 		self.name = name
# 		self.children = []

# 	def add_child(self, child_name):
# 		"""Add and return a child department node."""
# 		child = DepartmentNode(child_name)
# 		self.children.append(child)
# 		return child

# 	def display(self, level=0):
# 		"""Return the hierarchy as an indented string."""
# 		lines = ["  " * level + self.name]
# 		for child in self.children:
# 			lines.append(child.display(level + 1))
# 		return "\n".join(lines)

# 	def find(self, department_name):
# 		"""Return the first department with the requested name, or None."""
# 		if self.name.lower() == department_name.lower():
# 			return self

# 		for child in self.children:
# 			result = child.find(department_name)
# 			if result is not None:
# 				return result
# 		return None

# 	def count_nodes(self):
# 		"""Return the number of departments in this tree."""
# 		return 1 + sum(child.count_nodes() for child in self.children)


# def build_hospital_hierarchy():
# 	"""Build a sample hospital hierarchy for demonstration and tests."""
# 	hospital = DepartmentNode("City Hospital")

# 	clinical = hospital.add_child("Clinical Services")
# 	clinical.add_child("Cardiology")
# 	clinical.add_child("Emergency Department")

# 	support = hospital.add_child("Support Services")
# 	support.add_child("Pharmacy")
# 	support.add_child("Medical Records")

# 	return hospital


# class TestDepartmentTree(unittest.TestCase):
# 	def setUp(self):
# 		self.hospital = build_hospital_hierarchy()

# 	def test_add_child(self):
# 		department = self.hospital.add_child("Human Resources")
# 		self.assertEqual(department.name, "Human Resources")
# 		self.assertIn(department, self.hospital.children)

# 	def test_display_hierarchy(self):
# 		expected = (
# 			"City Hospital\n"
# 			"  Clinical Services\n"
# 			"    Cardiology\n"
# 			"    Emergency Department\n"
# 			"  Support Services\n"
# 			"    Pharmacy\n"
# 			"    Medical Records"
# 		)
# 		self.assertEqual(self.hospital.display(), expected)

# 	def test_search_existing_department(self):
# 		result = self.hospital.find("pharmacy")
# 		self.assertIsNotNone(result)
# 		self.assertEqual(result.name, "Pharmacy")

# 	def test_search_missing_department(self):
# 		self.assertIsNone(self.hospital.find("Laboratory"))

# 	def test_count_nodes(self):
# 		self.assertEqual(self.hospital.count_nodes(), 7)


# if __name__ == "__main__":
# 	hospital = build_hospital_hierarchy()
# 	print("Hospital Department Hierarchy")
# 	print(hospital.display())
# 	print("\nSearch for 'Pharmacy':", hospital.find("Pharmacy").name)
# 	print("Total departments:", hospital.count_nodes())
# 	print("\nRunning test cases...")
# 	unittest.main()

## OUTPUT

"""Hospital Department Hierarchy
City Hospital
  Clinical Services
    Cardiology
    Emergency Department
  Support Services
    Pharmacy
    Medical Records

Search for 'Pharmacy': Pharmacy
Total departments: 7
Running test cases...
.....
----------------------------------------------------------------------
Ran 5 tests in 0.001s
"""

## OBSERVATION

""" """


## TASK 2 --> Graph: Hospital Route Finder

## QUESTION

"""Represent hospital locations as a Graph. Each location is a node and each connection is an edge.
Reception ─── Pharmacy
    │             │
    │             │
   ICU ─────── Emergency
    │
 Laboratory
Requirements
7.	Add hospital locations as nodes.
8.	Add connections as edges.
9.	Display the graph using an adjacency list.
10.	Check whether two locations are connected.
11.	Find a route using BFS or DFS.
12.	Test at least three source-destination pairs.
"""

## PROMPT

""" Help me write a beginner-friendly Python program for a “Hospital Route Finder” using graphs. Represent locations (Reception, Pharmacy, ICU, Emergency, Laboratory) as nodes and their connections as undirected edges, then show the graph as an adjacency list. Implement functions to check if two locations are connected and to find a route between them using BFS (or DFS), and test with at least three source–destination pairs. Add a short comment explaining why a graph is more suitable than a simple list for this problem. """

## CODE 

# class HospitalGraph:
# 	"""Undirected graph representing hospital locations and routes."""

# 	def __init__(self):
# 		self.adjacency_list = {}

# 	def add_location(self, location):
# 		"""Add a location to the graph."""
# 		self.adjacency_list.setdefault(location, [])

# 	def add_connection(self, first, second):
# 		"""Add an undirected connection between two locations."""
# 		self.add_location(first)
# 		self.add_location(second)
# 		if second not in self.adjacency_list[first]:
# 			self.adjacency_list[first].append(second)
# 		if first not in self.adjacency_list[second]:
# 			self.adjacency_list[second].append(first)

# 	def display(self):
# 		"""Return the graph as an adjacency list."""
# 		return "\n".join(
# 			f"{location}: {', '.join(neighbours)}"
# 			for location, neighbours in self.adjacency_list.items()
# 		)

# 	def find_route(self, start, destination):
# 		"""Find a route using breadth-first search (BFS)."""
# 		if start not in self.adjacency_list or destination not in self.adjacency_list:
# 			return None

# 		queue = [(start, [start])]
# 		visited = {start}
# 		while queue:
# 			current, route = queue.pop(0)
# 			if current == destination:
# 				return route
# 			for neighbour in self.adjacency_list[current]:
# 				if neighbour not in visited:
# 					visited.add(neighbour)
# 					queue.append((neighbour, route + [neighbour]))
# 		return None

# 	def connected(self, first, second):
# 		"""Return whether a route exists between two locations."""
# 		return self.find_route(first, second) is not None


# def build_hospital_graph():
# 	# A graph is better than a list because it represents relationships between locations.
# 	graph = HospitalGraph()
# 	for location in ("Reception", "Pharmacy", "ICU", "Emergency", "Laboratory"):
# 		graph.add_location(location)

# 	for first, second in (
# 		("Reception", "Pharmacy"),
# 		("Reception", "ICU"),
# 		("Pharmacy", "Emergency"),
# 		("ICU", "Emergency"),
# 		("ICU", "Laboratory"),
# 	):
# 		graph.add_connection(first, second)
# 	return graph


# if __name__ == "__main__":
# 	graph = build_hospital_graph()
# 	print("\nHospital Route Finder")
# 	print(graph.display())

# 	# Test three source-destination pairs.
# 	for start, destination in (
# 		("Reception", "Emergency"),
# 		("Reception", "Laboratory"),
# 		("Pharmacy", "ICU"),
# 	):
# 		route = graph.find_route(start, destination)
# 		print(f"\n{start} to {destination}")
# 		print("Route:", " -> ".join(route) if route else "No route found")
# 		print("Connected:", graph.connected(start, destination))


## OUTPUT

"""Hospital Route Finder
Reception: Pharmacy, ICU
Pharmacy: Reception, Emergency
ICU: Reception, Emergency, Laboratory
Emergency: Pharmacy, ICU
Laboratory: ICU

Reception to Emergency
Route: Reception -> Pharmacy -> Emergency
Connected: True

Reception to Laboratory
Route: Reception -> ICU -> Laboratory
Connected: True

Pharmacy to ICU
Route: Pharmacy -> Reception -> ICU
Connected: True"""

## OBSERVATION 

"""Representing hospital locations as a graph allows each room to be a node and each corridor/connection to be an edge, naturally modeling the real layout. Using an adjacency list makes it easy to see which locations are directly connected and supports efficient traversal with BFS/DFS to find routes. Compared to a simple list, a graph handles multiple connections per location and enables systematic pathfinding instead of just storing locations in a linear order."""



## TASK 3 – Heap: Emergency Patient Priority\

## QUESTION

"""In an emergency department, patients are treated according to severity rather than simple arrival order. Implement a Priority Queue using a Heap.
Priority 1 → Critical
Priority 2 → Serious
Priority 3 → Moderate
Priority 4 → Normal
Requirements
13.	Add a patient with a priority value.
14.	View the highest-priority patient.
15.	Remove/serve the highest-priority patient.
16.	Display waiting patients.
17.	Handle at least one tie in priority appropriately.
18.	Test insertion and removal operations.
"""

## PROMPT

"""Help me write a beginner-friendly Python program that implements a priority queue using a heap for an emergency department. Patients should have a name and a priority (1 = Critical, 2 = Serious, 3 = Moderate, 4 = Normal). Support adding a patient, viewing and removing the highest-priority patient, displaying all waiting patients, and handling ties in priority in a fair way (e.g., by arrival order). Include a small test that adds several patients and then serves them to show the order."""


## CODE

# import heapq


# class EmergencyPriorityQueue:
#   """A min-heap where a smaller priority number is more urgent."""

#   def __init__(self):
#     self.waiting_patients = []
#     self.arrival_number = 0

#   def add_patient(self, name, priority):
#     if priority not in (1, 2, 3, 4):
#       raise ValueError("Priority must be between 1 and 4.")

#     # arrival_number breaks ties fairly: earlier arrivals are served first.
#     patient = (priority, self.arrival_number, name)
#     heapq.heappush(self.waiting_patients, patient)
#     self.arrival_number += 1

#   def view_highest_priority(self):
#     if not self.waiting_patients:
#       return None
#     return self.waiting_patients[0]

#   def serve_patient(self):
#     if not self.waiting_patients:
#       return None
#     return heapq.heappop(self.waiting_patients)

#   def display_waiting_patients(self):
#     # Sorting a copy shows heap contents in treatment order without removing them.
#     return sorted(self.waiting_patients)


# def show_patient(patient):
#   if patient is None:
#     return "No patients waiting"
#   priority, arrival_number, name = patient
#   priority_names = {1: "Critical", 2: "Serious", 3: "Moderate", 4: "Normal"}
#   return f"{name} - Priority {priority} ({priority_names[priority]})"


# if __name__ == "__main__":
#   emergency_queue = EmergencyPriorityQueue()
#   emergency_queue.add_patient("Aisha", 2)
#   emergency_queue.add_patient("Ben", 1)
#   emergency_queue.add_patient("Chloe", 2)  # Tie: Aisha arrived first.
#   emergency_queue.add_patient("Dylan", 4)

#   print("Waiting patients:")
#   for patient in emergency_queue.display_waiting_patients():
#     print(show_patient(patient))

#   print("\nHighest priority:", show_patient(emergency_queue.view_highest_priority()))
#   print("\nServing order:")
#   while emergency_queue.waiting_patients:
#     print("Served:", show_patient(emergency_queue.serve_patient()))


## OUTPUT 

"""Waiting patients:
Ben - Priority 1 (Critical)
Aisha - Priority 2 (Serious)
Chloe - Priority 2 (Serious)
Dylan - Priority 4 (Normal)

Highest priority: Ben - Priority 1 (Critical)

Serving order:
Served: Ben - Priority 1 (Critical)
Served: Aisha - Priority 2 (Serious)
Served: Chloe - Priority 2 (Serious)
Served: Dylan - Priority 4 (Normal)"""

## OBSERVATION

"""Using a priority queue based on a heap ensures that the most critical patients are always served first, regardless of arrival time, which matches real emergency triage needs. It provides efficient insertion and removal of the highest-priority element (O(log n)) while maintaining a clear ordering by severity. Handling ties by considering arrival order adds fairness within the same priority level, making the system both urgent and equitable.
"""



## TASK 4 – Trie: Medical Word / Drug Search

## QUESTION 

"""A hospital application needs an autocomplete feature. When the user enters a prefix such as 'car', the system should suggest matching medical terms.
Input prefix: "car"

Possible output:
cardiology
cardiac
carcinoma
care
Requirements
19.	Create a Trie.
20.	Insert medical words.
21.	Search for an exact word.
22.	Check whether a prefix exists.
23.	Display/autocomplete words beginning with a prefix.
24.	Test at least three different prefixes.
Challenge Question
Compare searching medical words using a list with searching using a Trie. Explain the advantages and disadvantages.
"""

## PROMPT

"""Help me write a beginner-friendly Python program that implements a Trie for an autocomplete feature in a hospital application. Insert a set of medical terms, then support searching for an exact word, checking if a prefix exists, and displaying all words that start with a given prefix. Test the program with at least three different prefixes (for example, "car", "he", "di") and show the suggestions. Add a short comment comparing searching medical words using a plain list versus using a Trie, focusing on speed and scalability."""


## CODE

class TrieNode:
  def __init__(self):
    self.children = {}
    self.is_word = False


class MedicalTrie:
  def __init__(self):
    self.root = TrieNode()

  def insert(self, word):
    node = self.root
    for letter in word.lower():
      if letter not in node.children:
        node.children[letter] = TrieNode()
      node = node.children[letter]
    node.is_word = True

  def search(self, word):
    node = self._find_node(word)
    return node is not None and node.is_word

  def starts_with(self, prefix):
    return self._find_node(prefix) is not None

  def suggestions(self, prefix):
    prefix = prefix.lower()
    node = self._find_node(prefix)
    if node is None:
      return []

    results = []

    def collect(current, word):
      if current.is_word:
        results.append(word)
      for letter in sorted(current.children):
        collect(current.children[letter], word + letter)

    collect(node, prefix)
    return results

  def _find_node(self, text):
    node = self.root
    for letter in text.lower():
      if letter not in node.children:
        return None
      node = node.children[letter]
    return node


if __name__ == "__main__":
  medical_words = [
      "cardiology", "cardiac", "carboplatin", "heart", "heparin",
      "hepatitis", "diabetes", "diagnosis", "dialysis"
  ]
  medical_trie = MedicalTrie()
  for word in medical_words:
    medical_trie.insert(word)

  print("Exact search for 'diabetes':", medical_trie.search("diabetes"))
  print("Prefix 'car' exists:", medical_trie.starts_with("car"))
  for prefix in ("car", "he", "di"):
    print(f"Suggestions for '{prefix}':", medical_trie.suggestions(prefix))

  # A list scans every word, while a Trie follows the prefix path, so it is
  # faster and more scalable for autocomplete in a large medical dictionary.

## OUTPUT 

"""Exact search for 'diabetes': True
Prefix 'car' exists: True
Suggestions for 'car': ['carboplatin', 'cardiac', 'cardiology']
Suggestions for 'he': ['heart', 'heparin', 'hepatitis']
Suggestions for 'di': ['diabetes', 'diagnosis', 'dialysis']"""


## OBSERVATION

"""A Trie finds complete medical terms and prefixes by following one character
at a time. It is more efficient and scalable than scanning every item in a
plain list when the hospital dictionary contains many terms."""


## TASK 5 – AI Decision Challenge: Choose the Correct 

## QUESTION

"""For each hospital-software scenario, choose the most appropriate non-linear data structure: Tree, Graph, Heap, or Trie.
Scenario	
Your Choice + Reason
Hospital department hierarchy	
Finding a route between hospital rooms	
Emergency patients based on severity	
Autocomplete medical terms	
Frequently finding the highest-priority task	
"""

## SOLUTION 

"""Scenario	Your Choice + Reason
Hospital department hierarchy	Tree – Represents a clear parent–child hierarchy (e.g., Hospital → Departments → Units). Main operation: traversal (e.g., finding sub-departments). Typical complexity: O(n) for full traversal, O(h) to reach a node at height h.
Finding a route between hospital rooms	Graph – Rooms and corridors form a network with multiple possible paths. Main operation: pathfinding (BFS/DFS). Typical complexity: O(V + E) for BFS/DFS on V vertices and E edges.
Emergency patients based on severity	Heap (Priority Queue) – Always need the highest-priority (most severe) patient quickly. Main operation: insert and extract-max/min. Typical complexity: O(log n) for insert and remove, O(1) to peek highest priority.
Autocomplete medical terms	Trie – Efficient prefix-based search for suggestions. Main operation: prefix search and enumeration of completions. Typical complexity: O(m) to check a prefix of length m, plus O(k) to output k suggestions.
Frequently finding the highest-priority task	Heap (Priority Queue) – Optimized for repeatedly getting and removing the maximum/minimum priority task. Main operation: extract-max/min. Typical complexity: O(log n) for removal, O(1) to peek."""


## STUDENT ACTIVITY

"""Choose the data structure

As filled in the table above.

Explain why it is appropriate

Hierarchy → Tree (natural parent–child structure).

Routes → Graph (multiple connections, cycles possible).

Emergency triage / highest-priority task → Heap (fast access to extreme element).

Autocomplete → Trie (fast prefix operations).

Identify the main operation

Tree: traversal / search in hierarchy.

Graph: pathfinding (BFS/DFS).

Heap: insert, peek, and remove highest-priority element.

Trie: prefix search and listing completions.

State the expected/typical Big-O complexity

Tree traversal: O(n).

Graph BFS/DFS: O(V + E).

Heap insert/remove: O(log n); peek: O(1).

Trie prefix search: O(m + k), where m = prefix length, k = number of suggestions.

Ask AI for a recommendation

AI would typically recommend the same: Tree, Graph, Heap, Trie, Heap respectively, for these scenarios.

Compare your choice with AI's recommendation

In this case, your choices match AI’s standard recommendations for these classic use-cases.

If you disagree with AI, explain why

No disagreement needed here; the mappings are standard and well-justified by the operations and complexities.

"""