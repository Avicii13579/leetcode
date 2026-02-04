/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
// 方法一：O(NlogN)
// var countBits = function (n) {
//   if (n === 0) return [0];
//   const result = [0];

//   for (let i = 1; i <= n; i++) {
//     let count = 0;
//     let num = i;
//     while (num) {
//       count += num & 1;
//       num = num >> 1;
//     }
//     result.push(count);
//   }
//   return result;
// };

// 优化：要优化到 O(N)，必须使用 动态规划 (Dynamic Programming)。核心思想是： 不要从头数 i 有几个 1，而是利用已经算出来的 i 之前的数字的结果。
var countBits = function (n) {
  // 结果数组需要从0 开始，个数需要加1
  const result = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    // 结论： 偶数 i 的 1 的个数 等于 i/2 的 1 的个数。
    // 公式：res[i] = res[i >> 1]
    // 结论： 奇数 i 的 1 的个数 等于 i/2 的 1 的个数 再加 1。
    // 公式：res[i] = res[i >> 1] + 1
    // 合并公式： 无论奇偶，都可以写成： res[i] = res[i >> 1] + (i & 1)
    result[i] = result[i >> 1] + (i & 1);
  }
  return result;
};
// @lc code=end
