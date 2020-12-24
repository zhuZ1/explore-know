// leetcode 20 有效括号
// 是不是正确顺序闭合的
var isValid = function(s) {
  let arr = [], len = s.length
  if(s=='') return true
  if(len % 2) return false  // 奇数直接返回
  for(let i = 0;i < len;i++){
    let letter = s[i]
    switch(letter) {
      case '(':
      case '[':
      case '{':
        arr.push(letter)
        break
      case ')':
        if(arr.pop()!='(') return false
        break
      case ']':
        if(arr.pop()!='[') return false
        break
      case '}':
        if(arr.pop()!='{') return false
        break
    }

  }
  return !arr.length
};
console.log('返回括号的匹配结果', isValid('([}}])'))

// leetcode 739 每日温度
// 根据每日的气温列表，重新生成一个列表。对应位置的输出是：要想观测到更高的气温，至少需要等待的天数
// 如果气温在这之后都不会升高，请在该位置用0来代替
var dailyTemperatures = function(T) {
  const res = new Array(T.length).fill(0)
  const stack = []
  for(let i = T.length - 1; i >= 0; i--){
    while(stack.length && T[i] >= T[stack[stack.length - 1]]){
      stack.pop()
    }
    if(stack.length){
      res[i] = stack[stack.length - 1] - i
    }
    stack.push(i)
  }
  return res
};

const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
// 你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]
