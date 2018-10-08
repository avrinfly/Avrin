## Event Loop
#### 

看一下的例子

```
console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});

console.log('script end');
```
最后输出的结果是什么呢？
> script start

> script end

> promise1

> promise2

> setTimeout

<p><iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/transition/t18.html" frameborder="0" width="320" height="240"></iframe></p>
