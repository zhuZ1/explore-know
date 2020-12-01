// // 定义一个方法， 返回一个promise
// function myPromise() {
//
//   // promise 构造函数接收一个函数作为参数
//   const newP = new Promise((resolve, reject)=>{
//     // console.log('promise')
//     // let data = 'nihao'
//     // resolve(data)
//     throw new Error('err')
//   })
//   return newP
// }
//
// function p1(){
//   const newP1 = new Promise((resolve, reject)=>{
//     let data = '你好'
//     resolve(data)
//   })
//
//   return newP1
// }
//
// const newP1 = new Promise((resolve, reject)=>{
//   throw new Error('err')
// }).then(res=>res).catch(err=>err)
//
// const newP2 = new Promise((resolve, reject)=>{
//   let data = 'nihao'
//   resolve(data)
// })
//
//
//
// const result = myPromise().then(res=> res).catch(err=> err)
// console.log(result)
//
// const p = Promise.race([p1(), newP1, newP2])
// p.then(res=>{
//   console.log('correct', res)
// }).catch(err=>{
//   console.log('err', err)
// })
//
// // all 如果其中的promise定义了catch方法，则不会影响到p的状态, 都是fulfilled， p才会会变成fulfilled， 有一个变成rejected， p就是rejected
// // race, p中有一个promise的状态发生改变，p的状态就跟着改变， 率先改变的promise实例结果会传递给p
//
// Promise.reject(1).then((err)=>{
//   console.log(1)
//   throw new Error(err)
// }).catch(()=>{
//   console.log(2)
// }).then(()=>{
//   console.log(3)
// }).finally(()=>{
//   console.log(4)
// })

// 手写一个方法，结合all和race，所有都resolved/reject时才返回，并返回所有的结果  (即参数实例都返回结果, 包装实例才会结束, Promise.allSettled())
// all 所有都是 resolved 返回 resolved ，有一个reject，返回reject
// race 有一个发生改变就跟着改变，
// promise.all 和 promise.race 实现 promise.allSettled
// Promise.mySettled([])



// const a = new Promise((resolve, reject)=>{
//   console.log('1')
//   resolve()
// })
// setTimeout(()=>{
//   console.log('2')
// }, 0)
//
// a.then(()=>{
//   console.log('3')
// })
// console.log('4')

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
// 想想promise.all 的输出结果， 两个都是fulfilled时才返回fulfilled, 有一个是 rejected 结果就是 rejected
// 接收一个数组作为参数, p1, p2, p3都是Promise实例，如果不是，就会调用promise.resolve() 转换为 Promise实例
// 参数可以不是数组，但是要具有 Iterator属性， 且返回的每个成员都是 Promise实例
// 1. p1, p2, p3都变成 fulfilled, p的状态才是 fulfilled，此时p1, p2, p3的返回值组成一个数组，传递给p的回调函数
// 2. 有一个状态变为rejected，此时第一个被reject 的实例的返回值， 会传递给 p的回调函数
function myPromiseAll(arr) {
  let result = []
  return new Promise((resolve, reject)=>{
    if(arr.length==0){
      resolve(result)
    }
    for(let i = 0; i < arr.length; i++){
      if(arr[i].then){ // 元素是promise实例
        arr[i].then(val=>{
          console.log(val)
          result.push(val)
          if(result.length == arr.length){
            console.log('全部完成')
            resolve(result)
          }
        }).catch(err=>{
          console.log('有一个失败了')
          reject(err)
        })
      } else {
        result.push(arr[i])
        if(result.length == arr.length){
          resolve(result)
        }
      }

    }
  })
}


// 测试
let p1 = new Promise((resolve, reject)=>{
  setTimeout(reject, 2000, 'p1reject')
})

let p2 = new Promise(resolve=>{
  setTimeout(resolve, 2000, 'p2成功')
})

let p3 = new Promise(resolve=>{
  setTimeout(resolve, 2000, 'p3成功')
})

// let p = myPromiseAll([p1, p2, p3])
// p.then((v)=>{
//   console.log(p)
//   console.log(v)
// }).catch((err)=>{
//   console.log(p)
//   console.log(err)
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

const newP1 = function () {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('newP1')
      resolve()
    }, 1000)
  })
}

const newP2 = function () {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('newP2')
      resolve()
    }, 1000)
  })
}

newP().then(()=>{
  return newP1()
}).then(()=>{
  return newP2()
}).then(()=>{
  console.log('end')
})
