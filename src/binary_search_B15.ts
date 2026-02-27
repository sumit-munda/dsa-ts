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

// let high = arr.length; // IMPORTANT: not arr.length - 1
// then it's followed by low < high and high = mid

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

  // target bigger than all elements, target falls between numbers but doesn't exist
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

// 90% interview binary search problems use universal template

// The Universal Binary Search Template (to find boundary)
function binarySearchUT(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] >= target) {
      // whatever condition(arr[mid], target)
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}

// The Universal Template can also find exact element,
// it return low, but does not guarantee the exact element found or not
function search(arr: number[], target: number): number {
  const index = binarySearchUT(arr, target);
  return arr[index] === target ? index : -1;
}
// console.log(search([1, 3, 4, 5, 5, 6], 6));

// Move HIGH when condition is true
// Move LOW when condition is false

// This is the one universal binary search template. From this single pattern, you can derive:
// Lower Bound
// Upper Bound
// First Occurrence
// Last Occurrence
// Insert Position
// First True / Last False problems

// How to derive everything from this

// 1. Lower Bound (first >= target) condition = arr[mid] >= target
//  if (arr[mid] >= target) high = mid;
//     else low = mid + 1;

// 2. Upper Bound (first > target) condition arr[mid] > target
//  if (arr[mid] > target) high = mid;
//     else low = mid + 1;

// 3. First Occurrence, same as lower bound, then verify:
function firstOccurrence(arr: number[], target: number): number {
  const index = lowerBound(arr, target);
  return arr[index] === target ? index : -1;
}

// 4. Last Occurrence, last occurrence = upperBound(target) - 1
function lastOccurrence(arr: number[], target: number): number {
  const index = upperBound(arr, target) - 1;
  return arr[index] === target ? index : -1;
}

// const first = lowerBound(arr, target)
// const last = lowerBound(arr, target + 1) - 1

// 5. Count Occurrences, count = upperBound - lowerBound
function countOccurrences(arr: number[], target: number): number {
  return upperBound(arr, target) - lowerBound(arr, target);
}

// 6. Insert Position (LeetCode 35), same as lower bound
function searchInsertLB(arr: number[], target: number): number {
  return lowerBound(arr, target);
}

// Why high = arr.length (not length-1)
// This allows finding insert position at end:

// Interview Master Pattern Summary
// Problem	          Condition
// Lower Bound	      arr[mid] >= target
// Upper Bound	      arr[mid] > target
// First Occurrence	  lowerBound
// Last Occurrence	  upperBound - 1
// Count	            upperBound - lowerBound
// Insert Position	  lowerBound

// Batch 16: Binary Search Advanced

// Problem 1: Search in Rotated Sorted Array

// Input:
// nums = [4,5,6,7,0,1,2], target = 0
// Output: 4

// Thinking
// Array is sorted but rotated
// One half is always sorted
// Check which half is sorted
// Decide where target lies

// TS Code | LeetCode: 33 – Search in Rotated Sorted Array | GFG: Search in Rotated Array
function searchRotatedArray(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (nums[mid] === target) return mid;

    // left half sorted
    if (nums[low] <= nums[mid]) {
      if (target >= nums[low] && target < nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    // right half sorted
    else {
      if (target > nums[mid] && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }

  return -1;
}
// O(log n)|O(1)
// console.log(searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0));

// Pattern: Binary Search with Sorted Half Detection
// Optimization: No need to find pivot separately.

// TypeScript Code (Pivot Method), [4,5,6,7,0,1,2], pivot = 4 (index) = 0(next elem smaller than the prev elem), here nums[mid] > nums[high]
function searchPivotMethod(nums: number[], target: number): number {
  const n = nums.length;

  // Step 1: Find pivot
  let low = 0;
  let high = n - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] > nums[high]) {
      low = mid + 1; // search in left
    } else {
      high = mid;
    }
  }

  const pivot = low;

  // Step 2: Decide search space
  low = 0;
  high = n - 1;

  if (target >= nums[pivot] && target <= nums[high]) {
    low = pivot;
  } else {
    high = pivot - 1;
  }

  // Step 3: Normal Binary Search
  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}
// console.log(searchPivotMethod([4, 5, 6, 7, 0, 1, 2], 6));

// Problem 2: Find Minimum in Rotated Sorted Array

// Input:
// nums = [3,4,5,1,2]
// Output: 1

// Thinking
// Minimum lies in unsorted half
// Compare mid with high
// Shrink towards minimum

// TS Code | LeetCode: 153 – Find Minimum in Rotated Sorted Array | GFG: Minimum in Rotated Sorted Array
function findMin(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (nums[mid] > nums[high]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return nums[low];
}
// O(log n)|O(1)
// console.log(findMin([4,5,6,7,0,1,2]));

// Pattern: Binary Search on Rotation Point

// Problem 3: Find Peak Element

// Input:
// nums = [1,2,3,1]
// Output: 2 (index of 3)

// Thinking
// If mid < mid+1 → peak is on right
// Else → peak is on left
// Always move toward increasing slope

// The array is made of slopes! Uphill or Downhill

// TS Code | LeetCode: 162 – Find Peak Element | GFG: Peak Element
function findPeakElement(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;
  let mid = 0;

  while (low < high) {
    mid = Math.floor((low + high) / 2);

    if (nums[mid] < nums[mid + 1]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}
// O(log n)|O(1)
// console.log(findPeakElement([4,5,6,7,0,1,2]));

// Pattern: Binary Search on Slope

// Problem 4: Search in Infinite Sorted Array
// Array size unknown. Find target efficiently.

// Thinking
// Expand range exponentially
// Start with high = 1
// Double until target ≤ arr[high]
// Apply binary search in range

// TS Code | GFG: Search in Infinite Sorted Array

function searchInfinite(arr: number[], target: number): number {
  let low = 0;
  let high = 1;

  // Expand range
  while (high < arr.length && arr[high] < target) {
    low = high;
    high = high * 2;
  }

  high = Math.min(high, arr.length - 1);

  // Binary search
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}
// O(log n)|O(1)
// const nums = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31];
// console.log(searchInfinite(nums, 19));

// Pattern: Exponential Search + Binary Search

// Problem 5: Koko Eating Bananas (Binary Search on Answer)
// Given piles and hours h, find minimum eating speed k.

// Thinking
// Search k between 1 and max(piles)
// Check if possible within h hours
// If possible → try smaller speed

// TS Code | LeetCode: 875 – Koko Eating Bananas

function minEatingSpeed(piles: number[], h: number): number {
  let low = 1;
  let high = Math.max(...piles);

  function canFinish(speed: number): boolean {
    let hours = 0;

    for (let pile of piles) {
      hours += Math.ceil(pile / speed); // speed = distance/time
    }
    return hours <= h;
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (canFinish(mid)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
}
// O(n log m) (n = piles, m = max pile)|O(1)
console.log(minEatingSpeed([3, 6, 7, 11], 8));

// Pattern: Binary Search on Answer (Feasibility Check)
// Optimization: Never brute-force speed from 1 → max.

// As k increases: Total hours required decreases.

// So:
// k small  → hours big
// k big    → hours small
