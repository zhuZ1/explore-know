var nodes = {
  value: 1,
  children: [{
    value: 2,
    children: [{
      value: 4,
      children: []
    },
      {
        value: 3,
        children: []
      },
    ]
  },
    {
      value: 5,
      children: []
    },
  ]
};

// 以上是一个树形结构
function bfs(nodes) {
  const queue = []
  let sum = 0
  queue.push(nodes)
  while(queue.length){
    const curNode = queue.pop()
    sum += curNode.value
    curNode.children.forEach(item=>queue.push(item))
  }
  return sum
}

console.log(bfs(nodes))
