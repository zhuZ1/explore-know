// RegExp  regular expression

// 元字符
// . 除了 \n以外的任意字符
// [] 范围 [a-z] 任意小写字母中的一个
// {} 具体的范围 {2} 两次 {0, } 0次-多次
// * 前面的表达式出现了 0- 多次
// + 1-多次
// ? 0-1次 还可以用来阻止贪婪模式
// | 或者
// () 分组， 提升优先级
// ^ 以xx开头 ^[a-z] 以小写字母开头  [^0-9]取非 ， 表示非数字
// $ 以xx结尾  ^[a-z][0-9]$ 严格模式
// \d 任意数字
// \D 非数字
// \s 空白符
// \S 非空白符
// \w 非特殊字符 [0-9a-zA-Z_]
// \W 特殊字符 [^0-9a-zA-Z_]
// \b 单词的边界

//定义正则表达式 两种方法
// 1.
let reg = /\d{3}/
let reg1 = new RegExp(/\d{3}/)
let str = '今天是123'
console.log(reg.test(str))
// test()方法返回布尔值
console.log(reg.test(str))
console.log(str.match(reg))

