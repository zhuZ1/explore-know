// 分发饼干
// 每个孩子只能有一块饼干
// 对于每个孩子 i都有一个胃口值 g[i], 每块饼干 j,都有一个尺寸s[j]
// 如果 s[j] >= g[i] 就可以把饼干 j分给孩子 i。 尽可能满足更多的孩子
var findContentChildren = function(g, s){
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)  // 排序
  let total = 0
  for(let i = 0; i < s.length; i++){
    if(s[i] >= g[total]){ // 比较同坐标下的元素大小
      total++
    }
    if(total == g.length) return total
  }
  return total
}
let g = [1, 2, 3], s = [1, 1]
console.log(findContentChildren(g, s))

// 给定一个区间集合，找到需要移除空间的最小数量，使剩余空间互不重叠
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[1] - b[1]) // 区间排序
  let flag = -Infinity // 初始化区间起始值
  let sum = 0
  for(let i = 0; i < intervals.length; i++){
    if(intervals[i][0] >= flag){   // 区间起始值 >= 前一区间结束值
      flag = intervals[i][1]  // 更新结束值
    } else {
      sum++
    }
  }
  return sum
}
let input = [[1, 2], [2, 3], [3, 4], [1, 3]]
console.log(eraseOverlapIntervals(input))

// 飞镖刺气球
// 二维空间有许多气球
// 只需知道开始和结束的横坐标
// 返回引爆所有气球所需的飞镖数
var findMinArrowShots = function(points){
  if(!points.length) return 0
  points.sort((a, b) => a[1] - b[1]) // 按区间排序
  let pos = points[0][1]
  let ans = 0
  for(let balloon of points){
    if(balloon[0] > pos){
      pos = balloon[1]
      ans++
    }
  }
  return ans
}
let points = [[10, 16], [2, 8], [1, 6], [7, 12]]
console.log(findMinArrowShots(points))

// 根据身高和序号重组队列
// 打乱顺序的一群人， people[i] = [hi, ki] 表示第i个人的身高是hi，前面有ki个身高 >= hi的人
// 请正确排序
var reconstructQueue = function(people){
  people.sort((a, b) => b[0] - a[0] || a[1] - b[1]) // 高降序，人数升序排列
  // people [ [ 7, 0 ], [ 7, 1 ], [ 6, 1 ], [ 5, 0 ], [ 5, 2 ], [ 4, 4 ] ]
  let ans = []
  for(let i = 0; i < people.length; i++){
    // 身高已经排好序
    // 插入某个人，比他高的人已经存在ans里了 people[i][1]先插入的肯定是个高的
    // 矮的人怎样插入都不影响高的人 people[i][1] 前面有几位就将 people[i]其排在第几位
    ans.splice(people[i][1], 0, people[i])
  }
  return ans
}
let people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
console.log(reconstructQueue(people))

// 买卖股票的最大收益
var maxProfit = function (prices) {
  let money = 0 // 收益
  let min = prices[0]
  for(let i = 0; i < prices.length; i++){
    min = Math.min(min, prices[i]) // 最低的股票价格
    money = Math.max(money, prices[i] - min) // 比较和最低价的差值
  }
  return money
}

let prices = [7,1,5,3,6,4]
console.log(maxProfit(prices))

// 买卖股票的最大收益2
// 可以尽可能多的完成交易， 但不能交叉进行
var maxProfit2 = function (prices) {
  let ans = 0
  for(let i = 1; i < prices.length; i++){
    ans += Math.max(0, prices[i] - prices[i - 1])  // 所有正收益的累加
  }
  return ans
}
console.log(maxProfit2(prices))
