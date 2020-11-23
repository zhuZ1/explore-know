// 常用typeof
// 六种es5 数据类型：Undefined Null Number String Boolean Object
// typeof 分别检测的结果为 undefined object number string boolean object  均为小写字符串
// Null Object 的检测结果并不准确 Function -> function  能检测出， 但具体的如数组， Date() 无法检测

// Object.prototype.toString()
// 该方法 会返回一个 [ object class] 组成的字符串， class是要判断的对象的内部属性

// type 函数
var class2type = {}
'Boolean Number String Null Undefined Array Object Function Date Error RegExp'.split(' ').map(function (item, index) {
  class2type['[object ' + item + ']'] = item.toLowerCase()
})

function type() {
  if(obj == null){
    return obj + ''
  }
  return typeof obj === 'object' || typeof obj === 'function'?
    class2type[Object.prototype.toString.call(obj)] || 'Object' : typeof obj
}


// 检测一个对象是不是数组
let arr = [1, 2, 3]
console.log(Array.isArray(arr))
console.log(Object.prototype.toString.call(arr)=='[object Array]')
console.log(arr instanceof Array)
console.log(arr.constructor == Array)
// 利用原型对象上的 prototype.constructor 指向实例的构造函数
// 如果被改写了就会导致出错
