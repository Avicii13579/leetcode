/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 * 思路：判断每个位置的数字平方加和后的数字是否存在过，如果存在过则返回 false，其余均持续到为 1 为止
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // 创建一个 map，在 map 里存储每次加和后的值，再根据 map 的 has 方法判断该值是否出现过，若果出现返回 false
  let resultMap = new Map();

  const getSum = (num) => {
    let sum = 0;
    while (num) {
      sum += (num % 10) ** 2; // 求该数的平方
      num = Math.floor(num / 10); // 向下取整
    }
    return sum;
  };

  while (true) {
    if (n === 1) return true;
    if (resultMap.has(n)) return false; // 判断指定键的元素是否存在
    resultMap.set(n, 1); // 设置键值对
    n = getSum(n);
  }
};
console.log(isHappy(19));

// @lc code=end
