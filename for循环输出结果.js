//
// for (var i = 0; i < 5; i++){
//   // console.log(i)
//   setTimeout(()=>{  // setTimeout 异步执行队列， 在执行回调函数时，变量已经循环结束了
//     console.log(i)
//   }, i * 2000) // 外部的i 0 1 2 3 4 5 现在的时间点为准 1s 2s 3s 。。打印对应的数字
// }


// 1. var 改成let
// let 指出变量在循环的过程中不止被声明一次，每次迭代都会声明，随后的每个迭代都会使用上一次迭代时的值来初始化这个变量
// for(let i = 0; i < 5; i++){
//   setTimeout(()=>{
//     console.log(i)
//   }, i * 1000)
// }

// 2. IIFE 立即执行函数
// for(var i = 0 ; i < 5; i++){
//   (function (i) {
//     setTimeout(function timer(){
//       console.log(i)
//     }, i * 1000)
//   })(i)
// }

// 3. 利用 setTimeout的第三个参数, 第三个参数可以作为回调函数的参数
// for (var i = 0; i < 5; i++){
//   setTimeout(function timer(i){
//     console.log(i)
//   }, i * 1000, i)
// }

// 4. 引入bind函数
// for (var i = 0; i < 5; i++){
//   setTimeout(function timer(i){
//     console.log(i)
//   }.bind(null, i), i * 1000)
// }

// 5. 单独写一个 function 包住 setTimeout
function loop(i) {
  setTimeout(()=>{
    console.log(i)
  }, i * 1000)
}

for(var i = 0; i < 5; i++){
  loop(i)
}
