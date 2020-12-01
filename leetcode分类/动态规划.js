// leetcode70 爬楼梯
// 假设你正在爬楼梯，需要n阶能到达顶楼。 每次可以爬1或2级，你有多少种不同的方法爬到顶楼？
// 分析： 1 2  3   4  1 1 1 1  1 2 1  2 1 1  2 2  1 1 2
//        1 2  3   5

var climbStairs = function(n) { // n是一个正整数
  // 普通遍历方法，交换值
  var prev = 1, cur = 1, temp;
  for (let i = 2; i < n + 1; i++) {
    temp = cur  // 暂存当前值
    cur = temp + prev // 当前值是前两次的和
    prev = temp
  }
  return cur
}
console.log(climbStairs(4))

// leetcode198 打家劫舍
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
// 不触动警报，一夜能偷的最大金额
var rob = function(nums) {
  const len = nums.length
  if(len == 0) return 0
  const dp = new Array(len + 1)
  dp[0] = 0
  dp[1] = nums[0]
  // 当前位置的最大值 dp[i-2] + nums[i-1], 或者dp[i-1]
  for (let i = 2; i <= len; i++){
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
  }
  return dp[len]
};

let nums = [1, 2, 3, 1]
console.log(rob(nums))

// leetcode213 强盗在环形街道抢劫
var rob2 = function(nums) {
  let n = nums.length
  if(!n) return 0
  if(n === 1) return nums[0]
  let arr1 = nums.slice(0, n - 1)  // 不偷最后一个房子
  let arr2 = nums.slice(1) // 不偷第一个房子
  return Math.max(max(arr1), max(arr2))
};
function max(nums){
  let pre = 0, cur = 0, temp
  for(let i = 0; i < nums.length; i++){
    temp = cur
    cur = Math.max(pre + nums[i], cur)
    pre = temp
  }
  return cur
}
let nums2 = [2, 3, 2]
// 不能偷1号后偷3号，因为它们是相邻的
console.log(rob2(nums2))

// leetcode64 矩阵的最小路径和
var minPathSum = function(grid) {
  // 当前项最小路径和 = 当前项值 + 上项或左项中的最小值
  // grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
  let row = grid.length, col = grid[0].length // 行 / 列
  for(let i = 1; i < row; i++){
    // grid[1][0] = grid[1][0] + grid[0][0]
    // grid[2][0] = grid[2][0] + grid[1][0]
    grid[i][0] += grid[i - 1][0]
  }
  for (let j = 1; j < col; j++){
    grid[0][j] += grid[0][j - 1]
  }
  for(let i = 1; i < row; i++){
    for(let j = 1; j < col; j++){
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
    }
  }
  return grid[row - 1][col - 1]
};
let grid = [[1,3,1],[1,5,1],[4,2,1]]
// 输出 7
console.log(minPathSum(grid))

// leetcode62 不同路径
var uniquePaths = function(m, n) {
  let cur = new Array(n).fill(1)
  for(let i = 1; i < m; i++){
    for(let r = 1; r < n; r++){
      cur[r] = cur[r - 1] + cur[r]
    }
  }
  return cur[n - 1]
};
let m = 7, n = 3
console.log(uniquePaths(m, n))

// leetcode650 复制粘贴字符
// 起初只有字符A，只能复制全部字符，然后粘贴你上次复制的字符
// 给定一个数字 n，最少的操作次数，在记事本中打印出恰好n 个A
var minSteps = function(n) {
  let res = 0
  for(let i = 2; i <= n; i++){
    while(n % i == 0){
      res += i
      n /= i
    }
  }
  return res
};
console.log(minSteps(3))
