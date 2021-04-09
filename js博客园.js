
// // console.log(0.1+0.2)
// var sum = 0.1 + 0.2
// function equal(n1, n2) {
//   return Math.abs(n1 - n2) < Number.EPSILON
// }
// console.log('是否相等', sum, Number.EPSILON, equal(sum - 0.3))
// // // 有一种函数表达式不太常见，被括号括住的(function foo(){}), 他是表达式的原因是()是一个分组操作符
// // // 他的内部只能包含表达式 而不能包含语句
// //
// // console.log(fn())
// // function fn() {
// //   return 'hello'
// // }
// // js中任何函数在执行的时候都会创建一个执行上下文
// //
// // function counter() {
// //   let counter = 1
// //   return function(){
// //     console.log(counter++)
// //   }
// // }
// // const counter1 = counter()
// // console.log(counter1())
// // console.log(counter1())
// // const counter2 = counter()
// // console.log(counter2())
// // ++i和i++的区别
// // ++i是先加再赋值  i = i + 1, a = i, a = i + 1
// // i++是先赋值再加  a = i++,  等同于 a = i, i = i + 1
//


//
//
//
//
// let arr = [1, 4, 5, 7, 9]
// // // 1s后输出1， 2s后输出4， 3s后输出5... （从开始执行第一次计时，每隔一秒，输出）
// for(let i = 0;i < arr.length;i++){
//   setTimeout(()=>{
//     console.log(arr[i])
//   }, (i+1) * 1000)
// }
//
//
//
// // promise 实现 setTimeOut
//
//
var name = 'World!';
(function () {
  if (typeof name === 'undefined') {
    var name = 'Jack'; // 立即执行函数内部重新定义了name变量，变量被提升 name是 undefined
    console.log('Goodbye ' + name);
  } else {
    console.log('Hello ' + name);
  }
})();
// 输出什么
//
// // console.log(a)//? undefined
// // a();//?10
// // var a =3;
// // function a(){
// //   console.log(10);
// // }
// // console.log(a);//?3
// // a = 6;
// // a();//?
//
// var a10 = [0]
// console.log('数组长度', a10.length)
//
// var a11 = []
// console.log('新长度', a11.length)
//
// function sidEffecting(ary) {
//   ary[0] = ary[2];
// }
// function bar(a,b,c) {
//   // 1 1 1
//   c = 10
//   sidEffecting(arguments);
//   //
//   return a + b + c;
// }
// bar(1,1,1);//输出多少？
//
// // 对象数组去重
// let arrObj = [{name: 'echo'}, {name: '小明'}, {name: '小'}, {name: 'echo'}]
// let obj = {}
// let newArr = arrObj.reduce((acc, cur)=>{
//   !obj[cur['name']]? obj[cur['name']] = true && acc.push(cur): null
//   return acc
// },[])
//
// console.log(newArr)
//

// var length = 10
// function fn() {
//   console.log(this.length);
// }
//
// var obj = {
//   length: 5,
//   method: function () {
//     fn();
//     arguments[0]();
//   }
// }
// obj.method(fn, 1);

// var b = 10
// function fn() {
//   console.log(this.b)
// }
// c = {
//   b: 11,
//   fn: fn.bind(window)
// }
// c.fn()

// function a(b, c) {
//   function b(){};
//   alert(b);
// }
// a(1, 2);
//
// function a(b, c) {
//   var b;
//   alert(b);
// }
// a(1, 2);








