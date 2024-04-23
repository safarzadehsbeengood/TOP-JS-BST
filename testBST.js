import BinarySearchTree from "./BST.js";

// create a new tree
const tree = new BinarySearchTree();

function prettyPrintArray(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i];
    if (i < arr.length - 1) str += " -> ";
  }
  return str;
}

// populate array with 100 random numbers < 100
let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100));
}

// build the tree and print it
tree.buildTree(arr);
tree.prettyPrint();

// check if balanced on build
console.log(`\nBalanced : ${tree.isBalanced()}\n`); // true

// display traversals
console.log(`Level Order: ${prettyPrintArray(tree.levelOrder())}\n`);
console.log(`Preorder: ${prettyPrintArray(tree.preOrder())}\n`);
console.log(`Postorder: ${prettyPrintArray(tree.postOrder())}\n`);
console.log(`Inorder: ${prettyPrintArray(tree.inOrder())}\n`);

// add 5 more nodes with values > 100 to unbalance the tree
for (let i = 0; i < 5; i++) {
  tree.insert(Math.floor(Math.random() * 100) + 100);
}

// display new tree
console.log("\nAfter adding 5 more nodes with values > 100:");
tree.prettyPrint();

// check if balanced
console.log(`\nBalanced : ${tree.isBalanced()}`); // false

// rebalance the tree
tree.rebalance();
console.log("\nAfter rebalancing:");
tree.prettyPrint();
console.log(`\nBalanced : ${tree.isBalanced()}\n`); // true

// display traversals
console.log(`Level Order: ${prettyPrintArray(tree.levelOrder())}\n`);
console.log(`Preorder: ${prettyPrintArray(tree.preOrder())}\n`);
console.log(`Postorder: ${prettyPrintArray(tree.postOrder())}\n`);
console.log(`Inorder: ${prettyPrintArray(tree.inOrder())}\n`);
