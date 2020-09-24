// 找出item 在arr 中的位置，没有返回-1
function indexOf(arr, item) {
  let n = arr.length
  for(let i=0;i<n;i++){
    if(arr[i]===item){
      return i
    }
  }
  return -1

}

let arr = [1, 2, 3, 4], item = 3
console.log(indexOf(arr, item))

function remove(arr, item) {
  let newArr = arr.slice(), n = newArr.length
  console.log('新数组', newArr)
  for(let i=0;i<n;i++){
    if(newArr[i]===item){
      newArr.splice(i, 1)
      i-- // splice删除后Array长度变了，所以 i--
      console.log('i的值', i)
    }
  }
  return newArr
}

let arr1 = [1, 2, 3, 4, 2], item1 = 2
console.log(remove(arr1, item1))

let a1 = [1, 2, 3, 4], a2 = ['a', 'b', 'c', 1]
function concat(arr1, arr2) {
  let newArr = arr1.slice()
  newArr.push.apply(newArr, arr2)
  return newArr
}
console.log(concat(a1, a2), a1, a2)

// 元素重复出现过的元素
function duplicates(arr) {
  let temp = []
  for(let i=0;i<arr.length;i++){
    // lastIndexOf() 返回指定元素在数组中的最后一个索引, 从后往前遍历
    if(arr.indexOf(arr[i])!=arr.lastIndexOf(arr[i]) && temp.indexOf(arr[i])==-1){
      // 数组第一次出现的位置和最后一次出现的位置等，说明是重复元素
      temp.push(arr[i])
    }
  }
  return temp
}

let test = [1, 2, 4, 4, 3, 3, 1, 5, 3]
console.log('重复元素', duplicates(test))

function square(arr) {
  let newArr = arr.map(item=>{
    return item * item
  })
  return newArr
}

let ar = [2, 3]
console.log(square(ar), ar)

// 查找元素出现的所有位置, 保存在数组中
function findAllOccurrences(arr, target) {
  let len = arr.length, indexArr = []
  for(let i=0;i<len;i++){
    if(arr[i]==target){
      indexArr.push(i)
    }
  }
  return indexArr
}
let list = ['a','b','c','d','e','f','a','b','c'], target = 'a'

console.log('出现位置', findAllOccurrences(list, target))


function functions(flag) {
  function getValue(){
    if(flag) return 'a'
    return 'b'
  }

  return getValue();
}
let flag = false
console.log(functions(flag))

// 判断val1 和 val2 是否完全等同
function identity(val1, val2) {
  return val1 === val2
}

// 1 实现打点计时器， 从start 到end 每隔100ms console 一个数字，递增1
// 2 返回的对象中存在 cancel 函数， 用于停止定时操作
// 3 第一个数字需要立即输出
function count(start, end) {
  console.log(start)
  let newS = setInterval(()=>{
    if(start<end){
      console.log(start +=1)
    }
  }, 100)

  return {
    cancel: function(){
        clearInterval(newS)
    }
  }
}

count(3, 7)

// 参数num与返回值的关系
// 1. 能同时被3和5整除，返回字符串 fizzbuzz
// 2. 能被3整除，返回fizz
// 3. 能被5整除， 返回 buzz
// 4. 参数为空或者不是数字类型， 返回false
// 5. 其余返回参数num
function fizzBuzz(num) {
  if(num % 15==0){
    return 'fizzbuzz'
  } else if(num % 3==0){
    return 'fizz'
  } else if(num % 5==0){
    return 'buzz'
  } else if(isNaN(num) || num==null){
    return false
  }
  return num
}
console.log(fizzBuzz())

// function (greeting, name, punctuation) {return greeting + ', ' + name + (punctuation || '!');}, ['Hello', 'Ellie', '!']
function argsAsArray(fn, arr) {
  return fn(...arr)// fn.apply(this, arr)
}

let fn = function(greeting, name, punctuation){
  return greeting + ', ' + name + (punctuation || '!')
}, arrA = ['hello', 'ellie', '!']

console.log(argsAsArray(fn, arrA))

// function () {return this.greeting + ', ' + this.name + '!!!';}, {greeting: 'Hello', name: 'Rebecca'}
function speak(fn, obj) {
  return fn.apply(obj)
}
let fn1 = function(){
  return this.greeting + ', ' + this.name + '!!!'
}, onj = {greeting: 'hello', name: 'rebecca'}

console.log(speak(fn1, onj))

// 5升 和 6升 倒出 3L水
// 6装满 倒入 5 余下 1升倒入 5
// 6再装满到进5 剩 2升 倒入 5
// 6 再装满 倒进5 剩3升

