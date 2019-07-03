### 1. 外边距折叠
与其他大多数属性不同，上下的垂直外边距margin在同时存在时会发生外边距折叠。这意味着当一个元素的下边缘接触到另一个元素的上边缘时，只会保留两个margin值中较大的那个。例如：
##### HTML
```
<div class="square red"></div>
<div class="square blue"></div>
```
##### CSS
```
.square {
    width: 80px;
    height: 80px;
}
.red {
    background-color: #F44336;
    margin-bottom: 40px;
}
.blue {
    background-color: #2196F3;
    margin-top: 30px;
}
```
![image](EF4471DC376E412D8381C62283A2A346)

红色方块与蓝色方块的上下间距是40px，而不是70px。解决外边距折叠的方法有很多种，对于初学者来说最简单的就是所有元素只使用一个方向上的margin，比如上下的外边距我们统统使用margin-bottom。

### 2. 所有元素设置为border-box
box-sizing属性平时大家可能注意的不多，但实际上它非常重要。box-sizing属性有两个值：
- content-box(默认) -- 当我们设置一个元素的宽度或高度时，就是设置了它的内容大小。（应注意：不包含所有的padding和border值）比如：一个DOM元素的宽度设置为100，padding为10，那么该元素占用的像素为120(100+2*10)。
- border-box -- padding和边框包含在元素的宽度或高度中，一个设置为宽度为100,并设置了box-sizing:border-box的DOM元素，那么它的总宽度就是100像素，无论其内边距和边框有多少。

这就是将所有元素设置为border-box的原因。**可以更轻松的改变元素的大小，而不必担心padding或者border值会将元素撑开变形或者换行显示。**

### 3. 用background设置图片而非img标签