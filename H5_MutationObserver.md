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

另外还有MutationEvent是事件机制，因此会有一般事件都存在的捕获和冒泡阶段，如果此时正处在捕获和冒泡阶段又对DOM进行了操作，会拖慢浏览器的运行。