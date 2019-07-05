使用下面的关系区别这两个操作：
```
git pull = git fetch + git merge;
git pull --rebase = git fetch + git rebase
```

git merge和git rebase：

假设有3次提交A、B、C
![示例1](https://images2015.cnblogs.com/blog/907596/201609/907596-20160922155014777-999552544.png)

在远程分支origin的基础上创建一个名为“mywork”的分支并提交了，同时有其他人在origin上做了一些修改也提交了
![示例2](https://images2015.cnblogs.com/blog/907596/201609/907596-20160922155038152-1733703139.png)
在这个时候E不应该提交，提交会发生冲突。如何解决冲突？有以下的两种方法：
##### 1、git merge(在其他笔记中也有介绍，不详述)
用git pull命令把origin分支上的修改pull下来与本地提交合并（merge）成版本M，但会形成图下的菱形，容易让人产生困惑。

![让人困惑的菱形](https://images2015.cnblogs.com/blog/907596/201609/907596-20160922155107949-1520786903.png)

##### 2、git rebase
创建一个新的提交R，R的文件内容和上面M一样，我们将E提交废除，当其不存在（图中用虚线表示）。由于这种删除，我们不应该push其他的repository.reabase的好处是避免了让人困惑的菱形的产生，保持提交曲线为直线，让大家更易于理解。

![git rebase示例图](https://images2015.cnblogs.com/blog/907596/201609/907596-20160922155132715-596060966.png)

在rebase的过程中，有时也会有confict，此时Git会停止rebase并让用户去解决冲突，解决完冲突后，用git add命令去更新这些内容，然后不用执行git commit，直接执行==git rebase --continue==，此时，git会继续apply余下的补丁。

在任何时候，都可以用==git rebase --abort==参数来终止rebase的行动，并且mywork分支会回到rebase开始前的状态。