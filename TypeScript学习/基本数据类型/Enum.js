var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["yellow"] = 2] = "yellow";
})(Color || (Color = {}));
;
var c = Color.yellow;
alert(c); // 2 下标
// 默认情况下，枚举是从0开始，也可以通过手动设置其中一个值
var Color1;
(function (Color1) {
    Color1[Color1["red"] = 1] = "red";
    Color1[Color1["blue"] = 2] = "blue";
    Color1[Color1["yellow"] = 3] = "yellow";
})(Color1 || (Color1 = {}));
;
var c1 = Color1.yellow;
alert(c1); //3 因为从1开始了
//也可以手动设置枚举中的所有值
var Color2;
(function (Color2) {
    Color2[Color2["red"] = 10] = "red";
    Color2[Color2["blue"] = 20] = "blue";
    Color2[Color2["yellow"] = 30] = "yellow";
})(Color2 || (Color2 = {}));
;
var c2 = Color2.yellow;
alert(c2); // 30
//enum有一个很便利的功能，可以从数值转换为枚举中该值的名称
//比如我们有一个值2，但是我们不确定在color3上的枚举中映射到什么？我们可以查找相应的名称
//如果没有映射则返回undefined
var Color3;
(function (Color3) {
    Color3[Color3["red"] = 1] = "red";
    Color3[Color3["blue"] = 2] = "blue";
    Color3[Color3["yellow"] = 3] = "yellow";
})(Color3 || (Color3 = {}));
;
var c3 = Color3[3];
var c4 = Color3[4];
alert(c3); //yellow
alert(c4); //undefined
