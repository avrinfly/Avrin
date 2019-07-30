enum Color { red, blue, yellow };
let c: Color = Color.yellow;
alert(c);  // 2 下标

// 默认情况下，枚举是从0开始，也可以通过手动设置其中一个值
enum Color1 { red = 1, blue, yellow };
let c1: Color1 = Color1.yellow;
alert(c1);  //3 因为从1开始了

//也可以手动设置枚举中的所有值
enum Color2 { red = 10, blue = 20, yellow = 30 };
let c2: Color2 = Color2.yellow;
alert(c2); // 30

//enum有一个很便利的功能，可以从数值转换为枚举中该值的名称
//比如我们有一个值2，但是我们不确定在color3上的枚举中映射到什么？我们可以查找相应的名称
//如果没有映射则返回undefined
enum Color3 { red = 1, blue, yellow };
let c3: string = Color3[3];
let c4: string = Color3[4];
alert(c3);  //yellow
alert(c4);  //undefined