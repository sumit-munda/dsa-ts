// Arrays (Foundation)

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
      // putting elements in new arr with index k
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
// Strings are immutable in JS/TS → you can’t assign s[l] = ...
// Use while (l < r) for two-pointer swaps

function reverseString2(str: string): string {
  let s = str.split("");
  let l = 0;
  let r = s.length - 1;

  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }
  return s.join("");
}
// O(n)|O(1): Each character swapped once

// console.log(reverseString("hello"));
// console.log(reverseString2("hello"));
// Pattern: Two pointers (revese logic)

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
console.log(moveZeroes2([0, 1, 0, 3, 12]));
// Pattern: Two pointers + overwrite

// BATCH 4 – ARRAYS (CONTINUED)
// no work today