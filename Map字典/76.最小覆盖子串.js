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
 * 时间复杂度：O(m + n) m为s的长度，n为t的长度
 * 空间复杂度：O(k) k为t中不重复字符的个数
 */
var minWindow = function (s, t) {
  if (s.length < t.length) {
    return "";
  }
  let l = 0,
    r = 0,
    need = new Map(),
    res = "";

  // 初始化统计 t 中的所有字符以及个数
  for (let c of t) {
    need.set(c, need.get(c) ? need.get(c) + 1 : 1);
  }
  // 记录当前窗口中满足条件的字符类型
  let needType = need.size;

  // 让右指针开始右移
  while (r < s.length) {
    const c = s[r];
    if (need.has(c)) {
      // 如果 need 里存在当前遍历字符，让 need 里对应的值 -1；如果对应的值为0，则needType -1
      need.set(c, need.get(c) - 1);
      if (need.get(c) === 0) {
        needType -= 1;
      }
    }
    // 处理 needType 为0，当前窗口内存在所有字符的情况，进行窗口缩减
    while (needType === 0) {
      // 获取当前窗口长度，更新长度值，注意 substring 是边界取值是前闭后开的
      const newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) {
        res = newRes;
      }

      // 获取从窗口中去除的当前字符
      const c2 = s[l];
      // 当 need 里存在 c2，need 里对应的值 +1，needType +1
      if (need.has(c2)) {
        need.set(c2, need.get(c2) + 1);
        if (need.get(c2) === 1) {
          needType += 1;
        }
      }
      l++;
    }
    r++;
  }
  return res;
};

console.log(minWindow("ADOBECODEBANC", "ABC")); // 应该输出 "BANC"
console.log(minWindow("a", "a")); // 应该输出 "a"
console.log(minWindow("a", "aa")); // 应该输出 ""
console.log(minWindow("ADOBECODEBANC", "AABC")); // 应该输出 "ADOBEC" 或其他包含2个A、1个B、1个C的最小子串

// @lc code=end
