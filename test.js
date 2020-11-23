function greet(person) {
    return 'hello' + person;
}
var user = 'Jane';
console.log(greet(user));
var list = [1, 2, 3];
var name1 = 'Bob';
var sentence = "hello, " + name1;
console.log(sentence);
// 元组
var x = ['hello', 10];
function createSquare(config) {
    var newSquare = { color: 'green', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: 'black', width: 20 });
console.log(mySquare);
var myArr = ['Bob', 'Jane'];
var arrItem = myArr[0];
console.log(arrItem);
// implements 可以实现多个接口
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d; // 在类里实现 setTime方法
    };
    return Clock;
}());
// 箭头函数
var myAdd = function (x, y) {
    return x + y;
};
var myAdd1 = function (x, y) {
    return x + y;
};
// 泛型
function identity(arg) {
    return arg;
}
var output = identity('my');
console.log(output);
