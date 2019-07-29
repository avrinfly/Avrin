let decimal: number = 1; //十进制
let hex: number = 0xf00d; //十六进制
let binary: number = 0b1010; //二进制
let octal: number = 0o7444;//八进制
//如果前缀为 0，则 JavaScript 会把数值常量解释为八进制数，如果前缀为 0 和 "x"，则解释为十六进制数。
alert(decimal + " 转换为十进制: " + decimal.toString(10));
alert(hex + " 转换为十进制: " + hex.toString(10));
alert(binary + " 转换为十进制: " + binary.toString(10));
alert(octal + " 转换为十进制: " + octal.toString(10));

