import TYPES from './type.js'
import _ from './until.js'

//理想补丁包的样子
//1.节点被删除 {type:'REMOVE',index} 返回被删除节点的索引
//2. 节点不一致 {type:'REPLACE',newNode:newNode}
//3. 属性不一致 {type:'ATTRS',attrs:{class:'new-list'}}
//4. 文本不一致 {type:'TEXT',text}

let patchs = {};// 补丁包
//当前父节点下的子节点的索引
let globalIndex = 0;

function diff(oldTree, newTree) {
    dfscompare(oldTree, newTree, globalIndex);
    return patchs;
}

//遍历老树和新树
function dfscompare(oldTree, newTree, index) {
    //每个元素都有一个补丁对象

    //存放补丁包
    let currentPatchs = [];
    if (!newTree) {
        //新树不存在
        currentPatchs.push({
            type: TYPES.REMOVE,
            index
        })
    }
    else if (_.isString(oldTree)) {
        //如果老树的节点是字符串 
        if (_.isString(newTree) && oldTree != newTree) {
            //如果新树也为子节点，且新树不等于老树，认为是文本替换
            currentPatchs.push({
                'type': TYPES.TEXT,
                text:newTree
            })
        }
        if (!_.isString(newTree)) {
            //新树不是文本，则认为是发生了replace,将原来的文本换成了新的节点或其他
            currentPatchs.push({
                type: TYPES.REPLACE,
                newNode: newTree
            })
        }
    }
    else if (oldTree.type == newTree.type) {
        //比较属性
        // diffProps()
        // currentPatchs.push({
        //     type: TYPES.ATTRS,
        //     attr: patchAttrs
        // })
        //比较子节点
        diffChild(oldTree.children, newTree.children);
    }
    if (currentPatchs.length > 0) {
        patchs[index] = currentPatchs;
    }
}

function diffProps() {
    //比较属性值
}

function diffChild(oldChildrens,newChildrens) {
    //比较子节点
    oldChildrens.forEach((child, idx) => {
        //老树的节点  新树对应索引的节点  保持当前处理的索引++
        dfscompare(child, newChildrens[idx], ++globalIndex);//尾调用优化
    });
}
// 判断节点的类型 oldTree.type === newTree.type  如果一致，则表示两个节点相同，则对比其子节点
// 判断两个节点不一致，且新旧节点都为string，则认为其是一个文本的替换
// 判断如果newTree不存在，则认为是删除操作
export {
    diff
}