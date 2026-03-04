// Batch 19: Binary Search Tree (BST Basics)

import { TreeNode } from "./binary_tree_B17-B18.js";

// What is a Binary Search Tree?
// A Binary Tree where: Left Subtree < Root < Right Subtree

// For every node.
// Example:
//         5
//        / \
//       3   8
//      / \   \
//     2   4   9

// Inorder traversal of BST → always sorted.

// This property is the key to solving most BST problems.

const root3 = new TreeNode(
  5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(8, null, new TreeNode(9)),
);

// Problem 1: Search in BST
// Return node with given value.

// Thinking
// Because of BST property:
// If val < root → go left
// If val > root → go right
// If equal → return root
// Time complexity becomes O(h) instead of O(n)

// TS Code | LeetCode: 700 | GFG: Search in BST
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null;

  if (val === root.val) return root;
  if (val < root.val) return searchBST(root.left, val);
  return searchBST(root.right, val);
}
// O(h)|O(h) (h = tree height)
// console.log(searchBST(root3, 8));

// Optimization: Iterative version removes recursion stack

// Problem 2: Insert into BST
// Insert value while maintaining BST property.

// Thinking
// If root is null → create node
// Otherwise:
// If val < root → insert in left
// Else → insert in right
// Return root after insertion.

// TS Code | LeetCode: 701 | GFG: Insert in BST
function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
  if (!root) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }

  return root;
}
// O(h)|O(h)
// console.log(insertIntoBST(root3, 6));

// Optimization: Iterative version possible

// Problem 3: Validate Binary Search Tree
// Return true if valid BST.

// Common Mistake
// Just checking: left < root < right

// This is WRONG.

// Example:

//       5
//      / \
//     3   8
//        /
//       4   invalid

// 4 < 8 but violates global rule.

// Correct Thinking
// Each node must lie within a valid range.
// We pass:
// (min, max) range

// TS Code | LeetCode: 98 | GFG: Check BST
function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (!node) return true;

    if (node.val <= min || node.val >= max) return false;

    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }

  return validate(root, -Infinity, Infinity);
}
// O(n)|O(h)
// console.log(isValidBST(root3));

// Pattern: DFS with range constraints
// Optimization: Inorder traversal check also works

// Problem 4: Minimum in BST
// Return minimum value in BST.

// Thinking
// Minimum is:
// Leftmost node.

// TS Code | LeetCode: 530 variant | GFG: Minimum Element in BST
function findMin(root: TreeNode | null): number {
  let current: TreeNode | null = root;

  while (current?.left) {
    current = current?.left;
  }

  return current!.val;
}
// O(h)|O(1)
// console.log(findMin(root3));

// Optimization: Already optimal

// Problem 5: Maximum in BST
// Return maximum value.

// Thinking

// Maximum is:
// Rightmost node.

// ✅ TS Code
function findMax(root: TreeNode | null): number {
  let current = root;

  while (current?.right) {
    current = current.right;
  }

  return current!.val;
}
// O(h)|O(1)
// console.log(findMax(root3));

// Batch 20: Binary Search Tree (Advanced)

// Problem 1: Delete Node in BST
// Delete a node while maintaining BST property.

// Thinking
// There are 3 cases:
// 1️ Node has no child → return null
// 2️ Node has one child → return that child
// 3️ Node has two children →
// Replace with inorder successor (minimum in right subtree)
// Delete that successor

// TS Code | LeetCode: 450 | GFG: Delete a Node in BST
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // node found

    // case 1 & 2
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // case 3
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }

    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}
// console.log(deleteNode(root3, 8));

// Problem 2: Kth Smallest Element in BST

// Key Insight
// Inorder traversal of BST → sorted order.

// So:
// Perform inorder
// Stop when count == k

// TS Code | LeetCode: 230 | GFG: Kth Smallest in BST
function kthSmallest(root: TreeNode | null, k: number): number {
  let count = 0;
  let result = 0;

  function inorder(node: TreeNode | null) {
    if (!node) return;

    inorder(node.left);

    count++;

    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}
// O(h + k)|O(h)
// console.log(kthSmallest(root3, 3));

// Optimization: Augmented BST with subtree size → O(h)

// Problem 3: Floor and Ceil in BST

// Floor(x) = greatest value ≤ x
// Ceil(x) = smallest value ≥ x

// Thinking
// Traverse like search:
// For Floor:
// If node.val == x → return
// If node.val > x → go left
// Else → update floor and go right

// TS Code | GFG: Floor and Ceil in BST
function floorBST(root: TreeNode | null, x: number): number | null {
  let floor: number | null = null;

  while (root) {
    if (root.val === x) return root.val;

    if (root.val > x) {
      root = root.left;
    } else {
      floor = root.val;
      root = root.right;
    }
  }

  return floor;
}
// console.log(floorBST(root3, 7));

function ceilBST(root: TreeNode | null, x: number): number | null {
  let ceil: number | null = null;

  while (root) {
    if (root.val === x) return root.val;

    if (root.val < x) {
      root = root.right;
    } else {
      ceil = root.val;
      root = root.left;
    }
  }

  return ceil;
}
// O(h)|O(1)
// console.log(ceilBST(root3, 7));

// Problem 4: LCA in BST (Optimized)

// Key Insight
// Because BST is ordered:

// If both p and q < root → go left
// If both p and q > root → go right
// Else → root is LCA

// No need to search entire tree.

// TS Code | LeetCode: 235 | GFG: LCA in BST
function lowestCommonAncestorBST(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      return root;
    }
  }

  return null;
}
// O(h)|O(1)
// console.log(lowestCommonAncestorBST(root3, new TreeNode(2), new TreeNode(4)));

// Much better than generic binary tree LCA (O(n))

// Problem 5: Convert BST to Sorted Array

// Thinking
// Just do inorder traversal.

// TS Code
function bstToSortedArray(root: TreeNode | null): number[] {
  const result: number[] = [];

  function inorder(node: TreeNode | null) {
    if (!node) return;
    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }

  inorder(root);
  return result;
}
// O(n)|O(h)
// console.log(bstToSortedArray(root3));

