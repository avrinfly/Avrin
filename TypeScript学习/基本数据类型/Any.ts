//写在前面!
//如果我们不知道某个字段或变量是哪种类型，该怎么办？因为这些值可能来自动态内容，比如来自用户或第三方库。
//在这种情况下，我们希望选择退出类型检查，并让值通过编译时的检查。我们可以使用“any”类型标记：
let unknowValue: any = 4;
unknowValue = 'maybe a string instead';
unknowValue = false;
//unknowValue可以是任何类型的变量

// any类型是一种使用现有JavaScript的强大方法，允许我们在编译ts期间逐步选择加入和退出类型检查。
// any有些扮演类似Object的角色，但Object只允许为他们分配任何值，却不能对它们调用任意方法，即使是实际存在(js自带)的方法
let notSure: any = 4;
alert(notSure.toFixed(2));
// notSure.example();// 假设notSure在运行时存在example

let newNotSure: Object = 4;
// newNotSure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.

//如果知道某个类型的某个部分，也可以这么写：
let list: any = [1, true, 'hello'];
list[2] = 'ime';
alert(list);