// Batch 13: Linked List (Basics)

// A Linked List is a linear data structure where elements (nodes) are connected using pointers.
// Each node contains:
// [data | next]

// Unlike arrays:
// Not stored in contiguous memory
// Dynamic size
// Easy insert/delete

// Types of Linked Lists

// 1️ Singly Linked List
// Each node points to next node
// Last node → next = null

// 2️ Doubly Linked List
// Each node has:
// [prev | data | next]
// Can move forward & backward

// 3️ Circular Linked List
// Last node points back to head
// No null pointer

// Basic Operations (Very Important)
// 1️ Traversal
// while (current !== null) {
//   console.log(current.data);
//   current = current.next;
// }

// O(n)

// 2️ Insertion
// At Beginning
// New node → next = head
// head = new node
// O(1)

// At End
// Traverse to last
// last.next = new node
// O(n)

// After Given Node
// O(1)

// 3️ Deletion
// Delete Head
// head = head.next
// O(1)

// Delete By Value
// Find previous node
// previous.next = current.next
// O(n)

// Time Complexity Summary
// Operation	Time
// Access by index	O(n)
// Insert at head	O(1)
// Insert at tail	O(n)
// Delete head	O(1)
// Search	O(n)

// Advantages
// Dynamic size
// Easy insert/delete
// No memory wastage
// Useful in stacks, queues

// Disadvantages
// No random access
// Extra memory for pointers
// Cache unfriendly

// Important Interview Concepts
// Reverse a linked list
// Detect cycle (Floyd’s Algorithm)
// Find middle (Slow & Fast pointer)
// Remove nth node from end
// Merge two sorted lists

// Problem 1: Insert Node at Beginning
// Insert a new node at the beginning of a singly linked list.

// Input:
// Head → 2 → 3 → 4
// Insert: 1

// Output: 1 → 2 → 3 → 4

// Thinking
// Create new node
// Point newNode.next → head
// Update head

// TS Code | GFG: Insert node at beginning
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function insertAtBeginning(head: ListNode | null, val: number): ListNode {
  const newNode = new ListNode(val);
  newNode.next = head;
  return newNode;
}
// O(1)|O(1): Only pointer update

// Pattern: Head manipulation
// Optimization: Already optimal

// 1 Basic Console Log (Raw Structure)
// let head: ListNode | null = null;

// head = insertAtBeginning(head, 4);
// head = insertAtBeginning(head, 3);
// head = insertAtBeginning(head, 2);
// head = insertAtBeginning(head, 1);

// console.log(head);

// 2 Proper Way: Create a Print Function (BEST WAY)
function printList(head: ListNode | null): void {
  let current = head;
  let result = "";

  while (current != null) {
    result += current.val + "->";
    current = current.next;
  }

  result += "null";
  console.log(result);
}

// let head: ListNode | null = null;

// head = insertAtBeginning(head, 4);
// head = insertAtBeginning(head, 3);
// head = insertAtBeginning(head, 2);
// head = insertAtBeginning(head, 1);

// printList(head);

// 3 Convert To Array (Very Useful for Testing)
function toArray(head: ListNode | null): number[] {
  const arr: number[] = [];
  let current = head;

  while (current !== null) {
    arr.push(current.val);
    current = current.next;
  }

  return arr;
}

let head: ListNode | null = null;

head = insertAtBeginning(head, 5);
head = insertAtBeginning(head, 4);
head = insertAtBeginning(head, 3);
head = insertAtBeginning(head, 2);
head = insertAtBeginning(head, 1);

// console.log(toArray(head));

// Problem 2: Delete Node by Value
// Delete first occurrence of a value in linked list.

// Input:
// 1 → 2 → 3 → 4
// Delete: 3

// Output: 1 → 2 → 4

// Thinking
// Handle head separately
// Traverse with prev pointer
// Update links

// TS Code | LeetCode: #203 | GFG: Delete node
function deleteNode(head: ListNode | null, val: number): ListNode | null {
  if (!head) return null;

  if (head.val === val) return head.next;

  let prev = head;
  let curr = head.next;

  while (curr) {
    if (curr.val === val) {
      prev.next = curr.next;
      break;
    }
    prev = curr;
    curr = curr.next;
  }

  return head;
}

// O(n)|O(1): Traverse once
// deleteNode(head, 3);
// console.log(toArray(head));

// Pattern: Prev & curr pointer
// Optimization: Single traversal

// Problem 3: Reverse Linked List
// Reverse a singly linked list.

// Input: 1 → 2 → 3 → 4
// Output: 4 → 3 → 2 → 1

// Thinking
// Use three pointers:
// prev, curr, next
// Reverse link direction

// TS Code | LeetCode: #206 | GFG: Reverse a Linked List
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}
// O(n)|O(1): Only pointer updates
// console.log(toArray(reverseList(head)));

// Pattern: Three-pointer reversal
// Optimization: Iterative avoids recursion stack

// Problem 4: Find Middle of Linked List
// Find middle node of linked list.

// Input: 1 → 2 → 3 → 4 → 5
// Output: 3

// Thinking
// Use slow & fast pointer
// Fast moves 2 steps
// Slow moves 1 step
// When fast ends → slow at middle

// TS Code | LeetCode: #876 | GFG: Find middle element
function middleNode(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}
// O(n)|O(1): Single traversal
// console.log(middleNode(head));

// Pattern: Slow & Fast pointer
// Optimization: Most efficient approach

// Problem 5: Detect Cycle in Linked List
// Check if linked list contains a cycle.

// Thinking
// Use slow & fast pointer
// If they meet → cycle exists

// TS Code | LeetCode: #141 | GFG: Detect Loop in Linked List
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}
// O(n)|O(1): No extra data structure
console.log(hasCycle(head));

// Pattern: Floyd’s Cycle Detection
// Optimization: Optimal solution
