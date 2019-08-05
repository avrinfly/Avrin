//在ts中，undefined和null实际上都有各自的类型，它们的名字为：undefined和null--->总感觉像废话
//和“void”类似，它们本身的类型用处不是很大

//Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;

//理论上null和undefined是所有其他类型的子类型。这意味着你可以给其他类型分配null和undefined，比如number类型
let num: number = null;
let und: string = undefined;
alert(num + ' ' + und);

//然而，当我们使用--strickNullChecks标志时，null和undefined仅仅是分配给any和其各自类型（有一个例外：undefined也可以分配给void）。
//这样能避免很多常见的错误。比如要传入一个string或null(undefined)，可以使用混合写法 string|null|undefined：
let a: string | null | undefined = 'iven';

// 官方友情提醒：鼓励尽可能多的使用--strickNullChecks