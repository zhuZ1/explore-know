// 'use strict'

// var a = 1
// var obj = {
//   a: 2,
//   b: function () {
//     this.a = 3
//   },
//   print: function () {
//     console.log(this.a)
//   }
// }
//
// obj.print() // 输出值 2
// var print = obj.print
// print() // 输出值 1  严格模式下是 this 指向undefined 会报错


// 给定数组 ['1a','2b','9c','5a'] ，输出出现次数最多的字母前数字之和 （此例最多字母为a，和为6）
let arr = ['1a', '2b', '9c', '5a', '8c', '3c']
function getMax(arr) {
  let json = {}, len = arr.length, temp_val = 1, temp_key = '', m = 0 // n记录最多的哪个字母
  for(let i = 0; i < len; i++){
    if(!json[arr[i][1]]){
      json[arr[i][1]] = 1
    } else {
      json[arr[i][1]]++
    }
  }
  // json { a: 2, b: 1, c: 1 }
  // let max = Math.max(...Object.values(json))
  // console.log(max)
  // for (let i in json){
  //   if(json[i] == max){
  //     n = i
  //   }
  // }
  // 稍微优化一下
  for(let key in json){
    // n = 1假设最大是1
    if(json[key] > temp_val){
      temp_key = key
      temp_val = json[key]
    }
  }
  console.log(temp_val, temp_key)
  arr.map(item=>{
    if(item[1]==temp_key){
      m += +item[0]
    }
  })
  return { temp_key: m }
}
console.log(getMax(arr))

let str = "I think of other ages that floated upon the stream of life and love and death"
function searchStr(str, subStr){
  let positions = []
  let pos = str.indexOf(subStr)
  while(pos > -1){
    positions.push(pos)
    pos = str.indexOf(subStr, pos + 1)
  }
  return positions
}
console.log(searchStr(str, 'and'))


// const obj = {
//   dev: 'bfe',
//   a: function() {
//     return this.dev
//   },
//   b() {
//     return this.dev
//   },
//   c: () => {
//     return this.dev
//   },
//   d: function() {
//     return (() => {
//       return this.dev // 外层 是 obj
//     })()
//   },
//   e: function() {
//     return this.b()
//   },
//   f: function() {
//     return this.b
//   },
//   g: function() {
//     return this.c() // 返回this.c的调用结果，undefined
//   },
//   h: function() {
//     return this.c
//   },
//   i: function() {
//     return () => {
//       return this.dev
//     }
//   }
// }
// console.log(obj.a()) // bfe b是a的简写法，是一样的
// console.log(obj.b()) // bfe
// console.log(obj.c()) // this 指向window 结果是 undefined
// console.log(obj.d()) // u x
// console.log(obj.e()) // bfe
// console.log(obj.f()()) // u
// console.log(obj.g()) // bfe x
// console.log(obj.h()()) // u
// console.log(obj.i()()) // bfe

const obj1 = {
  f: this,
  c: () =>{
    console.log(this)
  },
  d: function () {
    console.log(this)
  },
  e(){
    console.log(this)
  }
}

obj1.c() // window对象
obj1.d()  // obj1
obj1.e()
console.log(obj1.f)  // window对象


'use strict'
var a = 1;
var obj = {
  a: 2,
  print: function() {
    console. log( this. a);
  }
}
console. log(obj. print());  // 2
var print = obj. print;
print(); // 1

var fun1 = x => x
console.log(fun1(1))  // 1
var fun2 = x => { x }
console.log(fun2(1))  // undefined
var fun3 = x => ({ x }) // {x: 1} 返回对象
console.log(fun3(1))

function sum(){
  let arg = [...arguments]  // 第一次传的参数
  debugger
  let addr = function () {
    arg.push(...arguments)
    return addr
  }
  addr.sumOf = function(){
    return arg.reduce((a, b) => a + b)
  }
  return addr
}

console.log(sum(1)(2)(3).sumOf());// 6
console.log(sum(1)(2, 3)(4).sumOf());// 10
console.log(sum(1, 2).sumOf()); // 3

// function setMyInterval(){
//   setMyInterval.timer = setTimeout(() => {
//     arguments[0]()  // 执行一次 创建一个 setTimeout
//     setMyInterval(...arguments)
//   }, arguments[1])
// }
//
// setMyInterval(() => {
//   console.log(111)
// }, 2000)

