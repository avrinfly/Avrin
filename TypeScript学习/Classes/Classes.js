/*
 * @Description: 类
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-21 00:30:33
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-21 01:35:54
 */
//在JavaScript中我们使用函数和基于原型的继承来构建可重用的组件，对于我们来说，使用面向对象的方法更加舒服。
//从ECMAScript 2015(ES6)开始，我们可以使用面向对象的基于类的方法构建我们的应用程序。
//在TypeScript中，我们也可以使用这些，并把它们编译为适用于所有主流浏览器和平台的JavaScript
//Classes创建
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello," + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world');
alert(greeter.greet());
