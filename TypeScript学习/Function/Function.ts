/*
 * @Description: Function类型
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-18 17:50:26
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-20 02:39:19
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
// let myAddTs: (name: string, age: number) => number= function(n: string, a: number): number{
//     return a;
// }
//这样我们就知道了函数参数中n代表的是name，a代表的是age，对于代码的可读性也是一种提高
//要注意的是=>后面的number是声明当前函数的返回值类型，且要和后面最后的number保持一致

//推断类型 myAddTs也可以写成以下：
let myAddTs: (name: string, age: number) => number = function (n,a) {
    return a;
}
//即使您只在等式的一侧有类型，TypeScript编译器也可以计算出类型：这称为“上下文类型”，一种类型推断形式。这有助于减少保持程序输入的工作量



//可选参数和默认参数
//在TypeScript中，假定函数需要每个参数。这并不意味着它不能给出，null或者undefined更确切地说，当调用函数时，编译器将检查用户是否为每个参数提供了值。编译器还假定这些参数是将传递给函数的唯一参数。简而言之，赋予函数的参数数量必须与函数期望的参数数量相匹配。
function buildName(firstName: string, lastName: string) {
    return firstName + ' ' + lastName;
}

let result1 = buildName('linda'); //error too few parameters(函数指定了两个参数，调用时只写了一个)
let result2 = buildName('iven', 'ime', 'linda'); // error too more parameters(指定是两个，但是写了三个)
let result3 = buildName('iven', 'ime'); //just right

//但是如果我们想像JavaScript那样，每个参数都可选，我可以选择传入或不传入该怎么办呢？
//很简单，在想要选择的参数末尾添加一个"?"来实现
//假如buildName函数中的lastName是可选的：
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + '' + lastName;
    }
    else {
        return firstName;
    }
}

let result1 = buildName('linda'); //works correctly now。beautiful
let result2 = buildName('iven', 'ime', 'linda'); //error too many parameters
let result3 = buildName('iven', 'ime'); // just right
//任何可选参数必须遵循必需的参数。如果我们想让fristName是可选的而不是lastName，我们需要改变函数中参数的顺序，将firstName的最后一个放在列表中。

//在JavaScript中，有个很让人头痛的事情是如果某个参数没有传值的话我们需要这么写
function test(x) {
    x = x || 'hello';
};

//在ts中，我们可以设置一个值，如果用户没有提供参数，或者用户传入的值为undefined，就分配参数。
//这些被称为默认初始化参数，看下面的例子：
function buildName(firstName: string, lastName = 'ime') {
    return firstName + '' + lastName;
}
let result1 = buildName('iven'); // return "iven ime";
let result2 = buildName('iven', undefined); //return "iven ime"
let result3 = buildName('iven', 'ime', 'linda');//error too more parameters
let result4 = buildName('iven', 'linda');//just right return "iven linda"

//在所有必须参数之后的默认初始化参数也可被视为可选参数。就像可选参数一样，在调用他们各自函数的时候可以省略。
//这意味着可选参数和尾随默认参数在其类型中共享共性，比如下面的两个函数
function buildName(firstName: string, lastName?: string) {
    // to do
}
function buildName(firstName: string, lastName = 'linda') {
    //to do
}
//分享相同的类型(firstName: string, lastName?: string) => string。默认值lastName在类型中消失，只留下参数是可选的这一事实。

//要注意的是：如果默认初始化参数在必填参数之前，那么我们需要显示传递undefined来获取默认初始化值，例如下面的例子：
function buildName(firstName = 'linda', lastName: string) {
    return firstName + '' + lastName;
}
let result1 = buildName('iven');//error 原因是：iven相当于只修改了firstName的值，而lastName是必填参数
//如果我们想保留默认参数，又不报错，可以通过下面的写法实现：
let result2 = buildName(undefined, 'ime');//ok return "linda ime";
//当然了，传两个参数是肯定没问题的
let result3 = buildName('iven', 'ime'); //just right return "iven ime"

//可变参数（Rest Parameters）
// 必须、可选和默认参数都有一个共同点：它们一次只讨论或修改一个参数。
//如果我们希望将多个参数作为一个数组来使用，或者如果我们不知道函数有多少个参数，
//在JavaScript中，可以使用argument在每个函数体内可见的变量直接使用参数
//那么在TypeScript中，我们可以将这些参数收集在一个变量(restOfname)里：
function buildName(firstName: string, ...restOfname: string[]) {
    //这就是可变参数的写法，...变量名:类型[]
    //需要注意的是restOfname里的值都是string类型的
    return firstName + '' + restOfname.join(' ');
}
let employeeName = buildName('iven', 'ime', 'linda', 'lucas');// ok return "iven ime linda lucas";
//可变参数也被称为无限数量的可选参数。通过restOfname传递参数时，你可以传递多个

//lambads和this关键字
//看一个例子：
let people = {
    name: ['iven', 'ime', 'lucas', 'linda'],
    getName: function () {
        return function () {
            let i = Math.floor(Math.random() * 4);
            return {
                n: this.name[i]
            }
        }
    }
}
let myName = people.getName();
alert('名字:' + myName().n);

//以上代码有问题能看出来吗？
//this关键字指向的是getName函数，而gatName函数中没有name数字，所以最后输入的是undefined

//如何去修改呢？
//其实很简单，将return的函数改为箭头函数即可，因为箭头函数的this指向它的父级
//严格来说：箭头函数捕获this创建函数的位置而不是调用它的位置
let people = {
    name: ['iven', 'ime', 'lucas', 'linda'],
    getName: function () {
        return ()=> {
            let i = Math.floor(Math.random() * 4);
            return {
                n: this.name[i]
            }
        }
    }
}
let myName = people.getName();
alert('名字:' + myName().n);



//函数的重载
function getAttr(name: string): string;
function getAttr(age: number): number;
function getAttr(nameOrAge: any): any{
    if (nameOrAge && typeof nameOrAge === 'string') {
        alert('姓名');
    }
    else {
        alert('年龄');
    }
}
getAttr('hello ts'); //姓名
getAttr(10); // 年龄
