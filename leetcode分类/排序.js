// leetcode215 数组中的第k个最大元素
var findKthLargest = function(nums, k) {
  nums.sort((a, b)=>b - a)
  return nums[k - 1]
};

let nums = [3, 2, 1, 5, 6, 4], k = 2
console.log(findKthLargest(nums, k))


// leetcode347 出现频率最高的 k个元素
// 返回前k高的
var topKFrequent = function(nums, k) {
  let obj = {}
  for(let i = 0; i < nums.length; i++){
    if(!obj[nums[i]]){
      obj[nums[i]] = 1
    } else {
      obj[nums[i]]++
    }
  }
  return Object.keys(obj).sort((a, b)=> obj[b] - obj[a]).slice(0, k)
};

let nums1 = [4,1,-1,2,-1,2,3], k1 = 2
console.log(topKFrequent(nums1, k1))

// leetcode451 按照字符出现次数对字符串排序
// 返回降序排序后的新字符串
// var frequencySort = function(s) {
//   let map = new Map()
//   let str = ''
//   for(let w of s){
//     map.set(w, (map.get(w) || 0) + 1)
//   }
//   map = new Map([...map].sort((a, b)=> b[1] - a[1]))
//   for(let [k, v] of map){
//     for(let i = 0; i < v; i++){
//       str += k
//     }
//   }
//   return str
// };
// 方法2
var frequencySort = function(s) {
  let obj = {}
  for(let w of s){
    obj[w] = (obj[w] || '') + w
  }
  return Object.values(obj).sort((a, b) => b.length - a.length).reduce((p, c) => p + c, '')

};

let str = "cccaaa"
console.log(frequencySort(str))

// leetcode75 颜色分类
// 0 1 2 分别表示红白蓝， 原地排序，相同颜色相邻，红白蓝的顺序
let arr = [2, 0, 2, 1, 1, 0]
var sortColors = function(nums) {
  let left = 0, right = nums.length - 1
  for(let i = left; i <= right; i++){
    if(nums[i] === 0){
      [nums[left], nums[i]] = [nums[i], nums[left]]
      left++
      // 左指针右移
    } else if(nums[i] === 2){
      // 遇到是2的元素，交换位置
      [nums[right], nums[i]] = [nums[i], nums[right]]
      // 2, 0 -> 0, 2
      right--
      // 右指针左移
      i--
      // i--，再判断一次第一位，因为有可能交换过来的是 2
    }
  }
  return nums
};

console.log(sortColors(arr))
