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