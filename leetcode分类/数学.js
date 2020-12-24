// leetcode204 计数质数
// 统计小于非负整数 n的质数的数量
var countPrimes = function(n) {
  let count = 0, signs = new Array(n + 1)
  for(let i = 2; i < n; i++){
    if(!signs[i]){
      count++
      for(let j = 2 * i; j < n; j +=i){
        signs[j] = true
      }
    }
  }
  return count
};
console.log(countPrimes(4))

// leetcode 172 阶乘后的0
var trailingZeroes = function(n) {
  var count=0
  while(n >= 5){
    count += n / 5 | 0
    n /= 5
  }
  return count
};
console.log(trailingZeroes(5))

// leetcode67 二进制求和
// var a = '11', b='1' 都是二进制的
// 二进制11 3 二进制1 1 结果是 十进制的 4 转换为2进制的 100
// a '1010' b '1011'
var addBinary = function(a, b) {
  let ans = ''
  let ca = 0
  for(let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--){
    let sum = ca   // 0 0 1
    sum += i >= 0 ? parseInt(a[i]): 0  // a[3] 0 a[2] 1 a[1]
    sum += j >= 0 ? parseInt(b[j]): 0  // b[3] 1 b[2] 1
    ans += sum % 2 // '1010'
    ca = Math.floor(sum / 2) // 0 1 0 1
  }
  ans += ca == 1? ca: '' // '10101'
  return ans.split('').reverse().join('')
};

const a = '11', b = '1'
console.log(addBinary(a, b))

// leetcode 169 多数元素
// 给定一个大小为n的数组，找到多数元素，多数元素指出现次数 > n/2 的元素
// var majorityElement = function (nums) {
//   // 排序，中间的数
//   nums.sort((a, b) => a - b)
//   return nums[Math.floor(nums.length / 2)]
// }
// 方法2. 对象存储
var majorityElement = function (nums) {
  let half = nums.length / 2
  let obj = {}
  for(let num of nums){
    obj[num] = (obj[num] || 0) + 1
    if(obj[num] > half) return num
  }
}
let nums = [3, 2, 3] // 3
console.log(majorityElement(nums))
