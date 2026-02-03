/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
 * @return {number}
 */

//  利用深度遍历获取最大的左右子树深度加合
var diameterOfBinaryTree = function (root) {
  let maxRadius = 0;

  function dfs(root) {
    if (!root) return 0;
    const leftDepth = dfs(root.left);
    const rightDepth = dfs(root.right);

    // 获取加合最大值
    maxRadius = Math.max(maxRadius, leftDepth + rightDepth);

    // 返回子树深度需要加上自己这一层
    return Math.max(leftDepth, rightDepth) + 1;
  }

  dfs(root);
  return maxRadius;
};
// @lc code=end
