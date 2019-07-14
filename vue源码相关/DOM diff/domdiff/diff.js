import TYPES from './type.js'
import _ from './until.js'

//理想补丁包的样子
//1.节点被删除 {type:'REMOVE',index} 返回被删除节点的索引
//2. 节点不一致 {type:'REPLACE',newNode:newNode}
//3. 属性不一致 {type:'ATTRS',attrs:{class:'new-list'}}
//4. 文本不一致 {type:'TEXT',text}
//当前父节点下的子节点的索引
let globalIndex = 0;
function diff(oldTree, newTree) {
    dfscompare(oldTree, newTree, globalIndex);
}

//遍历老树和新树
function dfscompare(oldTree,newTree,index) {
    //存放补丁包
    let currentPatchs = [];
    //比较typejs中的差异情况(因人而异)
    if (!newTree) {
        //新树不存在
        currentPatchs.push({
            type: 'REMOVE',
            index
        })
    }
    else if (_.isString(oldTree)) {
        //如果老树的节点是字符串
    }
    else if (oldTree.type == newTree.type) {
        //比较属性
        diffProps()
        //比较子节点
        diffChild()
    }
}

function diffProps() {

}

function diffChild() {
    
}

export {
    diff
}