// 整数数组 [2, 5, 7, 11]   目标值9， 找出两个整数返回下标
// 可以假设每种输入只对应一个答案， 数组中同一个元素不能使用两遍
// leetCode1 两数之和
// 法1： hashMap方法
var twoSum = function (nums, target) {
  let hashMap = {}, len = nums.length
  for(let i = 0; i < len; i++){
    let val = target - nums[i]
    if(val in hashMap){
      return [hashMap[val], i]
    }
    hashMap[nums[i]] = i
  }
}
console.log(twoSum([2, 7, 11, 15], 9))
// 法2： 遍历
var tarNum = function (nums, target) {
  for(let i=0;i<nums.length;i++){
    for(let j=i;j<nums.length;j++){
      if(i!=j && nums[i]+nums[j]==target){
        return [i, j]
      }
    }
  }
}
console.log(tarNum([3, 3], 6))

// 给定两个数组，求数组的交集
// 输入：nums1 = [1,2,2,1], nums2 = [2,2]

var inter = function (num1, num2) {
  let result = []
  let set1 = new Set(num1), set2 = new Set(num2)
  let sets1 = Array.from(set1), sets2 = Array.from(set2)
  for(let i=0;i<sets1.length;i++){
    if(sets2.includes(num1[i])){
      result.push(num1[i])
    }
  }
  return result
}
var num1 = [1,2,2,1], num2 = [2, 2]
console.log(inter(num1, num2))

// leetCode3 无重复字符的最长子串
// 这是一种解决方法， 但leetcode中不允许定义在函数作用域外的变量
// var resL = []
// var lengthOfLongestSubstring = function(s) {
//   let result = []
//   for(let i=0;i<s.length;i++){
//     if(!result.includes(s[i])){
//       result.push(s[i])
//     } else {
//       let newS = s.slice(i)
//       lengthOfLongestSubstring(newS)
//       break
//     }
//   }
//   resL.push(result.length)
//   return Math.max.apply(null, resL)
// };
// console.log(lengthOfLongestSubstring('bbbbb'))

var lengthOfLongestSubstring = function(s) {
  const res = new Set()
  const n = s.length
  let rk = -1, ans = 0  // 右指针 初始为-1，在左边界还没有开始移动
  for(let i=0;i<n;i++){
    if(i!=0){
      res.delete(s.charAt(i-1))
    }
    while(rk+1<n && !res.has(s.charAt(rk+1))){
      res.add(s.charAt(rk+1))
      ++rk
    }
    ans = Math.max(ans, rk-i+1)
  }
  return ans
}
console.log(lengthOfLongestSubstring('bbbbb'))

// 回文数  121

var isPalindrome = function(x) { // 转换为字符串的写法
  x = String(x).split('')
  return x.every((item, index)=>{
    return x[index] == x[x.length-index-1]
  })
};

console.log(isPalindrome(121))

var isPalindrome1 = function(x) { // 不转换为字符串的写法
// 获取当前数量级， 就是以什么为单位计数
  if(x<0) return false;
  if(x<10) return true;
  let n = 10 ** Math.floor(Math.log10(x))
  console.log('n', n)
  while(n>1 && x>0){
    if(Math.floor(x/n)!== x % 10) return false;
    x = Math.floor((x % n) / 10);
    console.log('x', x)  // 2
    n /= 100 //
    console.log('n', n)
  }
  return true;
};

console.log(isPalindrome1(121))

// 罗马数字转整数
// 字符       数值
/*  I             1
    V             5
    X             10
    L             50
    C             100
    D             500
    M             1000
I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。

    */

var romanToInt = function(s) {
  let obj = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  }
  let len = s.length
  let str = Number()
  for(let i=0;i<len;i++){
    let temp = obj[s[i]]
    if(temp<obj[s[i+1]]){
      str -= temp
    } else {
      str += temp
    }
  }
  return str
};

console.log(romanToInt('III'))

// 编写一个函数来查找最长公共前缀
// 输入 ['flower', 'floor', 'fly']   输出 'fl'
var longestCommonPrefix = function(strs) {
  if(strs.length==0) return ''
  let result = strs[0]
  for(let i=1;i<strs.length;i++){
    let j = 0
    for(;j<result.length && j<strs[i].length;j++){
      if(result[j] != strs[i][j]){
        break
      }
    }
    result = result.substr(0, j)
    if(result==''){
      return result
    }
  }
  return result
}

console.log(longestCommonPrefix(['flower', 'floor', 'fly']))

// 包含n个整数的nums，判断nums中 是否包含三个元素, 使得 a+b+c=0? 找出所有满足条件且不重复的三元组
// 给定数组
let nums = [-1, 0, 1, 2, -1, -4]
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
var threeSum = function(nums) {
  let arr = [], len = nums.length
  nums.sort((a,b)=>a-b) // 正序排序
  console.log('排序后的nums', nums)
  // [-4, -1, -1, 0, 1, 2]
  for(let i = 0; i < len - 2; i++){
    if(nums[i] > 0) break
    if(i > 0 && nums[i] == nums[i-1]) continue // 去重 遇到重复元素，继续循环 i++
    let L = i + 1, R = len - 1
    // 先 固定 i
    // L 与 R 相等时， i++
    while(L < R){
      const sum = nums[i] + nums[L] + nums[R]
      if(sum == 0){
        arr.push([nums[i], nums[L], nums[R]])
        while(L < R && nums[L] == nums[L+1]) L++ // 去重 L遇到重复元素
        while(L < R && nums[R] == nums[R-1]) R-- // 去重 R遇到重复元素
        L++
        R--
      }
      else if(sum < 0) L++  // <0 移动 L
      else if(sum > 0) R-- // >0 移动 R
    }
  }
  return arr
}

console.log('三数之和', threeSum(nums))

let arr1 = [
  {cardExt: '{"outer_id":2069,"code":"2019123456"}',
  cardId: "pW7Vtt4AKwz6UioxWb_DWZ5sdZbM"}]

console.log(JSON.parse(arr1[0].cardExt).outer_id)




// 寻找两个正序数组的中位数，假设这 nums1 和 nums2 不会同时为空
var findMedianSortedArrays = function(nums1, nums2) {
  let newArr = nums1.concat(nums2) // 而合并数组
  newArr.sort((a,b)=>a-b) // 正序排序
  console.log('排序', newArr)
  let free = newArr.length % 2, midIndex = Math.floor(newArr.length / 2)
  if(free==1){
    return newArr[midIndex]
  } else {
    return (newArr[midIndex] + newArr[midIndex-1]) / 2
  }
};

let nums1 = [1, 3], nums2 = [2, 4]
console.log(findMedianSortedArrays(nums1, nums2))


// 对原数组修改，将数组中的0 挪到最后
let arr12 = [3, 0, 12, 0, 0, 1]

function moveZero(arr){
  let len = arr.length // 6
  // for(let i=0;i<len;i++){
  //   if(arr[i]==0){
  //     console.log(i)
  //     arr.splice(i, 1) // 正序遍历，splice 删除元素后, 遍历到当前元素以后的所有元素的index 都会往前移动一个单位
  //     arr.push(0) // 移动单位后，此index 上的元素不会再被遍历（因为已经遍历过了），所以需要 -1，才能使该元素再次遍历
  //     i--
  //     len--
  //   }
  // }
  // for(let i=len; i--;i>=0){  // 逆序遍历： 删除操作不会影响还未循环遍历的元素，
  //   if(arr[i]==0){
  //     arr.splice(i, 1)
  //     arr.push(0)
  //   }
  // }
  // 双指针，交换值的方法
  // 双指针 有两种用法： 一种是一个正序遍历，一个逆序遍历
  // 另一种是 都正序，一个快，一个慢
  let i = 0, j = 0
  for(i;i <len;i++){ // i 指针遍历整个数组，遇到非0 的就与 j指向的项 交换，非0项被不断交换到数组的前部
    if(arr[i]!=0){
      let temp = arr[j]
      arr[j] = arr[i]
      arr[i] = temp
      j++
    }
  }
  return arr
}

// arr12.sort((a, b)=>b?0: -1)

console.log('移0', moveZero(arr12))

// 整数反转
var reverse = function (x) {
  let res = ''
  let str = x + ''
  if(x>0){
    for(let i = str.length - 1;i >= 0;i--){
      res += str[i]
    }
  } else {
    for(let i = str.length - 1; i > 0;i--){
      res += str[i]
    }
    res = -res
  }
  if(res<Math.pow(-2, 31) || res>=Math.pow(2, 31)-1){
    return 0
  }
  return res * 1
}

console.log('反转', reverse(-123))


// 删除排序数组中的重复项（原地删除）
var arr = [1, 1, 1, 1]
// 解法1
var removeDuplicates = function (nums) {
  let len = nums.length
  for(let i = 0; i < len;i++){
    if(nums.indexOf(nums[i]) != nums.lastIndexOf(nums[i])){
      nums.splice(i, 1)
      i--
    }
  }
  return nums
}
// 解法2
var removeDuplicates2 = function (nums) {
  let count = 0
  let len = nums.length
  for(let i = 1; i < len;i++){
    if(nums[i] != nums[i-1]){
      nums[i - count] = nums[i]
    } else {
      count ++
    }
  }
  return len - count
}
// 解法3 双指针
var removeDuplicates3 = function (nums) {
  let j = 0
  let len = nums.length
  for(let i = 1; i < len;i++){
    if(nums[i] != nums[i-1]){  // 当前元素不是重复元素
      j++
      nums[j] = nums[i]  //
    }
  }
  return j + 1
}
console.log('删除重复元素', removeDuplicates3(arr))

// 移除数组中 等于 val 的元素, 不能开辟新的数组空间， 返回移除后新数组的长度

var removeElement = function (nums, val) {
  let len = nums.length
  for(let i = 0; i < len; i++){
    if(nums[i] == val){
      nums.splice(i, 1)
      i--
    }
  }
  return nums.length
}
console.log('移除指定值之后', removeElement([3,2,2,3], 3))

// 找到指定字符串第一次出现的位置, 不使用 indexOf
var strStr = function (haystack, needle) {
  if(needle==='') return 0
  let len = needle.length, haystackArr = haystack.split(''), arrLen = haystackArr.length
  for(let i = 0; i < arrLen; i++){
    if(haystack.substr(i, len)==needle){
      return i
    }
  }
  return -1
}

console.log(strStr('hello', 'll'))


// n个非负整数 [1,8,6,2,5,4,8,3,7]
// 下标的差 * 某个下标对应的数字中较小 的最大值
let height = [1,8,6,2,5,4,8,3,7]
// var maxArea = function (height) {
//   let len = height.length, temp = 0  // 暂存乘积
//   for(let i = 0; i < len; i++){
//     for(let j = i + 1; j < len; j++){
//       let area = (j - i) * (Math.min(height[j], height[i])
//       if(area > temp) temp = area
//     }
//   }
//   return temp
// }
// 双指针解法
var maxArea = function (height) {
  let len = height.length, temp = 0  // 暂存乘积
  let left = 0, right = len - 1 // 左右指针
  while(left < right){
    const area = (right - left) * Math.min(height[left], height[right])
    if(area > temp){
      temp = area
    }
    if(height[left] < height[right]){  // 移动指针面积会变小， 要想面积增大， 高度要增大
      left++ // 左边小于右边的，右移寻找更大的
    } else {
      right-- // 相同的，左移寻找更大的
    }
  }
  return temp
}

console.log('面积', maxArea(height))

// 最长回文子串 动态规划
let str = "babad"
// Array.from(arrayLike, mapFn, this.Arg) 方法 返回一个新的数组实例
// mapFn 指定该参数。 数组中的每一个元素都会执行 该回调函数
var longestPalindrome = function (s) {
  let len = s.length
  let res = ''
  let dp = Array.from(new Array(len), ()=> new Array(len).fill(0))
  for(let i = len - 1; i >= 0; i--){  // 倒序遍历，简化操作，因为 dp[i][j] 依赖于dp[i+1][j-1]
    for(let j = i; j < len; j++){
      // s[i]==s[j]  dp[i][j] 只是用来表示 从s[i] 到s[j] 是否可以形成回文
      dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1]) // j - i < 2 子串是一个长度为0或1 的字符串
      if(dp[i][j] && j-i+1 > res.length){ // j-i+1 计算回文的字符长度
        res = s.substring(i, j+1) // 截取回文字符串
      }
    }
  }
  return res
}
console.log(longestPalindrome(str))

// 最接近的三数之和
// nums = [-1,2,1,-4], target = 1
// 依旧是双指针
var threeSumClosest = function (nums, target) {
  let len = nums.length
  nums.sort((a,b)=>a-b) // 正序排序
  // [-4, -2, 1, 2]
  let res = nums[0] + nums[1] + nums[len-1]
  // 假定 0， 1和最后一项是 和最接近target的 三数
  for(let i = 0; i < len - 2; i++){
    let L = i + 1, R = len - 1
    // 先 固定 i
    // L 与 R 相等时， i++
    while(L < R){
      const sum = nums[i] + nums[L] + nums[R]
      if(sum == target){
        return sum
      }
      else if(sum < target) {
        if(target - sum < Math.abs(res - target)) res = sum  // 三数之和更接近 target
        L++ // 左指针右移 增大和 看是否还能更接近
      }
      else if(sum > target){
        if(sum - target < Math.abs(res - target)) res = sum
        R-- // 右指针左移， 减小和 看是否还能更接近
      }
    }
  }
  return res
}
console.log('最接近的三数之和', threeSumClosest([-1,2,1,-4], 1))

// leetCode18 四数之和
// 整数数组，返回符合条件的四数之和的下标
var fourSum = function (nums, target) {

}

console.log(fourSum([1, 0, -1, 0, -2, 2], 0))

// leetcode48. 90度旋转二维矩阵 原地
 // matrix = [                          [
//               [1, 2, 3],    旋转后的     [7, 4, 1],
//               [4, 5, 6],                 [8, 5, 2],
//               [7, 8, 9]                  [9, 6, 3]
//            ]                          ]

// 左上 [i, j], 右上 [i, len - j]
// 左下 [len - i, j], 右下 [len - i, len - j]
let matrix = [[1,2,3], [4,5,6], [7,8,9]]
var rotate = function (matrix) {
  let len = matrix.length - 1, temp  // 矩阵的长宽一致 3
  console.log(len)
  for(let i = 0; i < Math.floor(len / 2); i++){
    for(let j = i; j <= len - i - 1; i++){
      temp = matrix[i][j] // 左上角的元素
      matrix[i][j] = matrix[len - j][i]
      matrix[len - j][i] = matrix[len - i][len - j]
      matrix[len - i][len - j] = matrix[j][len - i]
      matrix[j][len - i] = temp
    }
  }
  return matrix
}

console.log('旋转后的结果', rotate(matrix))

// 35. 搜索插入位置
// 描述： 给定一个有序数组和一个目标值， 找到目标值返回下标，如果不存在，返回其合适插入的位置
let arrN = [1, 3, 5, 6]
// 解法1 遍历
// var searchInsert = function(nums, target) {
//   let num = nums.length
//   if(nums[0] > target) return 0
//   if(nums[num - 1] < target) return num
//
//   for(let i = 0; i < num; i++){
//     if(nums[i] < target && nums[i+1] > target){
//       return i+1
//     } else if(nums[i] == target){
//       return i
//     }
//   }
// }
// 解法2 二分查找
var searchInsert = function(nums, target){
  let left = 0, right = nums.length - 1
  while(left <= right){
    const mid = (left + right) >> 1 // 中间值向下取整
    if(nums[mid] == target) return mid
    if(nums[mid] < target){
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}

console.log(searchInsert(arrN, 4))

// 10进制数 9
// 9 % 2 = 4 ... 1  /  4 % 2 = 2 ...0  /  2 % 2 = 1 ... 0   1 % 2 = 0 ... 1  1001
// 52 % 2 = 26 ... 0  / 26 % 2 = 13 ... 0 / 13 % 2 = 6 ... 1 / 6 % 2 = 3 ... 0 / 3 % 2 = 1 ... 1 / 1 % 2 = 0 ... 1

// 按位移动操作符 >>
// 5 >> 1 右移1
// 5  % 2 = 2 ... 1  / 2 % 2 = 1 ... 0  /  1 % 2 = 0 ... 1  5 的二进制是 0000 0101
// 00000010 2


// 38. 外观数列
// 1.     1
// 2.     11
// 3.     21
// 4.     1211
// 5.     111221
// 6.     312211
// 每一项都是对上一项数字的描述
// 解法1. 通过正则合并相同元素
// var countAndSay = function(n) {
//   let prev = '1'
//   for(let i = 1; i < n; i++){
//     prev = prev.replace(/(\d)\1*/g, item=>`${item.length}${item[0]}`)
//   }
//   return prev
// }
// 正则解释： \1搭配前面小括号使用，表示第一个小括号匹配的内容相同 (\d)\1* 表示匹配到 1（\1 0次），11，22（\1 1次）
// 解法2.
var countAndSay = function(n){
  let prev = '1', cur = '1'
  for(let i = 1; i < n; i++){
    prev = cur
    cur = ''
    let left = 0, right = 0
    while(right < prev.length){
      while(prev[left] == prev[right] && right < prev.length){
        right++
      }
      cur += (right - left).toString() + prev[left]
      left = right
    }
  }
  return cur
}

console.log(countAndSay(6))



// leetcode66 加一
var plusOne = function(digits) {
  const len = digits.length
  for(let i = len - 1; i >= 0; i--){
    // 最后一位开始判断
    digits[i]++
    digits[i] %= 10
    // +1后求余
    if(digits[i]!=0){ // 余数不为0，说明这个数位上不需要再进位了，直接返回现在的数组
      return digits
    }
  }
  // 循环结束，所有位都要进位，走下面这个逻辑
  digits = [...Array(len + 1)].map(_=>0)
  return [1, ...digits]
};
let dis = [4, 0, 9]// [4, 3, 2, 1] //
console.log(plusOne(dis))







// leetcode58 最后一个单词的长度
// 输入 'hello world' 输出 5
var lengthOfLastWord = function(s) {
  let end = s.length - 1
  while(end >= 0 && s[end] == ' ') end--
  if(end < 0) return 0
  let start = end
  while(start >= 0 && s[start] != ' ') start--
  return end - start
};
let word = " "
console.log(lengthOfLastWord(word))


// leetcode 160 相交链表
var getIntersectionNode = function(headA, headB) {

};

