// forEach
let arr = [1, 2, 3], arrN = []
let newA = arr.forEach(item=>arrN.push(item * item))
console.log(arr, newA, arrN)
// forEach方法没有返回值，
// 不会改变原数组

// map
let arrMap = arr.map(item=>item * 2)
// 返回值是 处理后的新数组
// 不改变原数组
console.log(arr, arrMap)

// filter
let arrFilter = arr.filter(item=>item>1)
// 创建一个新数组，包含通过测试函数的所有元素
console.log(arr, arrFilter)

// reduce
let arrReduce = arr.reduce((accu, cur)=> accu + cur, 10)
console.log(arrReduce)
// 返回原数组计算的结果

// 数组扁平化
let arr1 = [1, [2], [3, 4, [5]]]
function flat(arr){
  return arr.reduce((accu, cur)=>{
    return accu.concat(Array.isArray(cur)?flat(cur): cur)
  }, [])
}
// es6的方法， flat() 传入整数参数， 默认是1，拉伸一层 返回一个拉伸后的新数组
// Infinity 有多少层拍多少层
console.log(arr1.flat(Infinity))
// 遍历方法
let arr2 = [1, [2], [3, 4, [5]]]
function flat1(arr){
  let len = arr.length, arrA = []
  for(let i = 0;i < len; i++){
    if(Array.isArray(arr[i])){
      arrA = arrA.concat(flat1(arr[i]))
    } else {
      arrA.push(arr[i])
    }
  }
  return arrA
}
console.log(flat1(arr2))

// some 返回结果是布尔类型的
// 有一个满足条件就返回true
let result = arr.some(item=>{
  return item > 1
})
console.log(result)
// every 所有都满足条件才返回 true ，否则返回false
let result1 = arr.every(item=>{
  return item > 1
})
console.log(result1)
// find 返回满足条件的第一个值
let result2 = arr.find(item=>{
  return item > 1
})
console.log(result2)
// findIndex 返回满足条件的第一个值的索引
let result3 = arr.findIndex(item=>{
  return item > 1
})
console.log(result3)


// 想到的一个有关分组的问题
const arrList = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
function group(arrList, arrLen){
  const arrs = []
  arrList.forEach((item, i)=>{
    let page = Math.floor(i / arrLen) // 当前元素应该放在第几个数组里
    if(!arrs[page]){  // 新数组还没创建
      arrs[page] = [] // 创建
    }
    arrs[page].push(item) // 已存在就push
  })
  return arrs
}
console.log(group(arrList, 2))

// forEach 跳出循环的方式

try {
  let newArr = []
  console.log('try', arrList)
  arrList.forEach(item=>{
    if(item.id==2){
      throw new Error('break')
    }
    newArr.push(item)
    console.log('跳出', newArr)
  })

} catch (e) {
    console.log('跳出来')
  }



// for...in 循环遍历对象自身的和继承的可枚举属性
// for...of 内部循环调用的是 symbol.iterator方法
// 可以用在数组，Set，Map，类数组对象，字符串等
