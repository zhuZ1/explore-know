function greet(person) {
    return 'hello' + person
}

let user = 'Jane'

console.log(greet(user))

let list: Array<number> = [1, 2, 3]

let name1: string = 'Bob'

let sentence: string = `hello, ${name1}`
console.log(sentence)

// 元组
let x: [string, number] = ['hello', 10]
// 可选属性
interface SquareConfig  { // 为了规范，像class一样大写
    color?: string,  // 可选
    width?: number
    // [propName: string]: any
    // readonly y: number 只读属性
}

function createSquare(config: SquareConfig): {color: string, area: number} {  // : 后面是返回值的类型
    let newSquare = {color: 'green', area: 100}
    if(config.color){
        newSquare.color = config.color
    }
    if(config.width){
        newSquare.area = config.width * config.width
    }
    return newSquare
}

let mySquare = createSquare({color: 'black', width: 20})
console.log(mySquare)

// 可索引的类型
interface IndexArray {
    [index: number]: string
}

let myArr: IndexArray = ['Bob', 'Jane']
let arrItem: string = myArr[0]
console.log(arrItem)

// 类 类型
interface ClockInterface {
    currentTime: Date
    setTime(d: Date)  // 在接口中描述一个方法
}
// implements 可以实现多个接口
class Clock implements ClockInterface {
    currentTime: Date
    setTime(d: Date) {
        this.currentTime = d  // 在类里实现 setTime方法
    }
    constructor(h: number, m: number){

    }
}

// 箭头函数
let myAdd: (x: number, y: number) => number =
    function (x: number, y: number): number {
        return x + y
    }

let myAdd1 = function(x: number, y: number): number{
    return x + y
}


// 泛型
function identity<T>(arg: T): T {
    return arg
}
let output = identity('my')
console.log(output)
