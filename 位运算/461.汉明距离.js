/*
 * @lc app=leetcode.cn id=461 lang=javascript
 *
 * [461] 汉明距离
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  // 先用异或求出不一样的二进制值
  let s = x ^ y;
  let count = 0;

  while (s > 0) {
    // & 实现按位与，当s 的最后一位为1 时 s&1=1, count +1
    count += s & 1;
    s = s >> 1;
  }
  return count;
};
// @lc code=end
