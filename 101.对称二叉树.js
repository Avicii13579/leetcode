/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
// 递归方法
// var isSymmetric = function (root) {
//   if (!root) return true;
//   return symmetryEqual(root.left, root.right);
// };

// function symmetryEqual(leftNode, rightNode) {
//   if (!leftNode && !rightNode) return true;

// 有一个不一致 则不是轴对称
//   if (!leftNode || !rightNode || leftNode.val !== rightNode.val) return false;

//   return (
//     symmetryEqual(leftNode.left, rightNode.right) &&
//     symmetryEqual(leftNode.right, rightNode.left)
//   );
// }

// 迭代：BFS
var isSymmetric = function (root) {
  if (!root) return true;
  const queue = [root.left, root.right];
  while (queue.length) {
    const l = queue.shift();
    const r = queue.shift();

    if (!l && !r) continue;
    if (!l || !r || l.val !== r.val) return false;

    queue.push(l.left);
    queue.push(r.right);
    queue.push(l.right);
    queue.push(r.left);
  }
  return true;
};

// @lc code=end
