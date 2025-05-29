/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 * Map 方法实现：采用左右两指针实现滑动窗口的方式，最后输出窗口内的最大长度
 * 时间复杂度：o(n)
 * 空间复杂度：o(n)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0;
  let res = 0;
  let map = new Map(); // 空间复杂度 o(n)
  for (let r = 0; r < s.length; r++) {
    // 时间复杂度 o(n)
    // 循环的是下标
    if (map.has(s[r]) && map.get(s[r]) >= left) {
      // 重点：边界问题！判断 map 中的值存在于滑动窗口内
      // 时间复杂度 o(1)
      // 注意此次自字母在 map 里对应的值（下标）会被新的值替换
      // 如果当前map 里存在这个字母，左指针移动到这个字母的后一位
      left = map.get(s[r]) + 1; // map.get(s[r]) 时间复杂度 o(1)
    }
    res = Math.max(res, r - left + 1); // 时间复杂度 o(1)
    map.set(s[r], r); // 时间复杂度 o(1)
  }
  //   console.log(map);
  return res;
};
// @lc code=end
// lengthOfLongestSubstring("abcabcbb");
