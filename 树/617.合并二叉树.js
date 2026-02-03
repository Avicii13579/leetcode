/*
 * @lc app=leetcode.cn id=617 lang=javascript
 *
 * [617] 合并二叉树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (!root1) return root2;
  if (!root2) return root1;

  const queue = [[root1, root2]];

  //   遍历/合并/搜索/修改： 通常不需要内层循环，只要队列不空，一个一个拿出来处理就行。
  while (queue.length > 0) {
    const [n1, n2] = queue.shift();
    n1.val += n2.val; // 合并节点值

    // 处理左子树，都有则以数组形式放入queue，无直接合并
    if (n1.left && n2.left) {
      queue.push([n1.left, n2.left]);
    } else if (!n1.left && n2.left) {
      n1.left = n2.left;
    }

    // 处理右子树
    if (n1.right && n2.right) {
      queue.push([n1.right, n2.right]);
    } else if (!n1.right && n2.right) {
      n1.right = n2.right;
    }
  }

  return root1;
};
// @lc code=end
