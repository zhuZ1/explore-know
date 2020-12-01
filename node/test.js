const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zhu_abc',
  database: 'myemployees'
})

connection.connect((err)=>{
  if(err){
    console.log('与数据库连接失败')
  } else {
    console.log('连接成功')
  }
})
connection.query('select * from jobs', function (error, results) {
  if(error) throw error
  console.log('结果', results)
})

let addSql = 'INSERT INTO jobs(job_id,job_title,min_salary,max_salary) VALUES(2,?,?,?)'
let sqlParams = ['teacher1', 2000, 5000]
connection.query(addSql, sqlParams, (err, result) =>{
  if(err){
    console.log('INSERT ERROR' - err.message)
    return
  } else {
    console.log('成功', result)
  }

})
connection.end()
