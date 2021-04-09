
// 二分查找69 x的平方根
var mySqrt = function (x) {
  if(x < 2) return x
  let left = 1, mid, right = Math.floor(x / 2)
  while(left <= right){
    // mid = Math.floor(left + (right - left) / 2)
    mid = left + (right - left >> 1)
    // 指针最优，单目优于双目，先算术后移位，最后位运算。移位运算优先级很低
    if(mid * mid == x) return mid
    if(mid * mid < x){
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
console.log(mySqrt(4))

// 第一个错误的版本
var solution = function (isBadVersion) {
  return function (n) {
    let left = 1, right = n
    while(left < right){
      let m = l + (right - left >> 1)
      if(isBadVersion(m) === false){
        l = m + 1
      } else {
        r = m
      }
    }
    return l
  }
}

// 旋转数组的最小数字
// [4,5,6,7,0,1,2] 可能是由 [0,1,2,4,5,6,7] 旋转得来的
var findMin = function (nums) {
  let left = 0, right = nums.length - 1
  while(left < right){
    let mid = left + right >> 1 // 向中间取整
    if(nums[mid] > nums[right]){  // 中间值 > right 说明这个旋转点（单调点）在右侧
      left = mid + 1  // 收缩左边界
    } else {
      right = mid
    }
  }
  return nums[left]
}
let nums = [4,5,6,7,0,1,2]
console.log(findMin(nums))

// 排序数组中查找重复元素的第一个和最后一个
var searchRange = function (nums, target) {
  let left = 0, right = nums.length - 1, mid
  while(left <= right){
    mid = left + right >> 1
    if(nums[mid] == target) break
    if(nums[mid] > target){
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  if(left > right) return [-1, -1]  // 没有找到目标元素
  let i = mid, j = mid
  while(nums[i]==nums[i-1]) i--
  while(nums[j]==nums[j+1]) j++
  return [i, j]
}
let nums1 = [5,7,7,8,8,10], target = 8
console.log(searchRange(nums1, target))
