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

// BATCH 10 – SORTING (Basic Sorting Algorithms)

// 1️ Bubble Sort

// Idea:
// Repeatedly swap adjacent elements if they are in wrong order.
// Largest element “bubbles” to the end each pass.

// Complexity:
// Worst: O(n²)
// Best: O(n) (with optimization)
// Space: O(1)
// Stable: Yes

// Use When:
// Small arrays
// Educational purpose

// 2️ Selection Sort

// Idea:
// Find the minimum element and place it at correct position.

// Complexity:
// Worst: O(n²)
// Best: O(n²)
// Space: O(1)
// Stable: No (by default)

// Key Point:
// Always does n² comparisons
// Fewer swaps than bubble sort

// 3️ Insertion Sort

// Idea:
// Build sorted portion one element at a time.
// Insert each element into correct position.

// Complexity:
// Worst: O(n²)
// Best: O(n) (already sorted)
// Space: O(1)
// Stable: Yes

// Use When:
// Nearly sorted arrays
// Small datasets

// 4️ Merge Sort

// Idea:
// Divide array into halves → sort → merge.

// Complexity:
// Time: O(n log n)
// Space: O(n)
// Stable: Yes

// Type:
// Divide & Conquer

// 5️ Quick Sort

// Idea:
// Pick pivot → partition → recursively sort halves.

// Complexity:
// Best/Average: O(n log n)
// Worst: O(n²)
// Space: O(log n)
// Stable: No

// Fast in practice.

// Quick Comparison Table
// Algorithm	Best	    Worst	    Space	    Stable
// Bubble	    O(n)	    O(n²)	    O(1)	    ✅
// Selection	O(n²)	    O(n²)	    O(1)	    ❌
// Insertion	O(n)	    O(n²)	    O(1)	    ✅
// Merge	   O(n log n)	O(n log n)O(n)	    ✅
// Quick	   O(n log n)	O(n²)	    O(log n)	❌

// Interview Tips
// For small arrays → Insertion sort
// For guaranteed O(n log n) → Merge sort
// For fastest practical performance → Quick sort
// Bubble/Selection mostly for fundamentals

// Problem 1: Bubble Sort
// Sort array using Bubble Sort.

// Input: [5, 1, 4, 2, 8]
// Output: [1, 2, 4, 5, 8]

// Thinking
// Compare adjacent elements
// Swap if wrong order
// Largest element bubbles to end each pass

// TS Code | GFG: Bubble Sort
function bubbleSortBF(arr: number[]): number[] {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 1; j < n - i; j++) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }

  return arr;
}
// Problem:
// Even if the array becomes sorted early,
// the outer loop still continues.

function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // track swaps

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    if (!swapped) break; // stop early if no swaps
  }

  return arr;
}
// O(n²) worst|O(1): Nested loops, in-place
// Optimization: Stop early if already sorted

// console.log(bubbleSortBF([5, 1, 4, 2, 8]));
// console.log(bubbleSort([5, 1, 4, 2, 8]));
// Pattern: Adjacent comparison

// What Each Loop Does
// Outer Loop (j loop)
// for (let i = 0; i < arr.length - 1; i++)

// Purpose: Controls the number of passes.
// Each pass: Moves the largest unsorted element to its correct position at the end.

// Why arr.length - 1 times?

// In worst case:
// After first pass → largest element fixed
// After second pass → second largest fixed
// …
// After n-1 passes → fully sorted

// So maximum passes = n - 1

// Inner Loop (j loop)
// for (let j = 1; j < arr.length - i; j++)

// Purpose: Compares adjacent elements and swaps if needed.

// Why arr.length - i?

// After each pass:
// Last i elements are already sorted
// No need to check them again
// So inner loop shrinks each time.

// Problem 2: Selection Sort

// Input: [64, 25, 12, 22, 11]
// Output: [11, 12, 22, 25, 64]

// Thinking
// Find minimum element
// Swap with first unsorted position
// Repeat

// TS Code | GFG: Selection Sort

function selectionSort(arr: number[]): number[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // n - 1 passes
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // find minElem
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // swap with first unsorted
  }

  return arr;
}
// O(n²)|O(1): Always full inner loop
// Optimization: Fewer swaps than Bubble

// console.log(selectionSort([64, 25, 12, 22, 11]));
// Pattern: Find minimum each round

// Problem 3: Insertion Sort

// Input: [12, 11, 13, 5, 6]
// Output: [5, 6, 11, 12, 13]

// Thinking
// Assume first element sorted
// Insert next element in correct position
// Shift elements right

// TS Code | GFG: Insertion Sort
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i]; // first unsorted element
    let j = i - 1; // sorted position

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // shift bigger right
      j--; // keep moving left until correct position found
    }

    arr[j + 1] = key;
  }

  return arr;
}
// O(n²) worst|O(1): Shifting inside loop
// Optimization: Best case (already sorted) → O(n)

// console.log(insertionSort([12, 11, 13, 5, 6]));
// Pattern: Insert into sorted portion

// Idea of Insertion Sort
// Think like sorting cards in your hand.
// First card is already sorted.
// Pick next card.
// Insert it into correct position among sorted cards.

// Outer Loop (i loop)
// for (let i = 1; i < arr.length; i++)

// What it does:
// Treats arr[0] as already sorted.
// Starts from index 1.
// Expands sorted portion one element at a time.
// After each iteration:
// arr[0..i] is sorted

// key Variable
// let key = arr[i];
// This is the element we want to insert into the sorted portion.

// j Variable
// let j = i - 1;
// We start checking from the last element of sorted portion.

// While Loop
// while (j >= 0 && arr[j] > key)

// What it does:
// Shift bigger elements one step right.
// Keep moving left until correct position found.

// Problem 4: Recursive Bubble Sort

// Thinking
// Do one pass
// Recursively sort remaining array

// TS Code | GFG: Recursive Bubble Sort
function recursiveBubbleSort(arr: number[], n: number): void {
  if (n === 1) return;

  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }

  recursiveBubbleSort(arr, n - 1);
}
// O(n²)|O(n) (recursion stack)

// recursiveBubbleSort([12, 11, 13, 5, 6], 5);
// Pattern: Shrinking problem size

// Problem 5: Check if Array is Sorted (Recursively)

// Thinking
// Compare first two
// Recur for rest

// TS Code | GFG: Check Sorted (Recursive)
function isSortedRecursive(arr: number[], n: number): boolean {
  if (n === 1) return true;

  if (arr[n - 2] > arr[n - 1]) return false;

  return isSortedRecursive(arr, n - 1);
}
// O(n)|O(n)

// console.log(isSortedRecursive([ 5, 6, 11, 12, 13 ], 5));
// console.log(isSortedRecursive([12, 11, 13, 5, 6], 5));
// Pattern: Divide & reduce

// Batch 11: Merge Sort (Divide & Conquer) & Quick Sort

// Problem 1: Merge Sort
// Sort an array using Merge Sort

// Input: arr = [5, 2, 8, 1, 3]
// Output: [1, 2, 3, 5, 8]

// Thinking
// Divide array into two halves
// Recursively sort both halves
// Merge two sorted arrays
// Base case → array length ≤ 1

// Divide & Conquer approach

// TS Code | LeetCode #912 | GFG: Merge Sort
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  let result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    // while both arrays still have elements
    if (left[i] <= right[j]) {
      result.push(left[i++]); // use current value and then increment
    } else {
      result.push(right[j++]);
    }
  }

  // The moment one finishes:
  // We stop comparing
  // Append remaining elements directly

  return result.concat(left.slice(i)).concat(right.slice(j));
}
// O(n log n):log n levels × n merging each level|O(n):extra array used for merging

console.log(mergeSort([5, 2, 8, 1, 3]));
// Pattern: Divide & Conquer
// Good for linked lists

// Merge Sort Without Array Methods

function mergeSortBF(arr: number[]): number[] {
  const temp = new Array(arr.length);
  divide(arr, temp, 0, arr.length - 1);
  return arr;
}

function divide(
  arr: number[],
  temp: number[],
  left: number,
  right: number,
): void {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  divide(arr, temp, left, mid);
  divide(arr, temp, mid + 1, right);

  mergeBF(arr, temp, left, mid, right);
}

function mergeBF(
  arr: number[],
  temp: number[],
  left: number,
  mid: number,
  right: number,
): void {
  let i = left; // left half pointer
  let j = mid + 1; // right half pointer
  let k = left; // temp array pointer

  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i++];
      // i++;
    } else {
      temp[k] = arr[j++];
      // j++;
    }
    k++;
  }

  // remaining left half
  while (i <= mid) {
    temp[k++] = arr[i++];
    // i++;
    // k++;
  }

  // remaining right half
  while (j <= right) {
    temp[k++] = arr[j++];
    // j++;
    // k++;
  }

  // copy back to original array
  for (let p = left; p <= right; p++) {
    arr[p] = temp[p];
  }
}
// console.log(mergeSortBF([12, 11, 13, 5, 6]));

// Your previous version:
// Time: O(n log n)
// Space: O(n) + extra slicing overhead

// This version:
// Time: O(n log n)
// Space: O(n) only (one temp array)

// More memory-efficient and more “system-level correct”.

// Problem 2: Quick Sort
// Sort an array using Quick Sort

// Input: arr = [5, 2, 8, 1, 3]
// Output: [1, 2, 3, 5, 8]

// Thinking
// Choose a pivot
// Place pivot at correct position
// Elements smaller → left
// Elements greater → right
// Recursively sort left & right

// Divide & Conquer but in-place

// TS Code | LeetCode #912 | GFG: Quick Sort
function quickSort(arr: number[], low: number, high: number): void {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

// work: place the pivot element in its correct sorted position
// Left of pivot  → smaller elements
// Right of pivot → greater elements
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high]; // we choose last element as pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // pivot at correct position
  return i + 1;
}
// O(n²)|O(n)

// quickSort([5, 2, 8, 1, 3], 0, 5);
// Pattern: Partition + Divide & Conquer
// In-place sorting
