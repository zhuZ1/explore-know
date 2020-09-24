// jq each函数 能遍历数组和对象， 类数组，可以中止循环(使回调函数返回false)

function each(obj, callback) {
  var length, i = 0
  if(idArrayLike(obj)){ // 判读是不是类数组
    length = obj.length
    for(;i < length;i++){
      if(callback.call(obj[i], i, obj[i]===false)){
        break
      }
    }
  } else {
    for(i in obj){
      if(callback.call(obj[i], i, obj[i]) === false){
        break
      }
    }
  }
  return obj
}

// jq isArrayLike() 函数的实现
function isArrayLike(obj) {
  var length = !!obj && 'length' in obj && obj.length
  var typeRes = type(obj) // 数据类型检测中的type()方法

  if(typeRes === 'function' || isWindow(obj)){
    return false
  }

  return typeRes === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length-1) in obj
}

// window 对象
function isWindow(obj){
  return obj != null && obj === obj.window
}

