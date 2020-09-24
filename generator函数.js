// Generator 是es6 提供的 一种异步编程的解决方案
// 语法上，是一个状态机，封装了多个内部状态
// 执行 Generator函数会返回一个遍历器对象，除了状态机，还是一个遍历器生成对象，返回的遍历器对象，可以依次遍历 Generator内部的每一个状态

function* f() {
  yield 'hello';
  yield 'world';
  return 'end'
}

let f1 = f()
// 该函数的调用方法跟普通函数一致，但是并不执行，返回的结果也不是函数执行结果，
// 而是一个遍历器对象，也可以说是指向内部状态的指针对象 Iterator
console.log(f1.next())
console.log(f1.next())
console.log(f1.next())

function* f2() {
  console.log('hello' + (yield))
}

let f3 = f2()
console.log(f3.next())

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
}

let clock1 = clock()
clock1.next()
clock1.next()

