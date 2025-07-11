/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
// var postorderTraversal = function(root) {
//     return root ? [
//         ...postorderTraversal(root.left),
//         ...postorderTraversal(root.right),
//         root.val
//     ]: []
// };

var postorderTraversal = function (root) {
  let res = [];
  const dfs = (root) => {
    if (root === null) return;
    dfs(root.left);
    dfs(root.right);
    res.push(root.val);
  };

  dfs(root);
  return res;
};
// @lc code=end
