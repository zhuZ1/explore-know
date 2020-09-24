// // 1.构造函数的参数，在new的过程中会立即执行
// function myPromise(executor) {
//   executor(resolve, reject)
// }
//
// // new 出来的实例有then方法
// myPromise.prototype.then = function(onFulfilled, onRejected){
//
// }
//
// // new出来的实例具有默认状态，执行器执行resolve 或者 reject，修改状态
// function myPromise(executor) {
//   let self = this
//   self.status = 'pending' //默认状态是 pending
//   function resolve(val) {
//     self.status = 'resolved' // 成功状态
//   }
//   function reject(reason) {
//     self.status = 'rejected' // 失败状态
//   }
//   executor(resolve, reject)
// }
//
// // 当执行器调用resolve，then中第一个回调会执行，调用reject后， then中第二个回调会执行
// myPromise.prototype.then = function (onFulfilled, onRejected) {
//   let self = this
//   if(self.status === 'resolved'){
//     onFulfilled()
//   }
//   if(self.status === 'rejected'){
//     onRejected()
//   }
// }
//
// // 保证promise实例状态一旦变更不能再次改变，只有在pending时才能改变
// function myPromise(executor) {
//   let self = this
//   self.status = 'pending' //默认状态是 pending
//   function resolve(val) {
//     if(self.status=='pending'){
//       self.value = val
//       self.status = 'resolved' // 成功状态
//
//     }
//   }
//   function reject(reason) {
//     if(self.status=='pending'){
//       self.reason = reason
//       self.status = 'rejected' // 失败状态
//     }
//   }
//   executor(resolve, reject)
// }
//
// // 执行resolve方法的值 传入then中第一个参数函数中
// myPromise.prototype.then = function (onFulfilled, onRejected) {
//   let self = this
//   if(self.status === 'resolved'){
//     onFulfilled(self.value)
//   }
//   if(self.status === 'rejected'){
//     onRejected(self.reason)
//   }
// }
//
// // 解决异步问题
// function myPromise(executor) {
//   let self = this
//   self.value = undefined
//   self.reason = undefined
//   self.status = 'pending' //默认状态是 pending
//   self.onResolveCb = []  // 保存then 方法中第一个参数
//   self.onRejectCb = [] // 保存then方法中第二个参数
//   function resolve(val) {
//     if(self.status=='pending'){
//       self.value = val
//       self.status = 'resolved' // 成功状态
//       self.onResolveCb.forEach(fn=>{
//         fn()  // 执行函数
//       })
//     }
//   }
//   function reject(reason) {
//     if(self.status=='pending'){
//       self.reason = reason
//       self.status = 'rejected' // 失败状态
//       self.onRejectCb.forEach(fn=>{
//         fn()
//       })
//     }
//   }
//   executor(resolve, reject)
// }
//
// myPromise.prototype.then = function (onFulfilled, onRejected) {
//   let self = this
//   if(self.status === 'resolved'){
//     onFulfilled(self.value)
//   }
//   if(self.status === 'rejected'){
//     onRejected(self.reason)
//   }
//   if(self.status === 'pending'){
//     self.onResolveCb.push(function () {
//       onFulfilled(self.value)
//     })
//     self.onRejectCb.push(function () {
//       onRejected(self.reason)
//     })
//   }
// }
//
// // 链式调用完善 then
// myPromise.prototype.then = function (onFulfilled, onRejected) {
//   let self = this
//   return new myPromise((onFulfilledNext, onRejectedNext)=>{
//     // 封装一个成功时执行的函数
//     let fulfilled = value =>{
//       try{
//         if(!isFunction(onFulfilled)){ // 判断是不是函数
//           onFulfilledNext(value)
//         } else {
//           let res = onFulfilled(value)
//           if(res instanceof myPromise){
//             // 当前返回 的是myPromise对象， 要等待状态改变后才能执行下一个then 回调
//             res.then(onFulfilledNext, onRejected)
//           } else {
//             // 否则会将返回结果直接作为参数，传入下一个then 的回调函数，并立即执行
//             onFulfilledNext(res)
//           }
//         }
//       } catch(err){
//         onRejectedNext(err)
//       }
//     }
//     // 失败的回调函数
//     let rejected = error => {
//       try{
//         if(!isFunction(onFulfilled)){ // 判断是不是函数
//           onRejectedNext(error)
//         } else {
//           let res = onRejected(error)
//           if(res instanceof myPromise){
//             // 当前返回 的是myPromise对象， 要等待状态改变后才能执行下一个then 回调
//             res.then(onFulfilledNext, onRejectedNext)
//           } else {
//             // 否则会将返回结果直接作为参数，传入下一个then 的回调函数，并立即执行
//             onFulfilledNext(res)
//           }
//         }
//       } catch(err){
//           onRejectedNext(err)
//       }
//     }
//     if(self.status === 'resolved'){
//       fulfilled(self.value)
//     }
//     if(self.status === 'rejected'){
//       rejected(self.reason)
//     }
//     if(self.status === 'pending'){
//       self.onResolveCb.push(fulfilled)
//       self.onRejectCb.push(rejected)
//     }
//   })
//
// }
//
// // 对resolve 方法和 reject方法的修改
// function myPromise(executor) {
//   let self = this
//   self.value = undefined
//   self.reason = undefined
//   self.status = 'pending' //默认状态是 pending
//   self.onResolveCb = []  // 保存then 方法中第一个参数
//   self.onRejectCb = [] // 保存then方法中第二个参数
//   function resolve(val) {
//     if(self.status=='pending'){
//       self.value = val
//       self.status = 'resolved' // 成功状态
//       self.onResolveCb.forEach(fn=>{
//         fn()  // 执行函数
//       })
//     }
//   }
//   function reject(reason) {
//     if(self.status=='pending'){
//       self.reason = reason
//       self.status = 'rejected' // 失败状态
//       self.onRejectCb.forEach(fn=>{
//         fn()
//       })
//     }
//   }
//   executor(resolve, reject)
// }
// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    // 添加状态
    this._status = PENDING
    // 添加状态
    this._value = undefined
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []
    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      this._reject(err)
    }
  }
  // 添加resovle时执行的函数
  _resolve (val) {
    const run = () => {
      if (this._status !== PENDING) return
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          this._status = FULFILLED
          runFulfilled(value)
        }, err => {
          this._value = err
          this._status = REJECTED
          runRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        runFulfilled(val)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  // 添加reject时执行的函数
  _reject (err) {
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  // 添加then方法
  then (onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res =  onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
  // 添加catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态resolve方法
  static resolve (value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  // 添加静态reject方法
  static reject (value) {
    return new MyPromise((resolve ,reject) => reject(value))
  }
  // 添加静态all方法
  static all (list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }
  // 添加静态race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
}

let p = new MyPromise((resolve, reject)=>{
  console.log('start')
  setTimeout(()=>{
    resolve(1)
  }, 2000)
})
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
p.then(
  (v) => {
    console.log('success： ' + v)
  },
  (v) => {
    console.log('error： ' + v)
  }
)
console.log('end')

// let p1 = new Promise(function (resolve, reject) {
//   console.log('start')
//   setTimeout(function(){
//     resolve('data1')
//   },2000)
// })
// p1.then(
//   (v) => {
//     console.log('success： ' + v)
//   },
//   (v) => {
//     console.log('error： ' + v)
//   }
// )
// p1.then(
//   (v) => {
//     console.log('success： ' + v)
//   },
//   (v) => {
//     console.log('error： ' + v)
//   }
// )
// console.log('end')
