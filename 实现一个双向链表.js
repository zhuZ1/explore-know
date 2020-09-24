function Node(element) {
  this.element = element
  this.next = null
  this.previous = null
}

function LinkedList() {
  this.head = new Node('head')
  this.find = find
  this.findLast = findLast
  this.insert = insert
  this.remove = remove
  this.findPrev = findPrev
  this.display = display
  this.dispReverse = dispReverse
}

function insert(newElement, item) {
  let newNode = new Node(newElement)
  let curNode = this.find(item)
  newNode.next = curNode.next
  newNode.previous = curNode
  curNode.next = newNode
}

function remove(item) {
  let curNode = this.find(item)
  if(!(curNode.next == null)){
    curNode.previous.next = curNode.next
    curNode.next.previous = curNode.previous
    curNode.next = null
    curNode.previous = null
  }
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

function findPrev(item) {
  let curNode = this.head
  while(!(curNode.next == null) && (curNode.next.element != item)){
    curNode = curNode.next
  }
  return curNode
}

function display() {
  let curNode = this.head
  while(!(curNode.next==null)){
    console.log(curNode.next.element)
    curNode = curNode.next
  }
}

// 查找链表中的最后一个元素
function findLast() {
  let curNode = this.head
  while(!(curNode.next==null)){
    curNode = curNode.next
  }
  return curNode
}

// 反向显示链表元素
function dispReverse() {
  let curNode = this.findLast()
  while(!(curNode.previous==null)){
    console.log(curNode.previous.element)
    curNode = curNode.previous
  }
}


let fruit = new LinkedList()

fruit.insert('Apple', 'head')
fruit.insert('Banana', 'Apple')
fruit.insert('Pear', 'Banana')
fruit.display()
fruit.dispReverse()


