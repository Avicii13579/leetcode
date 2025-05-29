/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 * 思路：借助 map 的 key value 形式对值和值的下标进行存储，再根据目标值的差值在map里查找 key 若存在则返回 map 里对应 key 的 value，以及当前值的下标
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function (nums, target) {
//   const map = new Map();
//     for (let i of nums) { // 方法不可取 加上 nums.indexOf(i) 时间复杂度为 o(n^2)
//       if (map.has(target - i)) {
//         return [map.get(target - i), nums.indexOf(i)]; // nums.indexOf(i) 时间复杂度是 o(n) 注意：indexOf() 不可以使用，若出现重复值就拿到错误索引 如：[3,3] target = 6
//       }
//       if (!map.has(i)) {
//         map.set(i, nums.indexOf(i));
//       }
//     }
// };

var twoSum = function (nums, target) {
  const map = new Map();
  for (let [index, i] of nums.entries()) {
    // o(n)
    if (map.has(target - i)) {
      // o(1)
      return [map.get(target - i), index];
    }
    // if (!map.has(i)) {
    map.set(i, index); // o(1)
    // }
  }
};
// twoSum([2, 7, 11, 15], 9);
// @lc code=end
