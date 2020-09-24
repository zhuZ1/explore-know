// rgb 转换为 16进制
String.prototype.colorHex = function () {
  let reg = /^(rgb|RGB)/  // rgb 颜色正则
  let color = this
  if(reg.test(color)){
    let strHex = '#'
    // 将rgb的三个数值转换为数组
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(',')
    for(let i = 0; i < colorArr.length; i++){
      let hex = Number(colorArr[i]).toString(16)
      if(hex==='0'){
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return String(color)
  }
}

console.log("rgb(255,255,255)".colorHex())  // #ffffff

// 16进制 转rgb
String.prototype.colorRgb = function () {
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  let color = this.toLowerCase()
  if(reg.test(color)){
    if(color.length == 4){
      let newColor = '#'
      for(let i = 1; i < 4; i+=1){
        newColor += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = newColor
    }
    // 如果是6位
    let colorChange = []
    for(let i = 1; i < 7; i+=2){
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return 'RGB(' + colorChange.join(',') + ')'
  } else {
    return color
  }
}

console.log('#CF1F06'.colorRgb(), '#ffffff'.colorRgb())
