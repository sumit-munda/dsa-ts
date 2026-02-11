// BATCH 3 Arrays (Foundation)

// Problem 1: Remove Duplicates from Sorted Array
// Remove duplicates in-place from a sorted array and return new length.

// Input nums = [1,1,2]
// Output 2 → [1,2]

// Thinking
// Array is sorted
// Use two pointers
// One pointer tracks unique position

// TS Code | LeetCode #26 | GFG
function removeDuplicates(nums: number[]): number {
  for (let k = 0; k < nums.length; k++) {
    if (nums[k] === nums[k + 1]) {
      nums.splice(k + 1, 1);
    }
  }
  console.log(nums);

  return nums.length;
}
// O(n²): Each splice is O(n) inside a loop
// O(1): No extra array used (but costly internal shifts)

// in-place modification
function removeDuplicates2(nums: number[]): number {
  if (nums.length === 0) return 0;

  // array is sorted so first element is always unique
  let k = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[k] = nums[i];
      k++;
    }
  }
  console.log(nums);

  return k;
}
// O(n): Single pass through the array
// O(1): Only constant extra variables

// console.log(removeDuplicates([1, 1, 2]));
// console.log(removeDuplicates2([1, 1, 2]));
// Pattern: Two pointers (slow-fast)

// Problem 2: Remove Element
// Remove all occurrences of a value in-place.

// Input nums = [3,2,2,3], val = 3
// Output 2 → [2,2]

// Thinking
// Scan array
// Copy only required elements forward

// JS Code | LeetCode #27 | GFG
function removeElement(nums: number[], val: number): number {
  // k = index to place the next valid element, Initially, no elements are kept
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      // putting elements in the arr with index k (used to write in the arr)
      nums[k] = nums[i];
      k++;
    }
  }
  console.log(nums);

  return k;
} // in-place modification
// O(n)|O(1): Each element checked once, no extra array

// console.log(removeElement([3, 2, 2, 3, 3], 3));
// Pattern: Filter in-place using pointer

// Problem 3: Reverse String
// Reverse a string in-place.

// Input ["h","e","l","l","o"]
// Output ["o","l","l","e","h"]

// Thinking
// Swap from both ends
// Move inward

// TS Code |LeetCode #344 | GFG
function reverseString(s: string): string {
  let arr = s.split("");
  let l = 0;
  let r = arr.length - 1;

  for (let k = 0; l < r; k++) {
    const temp = arr[l];
    arr[l] = arr[r];
    arr[r] = temp;
    l++;
    r--;
  }

  return arr.join("");
}
// O(n)|O(n): Each character swapped once in-place and split creates an array of length n

// Strings are immutable in JS/TS → you can’t assign s[l] = ...
// Use while (l < r) for two-pointer swaps

function reverseString2(s: string[]): string {
  let l = 0;
  let r = s.length - 1;

  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }
  return s.join("");
}
// O(n)|O(1): Each character swapped once in-place and join creates an output string of length n (does not add to the space complexity, if )

// console.log(reverseString("hello"));
// console.log(reverseString2(["h", "e", "l", "l", "o"]));
// Pattern: Two pointers (revese logic)

// Step-wise Time Complexity

// 1 split("")
// Converts string → array of characters
// Touches every character once
// O(n)

// 2️ reverse()
// Reverses the array in place
// ~ n/2 swaps
// O(n)

// 3️ join("")
// Converts array → string
// Reads every character once
// O(n)

// Step-wise Space Complexity

// 1 split("")
// Creates a new array of size n
// O(n) space

// 2️ reverse()
// In-place swap
// O(1) extra space

// 3️ join("")
//Creates a new string of size n
// O(n) space / Actual memory usage
// O(1) space / In DSA because join("") does not increase auxiliary space

// Algorithmic space complexity (DSA / interview view)
// In algorithm analysis, we use auxiliary space:
// Auxiliary space = extra working memory excluding input and output

// Since:
// The problem requires returning a string
// The output itself must exist
// Output memory is excluded

// So in DSA terms: join("") does not increase auxiliary space

// Problem 4: Best Time to Buy and Sell Stock
// Maximize profit by buying once and selling once.

// Input [7,1,5,3,6,4]
// Output 5th Day (6-1 = 5)

// Thinking
// Track minimum price so far
// Calculate profit at each step

// TS Code | LeetCode #121 | GFG
function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }

  return maxProfit;
}
// O(n)|O(1): Single traversal, constant variables

// console.log(maxProfit([7, 1, 5, 3, 6, 4]));
// Pattern: Tracking min/max while traversing

// Track the minPrice compare with each price
// Find out maxProfit and compare with previous maxProfit

// Problem 5: Move Zeroes
// Move all zeros to the end while keeping order.

// Input [0,1,0,3,12]
// Output [1,3,12,0,0]

// Thinking
// Move non-zero elements forward
// Fill rest with zeros

// TS Code | LeetCode #283 | GFG
function moveZeroes(nums: number[]): number[] {
  let k = 0;

  for (let num of nums) {
    if (num !== 0) {
      nums[k] = num;
      k++;
    }
  }

  while (k < nums.length) {
    nums[k] = 0;
    k++;
  }

  return nums;
}

// fewer lines versions
function moveZeroes2(nums: number[]): number[] {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[k], nums[i]] = [nums[i], nums[k]];
      k++;
    }
  }

  return nums;
}

// in-place swap
// O(n)|O(1): Two linear passes, in-place

// console.log(moveZeroes([0, 1, 0, 3, 12]));
// console.log(moveZeroes2([0, 1, 0, 3, 12]));
// Pattern: Two pointers + overwrite

// BATCH 4 – ARRAYS (CONTINUED)

// Problem 1: Find Largest Element in Array
// Find the largest number in an array.

// Input: arr = [2, 5, 1, 3, 0]
// Output: 5

// Thinking
// Assume first element is max
// Compare each element
// Update max when needed

// TS Code | GFG: Find Largest Element in Array
function largestElement(nums: number[]): number {
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // max = Math.max(max, nums[i]);
    if (nums[i] > max) max = nums[i]; // micro optimization / avoid function call overhead
  }
  return max;
}
// O(n)|O(1): Single pass, constant variable

// console.log(largestElement([2, 5, 1, 3, 0]));
// Pattern: Linear traversal

// Problem 2: Find Second Largest Element
// Find the second largest distinct element.

// Input: arr = [1, 2, 4, 7, 7, 5]
// Output: 5

// Thinking
// Track largest and second largest
// Skip duplicates

// TS Code | GFG: Second Largest Element in Array
function secondLargest1(nums: number[]): number {
  let l = -Infinity;
  let s = -Infinity;

  for (let num of nums) {
    if (num > l) {
      s = l;
      l = num;
    } else if (num > s && num !== l) {
      s = num;
    }
  }

  return s;
}
// O(n)|O(1): One loop, no extra space
// Optimization: Better than sorting (O(n log n))

// console.log(secondLargest1([1, 2, 4, 7, 7, 5]));
// Pattern: Tracking two maximums

// Problem 3: Check if Array is Sorted
// Check whether array is sorted in non-decreasing order.

// Input: [1, 2, 3, 4]
// Output: true

// Thinking
// Compare adjacent elements
// If any pair breaks order → false

// TS Code | GFG: Check if Array is Sorted
function isSorted(nums: number[]): boolean {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) return false;
  }
  return true;
}
// O(n)|O(1): Single traversal
// Optimization: Early exit on failure

// console.log(isSorted([1, 2, 3, 4]));
// Pattern: Adjacent comparison

// Problem 4: Rotate Array by One
// Rotate array to the right by one position.

// Input: [1, 2, 3, 4, 5]
// Output: [5, 1, 2, 3, 4]

// Thinking
// Store last element
// Shift others right
// Place last at front

// TS Code| GFG: Rotate Array by One
function rotateByOne(nums: number[]): void {
  const last = nums[nums.length - 1];

  for (let i = nums.length - 1; i > 0; i--) {
    nums[i] = nums[i - 1];
  }

  // Correct But Avoid (expensive)
  // nums.splice(nums.length - 1, 1);
  // nums.unshift(last); // O(1) auxiliary space

  nums[0] = last;
  console.log(nums);
}
// O(n)|O(1): In-place shifting
// Optimization: No extra array used

// rotateByOne([1, 2, 3, 4, 5]);
// Pattern: Reverse shifting

// Problem 5: Left Rotate Array by D Places
// Rotate array left by d positions.

// Input: arr = [1,2,3,4,5], d = 2
// Output: [3,4,5,1,2]

// Thinking
// Reverse first part
// Reverse second part
// Reverse whole array

// TS Code| GFG: Rotate Array by D Places
function rotateByD(nums: number[], d: number) {
  d = d % nums.length; // Reduce unnecessary rotations

  while (d > 0) {
    const last = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
      nums[i] = nums[i + 1];
    }

    nums[nums.length - 1] = last;
    d--;
  }
  console.log(nums);
}
// O(n²)|O(1): Nested loops

// Best optimal approach (for interviews)
function reverse(arr: number[], start: number, end: number) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

function rotateByDOP(arr: number[], d: number) {
  d = d % arr.length;

  reverse(arr, 0, d - 1);
  reverse(arr, d, arr.length - 1);
  reverse(arr, 0, arr.length - 1);

  console.log(arr);
}
// O(n)|O(1): Three reversals part-by-part, no extra memory
// Optimization: Best possible (vs temp array)

// rotateByD([1, 2, 3, 4, 5], 2);
// rotateByDOP([1, 2, 3, 4, 5], 2);
// Pattern: Reversal algorithm

// BATCH 5 – ARRAYS + HASHING

// Problem 1: Frequency of Elements
// Count frequency of each element in an array.

// Input: arr = [1, 2, 2, 1, 3]
// Output:
// 1 → 2
// 2 → 2
// 3 → 1

// Thinking
// Use hash map
// Increment count for each element

// TS Code | GFG: Frequency of Array Elements
function frequencyCount(nums: number[]) {
  const n = nums.length;
  const visited = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    let count = 1;

    for (let j = i + 1; j < n; j++) {
      if (nums[i] === nums[j]) {
        visited[j] = true;
        count++;
      }
    }

    console.log(nums[i], "->", count);
  }
}
// O(n²)|O(1): Nested loops

frequencyCount([1, 2, 2, 1, 3]);

// Problem 2: Count Subarrays with Given Sum (Positive Integers)
// Count subarrays whose sum equals k (positive numbers only).

// Input: arr = [1, 2, 1, 1, 1], k = 3
// Output: 3

// Thinking
// Expand window to increase sum
// Shrink window if sum exceeds k
// Count when sum equals k

// TS Code | GFG: Subarray with Given Sum

// BATCH 6 – SLIDING WINDOW (SUBARRAY BASICS)

// Problem 1: Maximum Sum Subarray of Size K

//  LeetCode:  | GFG: Maximum Sum Subarray of Size K

//  Problem
// Find the maximum sum of a subarray of size k.

// Input:

// arr = [2, 1, 5, 1, 3, 2], k = 3

// Output:

// 9

// Thinking

// First window sum

// Slide window by:

// Remove left element

// Add right element

// Track max sum

//  TS Code

function maxSubarraySum(arr: number[], k: number): number {
  let windowSum = 0;
  let maxSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

// Problem 5: Maximum Consecutive Ones

//  LeetCode: #485 | GFG: Max Consecutive Ones

//  Problem
// Find maximum number of consecutive 1s.

// Input:
// [1,1,0,1,1,1]
// Output:
// 3
//  Thinking

// Count continuous ones

// Reset on zero

//  TS Code

function findMaxConsecutiveOnes(nums: number[]): number {
  let count = 0;
  let maxCount = 0;

  for (let num of nums) {
    if (num === 1) {
      count++;
      maxCount = Math.max(maxCount, count);
    } else {
      count = 0;
    }
  }

  return maxCount;
}

// Problem 4: Longest Subarray with Sum = K (Positive Numbers)
//  LeetCode: | GFG: Longest Subarray with Sum K
// Problem
// Find longest subarray whose sum equals k.
// Input:
// arr = [1, 2, 3, 1, 1, 1, 1], k = 3
// Output:
// 3
// Thinking
// Increase sum using right pointer
// Decrease sum using left pointer
// Track max length on exact match

// TS Code

function longestSubarraySumK(arr: number[], k: number): number {
  let left = 0;
  let sum = 0;
  let maxLen = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    while (sum > k) {
      sum -= arr[left];
      left++;
    }

    if (sum === k) {
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }

  return maxLen;
}

//  TC: O(n)
//  SC: O(1)
// Why: Each element processed once

// Pattern: Variable-size window (exact sum)

// Problem 3: Longest Subarray with Sum ≤ K
// LeetCode:  | GFG: Longest Subarray with Sum ≤ K

//  Problem
// Find length of longest subarray with sum ≤ k.

// Input:
// arr = [2, 5, 1, 7, 10], k = 14
// Output:
// 3

//  Thinking
// Expand window to add elements
// Shrink when sum exceeds k
// Track max length
//  TS Code

function longestSubarray(arr: number[], k: number): number {
  let left = 0;
  let sum = 0;
  let maxLen = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    while (sum > k) {
      sum -= arr[left];
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

//  TC: O(n)
//  SC: O(1)
// Why: Sliding window, no extra DS
// Pattern: Window expand + shrink

function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const freq = new Map<string, number>();

  for (let ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  for (let ch of t) {
    if (!freq.has(ch) || freq.get(ch)! === 0) {
      return false;
    }
    freq.set(ch, freq.get(ch)! - 1);
  }

  return true;
}

// Problem 4: First Unique Character

// 📌 LeetCode: #387 | GFG: First Non-Repeating Character

// 👉 Problem
// Find index of first non-repeating character.

// Input:
// "s = loveleetcode"
// Output:

// 2

// 💡 Thinking

// Count frequency first

// Traverse string again to find first count = 1

// ✅ TS Code

function firstUniqChar(s: string): number {
  const freq = new Map<string, number>();

  for (let ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }

  return -1;
}

// ⏱️ TC: O(n)
// 🧠 SC: O(n)
// Why: Frequency storage

// 🧠 Pattern: Hashing + second pass
