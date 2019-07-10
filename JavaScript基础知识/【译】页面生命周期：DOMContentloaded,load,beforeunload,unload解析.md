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