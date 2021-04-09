/*语法
  JSON.stringify(value[, replacer[, space]])
该方法将一个js对象或值转换为 JSON字符串，如果指定了一个 replacer函数，
则可以选择性的替换值，或者指定的 replacer是数组，则可以选择性的仅包含数组指定的属性
 */
function jsonStringify(obj) {
  let type = typeof obj
  if(type !== 'object' || type === null){
    if(/string|undefined|function/.test(type)){
      obj = '"' + obj + '"'
    }
    return String(obj)
  } else {
    let json = [],
      arr = (obj && obj.constructor === Array)
    for(let key in obj){
      let val = obj[key]
      let type = typeof val
      if(/string|undefined|function/.test(type)){
        val = '"' + val + '"'
      } else if(type === 'object'){
        val = jsonStringify(val)
      }
      json.push((arr?"" : '"' + key + '":') + String(val))
    }
    return (arr? "[" : "{") + String(json) + (arr? "]" : "}")

  }
}

console.log(typeof jsonStringify({x: 5}))
console.log(jsonStringify([1, 'false', true]))
