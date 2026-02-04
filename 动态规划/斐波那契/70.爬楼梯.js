/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// “爬楼梯，斐波那契。不用数组存到底，只记最后两个数，一路加到终点去。”
var climbStairs = function (n) {
  if (n <= 2) return n;

  let p1 = 1;
  let p2 = 2;
  let current = 0;

  for (let i = 3; i <= n; i++) {
    current = p1 + p2;
    p1 = p2;
    p2 = current;
  }
  return current;
};
// @lc code=end
