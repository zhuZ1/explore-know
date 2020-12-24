// leetcode 111 二叉树的最小深度
  // 给定一个二叉树， 找到其最小深度
  // 最小深度是从根节点到最近叶子节点的最短路径上的节点数量
  // 叶子节点指没有子节点的节点
/* Definition for a binary tree node
 function treeNode(val, left, right){
   this.val = (val === undefined? 0 : val)
   this.left = (left === undefined? null: left)
   this.right = (right === undefined? null: right)
*/
var minDepth = function (root) {
  if(!root) return 0
  if(root.left && root.right) return 1
  let ans = Number.MAX_SAFE_INTEGER
  if(root.left){
    ans = Math.min(minDepth(root.left), ans)
  }
  if(root.right){
    ans = Math.min(minDepth(root.right), ans)
  }
  return ans + 1
}

// leetcode 104 二叉树的最大深度
// 给定二叉树 [3, 9, 20, null, null, 15, 7]
var maxDepth = function (root) {
  if(!root) return 0
  const left = maxDepth(root.left)
  const right = maxDepth(root.right)
  return Math.max(left, right) + 1
}
let root = [3, 9, 20, null, null, 15, 7]
console.log(maxDepth(root))

// leetcode 110 平衡二叉树
// 给定一个二叉树，判断它是否是高度平衡的二叉树
// 一个高度平衡的二叉树定义为： 一个二叉树每个节点的左右两个子树的高度差的绝对值不超过1
var isBalanced = function(root) {
  return balanced(root) != -1
};

function balanced(node) {
  if(!node) return 0
  const left = balanced(node.left)
  const right = balanced(node.right)
  if(left == -1 || right == -1 || Math.abs(left - right) > 1){
    return -1
  }
  return Math.max(left, right) + 1
}

// leetcode 226 翻转树
var invertTree = function (root) {
  if(root == null) return root
  const temp = root.left
  root.left = root.right
  root.right = temp
  invertTree(root.left)
  invertTree(root.right)
  return root
}

// leetcode 543 二叉树的直径
// 直径指任意两个节点路径中的最大值，这条路径可能穿过也可能不穿过根节点
var diameterOfBinaryTree = function(root) {
  let ans = 1
  function depth(rootNode){
    if(!rootNode) return 0
    let left = depth(rootNode.left)
    let right = depth(rootNode.right)
    ans = Math.max(ans, left + right + 1)
    return Math.max(left, right) + 1
  }
  depth(root)
  return ans - 1
};


