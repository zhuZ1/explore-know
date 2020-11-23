// 'use strict'

var a = 1
var obj = {
  a: 2,
  b: function () {
    this.a = 3
  },
  print: function () {
    console.log(this.a)
  }
}

obj.print() // 输出值 2
var print = obj.print
print() // 输出值 1  严格模式下是 this 指向undefined 会报错


// 给定数组 ['1a','2b','9c','5a'] ，输出出现次数最多的字母前数字之和 （此例最多字母为a，和为6）
let arr = ['1a', '2b', '9c', '5a', '8c', '3c']
function getMax(arr) {
  let json = {}, len = arr.length, temp_val = 1, temp_key = '', m = 0 // n记录最多的哪个字母
  for(let i = 0; i < len; i++){
    if(!json[arr[i][1]]){
      json[arr[i][1]] = 1
    } else {
      json[arr[i][1]]++
    }
  }
  // json { a: 2, b: 1, c: 1 }
  // let max = Math.max(...Object.values(json))
  // console.log(max)
  // for (let i in json){
  //   if(json[i] == max){
  //     n = i
  //   }
  // }
  // 稍微优化一下
  for(let key in json){
    // n = 1假设最大是1
    if(json[key] > temp_val){
      temp_key = key
      temp_val = json[key]
    }
  }
  console.log(temp_val, temp_key)
  arr.map(item=>{
    if(item[1]==temp_key){
      m += +item[0]
    }
  })
  return { temp_key: m }
}
console.log(getMax(arr))

let str = "I think of other ages that floated upon the stream of life and love and death"
function searchStr(str, subStr){
  let positions = []
  let pos = str.indexOf(subStr)
  while(pos > -1){
    positions.push(pos)
    pos = str.indexOf(subStr, pos + 1)
  }
  return positions
}
console.log(searchStr(str, 'and'))
