/*
 * @Description: Function类型
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-18 17:50:26
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-18 18:27:06
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
function add(x, y) {
    return 'hello ts';
}
alert(add(1, 2));
//匿名函数
var myAdd = function (x, y) {
    return 'hello ts';
};
//具有类型的好处就是可以规避到很多的错误
//如果我们想知道参数的意义的话，可以这么写
var myAddTs = function (n, a) {
    return a;
};
//要注意的是=>后面的number是声明当前函数的返回值类型，且要和后面最后的number保持一致
