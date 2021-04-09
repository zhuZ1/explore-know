// 爬楼梯
// 假设你正在爬楼梯，需要n阶能到达顶楼，每次可以爬1-2级，有多少种不同的方法
// 转换方程是 dp[i] = dp[i-1] + dp[i-2]
var climbStairs = function (n) {
  let first = 1, second = 2, cur
  for(let i = 3; i <= n; i++){
    cur = first + second
    first = second
    second = cur
  }
  return second
}
console.log(climbStairs(4))

// 打家劫舍
// 两间相邻的屋子被偷会报警， 问不报警能偷的最大值
var rob = function (nums) {
  const len = nums.length
  if(len == 0) return 0
  const dp = new Array(len + 1) // 声明一个新数组，用来存放偷的钱总和
  dp[0] = 0
  dp[1] = nums[0]
  for(let i = 2; i <= len; i++){
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
  }
  return dp[len]
}
let nums = [1, 2, 3, 1]
console.log(rob(nums))

// 强盗在环形街道抢劫
var rob2 = function (nums) {
  let n = nums.length
  if(!n) return 0
  if(n==1) return nums[0]
  let arr1 = nums.slice(0, n - 1) // 不偷最后一个房子
  let arr2 = nums.slice(1) // 不偷第一个房子
  return Math.max(max(arr1), max(arr2))
}

function max(nums){
  let prev = 0, cur = 0, temp
  for(let i = 0; i < nums.length; i++){
    temp = cur
    cur = Math.max(prev + nums[i], cur)
    prev = temp
  }
  return cur
}

console.log(rob2(nums))

// 不同路径
// m * n 的网格，左上角到右下角多少种方法
var uniquePaths = function (m, n) {
  let cur = new Array(n).fill(1)
  for(let i = 1; i < m; i++){
    for(let r = 1; i < n; i++){
      cur[r] = cur[r - 1] + cur[r]
    }
  }
  return cur[n - 1]
}
let m = 7, n = 3
console.log(uniquePaths(m, n))

// 矩阵的最小路径和
var minPathSum = function (grid) {
  let row = grid.length, col = grid[0].length
  // 第一行和第一列分别没有上一行和上一列，所以单独处理
  for(let i = 1; i < row; i++){
    grid[i][0] += grid[i-1][0]
  }
  for(let j = 1; j < col; j++){
    grid[j][0] += grid[0][j-1]
  }
  for(let i = 1; i < row; i++){
    for(let j = 1; j < col; j++){
      grid[i][j] += Math.min(grid[i-1][j], grid[j-1][i])
    }
  }
  return grid[row - 1][col - 1]
}
let grid = [[1,3,1],[1,5,1],[4,2,1]]
// 输出 7
console.log(minPathSum(grid))

// 复制字符串
var minSteps = function (n) {
  // 动态规划处理
  // 0 不需要考虑， 1 0次 也不需要考虑
  const dp = new Array(n + 1).fill(0)
  for(let i = 2; i <= n; i++){
    dp[i] = i
    for (let j = 2; j < Math.sqrt(i) + 1; j++){  // 找 i 的质因数， 因为最终的操作数是质因数结果累加的
      if(i % j == 0){
        dp[i] = dp[j] + dp[i/j]
        break
      }
    }
  }
  return dp[n]
}
console.log('几次', minSteps(3))
