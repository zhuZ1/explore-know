function Node(element) {
  this.element = element
  this.next = null
}

function LinkedList() {
  this.head = new Node('head')
  this.find = find
  this.insert = insert
  this.remove = remove
  this.findPrev = findPrev
  this.display = display
}

function find(item) { // find方法 查找给定节点
  // 首先创建一个新节点，将链表的头节点 赋给这个新创建的节点，然后在链表上循环
  // 如果当前节点和我们要找的节点的element 和我们要找的信息不符合，就将当前节点移动到下一个节点
  let curNode = this.head
  while(curNode.element != item){
    curNode = curNode.next
  }
  return curNode
}

function insert(newElement, item) {
  let newNode = new Node(newElement)
  let curNode = this.find(item)
  newNode.next = curNode.next
  curNode.next = newNode
}

function display() {
  let curNode = this.head
  while(!(curNode.next==null)){
    console.log(curNode.next.element)
    curNode = curNode.next
  }
}
// 测试display 方法
let fruit = new LinkedList()

fruit.insert('Apple', 'head')
fruit.insert('Banana', 'Apple')
fruit.insert('Pear', 'Banana')

fruit.display()

// 从链表中删除一个节点
// 需要先找到该节点的 前一个节点，找到后，我们修改它的next属性，让其指向待删除节点的下一个节点
function findPrev(item) {
  let curNode = this.head
  while(!(curNode.next == null) && (curNode.next.element != item)){
    curNode = curNode.next
  }
  return curNode
}

function remove(item) {
  let prevNode = this.findPrev(item)
  if(!(prevNode.next==null)){
    prevNode.next = prevNode.next.next
  }
}

// 测试删除一个节点
fruit.remove('Pear')
fruit.display()


