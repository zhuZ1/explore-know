const fs = require('fs')

// fs.rename('he.py', '../he.py', err=>{ //异步重命名文件
//   if (err) throw err
//   console.log('重命名成功')
// })
//
// fs.unlink('../he.py', err=>{  // 异步地删除文件或符号链接， 对空或非空的目录都不起作用
//   if(err) throw err
//   console.log('删除成功')
// })

// fs.rmdir('../testDir', err=>{
//   if(err) throw err
//   console.log('删除文件夹成功')
// })


fs.readFile('../es6-test.js', (err, data)=>{
  if(err)throw err
  console.log(data)
})
