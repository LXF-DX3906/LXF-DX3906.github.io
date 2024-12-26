---
title: 利用ETL工具Kettle（Pentaho Data Integration）将csv文件导入sql server数据库
date: 2019-09-30 15:52:35
tags: 
  - SQL Server
  - Kettle
categories:
  - technology
  - 数据仓库

---

# 0.预装环境

jdk1.8（我测试的结果是java SE 13不适配kettle8.3.0.0-371，虽然可以打开kettle，但是无法创建数据库连接，把新版本java卸了重新安装旧版本也是一件挺麻烦的事）

<!--more-->

## 1.下载开源ETL工具：

Pentaho Kettle：https://image.baidu.com/search/down?url=https://community.hitachivantara.com/s/article/downloads 网页中的Data Integration

下载好后为一压缩文件，将压缩文件解压到任意文件夹即可，解压后内容如下。

![1569824832312.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0x3p1lcj30o50j8abw.jpg)

单击**Spoon.bat**，打开kettle，第一次打开大概要等几分钟。

![1569825081518.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0xe9ty2j30o50j7mzh.jpg)

打开后界面如下

![1569825417291.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0xtxxtlj31hc0smjt6.jpg)

如果点开十分钟仍没有任何反应，可以以记事本方式打开Spoon.bat并修改Spoon.bat里面的内容，**将-Xms与-Xmx后的参数全改为512**，之后重新打开。

![1569825309180.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0y75mj2j310c00vgli.jpg)

## 2.安装sql server

网上sql server的安装教程有很多，不再赘述。

安装后有以下工具

![1569825491401.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0yd85inj308v0a1gny.jpg)

## 3.使用Kettle将CSV文件内容导入sql server数据库

### 3.1配置sql server

在开始正式步骤之前，需修改一下sql server的网络配置，打开**SQL Server 2107 配置管理器**，右键SQL Native Client11.0配置的客户端协议中的TCP/IP选项，将其设为启用状态。

![1569825801763.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0ylmudtj30wu0oujtt.jpg)

将SQL Server服务中的三个服务全设置为运行状态

![1569825889686.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0yuxp14j30wu0ou0w0.jpg)

打开**Microsoft SQL Server Management Studio**，采用默认方式，直接单击连接

![1569826016006.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0z6vxgqj31c00ph75m.jpg)

打开左侧面板：安全性—>登录名，右键用户sa，选择属性，这里可以设置用户sa的密码，直接在密码框中输入即可

![1569826170590.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0ze6aitj31c00phju0.jpg)

单击sa属性窗口左侧的**状态**项，将**登录名**设置为启用状态。

![1569826298788.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r0zp6j6cj31c00ph0v6.jpg)

至此，SQL Server前期配置完成。

### 3.2下载jTDS - SQL Server and Sybase JDBC driver

Java连接SQL Server 2000数据库时，有两种方法：

（1）通过Microsoft的JDBC驱动连接。但是该种方法目前已不适用。

驱动程序名称：com.microsoft.jdbc.sqlserver.SQLServerDriver

（2）通过jTDS驱动连接。下载地址：http://sourceforge.net/projects/jtds/files/jtds/

驱动程序名称：net.sourceforge.jtds.jdbc.Driver

下载jTDS - SQL Server and Sybase JDBC driver，将压缩文件中的jtds-1.3.1.jar包放入kettle的lib文件夹下

![1569829056661.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r10knjf5j30n20k0ab5.jpg)

kettle配置完成

### 3.3将csv文件导入sql server数据库

新建test.csv文件，输入测试内容

![1569826865642.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r10rkevpj30kg0anaar.jpg)

打开**Microsoft SQL Server Management Studio**，在左侧栏右键数据库->新建数据库，输入数据库名称test

![1569827260933.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r110mrmoj30ph0juwet.jpg)

打开左侧面板test->表，右键表->新建->表，命名为csv_to_db，插入列ID，NAME，RELEASE_TIME，点击保存

![1569827316253.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r118mhdgj31c00phtat.jpg)

![1569829543759.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r11t1jgzj31c00le0uk.jpg)

打开kettle，文件->新建->转换，新建转换

![1569827001843.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r1274esnj31hc0smq4u.jpg)

在主对象树中，右键DB连接->新建数据库连接

参数如下：

主机名称：localhost或127.0.0.1均可

数据库名称：将要连接的数据库名称，这里为test

实例名称：空

端口号：默认为1433

用户名：我们在前面设置为启用状态的登录名sa

密码：在前面为sa设置的密码

![1569827700107.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r12o7ywxj30xw0ihaax.jpg)

点击测试，如下即为连接成功

![1569827858731.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r130gf27j30xw0ih75i.jpg)

单击kettle左侧栏核心对象，在输入栏下将csv文件拖入工作区

![1569827998760.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r1394tenj31hc0smq5a.jpg)

双击csv文件输入图标，选择数据源，点击获取字段，确认，之后确定

![1569828077122.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r13ss98gj30qo0sewfj.jpg)

在输出栏将表输出拖入工作区，按住shift利用鼠标从csv文件输入拖到表输出，点击主输出步骤

![1569828130523.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r14crvjrj31hc0smwgo.jpg)

双击表输出，选择数据库连接test，浏览目标表，选择上面新建的csv_to_db，勾选指定数据库字段，点击获取字段

![1569828267096.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r14jhk75j30ro0set9n.jpg)

点击输入字段映射，此时会报出提示，继续点击确定，选择csv中要映射的数据库表字段，单击ADD

![1569828365147.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r14r1w7zj31200p1aa9.jpg)

![1569828590146.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r14y10u6j31200se0t4.jpg)

确定后，点击工作区上侧的运行，转换成功

![1569828699761.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r154nmsnj31hc0smgou.jpg)

转换成功，可在**Microsoft SQL Server Management Studio**中通过sql语句查询查看结果（没找到像oracle数据库中那样可以直接查看表内容的方法，只能用sql语句了）。

右键test->新建查询

![1569829169151.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r15bvaj0j31c00legng.jpg)

输入查询语句，结果如下

![1569829711152.png](利用ETL工具Kettle（Pentaho-Data-Integration）将csv文件导入sql-server数据库/007oltUXly1g7r15o871vj31c00oq41w.jpg)

