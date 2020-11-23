
// 将一个嵌套多层的array 转换为只有一层的数组
// 1 递归
function flatten1(arr) {
  var result = [], len = arr.length
  for(var i = 0; i < len; i++){
    if(Array.isArray(arr[i])){
      result = result.concat(flatten1(arr[i])) // concat 生成新的数组，赋值给result
    } else {
      result.push(arr[i])
    }
  }
  return result
}

// 2 toString()  如果数组的元素都是数字
function flatten2(arr) {
  return arr.toString().split(',').map(function(item) {
    return +item
  })
}

// 3 reduce
function flatten3(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next)?flatten3(next): next)
  }, [])
}

// 4 es6 的扩展运算符  扁平化一层
var arr = [1, 2, [3, 4]]
console.log([].concat(...arr))

// while 循环可以扁平化多层
function flatten4(arr) {
  while(arr.some(item=>Array.isArray(item))){
    arr = [].concat(...arr)
  }
  return arr
}

// 5 es6 数组实例的 flat() 方法
// Array.prototype.flat() 用于将嵌套的数组拉平，变成一维数组，
// 该方法返回一个新数组， 对原数据没有影响
[1, 2, [3, [4, 5]]].flat()
// 方法内可以给 整数参数， 默认是1
// 不管多少层，都拉伸成一维数组  参数 Infinity


// 借鉴 underscore
// @param {Array} input 要处理的数组
// @param {boolean} shallow 是否只扁平一层
// @param {boolean} strict 是否严格处理元素
// @param {Array} output 为了方便递归而传递的参数
function flatten(input, shallow, strict, output) {
  output = output || []
  var idx = output.length
  for(var i = 0, len = input.length; i < len; i++){
    var val = input[i]
    if(Array.isArray(val)){
      // 如果只扁平一层，
      if(shallow){
        var j = 0, length = val.length
        while(j < length){
          output[idx++] = val[j++]
        }
      } else {
        flatten(val, shallow, strict, output)
        idx = output.length
      }
    } else if(!strict){
      output[idx++] = val
    }
  }
  return output
}


