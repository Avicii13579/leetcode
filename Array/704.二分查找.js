/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/**
 * @param {number[]} nums5
 * @param {number} target
 * @return {number}55
 */

// 方法一
// var search = function(nums, target, startIndex = 0) {
//     if( nums.length === 0) {
//         return -1
//     }
//     let mid = Math.floor(nums.length / 2)
//     if (nums[mid] > target) {  
//         // 目标元素在左边
//         return search(nums.slice(0,mid), target, startIndex)
//     } else if (nums[mid] < target) {
//         // 目标元素在右边
//         return search(nums.slice( mid + 1), target, startIndex + mid + 1)
//     } else {
//         return startIndex + mid
//     }
// };

var search = function(nums, target) {
    let left =0, right =nums.length-1;
    while (left <= right) {
        let mid = Math.floor((right - left) / 2) + left
        if (nums[mid] > target) {  
            // 目标元素在左边
            right = mid - 1
        } else if (nums[mid] < target) {
            // 目标元素在右边
            left = mid + 1
        } else {
            return mid
        }
    }
        return -1
};
// @lc code=end

