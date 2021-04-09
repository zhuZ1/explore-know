// 两数之和2 输入有序数组
// 找到有序数组中相加等于目标数的两数 返回下标
var twoSum2 = function (nums, target) {
  let left = 0, right = nums.length - 1
  while(left < right){
    if(nums[left] + nums[right] == target){
      return [left+1, right+1]
    } else if(nums[left] + nums[right] > target){
      right--
    } else {
      left++
    }
    console.log(left, right)
  }
  return []
}
let nums = [2, 7, 11, 15], target = 9
console.log(twoSum2(nums, target))

// 平方数之和
// 是否存在两个数 使得 a2 + b2 = c
var judgeSqrtSum = function (c) {
  let left = 0, right = Math.floor(Math.sqrt(c)), sum = 0
  while(left <= right){
    sum = left * left + right * right
    if(sum == c){
      return true
    } else if(sum > c){
      right--
    } else {
      left++
    }
  }
  return false
}
let c = 5
console.log(judgeSqrtSum(5))

// 反转元音字符
var reverseVowels = function (s) {
  let set = new Set(['a', 'o', 'e', 'i', 'u', 'A', 'O', 'E', 'I', 'U'])
  let arr = s.split('')
  let left = 0, right = arr.length - 1
  while(left < right){ // 满足条件是 left = right
    if(set.has(arr[left])){ // 左边有元音字符
      if(set.has(arr[right])){ // 右边也有 交换位置
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++  // 继续向右侧查找
      }
      right--  // 向左侧查找
    } else { // 左边没遇到
      left++ // 向右侧查找
    }
  }
  return arr.join('')
}
console.log(reverseVowels('hello'))

// 合并两个有序数组
// m,n 为元素数量
var merge = function (nums1, m, nums2, n) {
  let index1 = m - 1 // nums1元素的下标
  let index2 = n - 1 // nums2元素的下标
  let total = m + n - 1
  while(index2 >= 0){
    if(nums1[index1] > nums2[index2]){ // 比较最大的
      // 不断拿nums1里的数与nums2进行比较, 取最大值来填充nums[total]
      nums1[total] = nums1[index1]
      index1-- // nums1左移一位再进行比较
      total--
    } else {
      nums1[total] = nums2[index2]
      index2--
      total--
    }
  }
}
let nums1 = [1,2,3,0,0,0], nums2 = [2,5,6], m = 3, n = 3
merge(nums1, m, nums2, n)
console.log(nums1)

// 验证回文字符串
// 非空字符串删除一个字符，是否是回文字符串
var validPalindrome = function (s) {
  let left = 0, right = s.length - 1
  while(left < right){
    if(s[left] != s[right]){
      // 删除一个字符，即左指针右移一位或者是右指针左移一位
      return isPal(s, left + 1, right) || isPal(s, left, right - 1)
    }
    left++
    right--
  }
  return true
}

// 判断是否是回文串
var isPal = function (str, l, r) {
  while(l < r){
    if(str[l] != str[r]) return false // 有一个相对位置上的字符不同 即说明不是回文串
    l++
    r--
  }
  return true
}
console.log(validPalindrome('abcba'))
console.log(isPal('abcba', 0, 4))

// 通过删除字母匹配到字典里最长的单词
var findLongestWord = function (s, d) {
  if(!d) return ''
  d = d.sort() // 字典升序排列
  let longest = ''
  for(let i = 0; i < d.length; i++){
    let cur = d[i]
    let isDel = find(s, cur) // 是否可以通过删除得到
    if(isDel && cur.length > longest.length) longest = cur
  }
  return longest
}

// 判断一个字符串是否可以通过删除给定字符串的某些字符得到
// 即word是不是str的子串
var find = function (str, word) { // str是给定的字符串, word是结果字符串
  let i = 0, j = 0
  while(j < str.length){
    if(word[i] == str[j]){
      i++
      j++
    } else {
      j++
    }
  }
  return i == word.length
}
let s = "abpcplea", d = ["ale", "apple", "monkey", "plea"]
console.log(findLongestWord(s, d))

// 判断链表是否有环
// 1. 双指针 快指针一次走两步，慢指针一次走一步
var hasCycle = function (head) {
  if(!head || !head.next) return false
  let fast = head.next.next, slow = head.next
  while(fast != slow){
    if(!fast || !fast.next) return false
    fast = fast.next.next
    slow = slow.next
  }
  return true
}
// 2. 标志法
var hasCycle1 = function (head) {
  while(head){
    if(head.flag) return true  // 遇到标记为true的节点说明有 环
    head.flag = true
    head = head.next
  }
  return false
}

