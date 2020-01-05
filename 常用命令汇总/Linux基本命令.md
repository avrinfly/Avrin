<!--
 * @Description: Linux基本命令汇总
 * @Author: hetengfei
 * @Github: https://github.com/avrinfly
 * @Date: 2019-10-21 18:34:19
 * @LastEditors: hetengfei
 * @LastEditTime: 2020-01-05 23:41:15
 -->
 ## 操作系统
- **arch** 显示机器的处理器架构
- **uname -m** 显示机器的处理器架构
- **uname -r** 显示正在使用的内核版本
- **dmidecode -q** 显示硬件系统部件（SMBIOS/DMI）
- **cat /proc/cpuinfo** 显示CPU的内存信息
- **cat /proc/version** 显示内核版本
- **lspci -tv** 罗列 PCI设备
- **lsusb -tv** 显示USB设备
- **cal 200x** 显示200x年的日历表
- **clock -w** 将时间修改保存到BIOS

## 关机（系统的关机、重启以及登出）
- **shutdown -h now** 关闭系统
- **init 0** 关闭系统
- **telinit 0** 关闭系统
- **shutdown -h hours:minutes** 按预定时间关闭系统
- **shutdown -c** 取消按预定时间关闭系统
- **shutdown -r now** 重启
- **reboot** 重启
- **logout** 注销


- **ls** --- 得到当前目录内容


- **dir** --- 可得到和ls相同的内容


- **ls -l** --- 得到长格式目录内容  
    1. 第一栏：访问权限      
    2. 第二栏：存在文件的数量
    3. 第三栏：属于哪一个用户组
    4. 第四栏：属于哪一个用户
    5. 第五栏：当前文件或目录的大小（对目录：值是固定的，对文件：实际的大小）
    6. 第六栏：文件或目录的创建时间
    7. 第七栏：文件或目录的名称


- **ls -a** --- 得到包括隐藏文件在内的目录内容
    文件名前面带.的都是隐藏文件 只有一个 **.** 表示当前目录 **..** 表示上一级目录


- **cd XXX** --- 切换目录  ++*ps：目录名称应是严格区分大小写的*++
    1.  **cd ..**    返回上一级目录
    2.  **cd ../..**   退回两级目录
  

- **mkdir XXX** 创建目录  
    1. 重复创建相同目录会报错


- **rm XXX** 删除目录 --- 使用时应谨慎
    1. 删除文件
        1. **rm xxx**
    2. 删除目录
        1. **rm -r xxx**


- **cp XXX** 复制文件  
    1. 复制纯粹的文件  
        1. **cp aaa bbb/aaa**  复制aaa文件到bbb目录下，还为aaa文件
        2. **cp aaa bbb/ccc**  复制aaa文件到bbb目录下，重命名为ccc
    2. 复制目录
        1. **cp -R aaa ddd** -R表示复制的是一个目录 复制aaa目录并命名为ddd *++应切记，否则会报错++*
            

- **pwd** 显示当前终端上的全部目录 --- 通俗来说就是定位当前目录的路径
 
- **mv** 修改文件名
    1. mv aaa bbb 将aaa文件夹修改名为bbb

- **rz** 上传  
    若rz命令不存在，则需通过```yum -y install  lrzsz```命令安装

    通过命令```rpm -qa lrzsz```查看是否安装成功

- **date** 显示系统日期
## 文件搜索
如果遇到不确定的可以用通配符*来代替
1. **find / -name xx** 在根目录下查找xx文件
2. **find / -name xx*** 在根目录下查找xx开头的文件(注意是文件)

    如果是图片或者其他格式呢？

    ```find / -name vue*.png```  在根系统下查找vue开头的png图片
3. **find / -user user1** 在根目录下搜索属于用户user1的文件和目录
4. **find /home/user -name \*.bin** 在目录"/home/user"中搜索带有".bin"结尾的文件
5. **find /usr/bin -type f -mtime -10** 在目录"/home/user"中搜索在10天内被创建或者修改过的文件
6. **find /usr/bin -type f -atime +100** 在目录"usr/bin"中搜索在过去100天内未被使用过的执行文件
7. **whereis xxx** 显示一个二进制文件、源码或者应用程序的位置
8. **which xxx** 显示一个二进制文件或可执行文件的完成路径
9. **find / -xdev -name \*.rpm** 在根目录下搜索以".rpm"结尾的文件，忽略光驱、
10. **locate \*.ps** 寻找以".ps"结尾的文件，前提要先运行**updatedb**命令

## 打包和压缩文件
1. **bunzip2 file1.bz2** 解压一个叫做'file1.bz2'的文件
2. **bzip2 file1** 压缩一个叫做'file1'的文件
3. **gunzip file1.gz** 解压一个叫做'file1.gz'的文件
4. **gzip file1** 压缩一个叫做'file1'的文件
5. **gzip -9 file1** 最大程度压缩
6. **rar a file1.rar test_file** 创建一个叫'file1.rar'的包
7. **rar a file1.rar file1 file2 dir1** 同时压缩'file1'、'file2'以及'dir1'
8. **rar x file1.rar** 解压rar包
9. **unrar x file1.rar** 解压rar包
10. **tar -cvf archive.tar file1** 创建一个非压缩的tarball
11. **tar -cvf archive.tar file1 file2 dir1** 创建一个包含'file1'、'fil2'和'dir1'的档案文件
12. **tar -tf archive.tar** 显示一个包里的内容
13. **tar -xvf archive.tar** 释放一个包
14. **tar -xvf archive.tar -C /tmp** 将压缩包释放到/tmp目录下
- **tar -cvfj archive.tar.bz2 dir1** 创建一个bzip2格式的压缩包
- **tar -jxvf archive.tar.bz2** 解压一个bzip2格式的压缩包
- **tar -cvfz archive.tar.gz dir1** 创建一个gzip格式的压缩包
- **tar -zxvf archive.tar.gz** 解压一个gzip格式的压缩包
- **zip file1.zip file1** 创建一个zip格式的压缩包
- **zip -r file1.zip file1 file2 dir1** 将file1、file2和dir1同时压缩成一个zip格式的压缩包
- **unzip file1.zip** 解压一个zip格式的压缩包

## 文件的权限 - 使用 “+” 设置权限，使用 “-” 用于取消
- **ls -lh** 显示权限（简写为ll）
- **ls /tmp | pr -T5 -W$COLUMNS** 将终端划分为5栏显示
- **chmod ugo+rwx directory 1** 设置目录的所有人(u)、群组(g)以及其他人(o)以读(r)写(w)和执行(x)的权限