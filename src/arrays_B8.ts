// BATCH 8 – PREFIX SUM

// Problem 1: Prefix Sum Array
// Create prefix sum array.

// Input: arr = [1, 2, 3, 4]
// Output: [1, 3, 6, 10]

// Thinking
// First element stays same
// Each element = previous prefix + current value

// TS Code | GFG: Prefix Sum
function prefixSumBF(arr: number[]): number[] {
  let k = 1;

  for (let i = 1; i < arr.length; i++) {
    arr[k] = arr[i] + arr[k - 1];
    k++;
  }

  return arr;
}
// O(n)|O(1): Single traversal, if mutability allowed
function prefixSumBF2(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }

  return arr;
}
// O(n)|O(1): Single traversal, if mutability allowed

function prefixSum(arr: number[]): number[] {
  const prefix: number[] = new Array(arr.length);
  prefix[0] = arr[0];

  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }

  return prefix;
}
// O(n)|O(n): Extra array created
// Optimization: Can modify original array if allowed

// console.log(prefixSumBF([1, 2, 3, 4]));
// console.log(prefixSum([1, 2, 3, 4]));
// Pattern: Running cumulative sum

// Problem 2: Range Sum Query
// Return sum from index l to r.

// Input: arr = [-2, 0, 3, -5, 2, -1]
// l = 0, r = 2
// Output: 1

// Thinking
// Precompute prefix sum
// Range sum = prefix[r] - prefix[l-1]

// TS Code | LeetCode: #303 | GFG: Range Sum Query
function sumRangeBF(nums: number[], left: number, right: number): number {
  let sum = 0;
  for (let i = left; i <= right; i++) {
    sum += nums[i];
  }

  return sum;
}
// O(n)|O(1): Single traversal

class NumArray {
  prefix: number[];

  constructor(nums: number[]) {
    this.prefix = new Array(nums.length);
    this.prefix[0] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] = this.prefix[i - 1] + nums[i];
    }
  }

  sumRange(left: number, right: number): number {
    if (left === 0) return this.prefix[right];
    return this.prefix[right] - this.prefix[left - 1];
  }
}
//Constructor: O(n)|O(1) per query|O(n): Precomputation allows constant-time queries
// Optimization: Multiple queries become efficient

// console.log(sumRangeBF([-2, 0, 3, -5, 2, -1], 0, 2));
// const query = new NumArray([-2, 0, 3, -5, 2, -1]);
// console.log(query.sumRange(0, 2));
// Pattern: Prefix difference

// Problem 3: Subarray Sum Equals K (With Negatives)
// Count subarrays whose sum equals k.

// Input: nums = [1,1,1], k = 2
// Output: 2

// Thinking
// Use running prefix sum
// Store frequency of prefix sums in map
// If (currentSum - k) exists → valid subarray

// TS Code | LeetCode: #560 | GFG: Subarray Sum Equals K
function subarraySum(nums: number[], k: number): number {
  const map = new Map<number, number>();
  map.set(0, 1); //1st elem is k, sum - k = 0, count = 1

  let sum = 0;
  let count = 0;

  for (let num of nums) {
    sum += num; // prefix sum dynamically

    // We want: prefix[i] - prefix[j] = k
    // Rearrange: prefix[j] = prefix[i] - k

    // So at every index i:
    // If we have seen (sum - k) before at index j,
    // then subarray (j+1 → i) has sum k.

    // Here we store the count of prefix sum
    if (map.has(sum - k)) {
      count += map.get(sum - k)!;
    }

    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return count;
}
// O(n)|O(n): Hash map stores prefix frequencies
// Optimization: Works even with negatives (sliding window fails here)

// Using: prefix[i] - prefix[j]
// we can compute any subarray sum in O(1).
// We want subarray sum = k

// console.log(subarraySum([1, 1, 1], 2));
// Pattern: Prefix sum + hashing

// Problem 4: Longest Subarray with Sum K (With Negatives)
// Find longest subarray with sum = k.

// Input: arr = [10, 5, 2, 7, 1, 9], k = 15
// Output: 4

// Thinking
// Track prefix sum
// Store first occurrence of each prefix
// If (sum - k) exists → update max length

// TS Code | GFG: Longest Subarray with Sum K
function longestSubarraySumK(nums: number[], k: number): number {
  const map = new Map<number, number>();
  let sum = 0;
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]; // prefix sum

    // We want: prefix[i] - prefix[j] = k
    // Rearrange: prefix[j] = prefix[i] - k

    // So at every index i:
    // If we have seen (sum - k) before at index j,
    // then subarray (j+1 → i) has sum k.

    // Length of that subarray: i - j
    // We want: prefix[i] - prefix[j] = k
    // Rearrange: prefix[j] = prefix[i] - k

    // Here we store the index of the prefix sum: i or j
    if (sum === k) {
      maxLen = i + 1;
    }

    if (map.has(sum - k)) {
      maxLen = Math.max(maxLen, i - map.get(sum - k)!);
    }

    if (!map.has(sum)) {
      map.set(sum, i);
    }
  }

  return maxLen;
}
// O(n)|O(n): Map stores prefix index
// Optimization: Handles negative numbers

// console.log(longestSubarraySumK([10, 5, 2, 7, 1, 9], 15));
// Pattern: Prefix + first occurrence

// Problem 5: Equilibrium Index
// Find index where left sum = right sum.

// Input: [1,3,5,2,2]
// Output: 2

// Thinking
// Calculate total sum
// Traverse and track left sum
// Right sum = total - left - current

// TS Code | GFG: Equilibrium Point
function equilibriumIndex(arr: number[]): number {
  const total = arr.reduce((a, b) => a + b, 0);
  let leftSum = 0;

  for (let i = 0; i < arr.length; i++) {
    const rightSum = total - leftSum - arr[i];

    if (leftSum === rightSum) return i;

    leftSum += arr[i];
  }

  return -1;
}
// O(n)|O(1): Only running sums
// Optimization: No extra storage

// console.log(equilibriumIndex([1, 3, 5, 2, 2]));
// Pattern: Prefix concept without extra array

// BATCH 9 – RECURSION (BASICS)

// Recursion is when a function calls itself to solve smaller versions of the same problem.

// Two Mandatory Parts
// Every recursive function must have:
// Base Case → stopping condition
// Recursive Case → function calling itself with smaller input

// Without a base case → infinite recursion (stack overflow)

// Simple Example: Factorial
// 5! = 5 × 4 × 3 × 2 × 1

// function factorial(n: number): number {
//   if (n === 0) return 1;   // Base case
//   return n * factorial(n - 1);  // Recursive call
// }

// How it runs:
// factorial(3)
// = 3 * factorial(2)
// = 3 * 2 * factorial(1)
// = 3 * 2 * 1 * factorial(0)
// = 3 * 2 * 1 * 1
// = 6

// Another Example: Print 1 to N
// function print(n: number) {
//   if (n === 0) return;
//   print(n - 1);
//   console.log(n);
// }

// What Happens Internally?
// Every recursive call is stored in the call stack.

// Example for factorial(3): order up the call stack
// factorial(3)
// factorial(2)
// factorial(1)
// factorial(0)
// Then they resolve backward.

// Types of Recursion
// Direct Recursion: Function calls itself.
// Indirect Recursion: A → B → A
// Tail Recursion: Recursive call is last statement.
// Tree Recursion: Function calls itself multiple times (like Fibonacci).

// Common Mistakes
// No base case
// Wrong base case
// Infinite recursion
// Stack overflow
// Not reducing input size

// Time Complexity
// Depends on:
// How many recursive calls
// How deep recursion goes

// Space complexity = maximum depth of recursion

// Examples:
// Problem	          Time
// Factorial	        O(n)
// Fibonacci (naive)	O(2ⁿ)
// Binary Search	    O(log n)

// Mental Model
// Think of recursion as:
// “Break problem → solve smaller problem → combine result.”

// When to Use Recursion?
// Tree problems
// Backtracking
// Divide & conquer
// DFS
// Subsets / permutations

// Problem 1: Print Numbers from 1 to N
// Print numbers from 1 to N using recursion.

// Input: n = 5
// Output: 1 2 3 4 5

// Thinking
// Base case → stop at 0
// First call recursion
// Then print number (for correct order)

// TS Code | GFG: Print 1 to N using recursion
function printOneToN(n: number): void {
  if (n === 0) return; // base case must

  printOneToN(n - 1); // tree recursion
  console.log(n);
}
// O(n)|O(n)(recursion stack): n recursive calls

// printOneToN(5);
// Pattern: Backtracking recursion

// Problem 2: Print N to 1

// Input: n = 5
// Output: 5 4 3 2 1

// Thinking
// Print first
// Then recursive call

// TS Code | GFG: Print N to 1
function printNToOne(n: number): void {
  if (n === 0) return;

  console.log(n);
  printNToOne(n - 1);
}
// O(n)|O(n)

// printNToOne(5);
// Pattern: Forward recursion

// Problem 3: Factorial

// Input: n = 5
// Output: 120

// Thinking
// Base case → 0! = 1
// n! = n × (n-1)!

// TS Code | GFG: Factorial using recursion
function factorial(n: number): number {
  if (n === 0) return 1;

  return n * factorial(n - 1);
}
// O(n)|O(n)

// console.log(factorial(5));
// Pattern: Mathematical recursion

// Problem 4: Sum of First N Numbers

// Input: n = 5
// Output: 15

// Thinking
// Base case → sum(0) = 0
// sum(n) = n + sum(n-1)

// TS Code| GFG: Sum of first N numbers
function sumN(n: number): number {
  if (n === 0) return 0;

  return n + sumN(n - 1);
}
// O(n)|O(n)

// console.log(sumN(5));
// Pattern: Recursive accumulation

// Problem 5: Reverse an Array (Recursively)

// Input: [1,2,3,4]
// Output: [4,3,2,1]

// Thinking
// Swap first & last
// Recur for inner subarray

// TS Code | GFG: Reverse array using recursion
function reverseArray(arr: number[], left: number, right: number): void {
  if (left >= right) return;

  [arr[left], arr[right]] = [arr[right], arr[left]];
  reverseArray(arr, left + 1, right - 1);
}
// O(n)|O(n)

// const nums = [1, 2, 3, 4];
// reverseArray(nums, 0, nums.length - 1);
// console.log(nums);
// Pattern: Two pointers + recursion

// Important Recursion Notes (Do NOT Skip)
// Every recursion needs:
// Base case
// Recursive call
// Work before or after recursion

// Space Complexity in recursion = Call stack
// If recursive depth = n

// → Space = O(n)

// Recursion = implicit stack

// Call stack understanding
// Base case importance
// Before vs After recursion difference

// Foundation for:
// Binary recursion
// Backtracking
// Tree problems
