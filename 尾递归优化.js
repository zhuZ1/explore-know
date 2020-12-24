// 函数调用会在内存中形成一个调用记录，保存调用位置和内部变量等信息
// 在A的内部调用B，在A的调用上方会形成一个B的调用记录，
// 等 B调用结束，将结果返回给A，B的调用记录才会消失

// 尾调用作为函数的最后一步，不需要保存外层的调用记录，
// function factorial(n) {
//   if(n===1) return 1
//   return n * factorial(n - 1)
// }
// console.log(factorial(5))
// 阶乘函数，计算n的阶层

// function factorial(n, total) {  // 不够直观
//   if(n===1) return total
//   return factorial(n - 1, n * total)
// }
//
// console.log(factorial(5, 1))

// 尾递归的实现，需要改写函数，确保最后一步只调用自身，将内部变量改写成函数的参数
// 方法1. 尾递归函数之外，再提供一个正常形式的函数
function factorial(n) {
  return totalFactorial(n, 1)
}
function totalFactorial(n, total) {
  if(n === 1) return total
  return totalFactorial(n - 1, n * total)
}
console.log(factorial(5))

//  柯里化，将接收多个参数的函数转换为接收一个参数的函数
function curry(fn, n){
  return function (m) {
    return fn.call(this, m, n)
  }
}
const factorial1 = curry(totalFactorial, 1)
console.log(factorial1(5))

// 方法2. es6的默认参数
function factorial2(n, total = 1) {
  if(n === 1) return total
  return factorial2(n - 1, n * total)
}
console.log(factorial2(5))
