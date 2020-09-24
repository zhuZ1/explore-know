// 定义一个方法， 反回一个promise
function myPromise() {

  // promise 构造函数接收一个函数作为参数
  const newP = new Promise((resolve, reject)=>{
    // console.log('promise')
    // let data = 'nihao'
    // resolve(data)
    throw new Error('err')
  })
  return newP
}

function p1(){
  const newP1 = new Promise((resolve, reject)=>{
    let data = '你好'
    resolve(data)
  })

  return newP1
}

const newP1 = new Promise((resolve, reject)=>{
  throw new Error('err')
}).then(res=>res).catch(err=>err)

const newP2 = new Promise((resolve, reject)=>{
  let data = 'nihao'
  resolve(data)
})



const result = myPromise().then(res=> res).catch(err=> err)
console.log(result)

const p = Promise.race([p1(), newP1, newP2])
p.then(res=>{
  console.log('correct', res)
}).catch(err=>{
  console.log('err', err)
})

// all 如果其中的promise定义了catch方法，则不会影响到p的状态, 都是fulfilled， p才会会变成fulfilled， 有一个变成rejected， p就是rejected
// race, p中有一个promise的状态发生改变，p的状态就跟着改变， 率先改变的promise实例结果会传递给p

Promise.reject(1).then((err)=>{
  console.log(1)
  throw new Error(err)
}).catch(()=>{
  console.log(2)
}).then(()=>{
  console.log(3)
}).finally(()=>{
  console.log(4)
})

// 手写一个方法，结合all和race，所有都resolved/reject时才返回，并返回所有的结果
// all 所有都是 resolved 返回 resolved ，有一个reject，返回reject
// race 有一个发生改变就跟着改变，
