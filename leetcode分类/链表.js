// 链表是一种线性表，但是并不会按照线性的顺序存储数据
// 而是在每一个节点里存到下一个节点的指针， 很多链表问题可以用递归来处理

/* Definition for singly-linked list
 function ListNode(val){
    this.val = val
    this.next = null
 }
*/
// leetcode 160 相交链表
// 编写一个程序，找到两个单链表相交的起点
var getIntersectionNode = function(headA, headB) {
  let pA = headA, pB = headB
  while(pA || pB){
    if(pA === pB) return pA
    pA = pB === null ? headB: pA.next
    pB = pB === null ? headA: pB.next
  }
  return null
};

// leetcode 206 反转链表
// var reverseList = function(head){
//   let [prev, cur] = [null, head]
//   while(cur){
//     let tmp = cur.next
//     cur.next = prev
//     prev = cur
//     cur = tmp
//   }
//   return prev
// }
// 尾递归法
var reverseList = function(head){
  return reverse(null, head)
}

function reverse(prev, cur) {
  if(!cur) return prev
  let tmp = cur.next
  cur.next = prev
  return reverse(cur, tmp)
}

// leetcode 21 合并两个有序链表
// var mergeTwoLists = function(l1, l2) {
//   if(l1 === null){
//     return l2;
//   }
//   if(l2 === null){
//     return l1;
//   }
//   if(l1.val < l2.val){
//     l1.next = mergeTwoLists(l1.next, l2);
//     return l1;
//   }else{
//     l2.next = mergeTwoLists(l1, l2.next);
//     return l2;
//   }
// };
var mergeTwoList = function (l1, l2) {
  let head = new ListNode(0)
  let cur = head
  while(l1 && l2){
    if(l1.val <= l2.val){
      cur.next = l1
      l1 = l1.next
    } else {
      cur.next = l2
      l2 = l2.next
    }
    cur = cur.next
  }
  cur.next = l1 ? l1: l2
}

// leetcode 83 删除排序链表中的重复元素
var deleteDuplicates = function (head) {
  let cur = head
  while(cur && cur.next){
    if(cur.val == cur.next.val){
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

// leetcode 24 两两交换链表中的节点
// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表
var swapPairs = function (head) {
  let dummy = new ListNode(0)
  dummy.next = head
  let prev = dummy
  while(head && head.next){
    const next = head.next
    head.next = next.next
    next.next = head
    prev.next = next

    prev = head
    head = head.next
  }
  return dummy.next
}
