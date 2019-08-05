//Never类型表示那些永不存在的值的类型。 never类型是那些总会抛出异常或者根本不会有返回值的函数表达式或箭头函数表达式的返回值类型；
//变量也可以是never类型，当它们被永不为真的类型保护所约束时。
//never类型是其他任何类型的子类型，也可以赋值给任何类型；
//但没有类型是never的子类型或可以赋值给never类型（除了never本身）
//即使any类型可不能赋值给never。
//下面是一些返回never的例子：
//返回为never类型的函数必须存在无法达到的终点，即无限循环或死循环
function error(message) {
    throw new Error(message);
}
//推断返回的值是否为never
function fail() {
    return error("Something failed");
}
//返回为never类型的函数必须存在无法达到的终点，即无限循环或死循环
function infiniteLoop() {
    while (true) {
        // to do
    }
}
