//扩展运算符


function push(array, ...items){
  array.push(...items)
}
let array1 = [1, 2, 3]
push(array1, 9, 8, [0, 4])
console.log(array1)

  // 复制数组，使数组a1和a2不相互影响
// const a1 = [1, 2]
// const a2 = a1
//
// a1[2] = 3
// console.log(a2)  a1和a2只是指向同一个数据的指针

// const a1 = [1, 2]  // es5的写法  ，克隆一个数组
// const a2 = a1.concat()
// a1[0] = 2
// console.log(a2)

// const a1 = [1, 2]
// const a2 = a1.slice()  // 浅克隆数组
// a1[0] = 2
// console.log(a2)

const a1 = [1, 2]
const a2 = JSON.parse(JSON.stringify(a1))
a1[0] = 2
console.log(a2)

// es6的扩展运算符来克隆一个数组

// const b1 = [1, 2]
// const b2 = [...b1]
// b1[0] = 2
// console.log(b2)

// 或者写成
// const b1 = [1, 3]
// const [...ba] = b1
// b1[0] = 2
// console.log(ba)

function  translateArg() {//将参数转为数组
  console.log([...arguments])

}
// 扩展运算符调用的是遍历器接口，如果一个对象没有部署iterator接口
// 就无法转换
translateArg(1, 3, 5)
  const num = [NaN].indexOf(NaN)
console.log(num)

console.log([NaN].includes(NaN))

let { foo: btn } = {foo: 'bar', too: 'baz'}  // 对象解构赋值后，将值重新赋给btn
console.log('foo的值', btn)

let obj = {
  title: 'tom',
  name: 'TOM'
}
let { title, name} = obj
console.log(title, name)

// console.log(x)  //暂时性死区 报错： a is not defined
// let x = 1
console.log(y)  // 正常运行 undefined
var y = 2

function f(x){ // 尾调用， 什么是尾调用，某个函数的最后一步是调用另一个函数。尾调用不一定出现在函数尾部，只要是最后一步操作即可。
  return g(x)
}


// 给一个数组添加键值
let arr = [1, 2, 3, 4]
const newArr = arr.map(item=>({  // map返回一个新的数组， 原数组不变， 新数组是由callback执行函数执行后的结果
  src: item
}))
// 这里是直接返回的一个对象  {}会被解析为代码块，所以要在外面加一层 ()
console.log(newArr)
// 另一种方式
const newArr1 = arr.reduce((res, item)=>{ // reduce降维
  res.push({src: item})
  return res
}, [])
console.log(newArr1)

// 又一种方式
let newContent = []
arr.forEach(item=>{  // forEach返回值是undefined
  newContent.push({
    src: item
  })
})
console.log(newContent)

// Promise  异步编程的一种解决方案
// 定义一个promise实例， 新建后立即执行
const promise = new Promise((resolve, reject)=>{  // 接收一个函数作为参数， 该函数的两个参数分别是resolve和reject
  // 它们是两个函数
  if(success){
    resolve(value) // 将promise的状态从'未完成'变为成功
  } else {
    reject(error) // 将promise的状态变为失败
  }
})
//一般来说，不要在.then中指定 rejected 状态的回调函数 而是像下面一样 用.catch来捕获错误

// bad
promise.then(function(value){ // .then分别指定 resolved 和 rejected 的回调函数， 会在所有同步任务执行完之后才开始执行
  // success
}, function (error) {
  // failure
})
// good
promise.then(function () {
  //success
}).catch(function () {
  // failure
})



Array.of() // 方法用于将一组值转换为数组
let newA = Array.of(3)
console.log(newA)

let arr1 = [1, 3, 5, 7]
const findA = arr1.find(n=>n<3) // 找到第一个符合条件的数组成员并返回， 没有返回undefined
console.log(findA)
// find 和 findIndex 方法都可以发现 NaN， 弥补了indexOf 方法的不只

// es5的类和继承
// function Point(x, y){  //构造函数
//   this.x = x,
//   this.y = y
// }
// es6的类
class Point { // 定义了一个类
  constructor(x, y){ // 类里面有一个构造方法  对应es5 的构造函数
    this.x = x // this关键字代表实例对象, xy对应es5构造函数的参数
    this.y = y
    this._count = 0  // 实例属性可以定义在constructor上
  }
  // 实例属性也可以直接定义在最顶层
  // _count = 0

  toString(){  // 定义另外的方法， 这个方法和构造方法都是类内部的方法， 平级的
    return `${this.x} + ${this.y}`
  }
  // 定义在类上的方法是不可枚举的 es5定义在构造函数或其原型上的方法是可枚举的
}

// Point.prototype.toString = function () { // 也可以在原型上定义
//   return `${this.x}${this.y}`
// }

console.log('是否可枚举', Object.keys(Point.prototype))
// 等同于
Point.prototype = {
  constructor(){},
  toString(){}
}
// 类的方法都是定义在原型上面， 所以类的新方法都可以定义在prototype对象上
// Object.assign() 可以很方便的一次向类添加很多个方法
const newP = new Point('zhu', 'zhen')  // 使用 new调用
console.log(newP.toString())

// class ColorPoint extends Point{
//   constructor(x, y, color){
//     super(x, y)
//     this.color = color
//   }
// }

async function f1 () { // 函数声明的形式  // 申明Function异步
  return 'hello world'
  // console.log('hello world')
}

console.log('bye bye')

f1().then(v=>{
  console.log(v)  // 'hello world'，async函数的返回值作为then回调的参数
})

async function f2 () {
  throw new Error('报错了')
}

f2().then(v=>{
  console.log(v)
}).catch( e=>{
  console.log('错误信息：' + e)
})

async function f3() {
  return await 123  // await 等待一个异步方法执行完成
}

f3().then( v=>{
  console.log(v)
})
// 参数求和，多个参数求和
function sum(a){
  if(arguments.length == 1){
    return function(sec){
      return a + sec
    }
  }else{
    for(i = 1; len = arguments.length, i < len; i++){
      a += arguments[i]
    }
    return a
  }
}
console.log(sum(2,3,5,6))         //5
console.log(sum(2)(3))       //5


let Arr1 = [1, 2, 3],
  Arr2 = [2, 3],
  arrTo = Arr1.concat(Arr2)

console.log(arrTo)
Arr1.push.call(Arr1, 3, 5)
// call 参数可以列表的形式传递， apply 参数以数组的形式
console.log('Arr1结合Arr2', Arr1)

let ArrNew = [1, 2, 3]

let reArr = ArrNew.reduce((prev, cur)=>{
  console.log('累计器', prev)  // 累计器指每次计算返回的结果，第一次是原始值，如果无原始值，则是待处理数组的第一项
  return prev + cur
}, 5)

console.log('reArr', reArr)

function useArguments() {
  // arguments 类数组对象， 可以使用Array.from(arguments),或者扩展运算符将其转换为正常的数组
  let arr = [...arguments]
  // reduce 求和
  return arr.reduce((a, b)=>a+b)
}
console.log('和的值',useArguments(2, 3, 4))

function partialUsingArguments(fn) {
  let arr = [...arguments].slice(1)
  console.log(arr)
  return function(){
    console.log('arr', arr.concat([...arguments]))
    return fn.apply(null, arr.concat([...arguments]))
  }
}
let fn1 = function(a, b){
  return a + b
}
console.log(partialUsingArguments(fn1, 1, 2, 3)())


function curryIt(fn) {
  return function(n){
    return function(m){
      return function(p){
        // call 接收参数序列， apply接收由参数组成的数组
        return fn.call(null, n, m, p)
      }
    }
  }
}

let fn2 =  function (a, b, c) {
  return a + b + c
}
console.log(curryIt(fn2)(1)(2)(3))

function createModule(str1, str2) {
  return {
    greeting: str1,
    name: str2,
    sayIt: function(){
      return this.greeting + ',' + this.name
    }
  }
}

console.log(createModule('hello', 'ann').sayIt())

function endsWithVowel(str) {
  let arr = ['a', 'e', 'i', 'o', 'u']
  for(let i=0;i<arr.length;i++){
    if(str[str.length-1].toLowerCase()==arr[i])
      console.log(arr[i])
      return true
  }
  return false
}

let str1 = 'gorilla'
console.log('结果', endsWithVowel(str1))

let str = 'fafas'
for(let i=0;i<str.length;i++){
  console.log(str[i].toUpperCase())
}

function captureThreeNumbers(str) {
  let arr = str.split('').map(item=>Number(item))
  console.log(arr)
  for(let i=1;i<arr.length;i++){
    if(arr[i]==(arr[i-1]+arr[i+1])/2){
      return  ''+ arr[i-1] + arr[i] + arr[i+1]
      break
    }
  }
  return false
}

let str0 = '9876543'
console.log('连续的', captureThreeNumbers(str0))

function matchesPattern(str) {
  let arr = str.split('-')
  console.log(arr[0].length)
  if(arr.length== 3 && arr[0].length == 3 && arr[1].length==3 && arr[2].length==4) return true
  for(let i=0;i<arr.length;i++){
    if(!isNaN(Number(arr[i]))){
      return true
    }
  }
  return false
}

let test = '800-555-1212'
console.log(matchesPattern(test))

console.log('123'.toLowerCase())

function containsRepeatingLetter(str) {
  let newS = str.toLowerCase().split(''),
      arr = 'abcdefghijklmnopqrstuvwxyz'
  let result = newS.every(item=>arr.indexOf(item)>-1)
  for(let i=0;i<newS.length;i++){
    if(result && newS[i]==newS[i+1]) return true
  }
  return false
}

console.log(containsRepeatingLetter('abbc'))

let nu = '10'
// 是数字返回false， 不是返回true
console.log('不是数字', isNaN(nu))

let arrNew = ['1', '2', 'a']
let result = arrNew.some(item=>isNaN(item))
console.log('都是数字', result)


let one = { a: 3, b: 4}
let teo = {...one}
console.log(teo)

const o = Object.create({x1: 1, y1: 2})
o.z = 3
let {x1, ...one1} = o
let {y1, z} = one1
console.log(y1, z)

const map = new Map()

map.set('a5', 1)
console.log(map.get('a5'))

// 隔 n秒输出 x, 例如1s输出1，隔2s输出2，再隔3s输出3
// let list = new List()
// task(value, time)
// list.task(1, 1000)
// list.task(2, 2000)
// list.task(3, 3000)
// list.run() 来调用

function List() { // 构造函数
  this.initArr = []
  this.run = function () {
    if(this.initArr.length){
      let cur = this.initArr.splice(0, 1)[0]
      setTimeout(()=>{
        console.log(cur.value)
        this.run()
      }, cur.time)
    }
  }
  this.task = function (value, time) {
    this.initArr.push({
      value, time
    })
  }
}
let list = new List()
list.task(1, 1000)
list.task(2, 2000)
list.task(3, 3000)
list.run()
// console.log(list.run())

var url1 = new URL('https://www.jianshu.com/search?q=%E5%8F%82%E6%95%B0&page=1&type=&key=aa&key=bb&')

let url = url1.search
function getParams(url) {
  let templateR = {}
  if (url.indexOf('?') != -1) {
    let str = url.substr(1) // 从第二位开始截取到末尾，返回截取的值。 类似于slice（1）
    strs = str.split('&') // 返回的是以某个符号分割后的数组
    for (let i = 0; i < strs.length; i++) {
      templateR[strs[i].split('=')[0]] = strs[i].split('=')[1] // 遍历，键等于值
    }
    return templateR
  }
}
console.log(getParams(url))

async function async1(){  // 返回的是一个promise，一经创建立即执行。如果是一个直接量，async会将其包装成一个Promise 对象
  console.log('async1 start')  // 同步任务
  await async2()  // 执行打印出 async2后，会让出队列
  console.log('async1 end')
}
async function async2(){
  console.log('async2') // 同步任务
}
console.log('script start') // 同步
setTimeout(function(){  // 优先级较低，最后执行
  console.log('setTimeout')
},0)
async1();
new Promise(function(resolve){
  console.log('promise1') // 同步任务
  resolve();
}).then(function(){
  console.log('promise2') // 异步优先任务
})
console.log('script end') // 同步

// script start
// async1 start
// async2
// promise1
// script end   以上都是正常执行的
// async1 end
// promise2
// setTimeout


// 输出 123
// for(var i = 0; i < 3; i++) {
//   setTimeout(function() {
//     console.log(i);
//   }, (i + 1) * 1000);
// }

// for(let i = 0; i < 3; i++) {
//   setTimeout(()=>{
//     console.log(i+1);
//   }, (i + 1) * 1000);
// }

