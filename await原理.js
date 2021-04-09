// 理解
// es7引入的标准 async函数
// async函数是 Generator函数的语法糖
// 1.自带执行器 2.更好的语义 3.更广的适用性 4.返回值是promise

// 基本用法
// async函数返回一个promise对象，可以使用then方法添加回调，当函数执行的时候，一旦遇到await就会先返回
// 等到异步操作完成，再接着执行函数体内后面的内容

function timeout(ms){
  return new Promise((resolve, reject)=>{
    setTimeout(resolve, ms)
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms) // 阻塞多少s
  console.log(value)
}
asyncPrint('hello', 5000)


// 借助await 命令让程序停顿指定的时间， 简单的sleep实现
// function sleep(interval){
//  return new Promise(resolve=>{
//    setTimeout(resolve, interval)
//  })
// }
//
// async function asyncFn() {
//   // for(let i = 1; i < 5; i++){
//   //   console.log(i)
//   console.log('开始')
//     await sleep(1000)
//   console.log('结束')
//   // }
// }
// asyncFn()


// async function asyncF(){
//   console.log(3)
//   await async2()
//   console.log(5)
// }
//
// async function async2() {
//   console.log(4)
// }
// new Promise(resolve => {
//   console.log(1)
//   resolve()
// }).then(() => {
//   console.log(2)
// })
// asyncF()

