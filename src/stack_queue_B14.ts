// Batch 14: Stack & Queue

// STACK
// A Stack follows: LIFO → Last In, First Out

// Think of:
// Plates stacked
// Browser back button

// Basic Operations
// Operation	Description	        Time
// push()	    Insert element	    O(1)
// pop()	    Remove top element	O(1)
// peek()/top()	View top element	O(1)
// isEmpty()	Check empty	        O(1)

// Implementation

// Using Array (Most Common)
// let stack: number[] = [];
// stack.push(10);
// stack.push(20);
// stack.pop();

// Using Linked List
// Insert/Delete at head
// O(1) operations

// QUEUE
// A Queue follows: FIFO → First In, First Out

// Think of:
// Line at ticket counter
// Printer queue

// Basic Operations
// Operation	Description	        Time
// enqueue()	Insert at rear	    O(1)
// dequeue()	Remove from front	O(1)
// front()	View front element	    O(1)
// isEmpty()	Check empty	        O(1)

// Implementation

// Using Array (Simple but inefficient if shift())
// let queue: number[] = [];
// queue.push(10);
// queue.shift();

// ⚠️ shift() is O(n)

// Using Linked List (Efficient)
// Maintain:
// head (front)
// tail (rear)
// All operations → O(1)

// Types of Queues

// 1️ Circular Queue
// Uses modulo
// Avoids wasted space

// 2️ Deque (Double Ended Queue)
// Insert/remove both ends

// 3️ Priority Queue
// Elements removed based on priority
// Implemented using Heap

// Stack vs Queue (Quick Comparison)
// Stack	                Queue
// LIFO	                    FIFO
// One end access	        Two ends access
// Used in recursion	    Used in BFS

// When To Use What?
// Situation	                Use
// Reverse order needed	        Stack
// Level order traversal	    Queue
// Undo operations	            Stack
// Processing in arrival order	Queue

// STACK SECTION

// Problem 1: Implement Stack Using Array
// Implement stack with push, pop, peek, isEmpty.

// Thinking
// Stack follows LIFO
// Use array
// push → add to end
// pop → remove from end

// TS Code | LeetCode: #225 (variant) | GFG: Implement Stack
class Stack {
  private items: number[] = [];

  push(val: number): void {
    this.items.push(val);
  }

  pop(): number | undefined {
    return this.items.pop();
  }

  peek(): number | undefined {
    return this.items[this.items.length - 1]; // top element
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
// O(1) per operation|O(n): Stack stores elements

// Pattern: LIFO structure
// Optimization: Native array already optimal

// Problem 2: Valid Parentheses
// Check if parentheses string is valid.

// Input: "()[]{}"
// Output: true

// Thinking
// Use stack
// Push opening brackets
// On closing → check top
// Mismatch → false

// TS Code | LeetCode: #20 | GFG: Valid Parentheses
function isValid(s: string) {
  const stack: string[] = [];
  const map = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  for (let ch of s) {
    if (map.has(ch)) {
      const top = stack.pop();
      if (top !== map.get(ch)) return false;
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
}
// O(n)|O(n): Stack stores brackets
// console.log(isValid("()[]{}"));

// Pattern: Matching pairs using stack
// Optimization: Single pass

// Problem 3: Next Greater Element
// Find next greater element for each element.

// Input: [2,1,2,4,3]
// Output: [4,2,4,-1,-1]

// Thinking
// Use stack
// Maintain decreasing stack
// When current > stack top → resolve

// TS Code |LeetCode: #496 | GFG: Next Greater Element
function nextGreaterElement(nums: number[]): number[] {
  const stack: number[] = [];
  const result = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop()!;
      result[index] = nums[i];
    }
    stack.push(i);
  }

  return result;
}

// O(n)|O(n): Each element pushed & popped once
// console.log(nextGreaterElement([2,1,2,4,3]));

// Pattern: Monotonic stack
// Optimization: Avoid nested loops

// QUEUE SECTION

// Problem 4: Implement Queue Using Array
// Implement queue with enqueue, dequeue.

// Thinking
// Queue follows FIFO
// Add at end
// Remove from front

// TS Code | LeetCode: #232 (variant) | GFG: Implement Queue
class Queue {
  private items: number[] = [];

  enqueue(val: number): void {
    this.items.push(val);
  }

  dequeue(): number | undefined {
    return this.items.shift(); // O(n)
  }

  peek(): number | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// O(n) for dequeue (shift)|O(n): Array shift is costly

// Pattern: FIFO structure
// Optimization: Use linked list for O(1) dequeue

// Problem 5: Sliding Window Maximum
// Find maximum in each window of size k.

// Input:
// nums = [1,3,-1,-3,5,3,6,7]
// k = 3

// Output: [3,3,5,5,6,7]

// Thinking
// Use deque
// Maintain decreasing order
// Front always max

// TS Code | LeetCode: #239 | GFG: Sliding Window Maximum
function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = [];
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
// O(n)|O(k): Each index processed once

// Pattern: Monotonic deque
// Optimization: Avoid brute force O(nk)
