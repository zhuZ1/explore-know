// null 和 undefined 不能当作对象来使用

// 2.toString() 这里会报语法错误， 让人误以为数字的字面量不能当作对象使用。实际上是因为js解析器的一个错误，
// 它将.操作符解析为浮点数字面值的一部分
// console.log(2..toString())
// 访问对象的属性， 两种方法  .操作符， []操作符
// []在下面两种情形下依然有效， 1. 动态设置属性  2.属性名不是一个有效的变量名（比如属性名中包含空格，或者属性名是 JS 的关键词）
// 删除属性的唯一方法是delete  delete obj.foo, 设置属性为undefined和null并不能真正删除

Object.prototype.bar = 2
const foo = { moo: 3}
for(let i in foo){
  // in 不管是实例本身具有的属性还是 原型链上的属性都能打印
  console.log(i)  // 输出两个 moo和bar
}
// 查找属于自身的属性
for(let i in foo){
  if(foo.hasOwnProperty(i)){
    console.log(i)  // 自身的属性
  }
}





// console.log(0.1+0.2)
var sum = 0.1 + 0.2
function equal(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}
console.log('是否相等', sum, Number.EPSILON, equal(sum - 0.3))
// // 有一种函数表达式不太常见，被括号括住的(function foo(){}), 他是表达式的原因是()是一个分组操作符
// // 他的内部只能包含表达式 而不能包含语句
//
// console.log(fn())
// function fn() {
//   return 'hello'
// }
// js中任何函数在执行的时候都会创建一个执行上下文
//
// function counter() {
//   let counter = 1
//   return function(){
//     console.log(counter++)
//   }
// }
// const counter1 = counter()
// console.log(counter1())
// console.log(counter1())
// const counter2 = counter()
// console.log(counter2())
// ++i和i++的区别
// ++i是先加再赋值  i = i + 1, a = i, a = i + 1
// i++是先赋值再加  a = i++,  等同于 a = i, i = i + 1

// (function() { // 匿名函数表达式
//   console.log('world')
// }())

// (function fn1(){  // 这里报错，实际上是没问题的
//   console.log('world1')
// })()

// 还是研究一下经典的问题， for输出i的情况
// for(let i = 0; i < 5; i++){  // 正常输出 0，1， 2， 3，4
//   console.log(i)
// }

// for(var i = 0; i < 5; i++){  // 每延迟一秒输出5， 5， 5， 5， 5
//   setTimeout(()=>{
//     console.log(i)
//   }, i * 1000)
// }

// 想要实现 每隔一秒输出0， 1，2， 3， 4
// 方法一 var 改成let
// for(let i = 0; i < 5; i++){
//   setTimeout(()=>{
//     console.log(i)
//   }, i * 1000)
// }
// 方法二
// for(var i = 0; i < 5; i++){
//   (function(locked){
//     setTimeout(()=>{
//       console.log(locked)
//     }, i * 1000)
//   })(i)
//
// }


// for(var i = 0; i < 5; i++){
//   setTimeout((function (e) {
//     return function () {
//       console.log(e)
//     }
//   })(i), 1000)
// }

const promise = new Promise((resolve, reject)=>{ // Promise构造函数接受一个函数作为参数，
  // 该函数有两个参数， 都是函数
  if(success){
    resolve(value)
  } else {
    reject(error)
  }
// resolve函数的作用是， 将Promise对象的状态从"未完成"变为"成功", 在异步操作成功时调用，并将
  // 异步操作的结果作为参数传递出去； reject将Promise的状态从"未完成"变成"失败"
})
// 实例生成后，可以用then方法指定resolved 和 rejected 状态的回调函数

promise.then(function (value) { // then方法接收的两个回调函数。第二个是可选的，这两个参数都接受
  // promise对象传出的值作为参数

}, function (error) {

})

let test = {
  name: 1,
  age: 14,
  say: function () {
    return this.name + this.age
  },
  hello: ()=>{
    this.name + this.age
  }
}

console.log(test.say(), test.hello())

var a = {
  name: 'bytedance',
  func: function() {
    console.log(this.name);
  }
};

a.func(); // bytedance  this指向事件源， 即触发事件的对象

var f1 = a.func
f1() // undefined  this 是函数调用，浏览器中指向window， node中指向global



let arr = [1, 4, 5, 7, 9]
// // 1s后输出1， 2s后输出4， 3s后输出5... （从开始执行第一次计时，每隔一秒，输出）
for(let i = 0;i < arr.length;i++){
  setTimeout(()=>{
    console.log(arr[i])
  }, (i+1) * 1000)
}



// promise 实现 setTimeOut


var name = 'World!';
(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack';
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// 输出什么

// console.log(a)//? undefined
// a();//?10
// var a =3;
// function a(){
//   console.log(10);
// }
// console.log(a);//?3
// a = 6;
// a();//?

var a10 = [0]
console.log('数组长度', a10.length)

var a11 = []
console.log('新长度', a11.length)

function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  // 1 1 1
  c = 10
  sidEffecting(arguments);
  //
  return a + b + c;
}
bar(1,1,1);//输出多少？

// 对象数组去重
let arrObj = [{name: 'echo'}, {name: '小明'}, {name: '小'}, {name: 'echo'}]
let obj = {}
let newArr = arrObj.reduce((acc, cur)=>{
  !obj[cur['name']]? obj[cur['name']] = true && acc.push(cur): null
  return acc
},[])

console.log(newArr)


