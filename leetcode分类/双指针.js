// leetcode167 两数之和2 -输入有序数组
// 双指针
// numbers = [2, 7, 11, 15], target = 9
// 输出 [1, 2]
var twoSum2 = function(numbers, target) {
  let left = 0, right = numbers.length - 1
  while(left < right){
    if(numbers[left] + numbers[right] === target){
      return [left+1, right+1]
    } else if(numbers[left] + numbers[right] < target){
      left++
    } else {
      right--
    }
  }
  return []
};
let numbers = [2, 7, 11, 15], target = 9
console.log(twoSum2(numbers, target))

// leetcode633 平方数之和
var judgeSquareSum = function(c) {
  let left = 0, right = Math.floor(Math.sqrt(c)), sum = 0
  // Math.sqrt() 获取正的平方根
  while(left <= right){
    sum = left * left + right * right
    if(sum === c) return true
    c > sum ? left++ : right--
  }
  return false
};

console.log(judgeSquareSum(3))

// leetcode345 反转元音字母
var reverseVowels = function(s) {
  // 元音字符 a o e i u
  let set = new Set(['a', 'o', 'e', 'i', 'u', 'A', 'O', 'E', 'I', 'U'])
  let arr = s.split('')
  console.log(arr)
  let left = 0, right = arr.length - 1
  while(left < right){
    if(set.has(arr[left])){
      if(set.has(arr[right])){
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
      }
      right--
    } else {
      left++
    }
  }
  return arr.join('')
};
console.log(reverseVowels('hello'))

//leetcode680 验证回文字符串2
// 非空字符串删除一个字符，能否成为回文串
var validPalindrome = function(s) {
  let left = 0, right = s.length - 1
  while(left < right){
    if(s[left] !== s[right]){
      // 转为判断 左或右删除一个是否是回文串
      // 删除一个相当于指针 右/左 移一位
      return isPal(s, left + 1, right) || isPal(s, left,right - 1)
    }
    left++
    right--
  }
  return true
};
console.log(validPalindrome('adc'))

    // 判断是否是回文串
    function isPal(str, l, r) {
      while(l < r){
        if(str[l] !== str[r]){
          return false
        }
        l++
        r--
      }
      return true
    }

//leetcode88 合并两个有序数组
// 不需要return任何值，nums1代表
var merge = function(nums1, m, nums2, n) {
  let index1 = m - 1
  let index2 = n - 1
  let total = m + n - 1
  while(index2 >= 0){
    if(nums1[index1] > nums2[index2]){  // 先比较最大的
      // nums1最大的比 nums2大
      nums1[total] = nums1[index1]
      index1--
      total--
    } else {
      nums1[total] = nums2[index2]
      index2--
      total--
    }
  }
}

let mergeNum1 = [1, 2, 3, 0, 0, 0],
  mergeNum2 = [2, 5, 6],
  m = 3, n = 3
console.log(merge(mergeNum1, m, mergeNum2, n), mergeNum1)

//leetcode141 判断链表是否有环
// 1 快慢指针 快指针一次两步，慢指针一次一步
var hasCycle = function(head) {
  if(!head || !head.next) return false
  let fast = head.next.next, slow = head.next
  while(fast != slow){
    if(!fast || !fast.next) return false
    fast = fast.next.next
    slow = slow.next
  }
  return true
};
// 2.标志法
// 给每个已遍历过的节点加标志位，遍历链表，当出现下一个节点已被标记，说明单链表有环
var hasCycle1 = function(head) {
  while(head){
    if(head.flag) return true
    head.flag = true
    head = head.next
  }
  return false
};

//leetcode524 通过删除字母匹配到字典里最长单词

var findLongestWord = function(s, d){
  if(!d) return ''
  d = d.sort()  // 以字典序升序排列
  let longest = ''  // 存储最长字符串
  for(let i = 0; i < d.length; i++){
    let curr = d[i]
    let isDel = find(s, curr)
    if(isDel && curr.length > longest.length) longest = curr
  }
  return longest
}
let s = "abpcplea", d = ["ale", "apple", "monkey", "plea"]
console.log(findLongestWord(s, d))
// 判断字符串可以通过删除给定字符串的某些字符得到
// word 可以通过删除 str得到
function find(str, word) {
  let i = 0, j = 0
  while(j < str.length){
    if(word[i] === str[j]){
      i++ // 相同则比较下一个字符
      j++
    } else {
      j++ // 不等则 跟str的下一个字符进行比较
    }
  }
  return i === word.length  // 最后返回 i=== word.length 判断是否 word的所有元素都包含在str中
}

console.log(find('word', 'ed'))

// 剑指offer21
  var exchange = function (nums) {
    let left = 0, right = nums.length - 1
    while(left < right){
      if(nums[left] % 2){ // 奇数
        // 记录这个索引
        left ++
      } else{
        [nums[left], nums[right]] = [nums[right], nums[left]]
        right--
      }
    }
    return nums
  }
  let arr = [3, 2, 1, 4, 6, 11, 9, 8]
console.log(exchange(arr))

// 此篇结于 2020/11/20

