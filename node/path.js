const path = require('node/path')

let pathBase = path.basename('/目录1/目录2/上100px,下铺满.html', '.html')
// path.basename 返回path的最后一部分  path.basename(path, [,ext] (可选的文件扩展名)
console.log('路径', pathBase) // 'index'

let pathDir = path.dirname('/目录1/目录2/上100px,下铺满.html')
// path.dirname 返回path的目录名
console.log('dir路径', pathDir) // '/目录1/目录2'

let pathJoin = path.join('/目录1', '/目录2')
console.log('join路径', pathJoin)  // '\目录1\目录2'

let pathParse = path.parse('/目录1/目录2/文件.txt')
// 返回一个对象， 表示path的有效元素
console.log('parse路径', pathParse)

let pathResolve = path.resolve('目录1', '目录2/目录3/', '../目录3/文件.gif')
// 将路径或路径片段的序列解析为绝对路径
// 从右到左进行处理， 依次追加，直到构造出绝对路径
// 本例中 因为路径处理完了仍未组成绝对路径， 所以最终使用的是当前工作目录 C:\Users\86155\Desktop\explore-know\目录1\目录2\目录3\文件.gif
console.log('resolve路径', pathResolve)

