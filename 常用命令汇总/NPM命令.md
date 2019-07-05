## 更新npm包
1. 本地更新版本号
    1. 比如我想来个1.0.1版本，注意，是最后一位修改了增1，那么命令
    ：npm version patch    回车就可以了；
    2. 比如我想来个1.1.0版本，注意，是第二位修改了增1，那么命令
    ：npm version minor    回车就可以了；
    3. 比如我想来个2.0.0版本，注意，是第一位修改了增1，那么命令
    ：npm version major     回车就可以了；
2. 修改远端的版本,提交到远端npm中：
    npm publish 

## 删除npm包
发布

```$ npm publish ```

删除

```npm unpublish --force //强制删除```

```npm unpublish guitest@1.0.1 //指定版本号```

```npm deprecate //某些情况```


成功之后，npm会把认证信息存储在~/.npmrc中，并且可以通过以下命令查看npm当前使用的用户：

```$ npm whoami```

### 查查看npm包
如果你不知道此依赖包共有哪些版本,可以通过 info 命令来查看

```npm info xxx```