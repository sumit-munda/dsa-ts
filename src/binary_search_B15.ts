// Batch 15: Binary Search

// Binary Search is a searching algorithm used on: Sorted array
// It works by: Dividing search space into half each time.

// Time & Space Complexity
// Case	     Time
// Best	    O(1)
// Average	O(log n)
// Worst	O(log n)

// Space: Iterative → O(1)
// Recursive → O(log n)

// Basic Binary Search (Iterative)
// function binarySearch(arr: number[], target: number): number {
//   let low = 0;
//   let high = arr.length - 1;

//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2);

//     if (arr[mid] === target) return mid;
//     else if (arr[mid] < target) low = mid + 1;
//     else high = mid - 1;
//   }

//   return -1;
// }

// Why It’s O(log n)
// Each step:
// Eliminates half of the array.

// Example:
// n → n/2 → n/4 → n/8 ...
// Stops after ≈ log₂(n) steps.

// Key Conditions
// Array must be sorted
// Use low <= high
// Update mid correctly

// Safe mid formula:
// mid = low + Math.floor((high - low) / 2);
// (prevents overflow in other languages)

// Binary Search Patterns (Very Important)

// Binary Search is not just searching — it’s also used in:

// 1️ Find First Occurrence
// Move left even after finding target.

// 2️ Find Last Occurrence
// Move right even after finding target.

// 3️ Lower Bound
// First element ≥ target.

// 4️ Upper Bound
// First element > target.

// 5️ Search in Rotated Sorted Array
// Check which half is sorted.

// Common Interview Problems
// Search in rotated array
// Find peak element
// Square root of number
// Koko eating bananas
// Median of two sorted arrays
// Allocate minimum pages

// ⚠️ Common Mistakes

// Using on unsorted array
// Infinite loop (wrong condition)
// Wrong mid calculation
// Forgetting boundary cases

// When To Think Binary Search?

// Ask yourself:
// Is array sorted?
// Can I eliminate half of the search space?
// Is problem asking for minimum/maximum possible value?

// If YES → Think Binary Search.

// Binary Search Template (Interview Ready)
// while (low <= high) {
//   const mid = low + Math.floor((high - low) / 2);

//   if (condition) {
//     high = mid - 1;
//   } else {
//     low = mid + 1;
//   }
// }

// Problem 1: Binary Search (Iterative)
// Given a sorted array and a target, return its index. If not found, return -1.

// Input:
// nums = [-1,0,3,5,9,12], target = 9
// Output: 4

// Thinking
// Array must be sorted
// Maintain low and high
// Calculate mid
// Compare and shrink search space by half

// TS Code | LeetCode: 704 – Binary Search | GFG: Binary Search
function binarySearch(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}
// O(log n)|O(1)
// console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9));

// Pattern: Divide search space by half
// Optimization: Use mid = low + Math.floor((high - low) / 2) to prevent overflow in other languages.

// Problem 2: Binary Search (Recursive)
// Implement binary search using recursion.

// Thinking
// Base case → low > high → return -1
// Recursive call on left or right half

// TS Code | LeetCode: 704 – Binary Search | GFG: Binary Search
function binarySearchRec(
  nums: number[],
  target: number,
  low: number,
  high: number,
): number {
  if (low > high) return -1;

  const mid = low + Math.floor((high - low) / 2);

  if (nums[mid] === target) return mid;
  else if (nums[mid] < target)
    return binarySearchRec(nums, target, mid + 1, high);
  else return binarySearchRec(nums, target, low, mid - 1);
}

// O(log n)|O(log n) (recursive stack)
// console.log(binarySearchRec([-1, 0, 3, 5, 9, 12], 9, 0, 6));

// Pattern: Divide & Conquer

// Note
// while (low <= high)
// Used when searching for an exact element

// while (low < high)
// Used when finding boundaries (lower bound / upper bound)

// If you use low <= high then: high = mid - 1
// If you use low < high then: high = mid

// Problem 3: First and Last Position of Element

// Input:
// nums = [5,7,7,8,8,10], target = 8
// Output: [3,4]

// Thinking
// Use modified binary search
// Find first occurrence
// Find last occurrence

// TS Code | LeetCode: 34 – Find First and Last Position of Element in Sorted Array | GFG: First and Last Occurrence
function searchRange(nums: number[], target: number): number[] {
  function findFirst(): number {
    let low = 0;
    let high = nums.length - 1;
    let ans = -1;

    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);

      if (nums[mid] === target) {
        ans = mid;
        high = mid - 1; // search left
      } else if (nums[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return ans;
  }

  function findLast(): number {
    let low = 0;
    let high = nums.length - 1;
    let ans = -1;

    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);

      if (nums[mid] === target) {
        ans = mid;
        low = mid + 1; // search right
      } else if (nums[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return ans;
  }

  return [findFirst(), findLast()];
}
// O(log n)|O(1)
// console.log(searchRange([5,7,7,8,8,10], 8));

// Pattern: Binary Search on Answer (Boundary Finding)
// Optimization: Avoid linear scan after finding one index.

// If interviewer says: “Find count of target”
// You can do: count = last - first + 1

function searchRangeOpt(nums: number[], target: number): number[] {
  const first = lowerBoundOpt(nums, target);
  const last = lowerBoundOpt(nums, target + 1) - 1;

  if (first === nums.length || nums[first] !== target) {
    return [-1, -1];
  }

  return [first, last];
}

function lowerBoundOpt(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}
// console.log(searchRangeOpt([5, 7, 7, 8, 8, 10], 8));

// Lower Bound Template
function lowerBound(arr: number[], target: number): number {
  let low = 0,
    high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] >= target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// Upper Bound Template
function upperBound(arr: number[], target: number): number {
  let low = 0,
    high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] > target) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// Problem 4: Search Insert Position

// Input:
// nums = [1,3,5,6], target = 5 → Output: 2
// nums = [1,3,5,6], target = 2 → Output: 1

// Thinking
// If found → return index
// If not → return insertion point (low pointer)

// TS Code | LeetCode: 35 – Search Insert Position | GFG: Search Insert Position
function searchInsert(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return low; // if not found return insertion point
}
// O(log n)|O(1)
// console.log(searchInsert([1,3,5,6], 2));

// Pattern: Lower Bound Binary Search

// Problem 5: Square Root (Binary Search on Answer)
// Floor of square root

// Input: x = 8
// Output: 2

// Thinking
// Search between 1 and x
// Check mid * mid
// Keep best valid answer

// TS Code |LeetCode: 69 – Sqrt(x) | GFG: Square Root of a Number 
function mySqrt(x: number): number {
  if (x < 2) return x;

  let low = 1;
  let high = x;
  let ans = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (mid * mid <= x) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return ans;
}
// O(log x)|O(1)
// console.log(mySqrt(4));

// Pattern: Binary Search on Answer
// Optimization: Avoid floating point operations.
