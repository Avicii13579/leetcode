/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 * 数组转 Set 集合的时间复杂度是 O(N)
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set1 = new Set(nums1); // O(n) 时间空间复杂度
  let set2 = new Set(nums2); // O(m) 时间空间复杂度
  let resultSet = new Set();

  for (const value of set1) {
    if (set2.has(value)) {
      resultSet.add(value);
    }
  }
  return [...resultSet];
};
// @lc code=end
