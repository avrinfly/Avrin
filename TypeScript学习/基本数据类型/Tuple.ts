//tuple类型允许我们表示具有固定数量的元素的数组，这些元素的类型是已知的，但不必相同。
//比如我们希望将值表示为一个string和一个number
//声明元组类型
let x: [string, number];
//初始化
x = [1, 'iven']; // error: initialize it incorrectly
x = [1];// error: initialize it incorrectly

x = ['iven', 1]; // ok
alert(x);

//访问具有已知索引的元素时，将检索正确的类型
console.log(x[0].substring(1)); //ven
console.log(x[1].substring(1)); //Error, 'number' does not have 'substring'

//访问已知索引集之外的元素会失败，并显示错误：
console.log(x[3]); // Error: Property '3' does not exist on type '[string, number]'