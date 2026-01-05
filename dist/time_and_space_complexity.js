"use strict";
// Time and Space Complexity
// What is Time Complexity?
// Time Complexity tells us how the running time of an algorithm grows as the input size increases.
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
let arr = [1, 2, 3, 4];
function sum(arr) {
    let total = 0;
    for (let num of arr)
        total += num;
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
for (let i = 0; i < n; i++) { }
// → O(n)
// Nested Loop
for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) { }
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
// Note 
// What does O(log n) actually mean?
// Each step drastically reduces the problem size.
// What happens in an O(log n) algorithm?
// You don’t process every element
// Instead, each operation shrinks the input
// Usually by a constant factor (often half)
// Example intuition
// n → n/2 → n/4 → n/8 → ... → 1
// Number of steps ≈ log₂ n
// Binary Search (classic example)
// What happens every step?
// Look at the middle
// Discard half the array
// n = 1,000,000
// steps ≈ log₂(1,000,000) ≈ 20
// You never touch most elements.
// Digit-based operations (why they are O(log n))
// Example
// while (n > 0) {
//   n = Math.floor(n / 10);
// }
// What’s happening?
// n → n/10 → n/100 → n/1000 → ...
// Each step removes one digit.
// Number of steps = number of digits
// Digits in n = log₁₀ n
// So:
// TC = O(log n)
// The common thing between binary search & digit problems
// Same core idea
// Problem size reduces exponentially each step
// Problem	Reduction
// Binary Search	n → n/2
// Digit loop	n → n/10
// Bit ops	n → n/2
// Different base, same logarithmic behavior.
// Why base doesn’t matter in Big-O
// log₂ n = log₁₀ n / log₁₀ 2
// Constant factor → ignored in Big-O.
// Mental model (remember this)
// O(n) → touch everything
// O(log n) → keep throwing big chunks away
// O(1) → no growth
// One-liner (interview gold)
// O(log n) algorithms reduce the input size by a constant factor in each step.
