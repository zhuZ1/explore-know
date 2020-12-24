// leetcode 279 完全平方数
// 给定正整数n，找到若干个完全平方数 (1，4，9...)，使得它们的和等于n，你需要让个数最少
var numSquares = function (n) {
  const dp = [...Array(n + 1)].map(_=>0)
  // 数组长度为 n + 1, 值均为0
  for(let i = 1; i <= n; i++){
    dp[i] = i // 将当前数字更新为最大的结果 如 i=4, 4=1+1+1+1
    for(let j = 1; i - j * j >= 0; j++){
      // k是一个完全平方数， 数字 i+k 需要 数字i + 完全平方数k
      // 数字 i需要 dp[i]个完全平方数，可以得出 dp[i + k]  = dp[i] + 1
      // 所以dp[i]需要 dp[i - k] + 1个完全平方数
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1) // 动态转移方程
    }
  }
  return dp[n]
}
// let n = 12
// 输出 3 -- 完全平方数个数
// 12 = 4 + 4 + 4
console.log(numSquares(12))

// leetcode 695 岛屿的最大面积
// 岛屿是由相邻的1组成的。相邻只能值水平或竖直方向上
// 找最大的岛屿面积
// [[0,0,1,0,0,0,0,1,0,0,0,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,1,1,0,1,0,0,0,0,0,0,0,0],
//  [0,1,0,0,1,1,0,0,1,0,1,0,0],
//  [0,1,0,0,1,1,0,0,1,1,1,0,0],
//  [0,0,0,0,0,0,0,0,0,0,1,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,0,0,0,0,0,0,1,1,0,0,0,0]]

var maxAreaOfIsland = function(grid) {
  let x = grid.length, y = grid[0].length
  let max = 0
  for(let i = 0; i < x; i++){
    for(let j = 0; j < y; j++){
      if(grid[i][j] == 1){
        max = Math.max(max, cntArea(grid, i, j, x, y))
      }
    }
  }
  return max
};

const cntArea = function (grid, i, j, x, y) {
  if(i < 0 || i >= x || j < 0 || j >= y || grid[i][j] == 0) return 0
  let cnt = 1
  grid[i][j] = 0
  cnt += cntArea(grid, i+1, j, x, y)
  cnt += cntArea(grid, i-1, j, x, y)
  cnt += cntArea(grid, i, j+1, x, y)
  cnt += cntArea(grid, i, j-1, x, y)
  return cnt
}
let grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
console.log(maxAreaOfIsland(grid))

// leetcode 547 朋友圈
// 班上有N名学生，有些人是朋友，有些人不是，友谊具有传递性，
// 如果A是B， B是C的朋友，那么 A也是C的朋友
// [[1,1,0],
//  [1,1,0],
//  [0,0,1]]
var findCircleNum = function (M) {
  let n = M.length
  if(n == 0) return 0
  let count = 0
  let dfs = (i) =>{
    for(let j = 0; j < n; j++){
      if(M[i][j] == 1 && !visited[j]){
        visited[j] = true
        dfs(j)
      }
    }
  }
  let visited = {}
  for(let i = 0; i < n; i++){
    if(!visited[i]){
      dfs(i)
      count++
    }
  }
  return count
}
let M =
[[1,1,0],
 [1,1,0],
 [0,0,1]]
console.log(findCircleNum(M))

//  17. 电话号码的字母组合 中等
// 输入['23']  输出 ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] 组合
var letterCombinations = function(digits) {
  if(digits.length == 0) return []
  let res = []
  const map = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
  const dfs = (curStr, i) =>{
    if(i > digits.length - 1){
      res.push(curStr)
      return
    }
    const letters = map[digits[i]]
    for(const l of letters){
      dfs(curStr + l, i + 1)
    }
  }
  dfs('', 0)
  return res
}

// 回溯法
  // 是一种选优搜索法，又称为试探法，按选优条件向前搜索，以达到目标
  // 但当搜索到某一步时，发现不是最优或者不能达到目标，就退回一步重新选择
// leetcode 216 组合总和3
// 找出所有相加之和为 n的k个数的组合，组合中只有1-9的正整数，且每种组合中不存在重复的数字
var combinationSum3 = function (k, n) {
  const res = []
  const dfs = (start, comb, sum) =>{
    if(comb.length == k){  // 选够 k个数，结束递归
      if(sum == n){ // 符合条件的解
        res.push(comb.slice())
      }
      return // 结束当前递归
    }
    // 不产生重复组合：限制下一次选择的起点，是基于本次的选择，这样下一次就不会选到本次选择的同层次左边的数
    for(let i = start; i <= 9; i++){ // 枚举当前可选的数
      comb.push(i) // 选择一个 i
      dfs(i + 1, comb, sum + i) // 基于该选择 i，往下递归
      comb.pop() // 撤销选择，继续尝试同层右边的数
    }
  }
  dfs(1, [], 0)
  return res
}
let k = 3, n = 7
console.log(combinationSum3(k, n))
