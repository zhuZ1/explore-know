// 再次理解 call， apply，bind

// 应用： 改变函数运行时的上下文， 即改变运行时的this执向

function Fruit() { // 构造函数

}

Fruit.prototype = {
  color: 'red',
  say: function () {
    console.log('Color is ' + this.color)
  }
}

let apple = new Fruit()
apple.say()

// banana也想使用 say() 方法
banana = {
  color: 'yellow'
}

apple.say.call(banana) // this的指向就由apple 转向 banana对象

// func.call(this, arg1, arg2) // this 是你想指定的对象, 参数明确知道数量时
// func.apply(this, [arg1, arg2]) // 不确定时用apply


// 数组追加， （合并数组）
let arr1 = [1, 2, 3], arr2 = [4, 5]
// console.log(arr1.concat(arr2), arr1) // concat 方法生成新的数组, 原数组不会被改变
console.log(Array.prototype.push.apply(arr1, arr2), arr1)  // arr2被追加到arr1的后面

// 数组中最大的值
let numbers = [1, 2, 3]
console.log(Math.max.apply(null, numbers))

// 区分数组和对象类型
function IsWhat(obj){
  if(Object.prototype.toString.call(obj) == '[object Array]'){
    return 'is Array'
  } else if(Object.prototype.toString.call(obj) == '[object Object]'){
    return 'is Object'
  }
}
console.log(IsWhat(numbers))

// 类数组
console.log((function (a) {
  return Array.prototype.slice.call(arguments)
})(1, 2, 3))

// 定义一个log方法，让他可以代理console.log()方法
// function log() {
//   console.log.apply(null, arguments)
// }
// log(1)
// 给每一个logo增加一个 '(App)' 的前缀
function log() {
  let arr = Array.prototype.slice.call(arguments)
  arr.unshift('(App)')
  console.log.apply(null, arr)
}
log('hello')

// call 方法的使用示例
var name = '小明'
var perObj = {
  name: '小红'
}
function conName(){
  console.log(this.name)
}
conName()
conName.call(perObj)
// call  起到了两个作用 1. 改变了this，由window 改成了参数对象 2. 执行了函数

Function.prototype.newCall = function(obj){  // 所有函数都可以访问 newCall
  obj = obj ? Object(obj): global
  obj.fn = this // 添加属性 this获取调用 newCall的函数，此时的this也就是conName
  // es5 的方法
  // var args = [], len = arguments.length
  // for(let i = 1; i < len; i++){
  //   args.push('arguments[' + i + ']')
  // }
  // es6 的方法
  var args = [...arguments].slice(1)
  var result = obj.fn(...args)
  delete obj.fn
  return result
}

// 模拟实现apply
Function.prototype.newApply = function(obj, arr){
  obj = obj ? Object(obj): global
  obj.fn = this
  var result
  if(!arr){
    result = obj.fn()
  } else {
    let len = arr.length, args = []
    for(let i = 0; i < len; i++){
      args.push('arr[' + i + ']')
    }
    result = eval('obj.fn(' + args + ')')
  }
  delete obj.fn
  return result
}



// 模拟实现call
Function.prototype.myCall = function (ctx) {
  ctx = ctx || global
  ctx.fn = this
  var args = [], len = arguments.length
  for(var i=1;i<len;i++){
    args.push('arguments[' + i + ']')
  }
  // args = ['arguments[1]', 'arguments[1]', 'arguments[2]']
  var result = eval('ctx.fn(' + args + ')')
  delete ctx.fn
  return result
}


// bind 方法的使用
function f1(x, y) {
  console.log(x + y + this.z)
}
var obj = {
  z: 3
}
var f2 = f1.bind(obj, 1, 2)
f2()
// bind 三个作用： 1. 改变this指向，返回函数  2. 返回了一个绑定了this的新函数 3.支持函数柯里化
// 模拟实现 bind

Function.prototype.myBind = function (obj) {
  // var args = Array.prototype.slice.call(arguments, 1)

  // var fn = this  // 调用myBind的函数
  // return function () {
  //
  //   // 二次调用时，仍需要抓取参数
  //   var params = Array.prototype.slice.call(arguments)
  //   fn.apply(obj, args.concat(params)) // 参数拼接
  //   // MDN中描述， 通过bind 返回的函数可以直接调用，也支持new 运算符构造，构造过程中this 指向会被忽略， 但能继承属性和 接收参数
  // }
  if(typeof this !=='function'){ // 非函数调用时报错
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  var args = Array.prototype.slice.call(arguments, 1) //
  var fn = this
  var fn_ = function () {}
  // 借用空白函数，达到修改原型不会影响到 构造函数的原型对象的目的
  var bound = function () {
    var params = Array.prototype.slice.call(arguments)
    fn.apply(this.constructor === fn? this : obj, args.concat(params))
    // new调用，bound函数中的this 指向实例自身，普通调用this 指向 obj
    // this.constructor === fn? 判断是否是new 调用
  }
  fn_.prototype = fn.prototype
  // 拷贝fn的prototype
  bound.prototype = new fn_()
  // 将bound 方法原型指向 fn_()的实例
  return bound
}

var f3 = f1.myBind(obj, 1, 2)
f3()


// 扁平化并去重， 得到一个升序的数组
// console.log( '结果', JSON.stringify( flatten([1, 9, [4, [6, 7], 8], [9, 6], [1, [3, 2, [5] ] ] ] ) ) ) // => [1,2,3,4,5,6,7,8,9]
let arr = [1, 9, [4, [6, 7], 8], [9, 6], [1, [3, 2, [5] ] ] ]
function flatten(arr) {
 let newArr = arr.toString().split(',').map(item=> +item)
  console.log(newArr)
  let set = new Set(newArr)
  return [...set].sort((a, b)=>a-b)
}
console.log(flatten(arr))



