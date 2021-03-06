/*
 * @Description: 类
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-21 00:30:33
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-26 16:38:54
 */
//在JavaScript中我们使用函数和基于原型的继承来构建可重用的组件，对于我们来说，使用面向对象的方法更加舒服。
//从ECMAScript 2015(ES6)开始，我们可以使用面向对象的基于类的方法构建我们的应用程序。
//在TypeScript中，我们也可以使用这些，并把它们编译为适用于所有主流浏览器和平台的JavaScript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Classes创建
//一个类中包含两部分：属性和方法
//我们声明一个新的类Greeter 有一个greeting属性，一个构造函数，和一个greet方法
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
alert(greeter.greet()); //hello world
//看另外一个例子：
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.alertPerson = function () {
        console.log(this); //Person{name:iven,age:18}
        return this.name + ':' + this.age;
    };
    return Person;
}());
var p = new Person('iven', 18);
alert(p.alertPerson()); //iven:18
//类的继承
//在TypeScript中，我们可以使用常见的面向对象模式。基于类的编程中最基本的模式之一是能够扩展现有类以使用继承创建新类。
//看下面的例子：
//这是一个最基本的一个类，只包括属性和方法
var Human = /** @class */ (function () {
    function Human(name, age) {
        this.name = name;
        this.age = age;
    }
    Human.prototype.tell = function () {
        return this.name + ':' + this.age;
    };
    return Human;
}());
//我们再创建一个类student，通过extends关键字来继承
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(school) {
        var _this = 
        //通过super来继承父类中的属性
        _super.call(this, 'ime', 100) || this;
        _this.school = school;
        return _this;
    }
    Student.prototype.tell = function () {
        return this.name + ':' + this.age + '所在学校-' + this.school;
    };
    return Student;
}(Human));
var s = new Student('自学成才');
// s.name = 'linda';
// s.age = 25;
// s.school = 'xxx大学'
alert(s.tell());
//上面是通过赋值的方式进行传递继承的
//我们也可以通过构造函数的方式来代替赋值操作
//派生类通常称为子类，基类通常称为超类
//看一个更复杂的例子：
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log('爬行ing...');
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log('奔跑ing...');
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake('巨蛇');
var tom = new Horse('骏马');
sam.move();
tom.move(34);
//结果为：
// 爬行ing...
// 巨蛇 moved 5m.
// 奔跑ing...
// 骏马 moved 34m.
//我们看到使用extends创建了Animal类的两个子类：Snake和Horse
//与之前的实例的区别是：每个包含构造函数的子类必须调用super()来执行父类的构造函数。这是TypeScript强制执行的重要规则。
//该示例还说明了如何在子类中使用父类的方法，这里两个子类Snake和Horse都创建了一个move方法，并重写了父类Animal中的move方法,具体结合每个类的功能重写
//应注意的是：tom声明为Animal的原因是：它的值是使用Horse的，调用tom.move(34)时会调用Horse中的重写方法

