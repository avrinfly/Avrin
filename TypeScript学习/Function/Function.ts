/*
 * @Description: Function类型
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-18 17:50:26
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-18 18:29:16
 */
//JavaScript中函数的两种样子：
//命名函数
// function add(x, y) {
//     return x + y;
// }
//匿名函数
// let myAdd = function (x, y) {
//     return x + y;
// }

//在ts中可以给函数的参数添加类型,也可以给当前函数指定类型
//TypeScript可以通过查看return语句来确定返回类型，因此我们也可以选择在许多情况下将其关闭。
//命名函数
function add(x: number, y: number):string {
    return 'hello ts';
}
alert(add(1, 2));
//匿名函数
let myAdd = function (x: number, y: number):string {
    return 'hello ts';
}
//具有类型的好处就是可以规避到很多的错误

//如果我们想知道参数的意义的话，可以这么写
let myAddTs: (name: string, age: number) => number= function(n: string, a: number): number{
    return a;
}
//这样我们就知道了函数参数中n代表的是name，a代表的是age，对于代码的可读性也是一种提高
//要注意的是=>后面的number是声明当前函数的返回值类型，且要和后面最后的number保持一致