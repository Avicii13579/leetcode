/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  const nMap = new Set();

  // 先外层循环得到新的加和值  可优化 4时所有不快乐数的入口   while (n !== 1 && n !== 4) { // 4是所有不快乐数循环的入口
  while (n !== 1 && !nMap.has(n)) {
    nMap.add(n);
    n = getNext(n);
  }
  return n === 1;
};

// 对 n 的每一位进行平方加和
function getNext(n) {
  let sum = 0;
  while (n > 0) {
    let digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}
// @lc code=end
