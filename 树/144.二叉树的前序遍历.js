/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
// var preorderTraversal = function (root) {
//   return root
//     ? [
//         root.val,
//         ...preorderTraversal(root.left),
//         ...preorderTraversal(root.right),
//       ]
//     : [];
// };

var preorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) return;
    res.push(root.value);
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return res;
};
// @lc code=end
