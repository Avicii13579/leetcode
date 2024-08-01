/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II 1、循环边界判断 2、矩阵行数奇偶处理 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    if(n === 1) {
        return [[1]]
    }
    let startX = 0, startY = 0;
    let loop = Math.floor(n / 2) // 需要螺旋的圈数
    let matrix = new Array(n).fill(0).map(() => new Array(n).fill(0))
    let count = 1 // 更新填充数字
    let offset = 0 // 当前行内 当前列到末尾列的填充个数
    while(loop--) {
        let row = startX, col = startY;
        // 偶数行 直接螺旋
        // 从左到右 n - offset 当前行内待填充个数
        for(; col < n - offset-1; col++) {
            matrix[row][col] = count++
        }
        // 从上到下
        for(; row < n-offset-1; row++) {
            matrix[row][col] = count++
        }
        // 从右往左
        for(; col > offset; col--) {
            matrix[row][col] = count++
        }
        // 从下往上
        for(; row > offset; row--) {
            // console.log(row, col,count);
            matrix[row][col] = count++
        }
        // 奇数行 单独为中间位置赋值
        if(n % 2 !== 0) {
            // 获取中间数
            let mid = Math.floor(n /2)
            matrix[mid][mid] = n*n
        }

        startX++; startY++; offset++ // 循环边界的更新
        

    }

    return matrix;
};

// console.log(generateMatrix(5));
// @lc code=end

