
var values = [1, 2, 3, 4]

values.sort(function () {
  return Math.random() - 0.5
})

console.log(values)
// 乱序的并不彻底

function shuffle(a) {
  var j, x, i
  for(i=a.length;i;i--){
    j = Math.floor(Math.random() * i)
    x = a[i-1]
    a[i-1] = a[j]
    a[j] = x
  }
  return a
}
// 遍历数组元素，然后将当前元素与以后随机位置的元素进行交换

// es6的写法
function shuffleEs6(a) {
  for(let i = a.length; i; i--){
    let j = Math.floor(Math.random() * i)
    [a[i-1], a[j]] = [a[j], a[i-1]]
  }
}

