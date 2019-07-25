HTML5里边新增了很多Observer

![image](3EB1791DB73E4267B78439E23D16E9D8)
Observer的定位：我的理解就是各种观察者，做各种内容的监听和分发。

今天主要讲讲其中的MutationObserver
在MDN中对于MutationObserver的介绍是：**MutationObserver接口提供了监视对DOM树所做更改的能力。它被设计为旧的Mutation Events功能的替代品，该功能是DOM3 Events规范的一部分。**  
字面上理解：是用来观察Node（节点）变化的  

在MDN对MutationObserver的介绍中提到，MutationObserver是用来代替MutationEvent的，那么MutationEvent是什么呢？
### MutationEvent
MutationEvent共有7中事件：**DOMNodeInserted**、**DOMNodeRemoved**、**DOMSubtreeModified**、**DOMAttrModified**、**DOMCharacterDataModified**、**DOMNodeInsertedIntoDocument**和**DOMNodeRemovedFromDocument**。

MutationEvent的兼容性：
1. MutationEvent在IE浏览器中最低支持到IE9
2. 在webkit内核的浏览器中，不支持**DOMAttrModified**事件
3. IE、Edge以及Firefox浏览器下不支持**DOMNodeInsertedIntoDocument**和**DOMNodeRemovedFromDocument**事件

MutationEvent中的所有事件都被设计成无法取消，如果可以取消MutationEvent事件会导致现有的DOM接口无法对文档进行操作，比如：appendChild，remove等添加、删除节点的DOM操作。

MutationEvent最被人诟病的就是性能以及安全问题。例如：
```
document.addEventListener('DOMNodeInserted',function() {
    let newEl = document.createElement('div');
    document.body.appendChild(newEl);
})
```
document下的所有DOM添加操作都会触发DOMNodeInserted方法，这时就会出现无限循环调用DOMNodeInserted方法，导致浏览器崩溃。

还有就是MutationEvent是事件机制，因此会有一般事件都存在的捕获和冒泡阶段，如果此时正处在捕获和冒泡阶段又对DOM进行了操作，会拖慢浏览器的运行。

另一点是MutationEvent事件机制是同步的，也就是说每次DOM修改都会触发，修改几次就触发几次，严重影响并会降低浏览器的运行，严重时甚至会导致线程崩溃
```
<div id='test'></div>
```
```
let i = 0;
test.addEventListener('DOMNodeInserted', function() {
    i++
});
test.appendChild(document.createTextNode('1'));
console.log(i);    // 1
test.appendChild(document.createTextNode('2'));
console.log(i);    // 2
test.appendChild(document.createTextNode('3'));
console.log(i);    // 3
```

再看另一个例子：
```
<div id='test'>
    <span id='child'>Text</span>
</div>
```
```
test.addEventListener('DOMNodeInserted',function(e) {
    console.log('1');    // 1
});
span.appendChild(document.createTextNode('other text'));
```
span元素中添加节点触发test中的DOMNodeInserted事件，如果只想观察test的变化，不想观察其内部的子节点的变化，此时你应该在DOMNodeInserted事件中进行过滤，把对子节点的操作忽略掉，但是这无疑增加了很多成本和风险，还增添了操作的复杂性。

以上就是MutationEvent存在的问题，为了解决这些问题，就有了MutationObserver

首先应了解MutationObserver的浏览器兼容性：
![MutationObserver的浏览器兼容性](https://www.flygoing.cn/images/2019-7-24/MutationObserver之于各浏览器的兼容性.png)

可以看得出来MutationObserver在IE中最低要求也是IE11。这也是浏览器版本发展的趋势，应该说MutationObserver支持所有的现代浏览器。如果你的网站必须要求兼容至IE8以上、IE11以下，那么你需要使用MutationEvent来兼容。（IE8以下怎么办？凉拌）。

#### 构造函数 MutationObserver()

[MutationObserver()](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/MutationObserver)创建并返回一个新的MutationObserver，它会在指定的DOM发生变化时调用，接收一个**callback**参数，用来处理节点变化的回调函数，该回调函数拥有两个参数：描述所有被触发改动的[MutationRecord](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)对象数组：==record==，调用该函数的MutationObserver对象：==observer==。
```
let observer = new MutationObserver(function(record,observer)){
    // some code
};
```
返回一个新的、包含监听DOM变化回调函数的==MutationObserver==对象

下面这个例子简单创建了一个新的MutationObserver，监视一个节点及全部子节点树的添加、移除元素，以及任何属性变化的事件。
```
function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
        switch(mutation.type) {
            case 'childList':
                /* 从树上添加或移除一个或更多的子节点；参考mutation.addedNodes 和mutation.removeNodes */
                break;
            case 'attributes':
                /* mutation.target 中某个节点的一个属性值被更改；该属性名称在mutation.attributeName中，该属性之前的值为 mutation.oldValue */
                break;
        }
    });
}
```
当观察者observer发现更改匹配到观察请求中指定的配置项时，callback方法会被调用；调用observe()开始观察DOM。

使用[mutation.type](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord/type)获取发生的变动类别（无论是子节点的变动，还是节点属性的变动）。

##### 创建并使用observer
使用代码设置一个观察进程：
```
let targetNode = document.querySelector('#test');
let observerOptions = {
    childList: true, // 观察目标子节点的变化，添加或删除
    attributes: true, // 观察属性变动
    subtree: true //默认是false，设置为true后可观察后代节点
}
let observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);
```
使用ID->test来获取目标节点树。observerOptions中设定了观察，通过设定==childList==和==attributes==为true来获取所需信息。

当observer实例化时，指定callback()函数。之后指定目标节点与记录选项，然后就可以开始观察observe()指定的DOM节点。

从此时起直到调用disconnect(),每次以targetNode为根节点的DOM树添加或移除元素时，以及这些元素的任意属性改变时，callback()都会被调用。

#### 方法
MutationObserver对象有三个方法，分别如下：
1. **observe**：设置目标，接收两个参数，target：观察目标， options：观察项
2. **disconnect**：组织观察者观察任何的改变
3. **takeRecords**：清空记录队列并返回里边的内容

关于observe方法中options参数有几个选项：
1. childList：默认为false，设置为true，可观察目标子节点的变化；比如添加或删除目标子节点，不包括修改子节点以及子节点后代的变化
2. attributes：默认为false，设置为true，可观察目标属性的改变
3. characterData：默认为false，设置为true，可观察目标数据的改变
4. subtree：默认是false，设置为true后可观察后代节点
5. attributeOldValue：如果设置为true或省略，则相当于设置为true，表示需要记录改变前的目标属性值，设置了attributeOldValue可以不用设置attributes
6. characterDataOldValue：如果设置为true或省略，则相当于设置为true，表示需要记录改变之前的目标数据，设置了characterDataOldValue可以不用设置characterData
7. attributeFilter：如果不需要观察所有的属性改变，并且已设置attribute为true，那么设置一个需要观察属性的本地名称（不需要命名空间）的列表

下表描述了MutationEvent选项与MutationObserver之间的对应关系：

MutationEvent | MutationObserver
---|---
DOMNodeInserted | { childList: true, subtree: true }
DOMNodeRemoved | { childList: true, subtree: true }
DOMSubtreeModified | { childList: true, subtree: true }
DOMAttrModified | { attributes: true, subtree: true }
DOMCharacterDataModified | { characterData: true, subtree: true }

从上表可以看出来相比MutationEvent，MutationObserver极大地增加了灵活性，可以设置不同的、选项来满足对目标的观察