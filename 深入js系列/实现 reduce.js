Array.prototype.myReduce = function (fn, initVal) {
  if(initVal === undefined && !this.length){
    throw new Error('Error')
  }
  let result = initVal ? initVal: this[0]
  for(let i = initVal ? 0: 1; i < this.length; i++){
    result = fn(result, this[i], i, this)
  }
  return result
}

let arr = [1, 2, 3, 4]
console.log(arr.myReduce((prev, cur) => prev + cur, 2))
