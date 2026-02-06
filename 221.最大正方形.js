/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */

// 固定右下角
var maximalSquare = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  // 注意此处 dp 要多出一圈作为边界处理，防止 i= rows 时 matrix[i] 越界， 宽：rows+1 高：cols+1
  const dp = new Array(rows + 1).fill(0).map(() => new Array(cols + 1).fill(0));
  let maxPath = 0;

  // 思路：动态规划，判断当前节点的左、左上、上 等节点能组成正方形的最小值
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      // 访问原始矩阵
      if (matrix[i - 1][j - 1] === "1") {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
        maxPath = Math.max(maxPath, dp[i][j]);
      }
    }
  }
  // 注意求的是面积
  return maxPath * maxPath;
};
// @lc code=end
