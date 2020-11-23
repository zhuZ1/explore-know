// 1. 遍历
let arr = [1, 2, NaN, 3, 1, 2, NaN]
function noRepeat(arr){
  let len = arr.length, newA = []
  for(let i = 0; i < len; i++){
    if(newA.indexOf(arr[i]) == -1){
      newA.push(arr[i])
    }
  }
  return newA
}

console.log(noRepeat(arr))

// 2. Set数据结构
function noRepeat1(arr) {
  // return [...new Set(arr)]
  // 或者
  return Array.from(new Set(arr))
}
console.log(noRepeat1(arr)) // 可以去重NaN

// 3. 利用对象属性唯一性
function noRepeat2(arr) {
  let obj = {}, temp = [], len = arr.length
  for(let i = 0; i < len; i++){
    if(!obj[arr[i]]){
      // 对象的 arr[i] 键对应的值不存在，则push 进数组
      temp.push(arr[i])
      obj[arr[i]] = 1 // 计数
    } else {
      obj[arr[i]]++  // 已经存在就计数
    }
  }
  return temp
}

console.log(noRepeat2(arr))  // 可以去重 NaN

// 4. for循环嵌套
function noRepeat3(arr) {
  for(let i = 0; i < arr.length; i++){ // arr在变化
    for(let j = i + 1; j < arr.length; j++){
      if(arr[i] == arr[j]){ // 第一个和第二个重复，删除第二个
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
console.log(noRepeat3(arr))

// 5. 利用 filter
function noRepeat4(arr) {
  return arr.filter((item, index) =>{
    return arr.indexOf(item) === index
  })
}
console.log(noRepeat4(arr))
