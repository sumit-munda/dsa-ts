// BATCH 1 Warm Up

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
// O(n)|O(1): Loop runs n times, no extra memory used

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
// O(1)|O(1): Single operation, no loop or storage

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
// O(n)|O(1): Loop adds numbers once, uses one variable.

// *
// Optimized Idea
// O(1)|O(1): Single operation, no loops or storage
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
// O(d) → O(log₁₀ n)|O(1): One loop per digit, no extra storage.

// *
function countDigits2(n: number): number {
  if (n === 0) return 1;

  return Math.floor(Math.log10(Math.abs(n))) + 1;
}
// O(1)| O(1): Uses constant-time math (log10) without loops or extra storage.

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

// *
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
// O(n)|O(1): Single pass through array, only two variables.

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
// O(n)|O(1): Single pass through the array using constant extra variables.

// console.log(secondLargest([10, 5, 20, 8]));
// console.log(secondLargest2([10, 5, 20, 8]));
// Pattern: Tracking two values

// Problem 6: Palindrome Number

// Input 121
// Output true

// Thinking
// Reverse the number
// Compare with original

// *
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
// O(d) → O(log₁₀ n)|O(1): Reverse digits once, constant extra space.

// *
function isPalindromeStr(n: number): boolean {
  const reverse = `${n}`.split("").reverse().join("");

  return reverse === `${n}`;
}
// O(d)|O(d): Converts number to string and creates a reversed copy of d digits.

// console.log(isPalindromeStr(121));
// Pattern: Reverse logic

// !((-2 ** 31) <= x <= (2 ** 31 - 1))
// chained comparison doesn’t work in JS/TS.

// Interview Tip
// Loops → usually O(n)
// Digit problems → usually O(log₁₀ n) | O(log n) (base doesn’t matter in Big-O)
// No extra data structures → O(1) space

// O(d): In digit-based problems, we express complexity in terms of digits processed

// BATCH 2 WARM UP (Continued)

// Problem 7: Reverse Integer

// Input 123
// Output 321

// Thinking
// Take last digit using % 10
// Build reversed number
// Remove last digit using / 10
// Repeat until number becomes 0

// *
// TS Code | Leetcode #7
function reverseInteger(n: number): number {
  if (n === 0) return 0;

  let sign = n > 0 ? 1 : -1;
  let reverse = 0;
  n = Math.abs(n);

  while (n > 0) {
    let rem = n % 10;
    reverse = reverse * 10 + rem;
    n = Math.floor(n / 10);
  }

  return reverse * sign;
}
// O(d) → O(log₁₀ n)|O(1): Processes each digit once, no extra storage.

// console.log(reverseInteger(-1234));
// Pattern: Reverse logic

// *
// Problem 8: Star Pattern

// Input n = 3
// Output
// *
// **
// ***
// The inner loop runs as many times as the current iteration number of the outer loop.

// Thinking
// Outer loop → rows
// Inner loop → stars per row

// TS Code
function starPattern(n: number): void {
  for (let i = 1; i <= n; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
      row += "*";
    }
    console.log(row);
  }
}
// O(n²)|O(1): Nested loops print stars row by row.

// starPattern(3);
// Pattern: Nested loops / Pattern printing

// *
// Problem 9: Loop in Loop (Multiplication Table)

// Input n = 3
// Output
// 1 2 3
// 2 4 6
// 3 6 9
// For each row, the inner loop runs through all columns and prints the product of the current row number and the column number.

// Thinking
// Outer loop → row number
// Inner loop → multiply row × column

// TS Code
function multiplicationTable(n: number): void {
  for (let i = 1; i <= n; i++) {
    let row = "";
    for (let j = 1; j <= n; j++) {
      row += i * j;
    }
    console.log(row);
  }
}
// O(n²)|O(1): Two loops multiply row × column.

// multiplicationTable(3)
// Pattern: Nested loops / Matrix-style traversal

// Problem 10: Count Digits (Edge Case: 0)

// Input 0
// Output 1

// Thinking
// Special case: 0 has 1 digit
// Otherwise normal digit-count logic

// TS Code
function countDigits3(n: number): number {
  if (n === 0) return 1;

  let count: number = 0;

  while (n > 0) {
    count++;
    n = Math.floor(n / 10);
  }

  return count;
}
// O(d) → O(log₁₀ n)|O(1): Loop runs once per digit.

// console.log(countDigits(435));
// Pattern: Digit extraction using division

// Problem 11: Sum of Digits

// Input 1234
// Output 10

// Thinking
// Extract digits using % 10
// Add to sum
// Remove digit using / 10

// TS Code
function sumOfDigits(n: number): number {
  let sum = 0;

  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  return sum;
}
// O(d) → O(log₁₀ n)|O(1): Each digit is extracted and summed once.

// console.log(sumOfDigits(1234));
// Pattern: Digit extraction + accumulation

// Problem 12: Armstrong Number

// Input 153
// Output true

// Thinking
// Count digits
// Raise each digit to power of count
// Sum them and compare with original number

// *
// TS Code | GFG / Interview Standard
function isArmstrong(n: number): boolean {
  if (n >= 0 || n < 10) return true;

  //   let count = Math.floor(Math.log10(Math.abs(n))) + 1;
  let count = n.toString().length;
  let sum = 0;
  let original = n;

  while (n > 0) {
    sum += (n % 10) ** count;
    n = Math.trunc(n / 10);
  }

  return sum === original;
}
// O(d) → O(log₁₀ n)|O(1): Processes each digit once, uses fixed variables.

// console.log(isArmstrong(153));
// Pattern: Digit extraction + power calculation

// Interview Tip
// Digit-based problems → O(log₁₀ n)
// Nested loops → O(n²)
// No arrays/maps → O(1) space

// JS doesn’t have integer division — it returns decimals.
