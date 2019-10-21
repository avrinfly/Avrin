/*
 * @Description: 
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-08-26 16:39:35
 * @LastEditors: hetengfei
 * @LastEditTime: 2019-08-29 18:16:31
 */
// 数组交叉重排序
const list = [4, 2, 5, 6, 3, 1];
// interlaceSort(list, 2);//[2, 4, 5, 6, 1, 3];
// interlaceSort(list, 3);//[2, 4, 5, 1, 3, 6];
// interlaceSort(list, 6);//[1, 2, 3, 4, 5, 6];
function interlaceSort(list, count) {
    let newArr = [];
    if (list.length === count) {
        return list.sort();
    }
    else {
        let child = Math.ceil(list.length / count);//将数组分成几份
        for (let i = 0; i < child; i++) {
            let arr1 = list.slice(i * count, (i + 1) * count);
            newArr = newArr.concat(arr1.sort());
        }
        return newArr;
    }
}
// console.log(interlaceSort(list, 3));

//实现一个方法：将目标字符串用另一个字符串或空格填充至目标长度
//填充从目标字符串的左侧开始
//1.语法：padLeft(str,len,[,chars])
//2.参数：str - 目标字符串
//3.参数：len - 目标长度。如果该数值小于目标字符串长度，则返回目标字符串本身
//4.参数：chars - 可选，填充字符串，默认空格。如果字符串太长，使填充后的字符串长度超过了目标长度，则截取相应的长度
//5.返回填充后的字符串
// 示例：
// padLeft('abc', 10); // '       abc'
// parLeft('abc', 10, 'foo'); //'foofoofabc'
// parLeft('abc', 6, '123456'); //'123abc'
// parLeft('abc', 6, '_-'); //'_-_abc'
// parLeft('abc', 8, '0'); //'00000abc'
// parLeft('abc', 1); //'abc'
function parLeft(str,len,char) {
    if (str.length >= len) {
        return str;
    }
    else {
        let needCharsLength = len - str.length;
        let needChars = '';
        let chars = char || ' ';
        if (needCharsLength > chars.length) {
            needChars = chars.repeat(Math.floor(needCharsLength / chars.length)) + chars.slice(0, needCharsLength % chars.length);
        }
        else {
            needChars = chars.slice(0, needCharsLength);
        }
        return needChars + str;
    }
}
console.log(parLeft('abc', 6, '123456'));
console.log(parLeft('abc', 10));

// 求数组可组合的最大数值
// 说明：给定一个包含零或正整数的数组，求数组能组合出的最大数值
// 示例：
// largestNumber([0, 4, 19, 41, 70]); //返回 70441190
// largestNumber([3, 30, 34, 5, 9]); //返回 9534330
// largestNumber([2, 3]); //返回 32
// largestNumber([]); //返回 0
// 思路：sort进行相邻元素对比，然后进行排序
function largestNumber(numbers) {
    if (numbers.length === 0) {
        return 0
    }
    else {
        let e = numbers.map(String).sort((a, b) => {
            let x = a.charCodeAt();
            let y = b.charCodeAt();
            if (x - y === 0) {
                let c = parseInt(a.concat(b));
                let d = parseInt(b.concat(a));
                if (c > d) return -1;
                else return 1
            }
            else {
                return b.charCodeAt() - a.charCodeAt();
            }
        })
        return e.join('');
    }
}
console.log(largestNumber([2, 5, 34, 9]));
console.log(largestNumber([3, 30, 34, 5, 9]));

var a = 'out';
(function(){
    console.log(a);
    var a = 'in';
})()