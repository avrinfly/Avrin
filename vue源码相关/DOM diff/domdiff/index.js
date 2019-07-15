import { createElement } from './element.js'
import {diff} from './diff.js'
//构建旧树的虚拟dom
let virtualDom = createElement("ul", { class: 'list' }, [
    createElement("li", { class: 'item' }, ['1']),
    createElement("li", { class: 'item' }, ['2']),
    createElement("li", { class: 'item' }, ['3']),
    createElement("li", { class: 'item' }, ['4'])
]);

//定义新的Virtual dom
//模拟差异，打补丁
let virtualDom1 = createElement("ul", { class: 'lists' }, [
    createElement("li", { class: 'item' }, [
        createElement("div",{class:'item'},['5'])//新增子节点
    ]),
    createElement("li", { class: 'cont' }, ['2']),//替换属性值
    createElement("li", { class: 'item' }, ['a']),//替换文本
    createElement("li", {}, ['xxxx'])//删除属性值
]);

console.log('虚拟dom节点',virtualDom)
//对两个树进行比较，得到补丁
const patchs = diff(virtualDom, virtualDom1)
console.log('补丁包',patchs);