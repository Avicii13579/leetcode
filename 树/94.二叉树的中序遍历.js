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
var inorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    // 边界控制
    if (root === null) return;
    dfs(root.left);
    res.push(root.val);
    dfs(root.right);
  };

  dfs(root);
  return res;
};
// @lc code=end
