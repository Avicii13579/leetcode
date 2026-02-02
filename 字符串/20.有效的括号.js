/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号：利用栈的先进先出
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // 1. 剪枝：如果是奇数长度，肯定无效 (性能优化)
  if (s.length % 2 !== 0) return false;
  const stack = [];
  const map = {
    // key 左括号 value 右括号
    ")": "(",
    "]": "[",
    "}": "{",
  };
  for (let point of s) {
    if (map[point]) {
      // 有值 证明为右括号
      if (stack.pop() !== map[point]) {
        // 确定出栈为对应左括号
        return false;
      }
    } else {
      // 无值 证明为左括号 添加到栈中
      stack.push(point);
    }
  }
  return stack.length === 0;
};
// @lc code=end
