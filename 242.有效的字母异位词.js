/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 * 思路：
 *  1、对于对比元素出现的次数，首先采用哈希法解决
 *  2、创建数组存储字母，s 字符串内的字符每次出现次数 +1，t 相反，出现 -1
 *  3、若数组最后每个字母次数均为 0，则这两个字符串互为字符异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// 数组
// var isAnagram = function(s, t) {
//     if(s.length !== t.length) return false

//     // 创建辅助数组 26个字母
//     const arr = new Array(26).fill(0)
//     // 获取字符 a 的 unicode 编码
//     const base = 'a'.charCodeAt()

//     // 遍历字符串 s，进行 ++ 操作
//     for (let i of s) {
//         arr[i.charCodeAt() - base] ++;
//     }
//     // 遍历字符串 t，进行 -- 操作
//     for(let i of t) {
//         if(!arr[i.charCodeAt() - base]) return false
//         arr[i.charCodeAt() - base] --
//     }
//     return true
// };


// 映射 map 是由 key、value 进行
var isAnagram = function(s, t) {
    if(s.length !== t.length) return false
    let char_count = new Map()
    for(let i of s) { // 字符当 key 重复次数当 value
        char_count.set(i, (char_count.get(i) || 0)+1)
    }
    for(let i of t) {
        if(!char_count.get(i)) return false
        char_count.set(i,char_count.get(i)-1)
    }
    return true
}
// @lc code=end

