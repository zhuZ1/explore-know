
// 数组的浅拷贝：
// 我们可以使用数组的一些方法， 如 slice, concat 返回一个新数组的特性来实现拷贝
// 但是如果数组嵌套了对象或数组的话 克隆并不彻底
// 如果数组元素是基本类型，就会拷贝一份，互不影响。 而如果是对象或数组，就会只拷贝对象和数组的引用，新旧数组中修改都会改变

// 深拷贝：
// 是指完全的拷贝一个对象，即使嵌套了对象，两者也会相互分离，修改一个不会影响另一个
// Json.parse(Json.stringify(obj))  // 深拷贝简单的方法， 不能拷贝函数

// 浅拷贝的实现：
var shallowCopy = function(obj){
  if(typeof obj !== 'object') return obj
  // 根据obj对象类型决定是 新建 一个数组还是对象
  var newObj = obj instanceof Array? []: {}
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      newObj[key] = obj[key]
    }
  }
  return newObj
}

// 深拷贝的实现
// 在拷贝的时候判断一下属性值的类型，如果是对象，递归调用深拷贝方法
var deepCopy = function(obj) {
  if(typeof obj !== 'object') return obj
  if(Object.prototype.toString.call(obj)==='[object Null]') return null
  var newObj = obj instanceof Array? []: {}
  for(var key in obj){
    newObj[key] = typeof obj[key] === 'object'? deepCopy(obj[key]): obj[key]
  }
  return newObj
}

// jq 的extend 方法实现
// 作用： 合并两个或多个对象的内容到第一个对象中
// jq.extend(target, [obj1] ... [objN])
// 进行深层次的拷贝 jq.extend([deep], target, [obj1] ... [objN])

