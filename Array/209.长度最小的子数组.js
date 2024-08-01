/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组 要求最好子数组 大于等于目标值
 * 思路：
 *  1、滑动窗口，确保窗口里的值能 >= 目标值
 *  2、窗口左侧右移，获取到满足值的最小的窗口长度
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    const n = nums.length;
    let ans = n + 1;
    let sum = 0; // 子数组元素和
    let left = 0; // 子数组左端点
    for (let right = 0; right < n; right++) { // 枚举子数组右端点
        sum += nums[right];
        while (sum - nums[left] >= target) { // 尽量缩小子数组长度
            sum -= nums[left++]; // 左端点右移
        }
        if (sum >= target) {
            ans = Math.min(ans, right - left + 1);
        }
    }
    return ans <= n ? ans : 0;
};

minSubArrayLen(11,[1,2,3,4,5])
// @lc code=end

