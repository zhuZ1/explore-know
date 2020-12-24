
function p1(){
  return new Promise((resolve, reject)=>{
    let data = '你好'
    resolve(data)
  })
}

const newP1 = new Promise((resolve, reject)=>{
  throw new Error('err')
}).then(res=>res).catch(err=>err)

const newP2 = new Promise((resolve, reject)=>{
  let data = 'nihao'
  resolve(data)
})

const allP = Promise.all([p1(), newP1, newP2])
allP.then(res => {
  console.log('allP correct', res)
}).catch(err => {
  console.log('allP err', err)
})

const p = Promise.race([p1(), newP1, newP2])
p.then(res=>{
  console.log('raceP correct', res)
}).catch(err=>{
  console.log('raceP err', err)
})

// all 如果其中的promise定义了catch方法，则不会影响到p的状态, 都是fulfilled， p才会会变成fulfilled， 有一个变成rejected， p就是rejected
// race, p中有一个promise的状态发生改变，p的状态就跟着改变， 率先改变的promise实例结果会传递给p


// 手写一个方法，结合all和race，所有都resolved/reject时才返回，并返回所有的结果  (即参数实例都返回结果, 包装实例才会结束, Promise.allSettled())
// all 所有都是 resolved 返回 resolved ，有一个rejected，返回rejected
// race 有一个发生改变就跟着改变，
// promise.all 和 promise.race 实现 promise.allSettled
// Promise.mySettled([])



const a = new Promise((resolve, reject)=>{
  console.log('1')
  resolve()
})
setTimeout(()=>{
  console.log('2')
}, 0)

a.then(()=>{
  console.log('3')
})
console.log('4')

// 那吗这个顺序就是 1， 4， 3， 2

// 那么再看一个例子
const b = new Promise((resolve, reject)=>{
  console.log(1)
  resolve()
})

setTimeout(()=>{
  console.log(2)
}, 0)

b.then(console.log(3))
console.log(4)
// 那么这个的输出顺序就是 1， 3，4，2


// 手写 Promise.all([p1, p2, p3])
// Promise.all() 用于将多个 promise 实例包装成一个 promise实例
// 接收一个数组作为参数, p1, p2, p3都是Promise实例，如果不是，就会调用promise.resolve() 转换为 Promise实例
// 参数可以不是数组，但是要具有 Iterator属性， 且返回的每个成员都是 Promise实例
// 1. p1, p2, p3都变成 fulfilled, p的状态才是 fulfilled，此时p1, p2, p3的返回值组成一个数组，传递给p的回调函数
// 2. 有一个状态变为rejected，此时第一个被reject 的实例的返回值， 会传递给 p的回调函数
function myPromiseAll(arr) {
  let result = []  // 存放返回结果
  return new Promise((resolve, reject)=>{
    if(arr.length==0){
      resolve(result)
    }
    for(let i = 0; i < arr.length; i++){
      // 先转化为 Promise实例
        Promise.resolve(arr[i]).then(val=>{
          result.push(val)
          if(result.length == arr.length){
            resolve(result)
          }
        }).catch(err=>{
          reject(err)
        })
    }
  })
}

// 测试
let myp1 = new Promise((resolve, reject)=>{
  setTimeout(reject, 2000, 'p1reject')
})

let myp2 = new Promise(resolve=>{
  setTimeout(resolve, 2000, 'p2成功')
})

let myp3 = new Promise(resolve=>{
  setTimeout(resolve, 2000, 'p3成功')
})

let myP = myPromiseAll([myp1, myp2, myp3])
// myP.then((v)=>{
//   console.log(myP)
//   console.log(v)
// }).catch((err)=>{
//   console.log(myP)
//   console.log(err)
// })

// 实现 promise.race方法
function myPromiseRace(arr) {
  return new Promise((resolve, reject) =>{
    for(let p of arr){ // 遍历数组
      Promise.resolve(p).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

let myRace = myPromiseRace([myp1, myp2, myp3])
myRace.then((v)=>{
  console.log('resolve', v)
}).catch((err)=>{
  console.log('rejected', err)
})

// 实现 Promise.allSettled() 方法
// 不管是不是resolve，只有有结果就返回
function myPromiseSettled(arr) {
  return new Promise((resolve, reject)=>{
    let result = [], promiseCount = arr.length
    for(let i = 0; i < arr.length; i++){
      Promise.resolve(arr[i]).then(val=>{
        result[i] = {
          status: 'fulfilled',
          val
        }
        promiseCount -=1
        if(promiseCount === 0){
          resolve(result)
        }
      }).catch(err=>{
        result[i] = {
          status: 'rejected',
          err
        }
        promiseCount -=1
        if(promiseCount === 0){
          resolve(result)
        }

      })

    }
  })
}
let allSettled = myPromiseSettled([myp1, myp2, myp3])
console.log('allSettled', allSettled)
allSettled.then(val=>{
  console.log('allSettled', val)
}).catch(err=>{
  console.log(err)
})

// let allSet = Promise.allSettled([myp1, myp2, myp3])
// console.log('allset', allSet)
// allSet.then(res=>{
//   console.log('settled', res)
// })
// promise 的串行和 并行
// Promise 接收一个函数作为参数，函数的两个参数是两个回调函数
const newP = function () {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('newP')
      resolve()
    }, 1000)
  })
}

const newP11 = function () {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('newP1')
      resolve()
    }, 1000)
  })
}

const newP22 = function () {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('newP2')
      resolve()
    }, 1000)
  })
}
//
// 串联 有依赖关系
newP().then(()=>{
  return newP11()
}).then(()=>{
  return newP22()
}).then(()=>{
  console.log('end')
})
// 并行 promise.all()

// js实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个，
// class Scheduler {
//   add(promiseCreator){
//
//   }
// }
//
// const timeout = (time) => new Promise(
//   resolve => {
//     setTimeout(resolve, time)
//   }
// )
// const scheduler = new Scheduler()
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time)).then(() => console.log(order))
// }
// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')

