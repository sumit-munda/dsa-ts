// Batch 17: Binary Tree (Basics)

// Binary Tree – Short Notes

// What is a Binary Tree?
// A tree where: Each node has at most 2 children
// Left child
// Right child

// Structure:

//         1
//        / \
//       2   3
//      / \
//     4   5

// Terminology
// Term	        Meaning
// Root	        Top node
// Parent	    Node above
// Child	    Node below
// Leaf	        Node with no children
// Height	    Longest path from root to leaf
// Depth	    Distance from root
// Subtree	    Tree formed from any node

// Types of Binary Trees

// Full Binary Tree
// Every node has: 0 OR 2 children

// Complete Binary Tree
// All levels filled
// Last level filled from left
// Used in: Heaps

// Perfect Binary Tree
// All internal nodes have 2 children
// All leaves at same level

// Nodes formula: Total Nodes = 2^h - 1

// Balanced Binary Tree
// For every node: | left height - right height | ≤ 1

// Binary Tree Node in TypeScript
// class TreeNode {
//   val: number;
//   left: TreeNode | null;
//   right: TreeNode | null;

//   constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
//     this.val = val;
//     this.left = left;
//     this.right = right;
//   }
// }

// Traversals (Very Important)
// DFS (Depth First Search)
// Type	        Order
// Preorder	    Root → Left → Right
// Inorder	    Left → Root → Right
// Postorder	Left → Right → Root

// Example tree:

//     1
//    / \
//   2   3

// Results:

// Preorder  → 1 2 3
// Inorder   → 2 1 3
// Postorder → 2 3 1

// BFS (Depth First Search, Level Order)
// Visit level by level:

// 1 2 3

// Uses Queue.

// Morris (Advanced)

// Brute force becomes:
// “Visit every node and compute something.”
// That is already DFS.

// Important Formulas
// Height of tree: height = 1 + max(leftHeight, rightHeight)
// Max nodes at level L: 2^L
// Max nodes in tree of height h: 2^h - 1

// Binary Tree vs Binary Search Tree (Important Difference)
// Binary Tree	        BST
// No ordering	        Left < Root < Right
// Any structure	    Sorted structure

// Complexity Basics
// For n nodes:
// Traversal → O(n)
// Height worst case → O(n)
// Height balanced → O(log n)

// Problem 1: Inorder Traversal of Binary Tree
// Return inorder traversal of a binary tree.

// Input:
//     1
//      \
//       2
//      /
//     3

// Output: [1,3,2]

// Thinking
// Inorder =
// Left → Root → Right
// Tree problems are mostly recursive:
// Traverse left
// Visit node
// Traverse right

// Inorder strictly follows:
// Left subtree fully
// Then root
// Then right subtree

// TS Code | LeetCode: 94 | GFG: Inorder Traversal
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];

  function dfs(node: TreeNode | null) {
    if (!node) return; // stop when node is null

    dfs(node.left); // go left first
    result.push(node.val); // visit node
    dfs(node.right); // go right
  }

  dfs(root);
  return result;
}
// O(n)|O(h) (recursion stack)| h = height of tree

// Pattern: DFS – Inorder
// Optimization: Can be done iteratively using stack

// Iterative Version (Using Stack)
function inorderTraversalStack(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];

  let current = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;
    result.push(current.val);

    current = current.right;
  }

  return result;
}
// O(n)|O(h) (recursion stack)| h = height of tree

// Idea
// Go left as much as possible.
// Pop node.
// Visit.
// Move right.

// Create test tree:
const root = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));

// console.log(inorderTraversal(root));
// console.log(inorderTraversalStack(root));

// Morris Traversal (Advanced – O(1) Space)
// We temporarily modify the tree.

// We:
// Find the inorder predecessor
// Make its right pointer point back to current node
// Use that as a “thread” to return
// Then restore it.

function inorderTraversalMorris(root: TreeNode | null): number[] {
  const result: number[] = [];
  let current = root;

  while (current) {
    if (!current.left) {
      // No left child → visit directly
      result.push(current.val);
      current = current.right;
    } else {
      // Find inorder predecessor
      let predecessor = current.left;

      while (predecessor.right && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (!predecessor.right) {
        // Create thread
        predecessor.right = current;
        current = current.left;
      } else {
        // Thread exists → remove it
        predecessor.right = null;
        result.push(current.val);
        current = current.right;
      }
    }
  }

  return result;
}
//  O(n)|O(1) No recursion stack, No explicit stack, Only pointers used.

// Problem 2: Maximum Depth of Binary Tree
// Return maximum depth (height) of tree.

// Input:
//     3
//    / \
//   9  20
//      / \
//     15  7

// Output: 3

// Thinking
// Height =
// 1 + max(height(left), height(right))
// Base case:
// If null → depth = 0

// TS Code | LeetCode: 104 | GFG: Height of Binary Tree
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  const left = maxDepth(root.left);
  const right = maxDepth(root.right);

  return 1 + Math.max(left, right);
}

const root2 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(20), new TreeNode(7)),
);
// O(n)|O(h)
// console.log(maxDepth(root2));

// Pattern: Postorder DFS

// Problem 3: Count Total Nodes in Binary Tree
// Return total number of nodes.

// Thinking
// Very similar to height problem.
// Total nodes =
// 1 + leftNodes + rightNodes

// TS Code | LeetCode: 222 | GFG: Count Nodes
function countNodes(root: TreeNode | null): number {
  if (!root) return 0;

  return 1 + countNodes(root.left) + countNodes(root.right);
}
// O(n)|O(h)
// console.log(countNodes(root2));

// Pattern: Tree DFS Count
// Optimization: For Complete Binary Tree → O(log² n) possible (Advanced topic)

// Problem 4: Check if Two Trees are Identical
// Return true if both trees are structurally identical and values match.

// Thinking
// Two trees are identical if:
// Both null → true
// One null → false
// Values equal
// Left subtree identical
// Right subtree identical

// TS Code | LeetCode: 100 | GFG: Identical Trees
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true; // both null then true
  if (!p || !q) return false;
  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
// O(n)|O(h)
// console.log(isSameTree(root2, root2));

// Pattern: Parallel DFS Comparison

// Problem 5: Level Order Traversal (BFS)
// Return nodes level by level.

// Input:

//     3
//    / \
//   9  20
//      / \
//     15  7

// Output: [[3],[9,20],[15,7]]

// Thinking
// Use Queue (BFS):
// Push root
// While queue not empty
// Process level by size
// Push children

// TS Code | LeetCode: 102 | GFG: Level Order Traversal
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    const level: number[] = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
// O(n)|O(n)
// console.log(levelOrder(root2));

// Pattern: BFS Level Traversal
// Optimization: Use index pointer instead of shift() for better performance

// Batch 18: Binary Tree (Advanced)

// Problem 1: Diameter of Binary Tree
// Return the length of the longest path between any two nodes.

// Thinking
// Diameter =
// max(leftHeight + rightHeight)
// Important:
// Diameter may NOT pass through root.
// So we calculate diameter at every node.
// We compute height and update global max.

// TS Code | LeetCode: 543 | GFG: Diameter of Binary Tree
function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;

  function height(node: TreeNode | null): number {
    if (!node) return 0;

    const left = height(node.left);
    const right = height(node.right);

    diameter = Math.max(diameter, left + right);

    return 1 + Math.max(left, right);
  }

  height(root);
  return diameter;
}
// O(n)|O(h)
// console.log(diameterOfBinaryTree(root2));

// Pattern: Postorder DFS with global update
// Optimization: Height + diameter in single traversal (already optimal)

// Problem 2: Balanced Binary Tree
// Return true if tree is height-balanced.

// Balanced means:
// For every node:
// |height(left) - height(right)| ≤ 1

// Thinking
// We combine:
// Height calculation
// Balance check
// If any subtree is unbalanced → propagate failure upward.
// Return -1 to indicate imbalance.

// TS Code | LeetCode: 110 | GFG: Check for Balanced Tree
function isBalanced(root: TreeNode | null): boolean {
  function height(node: TreeNode | null): number {
    if (!node) return 0;

    const left = height(node.left);
    if (left === -1) return -1;

    const right = height(node.right);
    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;

    return 1 + Math.max(left, right);
  }

  return height(root) !== -1;
}
// O(n)|O(h)
// console.log(isBalanced(root2));

// Pattern: Postorder with early exit
// Optimization: Avoid recalculating height separately

// Problem 3: Lowest Common Ancestor (LCA)
// Return lowest common ancestor of two nodes.

// Thinking
// Rules:
// If root is null → return null
// If root is p or q → return root
// Search left & right
// If both sides return non-null → root is LCA
// Else return whichever side is non-null

// TS Code | LeetCode: 236 | GFG: LCA in Binary Tree
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode,
): TreeNode | null {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;

  return left ? left : right;
}
// O(n)|O(h)
// console.log(lowestCommonAncestor(root2, root2, root2));

// Pattern: Divide & Conquer on Tree

// Problem 4: Path Sum
// Return true if root-to-leaf path equals target sum.

// Thinking
// Subtract current node value from target.
// If:
// Leaf node
// Remaining sum == node value
// → return true

// TS Code | LeetCode: 112 | GFG: Root to Leaf Path Sum
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  const remaining = targetSum - root.val;

  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
// O(n)|O(h)
// console.log(hasPathSum(root2, 30));

// Pattern: Root-to-Leaf DFS

// Problem 5: Right Side View of Binary Tree
// Return nodes visible from right side.

// Thinking
// Use Level Order BFS.
// At each level:
// Take last node.
// OR
// Use DFS:
// Traverse right first.
// If level == result.length → add node.

// TS Code (DFS Approach) | LeetCode: 199 | GFG: Right View of Binary Tree
function rightSideView(root: TreeNode | null): number[] {
  const result: number[] = [];

  function dfs(node: TreeNode | null, level: number) {
    if (!node) return;

    if (level === result.length) result.push(node.val);

    dfs(node.right, level + 1);
    dfs(node.left, level + 1);
  }

  dfs(root, 0);
  return result;
}
// O(n)|O(h)
// console.log(rightSideView(root2));

// Pattern: Modified Preorder (Right-first)
// Optimization: DFS avoids storing entire level


