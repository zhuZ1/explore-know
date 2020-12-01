// 新的数据结构 Set
// Set本身是一个数据结构

const s = new Set();

[1, 2, 3, 2, 1].map(item=>s.add(item))

for(let i of s){
  console.log(i)
}

// Set可以接收一个数组 或者具有 iterator接口的数据

const a = new Set([1, 2, 3, 4])
console.log(a, [...a])
console.log(Array.from(a))
// 使用add() 方法向set中加入值的时候，不会发生类型转换
// 类似于 === 运算符 但是 认为 NaN 等于 NaN
// 两个对象总是不相等的
// delete() 方法，删除某个值，返回是否删除成功的 布尔值
// has() 方法， 是否有某个值， 返回的是布尔值
// clear() 清空数组成员， 没有返回值

// Map
// 类似于对象，也是键值对的集合，但键的类型不限于字符串
const m = new Map()
const o = {p: 'hello'}
m.set(o, 'content')
console.log(m, m.get(o))
// 使用set 方法添加任意属性, 使用get 方法获取属性


// set 求值
let a1 = new Set([1, 2, 3]), b1 = new Set([2, 3, 4])
// 并集
let union = new Set([...a1, ...b1])
// 交集
let intersect = new Set([...a1].filter(item=>b1.has(item)))
// 差集
let difference = new Set([...a1].filter(item=>!b1.has(item)))

console.log(union, intersect, difference)
