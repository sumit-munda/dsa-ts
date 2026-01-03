// Time and Space Complexity

// What is Time Complexity?
// Time Complexity tells us how the running time of an algorithm grow as the input size increase.
// It does not measure actual seconds
// It measures number of operations
// It focuses on growth rate, not exact time

// Example
let n = 5;
for (let i = 0; i < n; i++) {
  console.log(i);
}

// Runs n times
// Time Complexity → O(n)

// Why Time Complexity is Important?
// Helps compare two solution
// Predicts performance for large input
// Interviewers care more about efficient logic

// What is Space Complexity?
// Space Complexity tells us how much extra memory an algorithm uses.
// Includes:
// Variables
// Data structures (arrays, object)
// Recursive call stack

// Example
let arr = [1, 2, 3, 4]
function sum(arr: number[]) {
  let total = 0;
  for (let num of arr) total += num;
  return total;
}

// Uses only one variable
// Space Complexity → O(1)

// Important Note on Space
// Input space is not counted
// Only extra space used by the algorithm

// Time vs Space Trade-Off
// Faster alogithm may use more memory
// Less memory may mean slower execution
// Goal: Balanced optimization

// Big-O Notation Basics
// Big-O describes the worst-case performance of an algorithm.

// It ignores:
// Constants
// Lower-order terms

// Example
// O(2n + 5) → O(n)
// O(n² + n) → O(n²)

// Common Big-O Notations
// Big-O	Meaning	    Example
// O(1)	    Constant	Access array index
// O(log n)	Logarithmic	Binary Search
// O(n)	    Linear	    Single loop
// O(n log n)Efficient sorting	Merge Sort
// O(n²)	Quadratic	Nested loops
// O(2ⁿ)	Exponential	Recursion brute force

// How to Calculate Time Complexity (Basics)
// Single Loop
for (let i = 0; i < n; i++) {}

// → O(n)

// Nested Loop
for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) {}

// → O(n²)

// Loop + Function Call
// Take highest order
// Ignore constants

// Worst, Best & Average Case
// Worst Case: Maximum time taken
// Best Case: Minimum time taken
// Average Case: Typical scenario

// Big-O always represents Worst Case

// Key Beginner Rules (Must Remember)
// Drop constants → O(2n) → O(n)
// Nested loops multiply
// Sequential loops add
// Worst case matters most
// Extra memory = higher space complexity

// Batch 3 Notes Summary
// Time Complexity → How fast
// Space Complexity → How much memory
// Big-O → Worst case growth
// Focus on patterns, not formulas

