/*
 * @lc app=leetcode.cn id=383 lang=javascript
 * [383] 赎金信
 * 思路：
 * 1、数组在哈希法中的应用，用长度为 26 的数组来记录 magazine 中字符出现的次数
 * 2、判断 ransomNote 里的字符在数组里是否存在
 * 时间复杂度 O(N)  空间复杂度 O(1)
 */

// @lc code=start
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    const strArr = new Array(26).fill(0), base = 'a'.charCodeAt()

    for(let s of magazine) {
        strArr[s.charCodeAt() - base]++;
    }
    for(let s of ransomNote) {
       const index = s.charCodeAt() - base 
       if(!strArr[index]) {
           return false
       }
       strArr[index]--;
    }
    return true;
};
// @lc code=end

