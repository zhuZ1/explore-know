// leetcode455 分发饼干
// 每个孩子只能给一个饼干，对于每个孩子 i都有一个满足胃口的最小值 g[i]
// 每块饼干 j都有一个能量值 s[j], s[j] >= g[i]
// 可以将j 分配给 i
var findContentChildren = function(g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let total = 0
  for(let i = 0; i < s.length; i++){
    if(s[i] >= g[total]){
      total++
    }
    if(total === g.length){
      return total
    }
  }
  return total
};
let g = [1, 2, 3], s = [1, 1]
// 三个孩子的胃口值 1， 2，3， 两块饼干能量值 1， 1
// 只能满足一个孩子，所以返回 1
console.log(findContentChildren(g, s))

// leetcode435 无重叠的区间个数
// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠
var eraseOverlapIntervals = function(intervals) {
  intervals.sort((a, b) => a[1] - b[1]) // 区间排序
  let flag = -Infinity  // 记录前一区间的结束值
  let sum = 0  // 记录需要移除的区间的个数
  for(let i = 0; i < intervals.length; i++){
    if(intervals[i][0] >= flag){  // 区间起始值 >= 前一区间结束值
      flag = intervals[i][1]  // 更新结束值
    } else {
      sum++
    }
  }
  return sum
};

let inter =  [ [1,2], [2,3], [3,4], [1,3] ]
console.log(eraseOverlapIntervals(inter))

// leetcode452 投飞镖刺气球
// 给定一个数组 points[i] = [Xstart, Xend], 返回引爆所有气球必须射出的最小弓箭数
var findMinArrowShots = function(points) {
  if(!points.length) return 0
  points.sort((a, b) => a[1] - b[1])
  console.log(points)
  let pos = points[0][1]
  let ans = 1
  for(let balloon of points){
    if(balloon[0] > pos){
      pos = balloon[1]
      ans++
    }
  }
  return ans
};

let points = [[10,16],[2,8],[1,6],[7,12]] // [[1, 2], [3, 4], [5, 6], [7, 8]]
// 输出4
console.log(findMinArrowShots(points))

// leetcode406 根据身高和序号重组队列
var reconstructQueue = function(people) {
  // 高降序，人数升序
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1])   // b[0] - a[0] || a[1] - b[1]
  // a[1] - b[1] || b[0] - a[0]
  // [ [ 7, 0 ], [ 5, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 2 ], [ 4, 4 ] ]
  // b[0] - a[0] || a[1] - b[1]
  // [ [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 0 ], [ 5, 2 ], [ 4, 4 ] ]
  console.log(people)
  let ans = []
  for(let i = 0; i < people.length; i++){
    ans.splice(people[i][1], 0, people[i])
  }
  return ans
};

let input = [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
// 题目大意： [7, 0] 前面数大于等于 7的有 0个，要把input重新排列成满足自身数组要求的数组
// output = [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
console.log(reconstructQueue(input))

// leetcode121 买卖股票的最大收益
var maxProfit = function(prices) {
  let money = 0 // 收益
  let min = prices[0]
  for(let i = 0; i < prices.length; i++){
    money = Math.max(money, prices[i] - min) // 比较和最低价的差值
    if(min > prices[i]){
      min = prices[i] // 保存价格最低的股票价格
    }
  }
  return money
};

let prices = [7,1,5,3,6,4]
// 第 i个元素是第 i天的价格
// 只允许一次交易，获取最大利润
console.log(maxProfit(prices))

// leetcode122 买卖股票的最大收益2
// 可以尽可能多的完成更多的交易，但不能同时参与多比交易
var maxProfit2 = function(prices) {
  let ans = 0
  for(let i = 1; i < prices.length; i++){
    // 所有正收益的累加
    ans += Math.max(0, prices[i] - prices[i - 1])
  }
  return ans
};

console.log(maxProfit2(prices))

// leetcode605 种植花朵
// 不能种在相邻的土地上
var canPlaceFlowers = function(flowerbed, n) {
  let N = flowerbed.length, pos = 0, total = 1
  // pos 种花位置， total 累计为0的项连续出现的次数
  // 开头默认0已经出现一次， 如果是1开头，10 后面刚好可以种一个，如果是 0开头 0后面也刚好可以种一个
  // 结尾
  flowerbed[N] = 0
  for(let i = 0; i < N + 1; i++){
    if(flowerbed[i] === 0){
      total++
      if(total === 3){
        total = 1
        pos++
      }
    } else {
      total = 0
    }
  }
  return n <= pos
};

let flowerbed = [1, 0, 0, 0, 1], n = 2
console.log(canPlaceFlowers(flowerbed, n))

// leetcode392 判断子序列
let s1 = 'abc', t = 'ahbgdc'
// 判断s1是否是 t的子序列。可以删出部分字符
// 1. 贪心思想 + 转数组
// var isSubsequence = function(s, t) {
//   if(s.length === 0) return true
//   let sStack = s.split(''), tStack = t.split('')
//   while(tStack.length > 0){
//     let tItem = tStack.pop()
//     if(tItem === sStack[sStack.length - 1]){
//       sStack.pop()
//       if(sStack.length === 0) return true
//     }
//   }
//   return false
// };
// 2. 双指针
var isSubsequence = function(s, t) {
  if(s.length === 0) return true
  let index = 0, subIndex = 0
  while(index < t.length){
    if(s[subIndex] == t[index]){  // 相同字符串
      subIndex++
      if(subIndex > s.length - 1){
        return true
      }
    }
    // 什么时候可以省略 else，if里的代码执行后，后面的代码也需要执行
    // if里的语句执行了，后面语句不执行，则不能省略else
    index++
  }
  return false
};

console.log(isSubsequence(s1, t))

// leetcode665 修改一个数成为非递减数组
// 最多改变数组中的一个元素，使其成为非递减数组
// 非递减数组 任意 0 <= i <= i - 2 总满足 num[i] <= num[i + 1]
var checkPossibility = function(nums) {
  let len = nums.length, count = 0
  if(nums[1] < nums[0]) count++  // count记录调整次数 nums[1] < nums[0], 需要调整一次
  for(let i = 1; i <= len - 2; i++){ // 题目中 i能取到的值
    let left = nums[i - 1], right = nums[i + 1]
    if(nums[i] > nums[i + 1]){
      count++
      if(left > right){
        nums[i + 1] = nums[i]
      } else {
        nums[i] = right
      }
    }
  }
  return count <= 1
};
let nums2 = [4, 2, 3]
console.log('非递减', checkPossibility(nums2))

// leetcode53 最大子序和
// let nums = [-2,1,-3,4,-1,2,1,-5,4] 连续子数组 [4,-1,2,1] 的和最大，为 6。输出 6
var maxSubArray = function(nums) {
  let ans = nums[0] // 结果
  let sum = 0  // 当前连续子序和
  for(const num of nums){
    if(sum > 0){
      sum += num
    } else {
      sum = num
    }
    ans = Math.max(ans, sum)
  }
  return ans
};
let nums = [-2,1,-3,4,-1,2,1,-5,4]
console.log(maxSubArray(nums))

// leetcode763 分隔字符串使同种字符出现在一起
var partitionLabels = function(S) {
  const maxPos = {}
  for(let i = 0; i < S.length; i++){
    maxPos[S[i]] = i  // 存放字母与它的最远位置
  }
  const res = []
  let start = 0  // 待切割的起始位置
  let scanMaxPos = 0 // 已扫描的字符中的最远位置
  for(let i = 0; i < S.length; i++){
    const curMaxPos = maxPos[S[i]] //当前扫描的字符的最远位置
    scanMaxPos = Math.max(scanMaxPos, curMaxPos)
    if(i === scanMaxPos){  // 刚好扫描到最远位置， 切割点
      res.push(i - start + 1)  // 长度push进数组
      start = i + 1 // 下一个待切割的字符串的起始位置
    }
  }
  return res
};

let S = "ababcbacadefegdehijhklij"
console.log(partitionLabels(S))
