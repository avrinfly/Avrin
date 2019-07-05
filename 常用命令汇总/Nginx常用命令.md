### 启动
启动代码格式：nginx安装目录地址 -c nginx配置文件地址
```
[root@HTF ~]# /usr/bin/nginx -c /usr/local/nginx
```
### 停止
nginx的停止有三种方式：
- #### 从容停止
    1. 查看进程号
    ```
    [root@HTF ~]# ps -ef|grep nginx
    ```
    ![nginx进程号查询命令](B6B6E7F067AF4A17A43B8263FC81E172)
    
    2. 杀死进程
    ```
    [root@HTF ~]# kill -QUIT 1667(进程号)
    ```
- #### 快速停止
    1. 查看进程号
    ```
    [root@HTF ~]# ps -ef|grep nginx
    ```
    ![nginx进程号查询命令](B6B6E7F067AF4A17A43B8263FC81E172)
    
    2. 杀死进程
    ```
    [root@HTF ~]# kill -TERM 1667(进程号)
    或
    [root@HTF ~]# kill -INT 1667(进程号)
    ```
- #### 强制停止
```
[root@HTF ~]# pkill -9 nginx
```

### 重启

#### 1、验证nginx配置文件是否正确
##### 方法一：进入nginx安装目录bin下，输入命令./nginx -t
看到如下显示nginx.conf syntax is ok

nginx.conf test is successful

说明配置文件正确！
![验证配置文件是否正确](CFECF3B69F2D46AA8393B124FE536724)

##### 方法二：在启动命令-c前加-t

![启动命令验证配置文件](666C4040CE8B4619B7C74C320817AC16)

#### 2、重启nginx服务器
##### 方法一：进入nginx可执行目录sbin下，输入命令./nginx -s reload 即可
```
[root@HTF bin]# ./nginx -s reload
```

##### 方法二：查找当前nginx进程号，然后输入命令：kill -HUP 进程号 实现重启nginx服务

![nginx进程号重启nginx](BF295B9249CC41158053F6C63AF11400)