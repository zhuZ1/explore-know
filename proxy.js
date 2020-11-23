// 可以理解为在目标对象之前架设一层拦截
// 外界访问该对象，都必须先通过这层拦截。所以可以对外界的访问进行过滤和改写

let obj = new Proxy({}, {
  get(target, p, receiver) {
    console.log(`get ${p}`)
  },
  set(target, p, value, receiver) {
    console.log(`set ${p}`)
  }
})

obj.count = 1
obj.count

const person = {
  name: '张三',
  _path: '小白'
}


const proxy = new Proxy(person, {
  get(target, p, receiver) {
    if(p in target){
      return target[p]
    } else {
      throw new Error(`Prop name ${p} not exist` )
    }
  },
  has(target, p) {
    if(p[0]=='_'){
      return false
    }
    return p in target
  }
})

console.log(proxy.name)
console.log(proxy.age)
console.log('_path' in proxy)
