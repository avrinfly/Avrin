# 初识 web worker

**1.出现的原因：**

*JavaScript单线程带来的不利因素*

首先要明白：JavaScript单线程的原因 --> **操作DOM**时，只能是单线程(否则如果能够同时操作多个DOM，那么JavaScript怎么知道该先操作那个呢?)。

但是在现代前端发展过程中，单线程操作已有些跟不上时代的潮流了  
MAN Web docs中对于web worker的定义是：
Web Worker为Web内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。
此外，他们可以使用XMLHttpRequest执行 I/O  (尽管responseXML和channel属性总是为空)。
一旦创建， 一个worker 可以将消息发送到创建它的JavaScript代码, 通过将消息发布到该代码指定的事件处理程序（反之亦然）。

web worker产生的原因就是：***我们希望JavaScript在一段时间内能做更多的事情。***

一个 worker 是使用构造函数创建的一个对象（例如,Worker()）, 运行一个命名的 JavaScript文件 —> 这个文件包含了将在 worker 线程中运行的代码，并且 worker 在与当前 window不同的另一个全局上下文中运行。
这个上下文由专用worker的情况下的一个DedicatedWorkerGlobalScope 对象表示（标准 workers 由单个脚本使用; 共享workers使用SharedWorkerGlobalScope）。

除了以下情况外，你可以在你的 worker 线程中运行任意的代码：你不能直接在 worker 线程中操纵 DOM 元素, 或者使用某些 window 对象中默认的方法和属性(也就是说并没有脱离JavaScript的本质)。 
但是 window 对象中很多的方法和属性你是可以使用的，包括 [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)，以及诸如 [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) 和 FireFox OS 中独有的 [Data Store API](https://developer.mozilla.org/en-US/docs/Web/API/Data_Store_API) 这一类数据存储机制。

每个web worker都维护了自己的event loop，可以分开来工作，彼此通过postMessage通信。

![web worker loop](https://www.flygoing.cn/images/web-worker-loop.png)

主线程和web worker的event loop的区别在于，主线程每次task完成后会进行视图更新，但是worker和dom无关，就没有这一步了。
## Web Worker API
- 检测当前浏览器是否支持web worker

- 启动web worker

- 
