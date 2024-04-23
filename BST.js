import Node from "./Node.js";

function BinarySearchTree() {
  // declare the root and getter function
  let _root = null;
  const root = () => _root;

  // insert a new value into the tree

  const insert = (val) => {
    const newNode = Node(val);
    // if the tree is empty, this node becomes the root
    if (!_root) {
      _root = newNode;
      return;
    } else {
      // find the spot for this new value
      let curr = _root;
      while (curr) {
        if (val === curr.val) return; // if the value is in the tree, return
        // else, keep going
        if (val > curr.val) {
          if (!curr.right) {
            curr.right = newNode;
            return;
          }
          curr = curr.right;
        } else {
          if (!curr.left) {
            curr.left = newNode;
            return;
          }
          curr = curr.left;
        }
      }
    }
  };

  // build the tree from an array

  const buildTree = (arr) => {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);
    return (_root = _buildTreeHelper(arr, 0, arr.length - 1));
  };

  const _buildTreeHelper = (arr, start, end) => {
    if (start > end) return null;
    const mid = parseInt((start + end) / 2);
    const newNode = Node(arr[mid]);
    newNode.left = _buildTreeHelper(arr, start, mid - 1);
    newNode.right = _buildTreeHelper(arr, mid + 1, end);
    return newNode;
  };

  // util for pretty printing the tree

  const prettyPrint = (node = _root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  // delete a node in the tree

  const deleteItem = function (val) {
    if (!_root) return null;
    _root = _deleteHelper(_root, val);
  };

  const _deleteHelper = function (node, val) {
    if (!node) return null;
    if (val < node.val) {
      node.left = _deleteHelper(node.left, val);
    } else if (val > node.val) {
      node.right = _deleteHelper(node.right, val);
    } else {
      // if the node has no children
      if (!node.left && !node.right) {
        node = null;
      } else if (!node.left) {
        node = node.right;
      } else if (!node.right) {
        node = node.left;
      } else {
        const minNode = _findMin(node.right);
        node.val = minNode.val;
        node.right = _deleteHelper(node.right, minNode.val);
      }
    }
    return node;
  };

  const _findMin = function (node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  // find a node in the tree with the given value

  const find = function (val) {
    let curr = _root;
    while (curr) {
      if (val === curr.val) return curr;
      if (val > curr.val) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }
    return null;
  };

  // level order traversal w/ callback

  const levelOrder = function (callback = undefined) {
    let arr = [];
    let height = this.height();
    for (let i = 1; i <= height; i++) {
      _levelOrderHelper(
        _root,
        i,
        callback ? callback : (node) => arr.push(node.val)
      );
    }
    if (!callback) {
      return arr;
    }
  };

  const _levelOrderHelper = function (node, level, callback) {
    if (!node) return;
    if (level === 1) {
      callback(node);
    } else if (level > 1) {
      _levelOrderHelper(node.left, level - 1, callback);
      _levelOrderHelper(node.right, level - 1, callback);
    }
  };

  // inorder traversal w/ callback

  const inOrder = function (callback = undefined) {
    let arr = [];
    _inOrderHelper(_root, callback ? callback : (node) => arr.push(node.val));
    if (!callback) {
      return arr;
    }
  };

  const _inOrderHelper = function (node, callback) {
    if (!node) return;
    _inOrderHelper(node.left, callback);
    callback(node);
    _inOrderHelper(node.right, callback);
  };

  // preorder traversal w/ callback
  const preOrder = function (callback = undefined) {
    let arr = [];
    _preOrderHelper(_root, callback ? callback : (node) => arr.push(node.val));
    if (!callback) {
      return arr;
    }
  };

  const _preOrderHelper = function (node, callback) {
    if (!node) return;
    callback(node);
    _preOrderHelper(node.left, callback);
    _preOrderHelper(node.right, callback);
  };

  // postorder traversal w/ callback

  const postOrder = function (callback = undefined) {
    let arr = [];
    _postOrderHelper(_root, callback ? callback : (node) => arr.push(node.val));
    if (!callback) {
      return arr;
    }
  };

  const _postOrderHelper = function (node, callback) {
    if (!node) return;
    _postOrderHelper(node.left, callback);
    _postOrderHelper(node.right, callback);
    callback(node);
  };

  // height of the tree

  const height = function (root = _root) {
    if (!root) return 0;
    const left_height = height(root.left);
    const right_height = height(root.right);
    return Math.max(left_height, right_height) + 1;
  };

  // depth of a node in the tree

  const depth = function (node) {
    let curr = _root;
    let depth = 0;
    while (curr) {
      if (node.val === curr.val) return depth;
      if (node.val > curr.val) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
      depth++;
    }
    return -1;
  };

  // check if the tree is balanced

  const isBalanced = function () {
    return _isBalancedHelper(_root);
  };

  const _isBalancedHelper = function (node) {
    if (!node) return true;
    const left_height = height(node.left);
    const right_height = height(node.right);
    return (
      Math.abs(left_height - right_height) <= 1 &&
      _isBalancedHelper(node.left) &&
      _isBalancedHelper(node.right)
    );
  };

  // rebalance the tree
  const rebalance = function () {
    let arr = this.inOrder();
    this.buildTree(arr);
  };

  return {
    root,
    buildTree,
    insert,
    prettyPrint,
    deleteItem,
    find,
    height,
    depth,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    isBalanced,
    rebalance,
  };
}

export default BinarySearchTree;
