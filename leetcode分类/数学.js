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
