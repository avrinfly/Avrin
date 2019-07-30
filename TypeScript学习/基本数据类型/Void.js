//void 有些像相反的any：没有任何类型。 你可以认为将此视为无返回值的函数的返回类型 --简而言之void是针对于是函数的类型
function test() {
    console.log('this is a type of void');
}
test();
//如果声明的类型是变量，即使将其设为void也是无用的。只能分配undefined和null给它们
// let variable1: void = 1;//会报错 Error: type "1" cannot be assigned to type "void"
var variable2 = undefined;
var variable3 = null;
