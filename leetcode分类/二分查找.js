// leetcode69 x的平方根
var mySqrt = function(x) {
  if(x < 2) return x
  let left = 1, mid, right = Math.floor(x / 2)
  while(left <= right){
    mid = Math.floor(left + (right - left) / 2)
    if(mid * mid == x) return mid
    if(mid * mid < x){
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return right
};

console.log(mySqrt(4))

// leetcode744 大于给定元素的最小元素
// 字母依序循环出现 a,b,c,d...z,a,b..
var nextGreatestLetter = function(letters, target) {
  if(target >= letters[letters.length - 1]){
    return letters[0]
  } else {
    return letters.find(l => l > target)
  }
};
let letters = ["c", "f", "j"], target = 'a'
console.log(nextGreatestLetter(letters, target))

// leetcode540 有序数组中的单一元素
var singleNonDuplicate = function(nums) {
  for(let i = 0; i < nums.length; i++){
    if(nums[i] == nums[i + 1]){
      i++
    } else {
      return nums[i]
    }
  }
};
let nums = [1,1,2,3,3,4,4,8,8]
console.log(singleNonDuplicate(nums))

// leetcode278 第一个错误的版本
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function(n) {
    let l = 1, r = n
    while(l < r){
      let mid = l + Math.floor((r - l) / 2)
      if(isBadVersion(mid) == false){
        l = mid + 1
      } else {
        r = mid
      }
    }
    return l
  };
};
// n = 5, 并且 version = 4是第一个错误的版本

// 调用 isBadVersion(3) = false
// 调用 isBadVersion(4) = true
// 调用 isBadVersion(5) = true

// leetcode153 旋转数组的最小数字
var findMin = function(nums) {
  let left = 0, right = nums.length - 1
  while(left < right){
    let mid = (left + right) >> 1  // 中间值向下取整
    // mid更接近 left  left <= mid, mid < right
    // 那么两种情况 nums[mid] > nums[right] 或者 <
    if(nums[mid] > nums[right]){
      // 收缩左边界
      left = mid + 1
    } else {
      // 收缩右边界
      right = mid
    }
  }
  return nums[left]
};

let arr = [4,5,6,7,0,1,2]
console.log(findMin(arr))

// leetcode34 排序数组中查找元素的第一个和最后一个位置
var searchRange = function(nums, target) {
  let left = 0, right = nums.length - 1, mid
  while(left <= right){
    mid = (right + left) >> 1
    if(nums[mid] == target) break
    if(nums[mid] > target){
      right = mid - 1
    } else {
      left = mid + 1
    }

  }
  if(left > right) return [-1, -1]
  let i = mid, j = mid
  while(nums[i] == nums[i - 1]) i--
  while(nums[j] == nums[j + 1]) j++
  return [i, j]
};

let nums1 = [5,7,7,8,8,10], target1 = 8
console.log(searchRange(nums1, target1))
