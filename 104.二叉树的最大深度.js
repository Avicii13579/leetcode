/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 * 思路：
 *  深度优先 DFS：递归
 *  广度优先 BFS：迭代，在寻找最短路径等问题上非常有用，求最小深度时通常首选BFS。
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

// 深度优先 时间复杂度O(n) n为节点数，空间复杂度为 O(h) h为树的高度
// var maxDepth = function (root) {
//   if (!root) {
//     return 0;
//   }

//   const leftDepth = maxDepth(root.left);
//   const rightDepth = maxDepth(root.right);

//   return Math.max(leftDepth, rightDepth) + 1;
// };

// 广度优先 时间复杂度O(n) n为节点数，空间复杂度为 O(w) w为最大一层的节点数量
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }

  // 用数组模拟队列
  const queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    // 当前节点的数量
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 节点出队

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    // 完成一层遍历 深度+1
    depth++;
  }
  return depth;
};

// @lc code=end
