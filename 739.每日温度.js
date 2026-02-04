/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// 运算超时
// var dailyTemperatures = function (temperatures) {
//   const result = new Array(temperatures.length).fill(0);
//   for (let i = 0; i < temperatures.length; i++) {
//     for (let j = i + 1; j < temperatures.length; j++) {
//       if (temperatures[i] < temperatures[j]) {
//         result[i](j - i);
//         break;
//       }
//     }
//   }
//   return result;
// };

// 优化处理：将低温度压入栈中，遇到高温度弹出
var dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    const currentTem = temperatures[i];

    // 当 stack 有值、当前值currentTem > temperatures[stack[stack.length -1]]
    while (stack.length && currentTem > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop(); // 前一个小值的下标

      result[prevIndex] = i - prevIndex;
    }
    stack.push(i); // 存在是下标
  }

  return result;
};

// @lc code=end
