// instanceof 是用于检测构造函数的 prototype属性是否出现在某个实例对象的原型链上
function myInstanceOf(target, origin) {
  if(typeof target !== 'object' || target === null) return false
  let proto = Object.getPrototypeOf(target) // 返回指定对象的原型
  while(proto){
    if(proto === origin.prototype){
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
