// 冒泡 重复地走访过要排序的数列 一次比较两个元素，如果它们的顺序错误就交换位置
function bubble(arr) {
  let len = arr.length
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len - i - 1; j++){
      if(arr[j] > arr[j + 1]){
        // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]  解构
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp   // es5
      }
    }
  }
  return arr
}
// 时间复杂度 O(n^2) 空间复杂度 O(1)

// 选择排序  每次选择未排序的元素中的最小（大）值放在已经排序的数组末尾
function select(arr) {
  let len = arr.length
  for(let i = 0; i < len - 1; i++){
    let minIdx = i  // 最小元素的索引
    for(let j = i + 1; j < len; j++){
      if(arr[j] < arr[minIdx]){
        minIdx = j
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
  }
  return arr
}
// 时间复杂度 O(n^2), 空间复杂度O(1)

// 插入排序， 通过构建有序序列，在已排队序列中从后往前扫描，找到相应位置插入
function insert(arr) {
  let len = arr.length
  let preId, cur
  for(let i = 1; i < len; i++){
    preId = i - 1 // 前一位
    cur = arr[i] // 当前元素
    while (preId >= 0 && arr[preId] > cur){  // 前一位比我手里的牌大
      arr[preId + 1] = arr[preId] // 往后移
      preId --
    }
    arr[preId + 1] = cur // 否则原地不动
  }
  return arr
}
// 时间复杂度 O(n^2), 空间复杂度O(1)

// 快排  选择一个元素作为基准，通过一趟排序后将原序列分为两部分
// 前一部分的所有数据都比后一部分小，然后再一次对前后两部分进行快速排序，递归该过程直到都有序
function quick(arr) {
  if(arr.length < 1) return arr
  let baseId = Math.floor( arr.length / 2)
  let base = arr.splice(baseId, 1)
  let left = [], right = []
  for(let i = 0; i < arr.length; i++){
    if(arr[i] < base){
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quick(left).concat([base], quick(right))
}
// 时间复杂度 O(n * log2^n), 空间复杂度 O(n * log2^n)

// 归并排序
function merge(left, right) {
  let result = []
  while(left.length > 0 && right.length > 0){
    if(left[0] < right[0]){
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left, right)
}

function mergeSort(arr) {
  if(arr.length == 1) return arr
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}
// 时间复杂度 O(n * log2^n)， 空间复杂度O(n)

// 二叉树的前序中序后序遍历
 // 前序 根节点 - 左子树 - 右子树 迭代方法
function preOrder(root){
  let arr = [], res = []
  root && arr.push(root)
  while (arr.length > 0){
    let cur = arr.pop()
    res.push(cur.value)
    cur.right && arr.push(cur.right)  // 模拟栈的结构 先进后出 保证res中的顺序是 根-左-右
    cur.left && arr.push(cur.left)
  }
  return res
}
  // 中序 左子树 - 根节点 - 右子树
function inOrder(root){
  let arr = [], res = []
  while(root || arr.length){
    while(root){  // 左子树全部
      arr.push(root)
      root = root.left
    }
    root = arr.pop() // 栈顶的先出栈
    res.push(root.val)
    if(root.right != null){ // 当前节点有右节点，则入栈
      root = root.right
    }
  }
  return res
}
  // 后序遍历  左子树 - 右子树 - 根节点
function postOrder(root){
  let arr = [], res = []
  root && arr.push(root)
  while(arr.length > 0){
    let cur = arr.pop()
    res.unshift(cur.val) // 左子树放到最前
    cur.left && arr.push(cur.left)
    cur.right && arr.push(cur.right)
  }
  return res
}

// 层序遍历
var levelOrder = function (root) {
  if(!root) return[]
  let res = [], queue = [root]
  while(queue.length > 0){
    let arr = [], len = queue.length
    while(len){
      let node = queue.shift()
      arr.push(node.val)
      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
      len--
    }
    res.push(arr)
  }
  return res
}

// 爬楼梯 动态规划
var climbStairs = function(n){
  let first = 1, second = 2, cur
  for(let i= 3; i <= n; i++){
    cur = first + second
    first = second
    second = cur
  }
  return second
}

// 有效括号
var isValid = function(s){
  let arr = [], len = s.length
  if(s=='') return true
  if(len % 2) return false
  for(let i = 0; i < len; i++){
    let letter = s[i]
    switch(letter){
      case '(':
      case '[':
      case '{':
        arr.push(letter)
        break
      case ')':
        if(arr.pop()!='(') return false
        break
      case ']':
        if(arr.pop()!='[') return false
        break
      case '}':
        if(arr.pop()!='{') return false
        break
    }
  }
  return !arr.length
}

// 回溯
 // 给定一组不含重复元素的整数数组 nums, 返回所有可能的子集
var subsets = function(nums){
  const res = []
  const dfs = (index, list) =>{
    res.push(list.slice())
    for(let i = index; i < nums.length; i++){
      list.push(nums[i])
      dfs(i + 1, list)
      list.pop()
    }
  }
  dfs(0, [])
  return res
}

// 排序数组中查找元素的第一个和最后一个位置
var searchRange = function (nums, target) {
  let left = 0, right = nums.length - 1, mid
  while(left <= right){
    mid = (left + right) >> 1
    if(nums[mid] === target) break
    if(nums[mid] > target){
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  let i = mid, j = mid
  while(nums[i] === nums[i - 1]) i--
  while(nums[i] === nums[j + 1]) j++
  return [i, j]
}

// 两数之和   双指针
  // let nums = [2, 5, 7, 11] 有序数组, target = 9
function twoSum(nums, target){
  let left = 0, right = nums.length - 1
  while(left < right){
    let sum = nums[left] + nums[right]
    if(sum === target){
      return [left + 1, right + 1]
    } else if(sum < target){
      left++
    } else {
      right--
    }
  }
  return []
}
let nums = [2, 5, 7, 11], target = 9
console.log(twoSum(nums, target))

  // 如果是无序的
  function twoSum1(nums, target){
    let hashMap = {}, len = nums.length
    for(let i = 0; i < len; i++){
      let val = target - nums[i]
      if(val in hashMap){
        return [hashMap[val], i]
      } else {
        hashMap[nums[i]] = i
      }
    }
  }
console.log(twoSum(nums, target))

// 链表是否有环
  // 1 .双指针（快慢指针）
var hasCycle = function (head) {
  if(!head || head.next) return false
  let fast = head.next.next, slow = head.next
  while(fast != slow){
    if(!fast || fast.next) return false
    fast = fast.next.next
    slow = slow.next
  }
  return true
}
 // 2 标志法
var hasCycle1 = function (head) {
  while(head){
    if(head.flag) return true
    head.flag = true
    head = head.next
  }
  return false
}

// 二叉树的最大深度
var maxDepth = function (root) {
  if(!root) return 0
  const left = maxDepth(root.left)
  const right = maxDepth(root.right)
  return Math.max(left, right) + 1
}

// 第一个错误的版本
  var solution = function(isBadVersion){
    return function (n) {
      let l = 1, r = n
      while(l < r){
        let mid = l + (r - l >> 1)
        if(isBadVersion(mid) === false){
          l = mid + 1
        } else {
          r = mid
        }
      }
      return l
    }
  }

// 找出一个字符串中某个子字符串的所有位置
let str = "I think of other ages that floated upon the stream of life and love and death"
function searchIndex(str, subStr) {
  let positions = []
  let pos = str.indexOf(subStr)
  while(pos > -1){
    positions.push(pos)
    pos = str.indexOf(subStr, pos + 1)
  }
  return positions
}
console.log('搜索结果', searchIndex(str, 'th'))

// reduce 拍平数组
let arr = [1, [2], [3, 4, [5]]]
function flatten(arr) {
  return arr.reduce((acc, cur)=>
    acc.concat(Array.isArray(cur)? flatten(cur): cur)
 , [])
}
console.log(flatten(arr))

// 数组乱序
function shuffle(a) {
  for(let i = a.length; i; i--){
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
  return a
}

// 实现reduce
Array.prototype.myReduce = function (fn, initV) {
  if(!this.length && initV === undefined){  // this也就是 arr arr和初始值都不存在 报错
    throw new Error('error')
  }
  let result = initV ? initV: this[0] // 有初始值，result = 初始值，没有就等于第一项
  for(let i = initV ? 0: 1; i < this.length; i++){ // 有初始值就从第一项开始遍历， 没有就从第二项开始遍历
    result = fn(result, this[i], i, this)  // 每次执行的结果
  }
  return result
}


// 实现instanceof
// 原理： 构造函数的prototype属性是否出现在实例对象的原型链上
function myInstance(target, origin) {
  if(typeof target != 'object' || target == null) return false
  let proto = Object.getPrototypeOf(target)  // 返回指定对象的原型
  while(proto){
    if(proto == origin.prototype){
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// 实现 new
function newFactory() {
  let obj = {}
  Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let res = Constructor.apply(obj, arguments)
  return typeof res == 'object' ? res: obj
}

// 实现 寄生组合式继承
function Animal(name) {
  this.name = name || '咪咪'
}

function Cat(name, age) {
  Animal.call(this, name)
  this.age = age
}
Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat
let cat = new Cat()
console.log(cat.name)

// call, apply, bind
  // call
Function.prototype.myCall = function (obj) {
  obj = obj || global
  obj.fn = this
  var args = [], len = arguments.length
  for(let i = 1; i < len; i++){
    args.push('[arguments' + i + ']')
  }
  var result = eval('obj.fn(' + args + ')')
  delete obj.fn
  return result
}
  // apply
Function.prototype.myApply = function (obj, arr) {
  obj = obj || global
  obj.fn = this
  var result
  if(!arr){
    result = obj.fn()
  } else {
    var args = [], len = arguments.length
    for(let i = 0; i < len; i++){
      args.push('[arguments' + i + ']')
    }
    result = eval('obj.fn(' + args + ')')

  }
  delete obj.fn
  return result
}

  // bind
Function.prototype.myBind = function (obj) {
  if(typeof this != 'function'){
    throw new Error('error')
  }
  var args = Array.prototype.slice.call(arguments, 1)
  var fn = this
  var _fn = function () {}
  var bound = function () {
    var params = Array.prototype.slice.call(arguments)
    fn.apply(this.constructor == fn? this: obj, args.concat(params))
  }
  _fn.prototype = fn.prototype
  bound.prototype = new _fn()
  return bound
}


// 节流/防抖
  // 防抖
function debounce(fn, wait){
  let timer
  return function () {
    let that = this, event = arguments  // 事件对象
    clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.apply(that, event)
    }, wait)
  }
}
  // 节流
function throttle(fn, wait){
  let timer = null
  return function () {
    let that = this, event = arguments
    if(!timer){
      timer = setTimeout(()=>{
        fn.apply(that, event)
        clearTimeout(timer)
        timer = null
      }, wait)
    }
  }
}

let arrA = [1, 9, [4, [6, 7], 8], [9, 6], [1, [3, 2, [5] ] ] ]
// 扁平化并去重得到一个升序的数组
function mixFunc(arr) {
  function flatten(arr){
    return arr.reduce((acc, cur) =>{
      return acc.concat(Array.isArray(cur)?flatten(cur): cur)
    }, [])
  }
  let newArr = flatten(arr)
  let setArr = [...new Set(newArr)]
  setArr.sort((a, b)=> a - b)
  return setArr

}
console.log(mixFunc(arrA))

// 手写jsonp
// var cb = function (data) {
//   console.log(data)
// }
// var newScript = document.createElement('script')
// script.src = 'http://localhost:8888/jsonp?callback=cb'
// document.body.appendChild(newScript)

// 手写ajax
// let xhr = new XMLHttpRequest()
// xhr.onreadystatechange = function () {
//   if(xhr.readyState == 4 && xhr.status == 200){
//     let data = xhr.responseText
//     console.log(JSON.parse(data))
//   } else {
//     console.log(xhr.statusText)
//   }
// }
// xhr.open('GET', url, true)  // true 和 false决定是否异步
// xhr.send(null)
// 用promise封装
  function myAjax() {
    return new Promise((resolve, reject)=>{
      const xhr = XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.send(null)
      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
          let json = JSON.parse(xhr.responseText)
          resolve(json)
        } else {
          reject('error')
        }
      }
    })
  }

// 手写发布订阅模式
class eventEmitter {
  constructor(){
    this.events = {}  // 事件对象，存放事件名和事件函数 如 {click:[handle1, handle2]}
  }
  // 订阅事件的方法
  on(eventName, callback){
    if(!this.events[eventName]){
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }
  // 触发事件的对象
  emit(eventName){
    this.events[eventName] && this.events[eventName].forEach(cb=>cb())
  }
  // remove 移除订阅的事件
  removeListener(eventName, callback){
    if(this.events[eventName]){
      this.events[eventName] = this.events[eventName].filter(cb=>cb!=callback)
    }
  }
  // 执行一次就移除
  once(eventName, callback){
    let fn = () =>{
      callback()
      this.removeListener(eventName, fn)
    }
    this.on(eventName, fn)
  }
}
  // 测试用例
let event = new eventEmitter()
let workDay = 0
function work(){
  workDay++
  console.log(workDay)
}
event.on('work', work)
event.once('rest', function () {
  console.log('have a rest')
})
setInterval(()=>{
  event.emit('work')
  event.removeListener('work', work)
  event.emit('rest')
}, 1000)


// setTimeout 实现 setInterval
function myInterval() {
  myInterval.timer = setTimeout(()=>{
    arguments[0]()
    myInterval(...arguments)
  }, arguments[1])
  myInterval.clear = function () {
    clearTimeout(myInterval.timer)
  }
}

// 深浅拷贝
 // 浅拷贝 基本数据类型正常拷贝，如果是引用类型就只能拷贝其引用，修改会影响
function shallow(obj) {
  var newObj = obj instanceof Array ? []: {}
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      newObj[key] = obj[key]
    }
  }
  return newObj
}

 // 深拷贝  指完全的拷贝一个对象，即使嵌套了对象，两者也会相互分离，修改一个不会影响另一个
// JSON.parse(JSON.stringify(obj)) 必须是Json安全， 不能拷贝函数，bigint 和 循环引用会返回TypeError
function deep(obj) {
  if(Object.prototype.toString.call(obj) === '[object Null]') return null
  let newObj = obj instanceof Array? []: {}
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      newObj[key] = typeof obj[key] == 'object'? deep(obj[key]): obj[key]
    }
  }
  return newObj
}

// 遍历dom树
// let allDoc = document.getElementsByTagName('*') // 获取所有的标签
function countTag(tags){
  let len = tags.length, tagsArr = [], obj = {}
  for(let i = 0; i < len; i++){
    tagsArr.push(tags[i].tagName).toLowerCase()
  }
  let len1 = tagsArr.length
  for(let i = 0; i < len1; i++){
    if(!obj[tagsArr[i]]){
      obj[tagsArr[i]] = 1
    } else {
      obj[tagsArr[i]]++
    }
  }
  return obj
}

// promise
  // 异步编程的一种解决方案，比传统的解决方案 回调和 事件更强大，更合理
  // 三种状态 pending fulfilled rejected
  // promise对象是一个构造函数，接收一个函数作为参数，函数的两个参数也是函数
    // 实现 promise.all  所有实例都resolve，结果是resolve，结果返回给promise的回调函数
    // 有一个是reject结果就reject，第一个reject的实例结果返回
function myAll(arr) {
  let result = [], len = arr.length
  return new Promise((resolve, reject)=>{
    if(len == 0) resolve(result)
    for(let i = 0; i < len; i++){
      Promise.resolve(arr[i]).then((val)=>{
        result.push(val)
        if(result.length == len){
          resolve(result)
        }
      }).catch((err)=>{
        reject(err)
      })
    }
  })
}
    // promise.race 竞速，有一个改变就会改变，率先改变的实例结果会传递给p的回调函数
function myRace(arr) {
  return new Promise((resolve, reject)=>{
    for(let i of arr){
      Promise.resolve(i).then((val)=>{
        resolve(val)
      }).catch((err)=>{
        reject(err)
      })
    }
  })
}

    // promise.allSettled 不管是失败还是成功，结果（状态，值）都会返回给回掉函数
function allSettled(arr) {
  let result = [], promiseCount = arr.length
  return new Promise((resolve, reject)=>{
    for(let i = 0; i < arr.length; i++){
      Promise.resolve(arr[i]).then(val=>{
        result[i] = {
          status: 'fulfilled',
          val
        }
        promiseCount--
        if(promiseCount === 0){
          resolve(result)
        }
      }).catch(err=>{
        result[i] = {
          status: 'rejected',
          err
        }
        promiseCount--
        if(promiseCount === 0){
          resolve(result)
        }
      })
    }
  })
}

// 函数柯里化
  // 将一个使用多个参数的函数转换成一系列使用一个参数的函数
  // 参数复用，本质上是降低通用性，提高适用性
    // 实现功能强大的任意参数
function curry(){
  let args = Array.prototype.slice.call(arguments)
  let inner = function () {
    args.push(...arguments)
    return inner
  }
  inner.toString = function () {
    return args.reduce((acc, cur) => acc + cur)
  }
  return inner
}
    // 还有一种
// 支持多参数传递
  function curry1(fn){
    let args = []
    return function temp(...newArgs) {
      if(newArgs.length){
        args = [...args, ...newArgs]
        return temp
      } else {
        let val = fn.apply(this, args)
        args = []
        return val
      }
    }
  }
  function add(...args) {
    return [...args].reduce((acc, cur) => acc + cur)
  }
  const curryFn = curry1(add)
  console.log('柯里化', curryFn(1)(2)())

// promise.all 并发限制
function asyncPool(poolLimit, arr, iteratorFn){
  let i = 0 // 记录执行到第i个任务
  const ret = []
  const executing = []
  const enqueue = function () {
    if(arr.length === i){  // 任务执行完，返回resolved promise
      return Promise.resolve()
    }
    const item = arr[i++]  // 每调用一次 enqueue，初始化一个promise
    const p = Promise.resolve().then(()=>iteratorFn(item, arr))
    ret.push(p)
    const e = p.then(()=> executing.splice(executing.indexOf(e), 1))
    executing.push(e)
    let r = Promise.resolve()
    if(executing.length >= poolLimit){  // 执行队列被占满
      r = Promise.race(executing)  // r会被替换为 Promise.race 等待其中一个任务的完成
    }
    return r.then(()=>enqueue())
  }
  return enqueue().then(()=>Promise.all(ret))
}
// 测试
const timer = i =>  new Promise(resolve=>{
  setTimeout(() => resolve(i))
}, i)
asyncPool(2, [timer(600),timer(300),timer(700),timer(400),timer(500)], timer).then((res)=>{
  console.log(res)
})

// promise实现sleep 方法
async function f() {
  console.log('开始')
  sleep(4000)
  console.log('结束')
}
function sleep(ms) {
  return new Promise(resolve=>{
    setTimeout(resolve, ms)
  })
}

  // 定义一个二叉树
function TreeNode(val, left, right) {
  this.val = (val === undefined? 0: 1)
  this.left = (left === undefined? null: left)
  this.right = (right === undefined? null: right)
}

// iterator 遍历器理解和实现
let myArr = [1, 2, 3]
let it = myArr[Symbol.iterator]()
// Symbol.iterator 获取对象的 遍历器属性，本身不是一个迭代器对象，而是一个返回迭代器对象的函数
console.log(it)
// 给对象定义迭代器
var myObj = {a: 2, b: 3}
Object.defineProperty(myObj, Symbol.iterator, {
  configurable: true,
  value: function () {
    let obj = this
    let index = 0
    let arr = Object.keys(obj)
    return {
      next: function(){
        return {
          value: obj[arr[index++]],
          done: index > arr.length
        }
      }

    }
  }
})
let obj = myObj[Symbol.iterator]()
console.log(obj.next())
