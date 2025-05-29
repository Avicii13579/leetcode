/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 * 方法：滑动窗口
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
/**
 * 最小覆盖子串 - 滑动窗口解法
 *
 * 核心思想：
 * 1. 使用双指针维护一个滑动窗口
 * 2. 右指针扩展窗口，直到包含所有目标字符
 * 3. 左指针收缩窗口，寻找最小覆盖
 * 4. 重复2-3步骤，记录最小覆盖子串
 *
 * 时间复杂度：O(|s| + |t|)
 * 空间复杂度：O(|s| + |t|)
 */
var minWindow = function (s, t) {
  if (s.length < t.length) {
    return "";
  }

  // 统计 t 中的字符及其次数
  const tFreq = new Map();
  for (let char of t) {
    tFreq.set(char, (tFreq.get(char) || 0) + 1);
  }

  // 优化：如果 t 为空，返回空字符串
  if (tFreq.size === 0) {
    return "";
  }

  let left = 0,
    right = 0;
  let minLen = Infinity;
  let minStart = 0;
  let valid = 0; // 当前窗口中满足频次要求的字符种类数
  // 当前滑动窗口内的字符次数
  const windowFreq = new Map();

  while (right < s.length) {
    // 扩展窗口：将右边字符加入窗口
    const rightChar = s[right];
    right++;

    // 若当前字符存在 t 字符串内，更新窗口频次
    if (tFreq.has(rightChar)) {
      windowFreq.set(rightChar, (windowFreq.get(rightChar) || 0) + 1);

      // 如果当前字符的频次刚好达到要求，valid++
      // 注意：超过要求的频次不会增加valid，因为我们只关心是否满足最低要求
      if (windowFreq.get(rightChar) === tFreq.get(rightChar)) {
        valid++;
      }
    }

    // 当窗口包含所有 t 字符时，尝试收缩窗口寻找最小覆盖
    while (valid === tFreq.size) {
      // 更新最小覆盖子串的记录  保存了上一次正确的值，根据这两个值实现返回滑动窗口的值
      if (right - left < minLen) {
        minLen = right - left;
        minStart = left;

        // 优化：如果找到长度等于 t 的覆盖子串，直接返回（已经是最小的了）
        if (minLen === t.length) {
          return s.slice(minStart, minStart + minLen);
        }
      }

      // 收缩窗口：移除左边字符
      const leftChar = s[left];
      left++;

      // 更新窗口内频次
      if (tFreq.has(leftChar)) {
        // 关键逻辑：如果移除的字符频次刚好等于要求的频次
        // 那么移除后这个字符就不满足要求了，valid--
        if (windowFreq.get(leftChar) === tFreq.get(leftChar)) {
          valid--;
        }
        windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
      }
    }
  }

  // 修复：slice的第二个参数是结束位置（不包含），所以是 minStart + minLen
  return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
};

console.log(minWindow("ADOBECODEBANC", "ABC")); // 应该输出 "BANC"
console.log(minWindow("a", "a")); // 应该输出 "a"
console.log(minWindow("a", "aa")); // 应该输出 ""
console.log(minWindow("ADOBECODEBANC", "AABC")); // 应该输出 "ADOBEC" 或其他包含2个A、1个B、1个C的最小子串

// @lc code=end
