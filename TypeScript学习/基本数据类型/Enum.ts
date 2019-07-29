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