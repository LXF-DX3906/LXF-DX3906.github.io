---
title: 利用Hexo-Next搭建个人博客--自定义样式
date: 2021-06-07 20:55:33
tags: 
	- Hexo
	- NexT
categories:
	- technology
	- Hexo
---

在一些搜到的自定义样式的文章里，一般都是说在css文件夹中的custom里，但是Next在我目前使用的7.4.1版本中抛弃了这一方式，在Next的**主题配置文件**`_config.yml`中有一个关键词`custom_file_path`，在这里可以设置自定义的的样式文件的路径。具体原理就是利用自定义样式文件中的样式覆盖掉默认样式。

<!--more-->

```yaml
# Define custom file paths.
# Create your custom files in site directory `source/_data` and uncomment needed files below.
custom_file_path:
  #head: source/_data/head.swig
  #header: source/_data/header.swig
  #sidebar: source/_data/sidebar.swig
  #postMeta: source/_data/post-meta.swig
  #postBodyEnd: source/_data/post-body-end.swig
  #footer: source/_data/footer.swig
  #bodyEnd: source/_data/body-end.swig
  #variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl
```

我只定义了一些CSS样式，因此选择将`style`解除注释，在博客根目录下（⚠️注意是博客根目录，不是主题根目录）的`\source`文件夹中新建`_data`文件夹，然后新建`styles.styl`文件（有的话就不用新建了），在`styles.styl`文件中添加自定义样式。

我添加自定义样式的方式是在浏览器的检查元素中定位到想要改变样式的元素，然后在浏览器中修改，修改到自己想要的样子后，把css直接复制到`styles.styl`文件中（比较笨的方法，但是有效，不知道还有没有更好的方法>﹏<），下面附上我自定义的样式代码：

```stylus
//全文字体
body {
    font-family: 'Noto Serif SC',"PingFang SC","Microsoft YaHei",sans-serif;
}
code, pre {
    font-family: 'Roboto Mono',consolas,Menlo,monospace,"PingFang SC","Microsoft YaHei";
}

// 菜单栏样式
.header {
    background: #ffffff;
}

//去除菜单项左边icon
.menu-item .fa {
    display: none;
}

//更改菜单项字体大小
.menu-item a, .menu-item span.exturl {
    font-size: 1.025em;
}
.menu-item-active a, .menu .menu-item a:hover, .menu .menu-item span.exturl:hover {
    background: #ffffff;
    color: #000;
    font-size: 1.125em;
}

//去掉网站名上下的横线
.logo-line-before i, .logo-line-after i {
    display: none;
}

//更改网站名字体大小
.site-title {
    font-size: 2em;
}
// 菜单栏样式结束

//侧边栏样式
.sidebar {
    background: #bbbbbb1a;
    bottom: 0;
    position: fixed;
    box-shadow: inset 0 0px 0px #0000;
    top: 0;
    z-index: 200;
}

//目录与站点概览链接样式
.sidebar-nav li{
    color: #555;
    font-size: 1em;
}
.sidebar-nav li:hover{
    color: #222;
}
.sidebar-nav li.sidebar-nav-overview {
    margin-left: 10px;
}
.sidebar-nav .sidebar-nav-active {
    border-bottom-color: #222;
    color: #222;
}
.sidebar-nav .sidebar-nav-active:hover {
    border-bottom-color: #222;
    color: #222;
}

//目录样式
.post-toc ol a {
    border-bottom-color: #5550;
}
.post-toc .nav .active-current > a {
    color: #222;
}
.post-toc .nav .active > a {
    border-bottom-color: #222;
    color: #222;
}
.post-toc .nav .active-current > a:hover {
    color: #222;
}

//头像样式
.site-author-image {
    border: 0px solid #333;
}

//name字体颜色
.site-author-name {
    color: #222;
}
//description颜色
.site-description {
    color: #222;
}

//sidebar-item颜色
.sidebar a, .sidebar span.exturl {
    border-bottom-color: #2220;
    color: #222;
}
.sidebar a:hover, .sidebar span.exturl:hover {
    border-bottom-color: #2220;
    color: #22222282;
}

//RSS样式
.feed-link a, .chat a {
    border: 0px solid #fc6423;
}
.feed-link a:hover, .chat a:hover {
    background: #bbbbbb1a;
    border: 0px solid #fc6423;
    color: #222;
}
.fa-feed:before, .fa-rss:before {
    color: #222;
}

//社交链接样式
.links-of-author a::before, .links-of-author span.exturl::before {
    display: none;
}

//展开按钮
.toggle .toggle-line {
    background: #222;
    height: 3px;
}
.sidebar-toggle {
    background: #bbb0;
    height: 20px;
    width: 25px;
}

//返回顶部按钮
.back-to-top {
    background: #2220;
        color: #222;
}
//侧边栏样式结束

//文章块添加阴影
.post-block{
   margin-top: 60px;
   margin-bottom: 60px;
   border-radius: 20px; //文章背景设置圆角
   padding: 30px 60px 30px 60px;
   background:rgba(255,255,255,0.5) none repeat scroll !important; //添加透明效果
//    -webkit-box-shadow: 0 0 15px rgba(202, 203, 203, .8); //文章块阴影
//    -moz-box-shadow: 0 0 15px rgba(202, 203, 204, .8);
}

//调节文章宽度
// .main-inner {
//     width: 800px;
// }

//调整子标题文本大小
.site-subtitle {
    font-size: 1em;
}

//加入背景图片
//body { 
//	background: url(/images/background.jpg)
//	background-repeat: no-repeat;
//    background-attachment:fixed;
//    background-position:50% 50%;
//}
	
//调整文章块底部空白大小
.post-eof {
    margin: 20px auto 20px;
}

//调整按钮透明度
.btn {
    background: rgba(255,255,255,0);
}
```

---

**关于字体配置**

在Next的**主题配置文件**`_config.yml`中提供了自定义字体的方式，搜索`font`关键词，配置如下：

```yaml
font:
	# 是否启用字体配置
  enable: true

  # Uri of fonts host, e.g. //fonts.googleapis.com (Default).
  # 字体CDN，默认是fonts.googleapis.com，由于使用google可能会出现访问速度的问题，这里使用//fonts.loli.net，一个fonts.googleapis.com的国内镜像
  host: //fonts.loli.net

  # Font options:
  # `external: true` will load this font family from `host` above.
  # `family: Times New Roman`. Without any quotes.
  # `size: x.x`. Use `em` as unit. Default: 1 (16px)
  # `external: 是否启用CDN
  # `family: 字体样式，默认为Times New Roman，可以在https://fonts.google.com挑选
  # `size: 字体大小，用em做为单位，默认是1em(16px)

  # Global font settings used for all elements inside <body>.
  # 全局配置，覆盖 <body> 标签里所有元素
  global:
    external: true
    family: Noto Serif SC
    size:
    
  # Font settings for site title (.site-title).
  # 网站名字
  title:
    external: true
    family: Noto Serif SC
    size:

  # Font settings for headlines (<h1> to <h6>).
  # 文章标题字体
  headings:
    external: true
    family: Noto Serif SC
    size:

  # Font settings for posts (.post-body).
  # 文章内容字体
  posts:
    external: true
    family: Noto Serif SC

  # Font settings for <code> and code blocks.
  # 代码块字体
  codes:
    external: true
    family: Roboto Mono
```

网站提供的字体配置方式虽然很多了，但是某些地方仍会受到限制，如字体颜色，只能设置一种字体，不能按照css里的`font-family`的规则进行优先级显示等，如果想进行这些配置，就需要使用自定义的style样式进行设置，如上面我的style配置中，就定义了一组`font-family`

---

版本信息:

>* hexo-v3.9.0
>* NexT.Muse v7.4.1

参考文章

>https://leay.net/2020/02/14/hexo-next-font/

