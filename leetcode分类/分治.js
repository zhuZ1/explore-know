//leetcode 241 为表达式设计优先级
var diffWaysToCompute = function(input) {
  const isNumber = (str) =>{
    return /^\d+$/i.test(str)
  }
  const operate = (a, b, o) =>{
    if(o == '+') return a + b
    else if(o == '-') return a - b
    else if(o == '*') return a * b
  }
  const map = {}
  const dfs = (input, l, r) =>{
    const str = input.slice(l, r + 1).join('')
    if(map[str]) return map[str]
    if(isNumber(str)) return [Number(str)]
    const res = []
    for(let i = l; i < r; i++){
      if(!isNumber(input[i])){
        const left = dfs(input, l, i - 1)
        const right = dfs(input, i + 1, r)
        for(const num of left){
          for(const num1 of right){
            res.push(operate(num, num1, input[i]))
          }
        }
      }
    }
    map[str] = res
    return res
  }
  input = input.split('')
  return dfs(input, 0, input.length - 1)
};
let input = '2*3-4*5'
console.log(diffWaysToCompute(input))

// leetcode95 不同的二叉搜索树
// 给定一个整数n，生成所有由 1...n为节点所组成的 二叉搜索树
var generateTrees = function(n) {
  if(n==0) return []
  let getBSTnum = (left, right) =>{
    if(left > right) return [null]
    if(left == right) return [new TreeNode(left)]
    let res = []
    for(let i = left; i <= right; i++){
      let leftBst = getBSTnum(left, i - 1)
      let rightBst = getBSTnum(i + 1, right)
      for(let leftKey of leftBst){
        for (let rightKey of rightBst){
          let root = new TreeNode(i)
          root.left = leftKey
          root.right = rightKey
          res.push(root)
        }
      }
    }
    return res
  }
  return getBSTnum(1, n)
};

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


console.log(generateTrees(3))
