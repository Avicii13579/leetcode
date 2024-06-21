/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素 根据 splice（就地删除或添加元素）删除重复元素，并将下标 -1 重新计算 
 * [28] 时间复杂度 O(N)  空间复杂度O(1)
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(let i = 0; i < nums.length; i++) {
        if (nums[i] === val) {
            nums.splice(i,1)
            i--
        }
    }
    return nums.length
};
// @lc code=end

