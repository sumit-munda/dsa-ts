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

// BFS (Level Order)
// Visit level by level:

// 1 2 3

// Uses Queue.

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

console.log(inorderTraversal(root));
console.log(inorderTraversalStack(root));

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

  while(current) {
    if(!current.left) {
      // No left child → visit directly
      result.push(current.val);
      current = current.right;
    } else {
        // Find inorder predecessor
        let predecessor = current.left;

        while(predecessor.right && predecessor.right !== current) {
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
