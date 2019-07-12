## DOMContentLoaded、load、beforeunload、unload解析
> 原文地址：[http://javascript.info/onload-ondomcontentloaded](http://javascript.info/onload-ondomcontentloaded)

HTML页面的三个生命周期有以下三个重要事件：
- ```DOMContentLoad```—— 浏览器已经完全加载了HTML，DOM树已经构建完毕，但是像```<img>```和CSS(层叠样式表)等外部资源可能并没有下载完毕。
- ```load```—— 浏览器已经加载了所有的资源（图像、样式表）。
- ```beforeunload/unload``` —— 当用户离开页面的时候触发。

每个事件都有特定的用途
- ```DOMContentLoaded```—— DOM加载完毕，所以JS可以访问所有DOM节点，初始化界面。
- ```load```—— 附加资源已经加载完毕，可以在次事件触发时获得图像的大小（如果没有被在HTML/CSS中指定）。
- ```beforeunload/unload```—— 用户正在离开页面；可以询问用户是否保存了更改以及是否确定要离开页面。

下面来看一下每个事件的细节。
#### DOMContentLoaded
---
```DOMContentLoaded```由```document```对象触发。

我们使用```addEventListener```来监听它：
```
document.addEventListener("DOMContentLoaded",ready);
```
举例说明
```
<script>
    function ready() {
        alert('DOM is ready');
        
        //image is not yet loaded(unless was cached),so the size is 0x0
        alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
    }
    
    document.addEventListener("DOMContentLoaded", ready);
</script>

<img id="img" src="https://www.flygoing.cn/images/timg.jpg">
```
在上面的例子中```DOMContentLoaded```在document加载完成后就被触发，无需等待其他资源的载入，所以```alert```输出的图像大小为0。

如此看来```DOMContentLoaded```似乎很简单，DOM树构建完毕后就运行该事件，不过存在一些陷阱。

#### DOMContentLoaded和脚本
当浏览器在解析HTML页面时遇到了```<script>...</script>```标签，将无法继续构建DOM树(译注：UI渲染线程与JS引擎是互斥的，当JS引擎执行时UI线程会被挂起)，必须立刻执行脚本。所以```DOMContentLoaded```有可能在所有脚本执行完毕后触发。

外部脚本(带```src```)的加载和解析也会暂停DOM树构建，所以```DOMContentLoaded```也会等待外部脚本。

不过还是有两个例外；分别是带```async```和```defer```的外部脚本，他们告诉浏览器继续解析不需要等待脚本执行，所以用户可以在脚本加载完成前看到页面，有较好的交互和用户体验。

```async```和```defer```属性仅仅对外部脚本起作用，并且它们在```src```不存在时会被自动忽略。

它们存在的目的就是告诉浏览器继续处理页面上的内容，而在后台加载脚本，然后在脚本加载完成后再执行。所以脚本是不会阻塞DOM树的构建和页面的渲染。

**译注：带有```async```和```defer```的脚本下载是和HTML的下载与解析是并行的，但是JS的执行一定是和UI线程是互斥的，如下图所示，```async```在下载完毕后的执行会阻塞HTML解析**

![生命周期](https://www.flygoing.cn/images/2019-7-10/life-cycle.png)

他们有两处不同：

`` | ```async``` | ```defer```
---|---|---
顺序 | 带有```async```的脚本是优先执行加载完的脚本，它们在页面中的顺序并不影响他妈呢执行的顺序。| 带有```defer```的脚本按照他们在页面中出现的顺序依次执行
```DOMContentloaded``` | 带有```async```的脚本也许会在页面没有完全下载完之前就加载，这种情况会在脚本很小或有缓存，并且页面很大的情况下发生。| 带有```defer```的脚本会在页面加载和解析完毕后执行，刚好在```DOMContentLoaded```**之前**执行。

所以```async```用在那些完全不依赖其他脚本的脚本上。
#### DOMContentloaded与层叠样式表
外部样式表并不会阻塞DOM的解析，所以```DOMContentLoaded```并不会被它们影响。

不过仍然有一个陷阱：如果在样式后面有一个内联脚本，那该脚本必须等待样式先加载完。

**译注：简单来说，JS因为有可能会去获取DOM的样式，所以JS会等待样式表加载完毕，而JS是阻塞DOM解析的，所以在有外部样式表时，JS会一直阻塞到外部样式表下载完毕**

```
<link type="text/css" rel="stylesheet" href="xxx.css">
<script>
    // 脚本直到样式表加载完毕后才会执行。
    alert(getComputedStyle(document.body).marginTop);
</script>
```
发生这种事的原因是脚本也有可能会像上面的例子所示，去得到一些元素的坐标或者基于样式的属性。所以它们自然要得到样式加载完毕后才可执行。

```DOMContentLoaded```需要等待脚本执行，脚本又需要等待样式的加载。
#### 浏览器的自动补全
Firefox,Chrome和Opera会在```DOMContentLoaded```执行时自动补全表单。

例如，如果页面有登录界面，浏览器记住了该页面的用户名和密码，那么在```DOMContentloaded```运行时浏览器会试图自动补全表单(如果用户设置允许)。

所以如果```DOMContentloaded```被一个需要长时间执行的脚本阻塞，那么自动补全也会等待。你也许见过某些网站（如果你的浏览器开启了自动补全）—— 浏览器并不会立刻补全登录项，而是等到整个页面加载完毕后才填充。这就是因为在等待```DOMContentLoaded```事件。

使用带```async```和```defer```的脚本的一个好处是：它们不会阻塞```DOMContentLoaded```和浏览器自动补全。

**译注：其实执行还是会阻塞的**

```defer```是会阻塞```DOMContentLoaded```的，被```defer```的脚本要在```DOMContentloaded```**触发前**执行，如果HTML很快就加载完了(先不考虑CSS阻塞```DOMContentLoaded```的情况)，而```defer```的脚本还没有加载完，浏览器就会等，等到脚本加载完，执行完，再触发```DOMContentLoaded```，放一张图(取自```devTool```下分析的一个页面)

![devTool分析的页面](https://www.flygoing.cn/images/2019-7-10/devtool-analyse.png)

可以看到，HTML很快就加载和解析完毕了(CSS在这里是动态加载，不阻塞```DOMContentLoaded```)，jQuery和main.js的脚本是```defer```的，```DOMContentLoaded```(蓝线)一直在等，等到这两个脚本下载完并执行完，才触发了```DOMContentLoaded```。

从这个角度看，```defer```和把脚本放在```</body>```前没有区别，只不过```defer```脚本位于```head```中，更早被读到，加载更早，而且不担心会被其他脚本推迟下载开始的时间。

#### window.onload
---

```window```对象上的```onload```事件在所有文件包括层叠样式表、图片和其他资源下载完成后触发。

下面的例子正确检测了图片的大小，因为```window.onload```会等待所有图片加载完成。
```
<script>
    window.onload = function() {
        alert('Page loaded');
        
        // image is loaded at this time
        alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
    };
</script>

<img id="img" src="https://www.flygoing.cn/images/timg.jpg">
```

#### window.onunload
---
用户离开页面的时候，```window```对象上的```unload```事件会被触发，我们可以做一些不存在延迟的事情，比如：关闭弹出的窗口，可是我们无法阻止用户转移到另一个页面上。

所以我们需要使用另一个事件 —— ```onbeforeunload```

#### window.onbeforeunload
---
如果用户即将离开页面或者关闭窗口时，```beforeunload```事件将会被触发以进行额外的确认。

浏览器将显示返回的字符串，举例：
```
window.onbeforeunload = function() {
    return "There are unsaved changes. Leave now?";
}
```
有些浏览器像Chrome和火狐会忽略返回的字符串取而代之显示浏览器自身的文本，这是为了安全考虑，来保证用户不受错误信息的误导。

#### readyState
---

如果我们在整个页面加载完毕后设置```DOMContentloaded```会发生什么呢？

答案是：**啥也没有**,```DOMContentLoaded```不会被触发。

有一些情况我们无法确定页面上是否已经加载完毕，比如一个带有```async```的外部脚本的加载和执行是异步的 **(译注：执行不是异步的-_-)**。在不同的网络状况下，脚本有可能是在页面加载完毕后执行也有可能是在页面加载完毕前执行，我们无法确定。所以我们需要知道页面加载的情况。

```document.readyState```属性给了我们加载的信息，有三个可能的值：

- ```loading``` 加载 —— document仍在加载。
- ```interactive``` 互动 —— 文档已经完成加载，文档已经被解析，但是诸如图像，层叠样式表和框架之类的子资源仍在加载。
- ```complete``` —— 文档和所有子资源已经完成加载。状态表示```load```事件即将被触发。

所以我们可以检查```document.readyState```的状态，如果没有就绪可以选择挂载事件，如果已经就绪了就可以直接立即执行。

例如：
```
function work() {
    //do something
}
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', work);
}
else {
    work();
}
```
每当文档的加载状态改变的时候就有一个```readystatechange```事件被触发，所以我们可以打印出所有的状态。
```
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```
```readystatechange```是追踪页面加载的一个可选方法，很久之前就已经有了，不过很少被使用，为保证周期的完整性还是介绍一下它。

```readystatechange```的在各个事件中的执行顺序又是如何呢？
```
<script>
  function log(text) { 
    /* output the time and message */
  }
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="https://www.flygoing.cn/yuedu/joke.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```
输入如下：
1. ```[1] initial readyState:loading```
2. ```[2] readyState:interactive```
3. ```[2] DOMContentLoaded```
4. ```[3] iframe onload```
5. ```[4] readyState:complete```
6. ```[4] img onload```
7. ```[4] window onload```

方括号内的数字表示他们发生的时间，真实发生时间会更晚一些，不过相同数字的时间可以认为是同一时刻被按顺序触发(误差在几毫秒内)
- ```document.readyState```在```DOMContentLoaded```前一刻变为```interactive```，这两个事件可以认为是同时发生。
- ```document.readyState```在所有资源加载完毕后(包括```iframe```和```img```)变成```complete```，我们可以看到```complete```、```img.onload```和```window.onload```几乎同时发生，区别是：```window.onload```在所有其他的```load```事件之后执行。

#### 总结
---
页面事件的生命周期：
- ```DOMContentLoaded```事件在DOM树构建完毕后被触发，我们可以在该阶段使用JS去访问元素。
    - ```async```和```defer```的脚本可能还没有执行。
    - 图片和其他资源文件可能还在下载中。
- ```load```事件在页面所有资源被加载完毕后触发，通常我们不会用到该事件，因为我们不需要等那么久
- ```beforeunload```在用户即将离开页面时触发，它返回一个字符串，浏览器会向用户展示并询问这个字符串以确定是否离开。
- ```unload```在用户已经离开时触发，我们在该阶段仅仅能做一些没有延迟的操作(同步操作)，由于种种限制，很少被使用。
- ```document.readyState```表征页面的加载状态，可以在```readystatechange```中追踪页面的变化状态：
    - ```loading``` —— 页面正在加载中。
    - ```interactive``` —— 页面解析完毕，时间上和```DOMContentLoaded```同时发生，不过顺序在它之前。
    - ```complete``` —— 页面上的资源都已经加载完毕，时间上和```window.onload```同时发生，不过顺序在它之前。