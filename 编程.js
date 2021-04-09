// 冒泡
let arr = [1, 3, 4, 2]
function bubble(arr) {
  let len = arr.length
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len - i - 1; j++){
      if(arr[j] > arr[j + 1]){
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
  }
  return arr
}
// console.log(bubble(arr))

// 选择
function select(arr) {
  let len = arr.length
  for(let i = 0; i < len; i++){
    let minIdx = i
    for(let j = i + 1; j < len; j++){
      if(arr[minIdx] > arr[j]){
        minIdx = j
      }
    }
    [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
  }
  return arr
}
// console.log(select(arr))

// 插入
function insert(arr) {
  let len = arr.length
  let preId, cur
  for(let i = 1; i < len; i++){
    preId = i - 1
    cur = arr[i]
    while(preId >= 0 && arr[preId] > cur){
      arr[preId + 1] = arr[preId]
      preId--  // 比较前一位
    }
    arr[preId + 1] = cur
  }
  return arr
}
// console.log(insert(arr))

// 快排
function quick(arr) {
  if(arr.length < 1) return arr
  let baseId = Math.floor(arr.length / 2)
  let base = arr.splice(baseId, 1)[0]
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
// console.log(quick(arr))

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
  let base = Math.floor(arr.length / 2)
  let left = arr.slice(0, base)
  let right = arr.slice(base)
  return merge(mergeSort(left), mergeSort(right))
}
console.log(mergeSort(arr))

// 二叉树遍历
  // 前序 根- 左 -右
function preOrder(root) {
  let res = [], arr = []
  root && arr.push(root)
  while(arr.length > 0){
    let node = arr.pop()
    res.push(node.val)
    node.right && arr.push(node.right)
    node.left && arr.push(node.left)
  }
  return res
}

// 中序 左 -根 -右
function inOrder(root) {
  let res = [], arr = []
  while(root || arr.length){
    while(root){
      arr.push(root)
      root = root.left
    }
    root = arr.pop()
    res.push(root.val)
    if(root.right != null){
      root = root.right
    }
  }
  return res
}

// 后序 左 -右 -根
function postOrder(root) {
  let res = [], arr = []
  root && arr.push(root)
  while(arr.length > 0){
    let node = arr.pop()
    res.unshift(node.val)
    node.left && arr.push(node.left)
    node.right && arr.push(node.right)
  }
  return res
}

// 层序遍历
function levelOrder(root) {
  if(!root) return []
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

// moveZero
let zero = [3, 0, 12, 0, 0, 1]
function moveZero(arr) {
  let len = arr.length
  // for(let i = 0; i < len; i++){
  //   if(arr[i] === 0){
  //     arr.splice(i, 1)
  //     arr.push(0)
  //     i--  // 删除一个，还需要从当前位置开始遍历
  //     len--  // 后面都是0不需要遍历了
  //   }
  // }
  // for(let i = len; i >= 0; i--){
  //   if(arr[i] === 0){
  //     arr.splice(i, 1)
  //     arr.push(0)
  //   }
  // }
  let left = 0, right = len - 1
  while(left < right){
    if(arr[left] === 0){
      [arr[left], arr[right]] = [arr[right], arr[left]]
      right--
    } else {
      left++
    }
  }
  return arr
}
// console.log(moveZero(zero))

// 防抖，节流
function debounce(fn, delay) {
  let timer
  return function () {
    let that = this, event = arguments
    timer = setTimeout(() => {
      clearTimeout(timer)
      fn.apply(that, event)
    }, delay)
  }
}

function throttle(fn, delay) {
  let timer = null
  return function () {
    let that = this, event = arguments
    if(!timer){
      timer = setTimeout(() => {
        fn.apply(that, event)
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}

// setTimeout 实现 setInterval
function mySetInter() {
  mySetInter.timer = setTimeout(() => {
    arguments[0]()
    mySetInter(...arguments)
  }, arguments[1])
  mySetInter.clear = function () {
    clearTimeout(mySetInter.timer)
  }
}

// bind
Function.prototype.myBind = function (obj) {
  if(typeof this !== 'function') throw new Error('error')
  let fn = this
  let _fn = function () {}
  let args = Array.prototype.slice.call(arguments, 1)
  const bound = function () {
    let params = Arrary.prototype.slice.call(arguments)
    fn.apply(this.constructor === fn? this: obj, args.concat(params))
  }
  _fn.prototype = fn.prototype
  bound.prototype = new _fn()
  return bound
}

// 返回所有可能的子集
  // 给定一组不含重复元素的数组，返回其所有可能的子集
function subsets(nums) {
  const res = []
  const dfs = (index, list) => {
    res.push(list.slice())  // [[], [1],
    for(let i = index; i < nums.length; i++){
      list.push(nums[i]) // 0
      dfs(i + 1, list) //
      list.pop() // 回溯
    }
  }
  dfs(0, [])
  return res
}

// 搜索插入的位置
  // 给定一个有序数组和一个目标值，找到目标值返回下标，如果不存在，返回其合适插入的位置
let arrN = [1, 3, 5, 6]
var searchInsert = function (nums, target) {
  let left = 0, right = nums.length - 1
  while(left < right){
    const mid = (left + right) >> 1
    if(target == nums[mid]) return mid
    if(target < nums[mid]){
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}

// 投飞镖刺气球
 // let points = [[10,16],[2,8],[1,6],[7,12]]
var findMinArrowShots = function (points) {
  if(!points.length) return 0
  // 先进行排序
  points.sort((a, b) => a[1] - b[1])  // [[1,6],[2,8],[7,12],[10,16]]
  let pos = points[0][1]
  let ans = 1
  for(let balloon of points){
    if(balloon[0] > pos){
      pos = balloon[1]
      ans++
    }
  }
  return ans
}

// 分发饼干
  // 每个孩子只能有一个饼干，每个孩子都有一个满足的胃口值 g[i]
  // 每块饼干都有一个能量值 s[i], s[i] >= g[i] 孩子就能得到满足
var findContentChild = function (g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let total = 0
  for(let i = 0; i < s.length; i++){
    if(s[i] >= g[total]){
      total++
    }
    if(total === g.length){
      return total
    }
  }
  return total
}

// 手写 new
 // new 过程会新建一个对象，会继承构造器属性和原型上的属性，最后会作为实例返回

var newFac = function () {
  let obj = {}
  let Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  let res = Constructor.apply(obj, arguments)
  return typeof res === 'object'? res || obj: obj
}

// 手写promise.all
var myAll = function (arr) {
  let res = [], len = arr.length
  return new Promise((resolve, reject) => {
    if(len === 0) resolve(res)
    for(let item of arr){
      Promise.resolve(item).then(val => {
        res.push(val)
        if(res.length === len){
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })

}

// 镜像二叉树 剑指27
 // 完成一个函数，输入一个二叉树，输出它的镜像
var mirrorTree = function (root) {
  if(!root) return null
  // 交换当前节点的左右节点
  const temp = root.left
  root.left = root.right
  root.right = temp
  // 交换左右子树
  mirrorTree(root.left)
  mirrorTree(root.right)
  return root
}

// 最小深度 leetcode 111
var minDepth = function (root) {

}

// 数组乱序
var shuffle = function (arr) {
  let len = arr.length
  for(let i = len; i; i--){
    let j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]]
  }
}
