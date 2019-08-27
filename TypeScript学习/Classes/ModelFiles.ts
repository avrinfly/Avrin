/*
 * @Description: 类的访问修饰符
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-24 17:32:34
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-27 22:15:21
 */
//类的修饰符有公有、私有和受保护的修饰符 --- public private pprotected
// 默认是public
// 当内部元素（变量或函数）被标记时private，无法从其包含的类外部访问它
// 所以private也被称为私有变量
class People {
    public name: string;
    // private name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    outlet() {
        return this.name + ':' + this.age;
    }
}

class Teacher extends People {
    school: string;
    constructor(school: string) {
        super('dany',10);
        this.school = school;
    }
    outlet() {
        return this.name + ':' + this.age + '所在学校：' + this.school;
    }
}

// let t = new Teacher();
// t.name = 'liming'; //如果改为private，则会报错，也就是name会变为People的私有属性，而无法被子类Teacher使用
// t.age = 18;
// t.school = 'xxx小学';
// alert(t.outlet());
// 如果不想像以上去进行赋值操作就需要构造方法了

let t = new Teacher('huaxingxiaoxue');
alert(t.outlet());


// protected --- 受保护的变量
// 看一个例子：
class Person {
    protected name: string;
    constructor(theName: string) {
        this.name = theName;
    }
}

class Employee extends Person {
    private department: string;
    constructor(name: string , department:string) {
        super(name);
        this.department = department;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`
    }
}
let iven = new Employee("iven", "shanghai");
console.log(iven.getElevatorPitch());// Hello, my name is iven and I work in shanghai.
// console.log(iven.name); // error 编译都不通过
// 从以上我们可以看出我们虽然不能在Person外使用name，但我们可以在实例方法中使用它，因为Employee是派生自Person
// 同样的，我们也可以用protected标记构造函数，这也就是说这个类不能在其包含的类之外进行实例化，但是可以进行扩展。
// 看一个例子：
class Human {
    protected name: string;
    protected constructor(name: string) {
        this.name = name;
    }
}
// Citing can extend Human
class Citing extends Human{
    private place: string;
    constructor(name: string, place: string) {
        super(name);
        this.place = place;
    }
    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.place}.`;
    }
}
let ime = new Citing('ime', 'China');
console.log(ime.getElevatorPitch()); // Hello, my name is ime and I work in China.
let allen = new Human('John'); // error 类Human的构造函数是受保护的，仅能在类的生命中访问