看几个很有趣的逻辑题
```
{
    var result = 'inner';
    function yideng(a){
        yideng = a;
    }
    yideng(1);
    console.log(typeof yideng);
}
console.log(typeof yideng);
console.log(result);
```
**结果是：** number function inner

**解析：** 在函数一yideng内，将函数yideng的参数赋值给yideng函数，因为yideng(1),所以在yideng的类型为number，第二个yideng为何为function，因为**有最外层的块级作用域，函数会变量提升至块级作用域之外，至于为什么不是number，(js是函数作用域最早 所以在后肯定每次重写var 。。。)
因为有块级作用域啊
只能在块内被重写
外部不行
正常的块 你是访问不到yideng的
但是js有函数提升。。。**

看如下没有块的
```
var result = 'inner';
function yideng(a){
    yideng = a;
}
yideng(1);
console.log(typeof yideng);
console.log(typeof yideng);
console.log(result);
```
**结果是：** number number inner

**解析：** 这个就很好理解了

为了更好地理解，对第一个逻辑题进行一些改进(其实就是加了一些打印)
```
console.log(typeof yideng)
{
    var result = 'inner';
    console.log(typeof yideng)
    function yideng(a){
        yideng = a;
    }
    yideng(1);
    console.log(typeof yideng);
}
console.log(typeof yideng);
console.log(result);
```
**结果是:** function function number function inner

从以上的结果就可以很好理解之前的话了，js函数作用域在最前面，在后肯定每次重写var。只能在块内重写，故其他地方的yideng都是function

#### 暂时性死区(tdz)
```
{
    var result = ()=>{}
}
console.log(result)
```
结果：()=>{} 即箭头函数本身
```
{
    let result = ()=>{}
}
console.log(resuklt)
```
结果：result is not defined

以上就可以看出let之于var的优势

---

#### 结论：
**1. es6的块级作用域最有效的事tdz(暂时性死区)**

**2. 尽量避免使用var，应尽量使用let或const**

**3. 提倡使用箭头函数**

**4. 提倡使用函数表达式**