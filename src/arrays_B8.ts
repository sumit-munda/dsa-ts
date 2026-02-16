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
// O(n)|O(1): Single traversal
function prefixSumBF2(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }

  return arr;
}
// O(n)|O(1): Single traversal

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

    // At every index: current prefix sum = sum
    // We check: Have we seen (sum - k) before?
    // If yes: count += frequency of (sum - k)
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

console.log(equilibriumIndex([1,3,5,2,2]));
// Pattern: Prefix concept without extra array


