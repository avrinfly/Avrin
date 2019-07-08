JS隐式转换存在的原因：
js是个弱类型语言

### 一元 + 运算符

- 一元+运算符将其操作转换为Number类型。
- 产生式UnaryExpression: + UnaryExpression按照下面过程执行：
    1. 令expr为解释执行 UnaryExpression 的结果。
    2. 返回ToNumber(GetValue(expr))。  
 

(本质上对数字无任何影响)

```
var Num = 20;
Num = +Num;  
console.log(typeof Num);//number
```
但是对字符串却有有趣的效果，会把字符串转换为数字。
```
var Num = "20";
console.log(typeof Num);//string
Num = +Num;
console.log(typeof Num);//number
```
一元运算符对字符串进行操作时，它计算字符串的方式与parseInt()相似，主要的不同是只有对以“0x”开头的字符串（表示十六进制数字），一元运算符才能将其转换成十进制的值。例：用一元加法转换“010”，得到的总是10，而“0xB”将被转换成11。


### 一元 - 运算符
- 一元-运算符将其操作转换为Number类型并**反转其正负**。
- 产生式 UnaryExpression：- UnaryExpression 按照下面的过程执行：
    1. 令expr为解释执行UnaryExpression的结果.
    2. 令oldValue为ToNumber(GetValue(expr)).
    3. 如果oldValue is NaN , return NaN.
    4. 返回OldValue取负（即，算出一个数字相同但是符号相反的值）的结果。

和一元 + 运算符类似（本质上对数字无影响）
```
var Num = 20;
Num = -Num;  
console.log(typeof Num);//number
```
同样对字符串有相似的效果
```
var Num = "20";
console.log(typeof Num);//string
Num = -Num;
console.log(typeof Num);//number
```

### 加号运算符（+）

-  加法运算符可以执行字符串连接，也可以用作数字加法
- 产生式 AdditiveExpression ：AdditiveExpression + MultiplicativeExpression 按照下面的过程执行：

    1. 令lref为解释执行AdditiveExpression的结果.
    2. 令lval（左值）为GetValue（lref）.
    3. 令rref为解释执行MultiplicativeExpression的结果.
    4. 令rval为GetValue（rref）.
    5. 令lprim为ToPrimitive（lval）.
    6. 令rprim为ToPrimitive（lval）.
    7. 如果Type(lprim)为String或者Type(rprim)为String，则：返回由ToString(lprim)和ToString(rprim)连接而成的字符串.
    8. 返回将加法运算作用于ToNumber(lprim)和ToNumber(rprim)的结果.  
    
    ==注：在步骤5和6中的ToPrimitive调用没有提供hint，除了Date对象之外所有ECMAScript对象将缺少hint的情况当做Number处理；Date对象将缺少hint的情况当做hint为字符串。宿主对象可能将缺少hint的情况当做别的处理。==
    
    ==注：步骤7与关系运算符比较算法中的步骤3不同，它使用逻辑 **或** 运算符而不是逻辑 **与** 运算符==

是不是读不懂上面的过程，没关系。但是看第七条，**这就是为什么1+"1" = "11"的原因。** 浏览器的运行机制与规则就是这样的。没有什么为什么

**在处理特殊值时，ECMAScript中的加法也有一些特殊行为：**
- 某个运算数是NaN，那么结果为NaN。
- -Infinity加 -Infinity，结果为-Infinity。
- Infinity加 -Infinity，结果为NaN。
- +0 加 +0，结果为+0。
- -0 加 +0，结果为+0。
- -0 加 -0，结果为-0。

不过，如果某个运算数是字符串，那么采用下列规则：
- 如果两个运算数都是字符串，把第二个字符串连接到第一个上。
- 如果只有一个运算数是字符串，把另一个运算数转换成字符串，结果是两个字符串连接成的字符串。

例如：
```
var result = 5 + 5;//两个数字
console.log(result) //输出10
var result1 = 5 + "5";//一个数字和一个字符串 
console.log(result) //输出 '55'
```
以上说明了加法运算符的两种模式之间的差别。第一个好理解，第二个输出55的原因是，另一个非字符串的运算数也会被转换成字符串。

==注意：为了避免JavaScript出现这种常见错误，在使用加法运算符时，应仔细检查运算数的数据类型==