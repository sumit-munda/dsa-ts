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
function frequencyCountBruteForce0(nums: number[]) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    let count = 0;

    for (let j = 0; j < n; j++) {
      if (nums[i] === nums[j]) count++;
    }

    console.log(nums[i], "->", count);
  }
}
// O(n²)|O(1): Nested loops | Printing duplicates mutliple times

function frequencyCountBruteForce1(nums: number[]) {
  const n = nums.length;
  const vistited = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (vistited[i]) continue;

    let count = 1;
    for (let j = i + 1; j < n; j++) {
      if (nums[i] === nums[j]) {
        vistited[j] = true;
        count++;
      }
    }

    console.log(nums[i], "->", count);
  }
}
// O(n²)|O(n): Created new array of size n | We marked visited elements

function frequencyCountSort(nums: number[]) {
  nums.sort((a, b) => a - b);

  let count = 1;
  for (let i = 1; i <= nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      count++;
    } else {
      console.log(nums[i - 1], "->", count);
      count = 1; // reset to 1 for the next elm
    }
  }
}
// O(nlog n)(sorting) + O(n)(counting) = O(nlog n)|O(log n): Space: depends on sorting (usually O(log n)) | But we changed the order of elements
// Why is Space ≈ O(log n)?
// We are usually talking about in-place comparison sorting like:
// Merge Sort (uses O(n))
// Quick Sort (uses ~O(log n))

// Why QuickSort uses O(log n) space?

// QuickSort is recursive.
// Each recursive call is stored in the call stack.
// In average case:
// The recursion depth is: log n
// So stack memory:
// O(log n)

// Example intuition:
// If array size = 16
// It splits like:
// 16
// 8 + 8
// 4 + 4
// 2 + 2
// 1
// Depth = log₂(16) = 4

// So only 4 stack frames active at a time.

// ⚠ Worst Case?
// If pivot is always smallest/largest:
// Recursion depth becomes: n

// So worst case space:
// O(n)
// But average case:
// O(log n)

// That’s why we write: ~O(log n)

// function frequencyCountHashMap(nums: number[]) {
function frequencyCountHashMap(nums: number[]): Map<number, number> {
  const freq = new Map<number, number>();

  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // for (let [key, value] of freq) {
  //   console.log(key, "->", value);
  // }

  return freq;
}
// O(n)|O(n): Use a hash map to count in one pass, extra map storage

// Why is Space O(n)?
// When we use a HashMap:
// We store elements as: key → value

// If all elements are unique: We store n entries.
// So: Space = O(n)

// frequencyCountBruteForce0([1, 2, 2, 1, 3]);
// frequencyCountBruteForce1([1, 2, 2, 1, 3]);
// frequencyCountSort([1, 2, 2, 1, 3]);
// console.log(frequencyCountHashMap([1, 2, 2, 1, 3]));
// Pattern: Hashing/Frequency map

// Problem 2: Find Element Appearing Once
// Every element appears twice except one. Find that one.

// Input: [4,1,2,1,2]

// Output: 4

// Thinking
// XOR cancels duplicate numbers
// a ^ a = 0, a ^ 0 = a

// [2,3,2,4,3] Becomes:
// 2^3^2^4^3
// = (2^2) ^ (3^3) ^ 4
// = 0 ^ 0 ^ 4
// = 4

// TS Code | LeetCode: #136 | GFG: Single Number
function findAppearingOnceMi(nums: number[]) {
  const freq = new Map<number, number>();

  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  for (let [key, value] of freq) {
    if (value === 1) {
      return key;
    }
  }

  return -1; // if none found
}
// O(n)|O(n): Use a hash map to count in one pass, extra map storage

function findAppearingOnceXOR(nums: number[]) {
  let xor = 0;
  for (let num of nums) {
    xor ^= num;
  }

  return xor;
}
// O(n)|O(1): No extra memory, XOR trick

// console.log(findAppearingOnceMi([4, 1, 2, 1, 2]));
// console.log(findAppearingOnceXOR([4, 1, 2, 1, 2]));
// Pattern: Bit manipulation + XOR

// Problem 3: Two Sum
// Return indices of two numbers adding to target.

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]

// Thinking
// Store visited numbers in map
// Check if target − current exists

// TS Code | LeetCode: #1 | GFG: Two Sum
function twoSumBF(nums: number[], target: number) {
  for (let [i, num1] of nums.entries()) {
    for (let [j, num2] of nums.entries()) {
      if (i !== j && num1 + num2 === target) {
        return [i, j];
      }
    }
  }

  return [];
}
// O(n²)|O(1): Nested Loops

function twoSumMap(nums: number[], target: number) {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
      // In TypeScript: map.get(key) returns: number | undefined
    }

    map.set(nums[i], i); // storing index as value
  }

  return [];
}
// O(n)|O(n): Single pass with hashmap, extra map storage

// console.log(twoSumBF([2, 7, 11, 15], 9));
// console.log(twoSumMap([2, 7, 11, 15], 9));
// Pattern: Hashing + lookup

// Problem 4: Majority Element
// Find element appearing more than n/2 times.

// Input: [3,2,3]
// Output: 3

// Thinking
// Use Boyer–Moore Voting Algorithm
// Cancel out different elements

// TS Code | LeetCode: #169 | GFG: Majority Element
function majorElemMi(nums: number[]) {
  const n = nums.length;
  const freq = new Map<number, number>();

  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  for (let [key, value] of freq) {
    if (value > n / 2) {
      return key;
    }
  }
  return -1;
}
// O(n)|O(n): Use a hash map to count in one pass, extra map storage

function majorElemBM(nums: number[]) {
  let count = 0;
  let candidate = 0;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate;
}
// O(n)|O(1): Single pass, constant memory
// Optimization: Optimal, no hashmap

// Rules:
// If count == 0
// → choose current element as candidate
// If current element == candidate
// → increment count
// Else
// → decrement count

// Why This Works
// Majority element appears more than all others combined.
// So even if: Every non-majority cancels one majority
// There are still majority elements left
// It survives.

// console.log(majorElemMi([3, 2, 3]));
// console.log(majorElemBM([3, 2, 3]));
// Pattern: Voting algorithm

// Problem 5: Check if Two Arrays Are Equal
// Check if two arrays contain same elements with same frequency.

// Input:
// arr1 = [1,2,5,4,0]
// arr2 = [2,4,5,0,1]
// Output: true

// Thinking
// Count frequency of first array
// Decrease using second array

// TS Code | GFG: Check if Two Arrays Are Equal

function freqCheck(nums: number[]) {
  const freq = new Map<number, number>();

  for (let num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  return freq;
}

function equalArraysMi(nums1: number[], nums2: number[]) {
  if (nums1.length !== nums2.length) return false;

  const map1 = freqCheck(nums1);
  const map2 = freqCheck(nums2);

  if (map1.size !== map2.size) return false;

  for (let [key, value] of map1) {
    if (map2.get(key) !== value) {
      return false;
    }
  }

  return true;
}
// O(n)|O(n): Hash map to count frequency, extra map storage

function equalArrays(nums1: number[], nums2: number[]) {
  if (nums1.length !== nums2.length) return false;

  const freq = new Map<number, number>();

  for (let num of nums1) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  for (let num of nums2) {
    if (!freq.has(num) || freq.get(num)! === 0) {
      return false;
    }
    freq.set(num, freq.get(num)! - 1);
  }

  return true;
}
// O(n)|O(n): Extra frequency map
// Optimization: Sorting avoided

// Reduces the frequency count (It’s like cancelling a match)

// Final map:
// 1→0
// 2→0
// 3→0

// Everything cancelled. Map becomes empty. So arrays are equal.

// console.log(equalArraysMi([1, 2, 5, 4, 0], [2, 4, 5, 0, 1]));
// console.log(equalArrays([1, 2, 5, 4, 0], [2, 4, 5, 0, 1]));
// Pattern: Hash map comparison

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
// Find the maximum sum of a subarray of size k.

// Input: arr = [2, 1, 5, 1, 3, 2], k = 3
// Output: 9

// Thinking
// First window sum
// Slide window by:
// Remove left element
// Add right element
// Track max sum

//  TS Code | GFG: Maximum Sum Subarray of Size K
function maxSubarraySumBF(arr: number[], k: number) {
  let n = arr.length;
  let maxSum = -Infinity;

  for (let i = 0; i <= n - k; i++) {
    let currSum = 0;

    for (let j = 0; j < k; j++) {
      currSum += arr[i + j];
    }
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}
// O(n) x O(k) = O(n²)|O(1): Nested Loops

function maxSubarraySum(arr: number[], k: number): number {
  let windowSum = 0; // window: subarray length
  let maxSum = 0;

  // first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  maxSum = windowSum;

  // slide window
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // i - length of subarray
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
// O(n)|O(1): Single traversal, no extra memory

// console.log(maxSubarraySumBF([2, 1, 5, 1, 3, 2], 3));
// console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3));
// Pattern: Fixed-size sliding window

// We don’t recompute sum every time.
// Instead:
// New window sum = Old sum
//                 - element leaving
//                 + element entering

// Problem 2: Count Subarrays with Given Sum (Positive Integers)
// Count subarrays whose sum equals k (positive numbers only).

// Input: arr = [1, 2, 1, 1, 1], k = 3
// Output: 3

// Thinking
// Expand window to increase sum
// Shrink window if sum exceeds k
// Count when sum equals k

// TS Code | GFG: Subarray with Given Sum
function countSubarrays(arr: number[], k: number): number {
  let left = 0;
  let sum = 0;
  let count = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right]; // expand window

    while (sum > k) {
      sum -= arr[left]; // shrink window
      left++;
    }

    if (sum === k) {
      count++;
    }
  }

  return count;
}
// O(n)|O(1): Each element enters & exits window once

// console.log(countSubarrays([1, 2, 1, 1, 1], 3));
// Pattern: Variable-size sliding window

// Problem 3: Longest Subarray with Sum ≤ K
// Find length of longest subarray with sum ≤ k.

// Input: arr = [2, 5, 1, 7, 10], k = 14
// Output: 3

// Thinking
// Expand window to add elements
// Shrink when sum exceeds k
// Track max length

// TS Code | GFG: Longest Subarray with Sum ≤ K
function longestSubarray(arr: number[], k: number): number {
  let left = 0;
  let sum = 0;
  let length = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    // keep shrinking the window until sum <= k
    while (sum > k) {
      sum -= arr[left];
      left++;
    }

    // after sum <= k check length once
    length = Math.max(length, right - left + 1);
  }

  return length;
}
// O(n)|O(1): Sliding window, no extra DS

// console.log(longestSubarray([2, 5, 1, 7, 10], 14));
// Pattern: Window expand + shrink

// Problem 4: Longest Subarray with Sum = K (Positive Numbers)
// Find longest subarray whose sum equals k.

// Input: arr = [1, 2, 3, 1, 1, 1, 1], k = 3
// Output: 3

// Thinking
// Increase sum using right pointer
// Decrease sum using left pointer
// Track max length on exact match

// TS Code | GFG: Longest Subarray with Sum K
function longestSubarraySumK(arr: number[], k: number): number {
  let left = 0;
  let sum = 0;
  let length = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    // keep shrinking the window until sum <= k
    while (sum > k) {
      sum -= arr[left];
      left++;
    }

    if (sum === k) {
      length = Math.max(length, right - left + 1);
    }
  }

  return length;
}
// O(n)|O(1): Each element processed once

// console.log(longestSubarraySumK([1, 2, 3, 1, 1, 1, 1], 3));
// Pattern: Variable-size window (exact sum)
// Optimization: Hashing needed if negatives exist

// Problem 5: Maximum Consecutive Ones
// Find maximum number of consecutive 1s.

// Input: [1,1,0,1,1,1]
// Output: 3

// Thinking
// Count continuous ones
// Reset on zero

// TS Code | LeetCode: #485 | GFG: Max Consecutive Ones
function findMaxConsecutiveOnesSLW(nums: number[]): number {
  let left = 0;
  let length = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      left = right + 1;
    }

    length = Math.max(length, right - left + 1);
  }

  return length;
}
// O(n)|O(1): Sliding window, no extra DS
// This is logically correct, but over-engineered for this problem.

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
// O(n)|O(1): Simple linear scan

// console.log(findMaxConsecutiveOnesSLW([1, 1, 0, 1, 1, 1]));
// console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));
// Pattern: Running count

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
