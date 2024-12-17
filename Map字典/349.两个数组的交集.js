/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集：采用 Map 的方式实现，
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * 时间复杂度：O(m+n)
 * 空间复杂度：O(min(m,n))
 */
// var intersection = function (nums1, nums2) {
//   const map = new Map();
//   for (const i of nums1) {
//     if (nums2.includes(i) && !map.has(i)) { // nums2.includes(i) 是 o(m) 的时间复杂度
//       map.set(i, true);
//     }
//   }
//   return [...map.keys()];
// };

// 优化：利用 set 集合去重
// 时间复杂度：O(m+n)
// 空间复杂度：O(min(m,n))
var intersection = function (nums1, nums2) {
  const set = new Set(nums1);
  const result = new Set();
  for (let i of nums2) {
    // 时间复杂度为 O(n)
    if (set.has(i)) {
      // set.has 时间复杂度为 O(1)
      result.add(i);
    }
  }
  return [...result];
};

// @lc code=end
