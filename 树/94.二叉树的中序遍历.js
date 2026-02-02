/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// var inorderTraversal = function(root) {
//     return root ? [
//         ...inorderTraversal(root.left),
//         root.value,
//         ...inorderTraversal(root.right)
//     ]: []
// };

// 方法一：递归
// var inorderTraversal = function (root) {
//   let res = [];
//   const dfs = function (root) {
//     // 边界控制
//     if (root === null) return;
//     dfs(root.left);
//     res.push(root.val);
//     dfs(root.right);
//   };

//   dfs(root);
//   return res;
// };

// 方法二：迭代
var inorderTraversal = function (root) {
  let res = [];
  const stack = []; // 将遍历节点存到栈中，实现后进先出
  let current = root;

  while (current || stack.length > 0) {
    // 优先入栈左子树
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // 从最后一个左子树开始处理
    current = stack.pop();
    res.push(current.val);
    current = current.right;
  }

  return res;
};
// @lc code=end
