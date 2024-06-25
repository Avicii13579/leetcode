/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方 采用双指针 + 新的数组空间
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    let n = nums.length;
    let result = new Array(n).fill(0);
    let j = n-1, i = 0, k= n-1;
    while(i <= j) {
        const num1 = nums[i] * nums[i]
        const num2 = nums[j] * nums[j]
        if(num1 > num2) {
            result[k] = num1
            i++
        } else {
            result[k] = num2
            j--
        }
        k--
    }
    return result;
};


// var sortedSquares = function(nums) {
//     let result = [];
//     for(let i = 0,j=nums.length-1; i <=j;){
//         const left = Math.abs(nums[i])
//         const right = Math.abs(nums[j])
//         if(right > left) {
//             result.unshift(right*right)
//             j--
//         } else {
//             result.unshift(left * left)
//             i++
//         }
//     }
//     return result;
// };

// sortedSquares([-4,-1,0,3,10])
// @lc code=end

