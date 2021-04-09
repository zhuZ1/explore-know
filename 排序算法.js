
let arr = [3, 5, 0, -1, 2]

// 冒泡排序
// 重复地走访过要排序的数列，一次比较两个元素，如果他们的顺序错误就交换他们的位置
function bubbleSort(arr) {
  let len = arr.length
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len - i - 1; j++){
      if(arr[j] > arr[j+1]){ // 相邻元素两两比较
        let temp = arr[j+1]  // 值交换
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
// 平均时间复杂度 O(n²), 最好情况是 O(n)
// 空间复杂度 O(1)
// 稳定
console.log(bubbleSort(arr))   // √

// 选择排序
// 从未排序序列中找到最大 （小）的元素，存放到排序序列的起始位置，然后再在剩余未排序序列中寻找最大（小）元素，放到已排序序列的末尾
function selectionSort(arr){
  let len = arr.length
  for(let i = 0;i < len-1;i++){
    let minId = i // 记录当前 index
    for(let j = i + 1;j < len; j++){
      if(arr[j] < arr[minId]){ // 寻找最小数
        minId = j  // 保存最小数的索引
      }
    }
    let temp = arr[i]
    arr[i] = arr[minId]
    arr[minId] = temp
  }
  return arr
}

console.log(selectionSort(arr))

// 插入排序
// 打牌。通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
// 假设 arr = [-1, 2, 0, 3]
// -1 已经拍过
// 取 2 做比较
// -1 不比 2 大 不动
// -1 和 2 都是有序的了
// 取 0 跟 2 做比较
// 2 比 0 大
// arr[2] 上的数字 变成 2
// preId = 0
// arr[1]  = 0
// -1， 0， 2 有序了
// 取 3 比较
// 2 不比3 大， 不动
function insertionSort(arr) {
  let len = arr.length
  let preId, cur
  for(let i = 1;i < len;i++){ // 第一项可以看做是一个有序数列，所以从第二项开始遍历
    preId = i - 1  // 当前从1开始，前一位的 index 0
    cur = arr[i] //
    while(preId >= 0 && arr[preId] > cur){  // 前一位 > 当前值
      arr[preId+1] = arr[preId] // 修改当前值 ，当前值始终是最大的
      preId --
    }
    arr[preId+1] = cur
  }
  return arr
}

console.log(insertionSort(arr))

// 希尔排序
// 本质是一种插入排序，但是对数列进行了等间隔分组处理，在每一组中做插入排序

function shellSort(arr) {
  let len = arr.length; //长度
  let gap = 1
  while (gap < len / 3) {      // 动态定义间隔序列
    gap = gap * 3 + 1;
  }
//上面是设置动态增量算法
//下面是其实是插入排序 和 冒泡排序交换位置
  while (gap >= 1) {
    for (let i = 0; i < len; i++) {      //插入排序
      for (j = i; j >= gap && arr[j] < arr[j - gap]; j -= gap) {
        //类似冒泡排序中的交换位置
        let temp =  arr[j - gap]
        arr[j - gap] = arr[j]
        arr[j] = temp
      }
    }
    gap = (gap - 1) / 3;
  }
  return arr
}

console.log('希尔排序', shellSort(arr))

// 快速排序
// 选择一个元素作为基准，通过一趟排序后，将原序列分为两部分，
// 前一部分所有记录均比后一部分所有记录小，然后再一次对前后两部分的记录进行快速排序，递归该过程，直到都有序
function quickSort(arr) {
  if(arr.length < 1){
    return arr
  }
  let baseId = Math.floor(arr.length / 2) // 找到基准位置
  let base = arr.splice(baseId, 1)[0] // 取出基准数， splice()返回数组，[0]来取到。 注意： 这里原数组会被改变
  let left = [], right = []
  for(let i = 0; i < arr.length;i++){
    if(arr[i] < base){
      left.push(arr[i])  // 左边放小的
    } else {
      right.push(arr[i]) // 右边放大的
    }
  }
  return quickSort(left).concat([base], quickSort(right)) // 递归该过程，并加上基准数
}

console.log('快排', quickSort(arr))

// 归并排序
// 利用递归与分治技术将数据序列分成 越来越小的半子表，再对半子表排序，最后用递归的方法将排序好的半子表合并成为越来越大的有序序列
arr = [3, 5, 0, -1, 2]
// 执行过程
// 第一次 左边[3, 5] , [0, -1, 2]
// 左边再分 [3], [5]  排序 [3, 5]
// 右边再分 [0] [-1, 2]  再分 [-1] [2]  先拍 [-1, 2] 的序， 再排序 [0] [-1, 2] 得到右边序列 [-1, 0, 2]
// 左右两边排序合并  [-1, 0, 2, 3, 5]

function merge(left, right) { // 判断，合并
  let result = []
  while(left.length > 0 && right.length > 0){
    if(left[0] < right[0]){
      // 数组第一项
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  return result.concat(left, right)

}

function mergeSort(arr) { // 拆分
  if(arr.length == 1){
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left_arr = arr.slice(0, mid) // 将无序序列从中间拆分成左右两部分
  let right_arr = arr.slice(mid)
  return merge(mergeSort(left_arr), mergeSort(right_arr))
}

console.log('归并排序', mergeSort(arr))

// 堆排序
// 可以说是一种利用堆的概念来排序的选择排序，分为两种方法
// 1.大顶堆：每个节点的值都大于或等于其子节点的值，用于升序排序
// 2.小顶堆：每个节点的值都小于或等于其子节点的值，用于降序排序
function swap(data, i, j) {  // 交换两个节点
  let temp = data[i]
  data[i] = data[j]
  data[j] = temp
}
function buildHeap(data) {
  let len = data.length
  for(let i = Math.floor(len / 2); i >= 0; i--){
    heapAdjust(data, i, len)
  }
}
// 堆调整函数，即调整当前data为大根堆
function heapAdjust(data, i, len) {
  let child = 2 * i + 1
  while(child <= len){
    let temp = data[i]
    if(child + 1 <= len && data[child] < data[child+1]){
      child = child + 1
    }

    if(data[i] < data[child]){
      data[i] = data[child]
      data[child] = temp
      i = child
      child = 2 * i + 1
    } else {
      break
    }
  }
}

// 排序
function heapSort(arr) {
  let data = arr.slice(0)
  if(!(data instanceof Array)){
    return null
  }
  if(data instanceof Array && data.length == 1){
    return data
  }
  buildHeap(data)
  let len = data.length
  for(let i = len - 1; i >= 0;i--){
    swap(data, i, 0)
    heapAdjust(data, 0, i - 1)
  }
  return data
}

console.log('堆排', heapSort(arr))




