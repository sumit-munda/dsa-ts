// Namaste DSA by Akshay Saini

// Introduction

// What is DSA?
// Data Structures - how data is stored (array, string, list, etc.)
// Algorithms - steps to solve a problem efficiently

// Goal of DSA is to Solve problems correctly + efficiently

// Why JavaScript for DSA?
// Same logic works for interviews
// JS arrays, objects are very powerful
// Focus more on logic than syntax

// How to Approach Any DSA Problem?
// Always ask -
// What is the input?
// What is the output?
// Can I solve it step by step?
// Can I reduce unnecessary work?

// This mindset matters more than code.

// Warm Up

// Problem 1: Programming 101

// Print numbers from 1 to N
// Input n = 5
// Output 1 2 3 4 5

// Thinking
// Start from 1
// Stop at n
// Repeat - loop

// TS Code
function printNumbers(n: number): void {
  for (let i: number = 1; i <= n; i++) {
    console.log(i);
  }
}

// printNumbers(5);
// Pattern learned: Basic loop

// Problem 2: Function + if-else

// Check if a number is even or odd
// Input n = 7
// Output: Odd

// Rule: Even - divisible by 2

// TS Code
function checkEvenOrOdd(n: number): string {
  return n % 2 === 0 ? "Even" : "Odd";
}

// console.log(checkEvenOrOdd(7));
// Pattern learned: Condition checking

// Problem 3: Loops 01

// Sum of first N natural numbers
// Input n = 5;
// Output 15

// Thinking: Add numbers from 1 - n

// Simple TS
function sumTillN(n: number): number {
  let sum: number = 0;
  for (let i: number = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Optimized Idea
function sumTillN2(n: number): number {
  return (n * (n + 1)) / 2;
}

// console.log(sumTillN(5));
// console.log(sumTillN2(5));
// Pattern: Loop vs Formula optimization

// Problem 4: Loops 02
// Count digits in a number
// Input n = 12345
// Output 5

// Thinking
// Remove last digit repeatedly [div by 10]
// Count steps

// TS Code
function countDigits(n: number): number {
  if (n === 0) return 1; // edge case

  let digits = 0;
  while (n > 0) {
    n = Math.floor(n / 10);
    digits++;
  }

  return digits;
}

function countDigits2(n: number): number {
  if (n === 0) return 1;

  return Math.floor(Math.log10(Math.abs(n))) + 1;
}

// console.log(countDigits(12345));
// console.log(countDigits2(-1234));
// Pattern: While loop + Math

// Mod n if want last digit every iteration
// log10 + 1 gives no of digits across logic
// Math.abs(n) - supports negative numbers

// Problem 5: Second Largest in an Array
// Input [10, 5, 20 , 8]
// Output 10

// Thinking
// Track largest
// Track second largest

// TS Code
function secondLargest(arr: number[]): number {
  let largest = -Infinity;
  let second = -Infinity;

  for (let num of arr) {
    if (num > largest) {
      second = largest;
      largest = num;
    } else if (num > second && num !== largest) {
      second = num;
    }
  }

  return second;
}

function secondLargest2(arr: number[]): number {
  if (arr.length < 2) {
    throw new Error("Array must have at least two elements");
  }

  let largest = Math.max(arr[0], arr[1]);
  let second = Math.min(arr[0], arr[1]);

  for (let i = 2; i < arr.length; i++) {
    const curr = arr[i];

    const newLargest = Math.max(largest, second, curr);

    if (newLargest !== largest) {
      second = largest;
      largest = newLargest;
    } else if (curr > second) {
      second = curr;
    }
  }
  return second;
}

// console.log(secondLargest([10, 5, 20, 8]));
// console.log(secondLargest2([10, 5, 20, 8]));
// Pattern: Tracking two values

// Problem 6: Palindrome Number
// Input 121
// Outpu true

// Thinking
// Reverse the number
// Compare with original

// TS Code | Leetcode #9 and #7
function isPalindrome(n: number): boolean {
  if (n === 0) return true;
  let newN = 0;
  let oriN = n;

  while (oriN > 0) {
    let rem = oriN % 10;
    newN = newN * 10 + rem;
    // oriN = oriN / 10; In JS/TS, / always gives a decimal
    oriN = Math.floor(oriN / 10);
  }

  return n === newN;
}

function isPalindromeStr(n: number): boolean {
  const reverse = `${n}`.split("").reverse().join("");

  return reverse === `${n}`;
}

// console.log(isPalindromeStr(121));
// Pattern: Reverse logic

// !((-2 ** 31) <= x <= (2 ** 31 - 1)) 
// chained comparison doesn’t work in JS/TS.