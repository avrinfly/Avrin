//type-assertions类型检查（断言）

//有的时候我们对于某个值的了解会比TS多一些，这通常是因为你知道一个实体具有比它现有类型更确切的类型。
//类型断言是一种告诉编译器“相信我，我知道我在做什么”的方法。
//类型断言类似于其他语言中的类型转换，但不执行数据的特殊检查或重新构造。
//它没有运行时的影响，只在编译阶段起作用，TypeScript 会假设你已经进行了必须的检查
//断言类型有两种形式：

//一种是「尖括号」语法
let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
alert(someValue);
alert(strLength);

//另一种是[as]语法
let moreValue: any = 'this is another string';
let strsLength: number = (moreValue as string).length;
alert(moreValue);
alert(strsLength);