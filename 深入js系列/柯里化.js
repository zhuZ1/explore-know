
// 柯里化： 将使用 多个参数 的函数转换成 一系列使用一个参数的 函数的技术
// 作用： 参数复用， 降低通用性，提高适用性

function currying(fn) {
  return function (m) {
    return function (n) {
      return fn(m, n)
    }
  }
}
// function add(x, y) {  // adds 是 add 的柯里化函数，由接收两个参数转变为接收一个参数
//   return x + y
// }
// const adds = currying(add)
// console.log(adds(1)(2))



function curry1(fn) {
  var args = Array.prototype.slice.call(arguments, 1)
  return function () {
    var newArgs = args.concat([].slice.call(arguments))
    return fn.apply(this, newArgs)
  }
}

// 高级柯里化实现
function curry(fn) {
  return function curried(...args) {
    if(args.length >= fn.length){
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
function add(x, y, z) {  // adds 是 add 的柯里化函数，由接收两个参数转变为接收一个参数
  return x + y + z
}

const add1 = curry(add)
console.log(add1(1, 2, 3))
console.log(add1(1)(2)(3))
console.log(add1(1)(2, 3))


function curry2() {
  let args = Array.prototype.slice.call(arguments)
  let inner = function () {
    args.push(...arguments)
    return inner
  }
  inner.toString = function () {
    return args.reduce((pre, cur)=>pre + cur)
  }
  return inner
}
curry2((1),(2))
console.log(curry2(1)(2).toString())


// sum函数，支持sum(1)(2)(3, 4)(5, 6, 7...)
// console.log(sum())
// console.log(sum(1))
// console.log(sum(1)(2))
// console.log(sum(1, 2)(3, 4)(5, 6))


