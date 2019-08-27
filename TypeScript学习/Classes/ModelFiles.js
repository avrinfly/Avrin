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
/*
 * @Description: 类的访问修饰符
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-24 17:32:34
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-27 22:08:38
 */
//类的修饰符有公有、私有和受保护的修饰符 --- public private pprotected
// 默认是public
// 当内部元素（变量或函数）被标记时private，无法从其包含的类外部访问它
// 所以private也被称为私有变量
var People = /** @class */ (function () {
    function People(name, age) {
        this.name = name;
        this.age = age;
    }
    People.prototype.outlet = function () {
        return this.name + ':' + this.age;
    };
    return People;
}());
var Teacher = /** @class */ (function (_super) {
    __extends(Teacher, _super);
    function Teacher(school) {
        var _this = _super.call(this, 'dany', 10) || this;
        _this.school = school;
        return _this;
    }
    Teacher.prototype.outlet = function () {
        return this.name + ':' + this.age + '所在学校：' + this.school;
    };
    return Teacher;
}(People));
// let t = new Teacher();
// t.name = 'liming'; //如果改为private，则会报错，也就是name会变为People的私有属性，而无法被子类Teacher使用
// t.age = 18;
// t.school = 'xxx小学';
// alert(t.outlet());
// 如果不想像以上去进行赋值操作就需要构造方法了
var t = new Teacher('huaxingxiaoxue');
alert(t.outlet());
// protected --- 受保护的变量
// 看一个例子：
var Person = /** @class */ (function () {
    function Person(theName) {
        this.name = theName;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee;
}(Person));
var iven = new Employee("iven", "shanghai");
console.log(iven.getElevatorPitch()); // Hello, my name is iven and I work in shanghai.
// console.log(iven.name); // error 编译都不通过
// 从以上我们可以看出我们虽然不能在Person外使用name，但我们可以在实例方法中使用它，因为Employee是派生自Person
// 同样的，我们也可以用protected标记构造函数，这也就是说这个类不能在其包含的类之外进行实例化，但是可以进行扩展。
// 看一个例子：
var Human = /** @class */ (function () {
    function Human(name) {
        this.name = name;
    }
    return Human;
}());
// Citing can extend Human
var Citing = /** @class */ (function (_super) {
    __extends(Citing, _super);
    function Citing(name, place) {
        var _this = _super.call(this, name) || this;
        _this.place = place;
        return _this;
    }
    Citing.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.place + ".";
    };
    return Citing;
}(Human));
var ime = new Citing('ime', 'China');
console.log(ime.getElevatorPitch());
