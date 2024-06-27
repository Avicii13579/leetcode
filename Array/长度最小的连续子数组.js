/*
 * @lc app=leetcode.cn id=209 lang=javascript
 *
 * [209] 长度最小的子数组
 */5

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let result = []
    for(let key = 0; key < nums.length; key++) {
        let index = key
        let newArr = []
        let remain =target
        while(index < nums.length) {
            remain -= nums[index]
            if(remain < 0) {
                break;
            }
            else if(remain > 0){
                newArr.push(nums[index])
                index ++
            } else if(remain === 0) {
                newArr.push(nums[index])
                if(result.length === 0 || newArr.length < result.length) {
                    result = newArr.concat([])
                }
            }
        }
    }
    return result.length
};

minSubArrayLen(11,[1,2,3,4,5])
// @lc code=end

