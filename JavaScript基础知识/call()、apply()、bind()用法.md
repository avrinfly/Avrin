从一系列例子开始：
这里为了方便理解，使用var(不推荐哦)
因为var定义的全局变量挂载在window对象上
```
var name = '小王',age = 17;
var obj = {
    name: '小张',
    objAge: this.age,
    test:function(){
        console.log(this.name + "年龄" + this.age);
    }
}
obj.objAge; // 17
obj.test(); // 小张年龄 undefined
```
**引申一个知识点：let定义的全局变量挂载在哪里呢？**

```
var fav = '测试';
function show(){
    console.log(this.fav);
}
show() // 测试
```
比较一下以上两个例子中this的差别，第一个的this指向obj,第二个全局声明的show函数的this指向window

##### 1. call()、apple()、bind()都是用来重定义this对象的！
例如：
```
var name = '小王',age=17;
var obj = {
    name:'小张',
    objAge:this.age,
    test:function(){
        console.log(this.name + "年龄" + this.age);
    }
}
var db = {
    name:'小李',
    age:88
}
obj.test.call(db); //小李年龄88
obj.test.apply(db); //小李年龄88
obj.test.bind(db)(); //小李年龄88
```
以上除了bind方法后多个了()外，结果返回结果都一致
由此得出结论：
**bind返回的是一个新的函数，必须要调用它才会被执行。**

##### 2. 对比call、bind、apply传参情况下
```
var name = '小王',age=17;
var obj = {
    name:'小张',
    objAge:this.age,
    test:function(fm,t){
        console.log(this.name + "年龄" + this.age, "来自" + fm + "去往" + t);
    }
}
var db = {
    name:'小李',
    age:88
}
obj.test.call(db,'成都','上海'); // 小李 年龄88 来自成都 去往上海
obj.test.apply(db,['成都','上海']); // 小李 年龄88 来自成都 去往上海
obj.test.bind(db,'成都','上海')(); // 小李 年龄88 来自成都 去往上海
obj.test.bind(db,['成都','上海')](); // 小李 年龄88 来自成都，上海 去往undefined
```
微妙的差距

从上面的四个结果可以看出：

三者的共同点：
1. call、bind、apply的第一个参数都是this的指向对象
2. 三者参数不限定是string类型，允许是各种类型，包括函数、object等

三者的不同点：
1. call的参数是直接放进去，从第二第三第n个参数全用逗号分隔，直接放在第一个参数后面
2. apply的所有参数都必须放在一个数组中传进去
3. bind除了返回的是函数外，参数传递方法和call一样

引申问题的答案：**属于全局作用域的script对象的**
![image](2D792991732A426796F280EF8D9AD047)
如果所示，var声明的全局变量挂载在Global(即window对象上)。let声明的全局变量挂载在script对象上(const同理)
至于b为什么是undefined，因为debugger的点在var声明之前