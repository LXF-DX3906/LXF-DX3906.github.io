---
title: Hexo站点配置文件说明
date: 2019-10-17 13:35:31
tags: 
	- Hexo
	- NexT
categories:
	- technology
	- Hexo
---

以下是`站点配置文件`的默认内容，这里将里面的配置项都注释说明，可以根据需要自定义配置。

<!--more-->

```yaml
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/
# 网站配置

title: Hexo            # 网站标题
subtitle:              # 网站副标题
description:           # 网站描述
author: John Doe       # 你的昵称
language:              # 网站使用的语言(英文:en, 简体中文:zh-CN，繁体中文:zh-tw)
timezone:              # 网站时区，用于生成页面时填充相关时间，我的为Asia/Shanghai

# URL
## 如果你的站点要放入子目录, 请将url设置为'http://yoursite.com/child' 并将根目录设置为'/child/'

url: http://yoursite.com  # 站点网址
root: /                   # 网站根目录
permalink: :year/:month/:day/:title/ #文单的永久链接格式
permalink_defaults:       # 永久链接中各部分的默认值

# 目录
source_dir: source        # 资源文件夹，这个文件夹用来存放博客内容
public_dir: public        # 公共文件夹，这个文件夹用来存放生成的站点静态文件
tag_dir: tags             # 标签文件夹
archive_dir: archives     # 归档文件夹
category_dir: categories  # 分类文件夹
code_dir: downloads/code  # Include code文件夹
i18n_dir: :lang           # 国际化文件夹，存放各种语言定义
skip_render:              # 跳过指定文件的渲染

# 写作
new_post_name: :title.md  # 新文章的文件名称
default_layout: post      # 预设布局
titlecase: false          # 把标题转换为 title case
external_link: true       # 在新标签中打开链接
filename_case: 0          # 把文件名称转换为 (1) 小写或 (2) 大写
render_drafts: false      # 显示草稿
post_asset_folder: false  # 启动 Asset 文件夹
relative_link: false      # 把链接改为与根目录的相对位址
future: true              # 显示未来的文章
highlight:                # 代码块的设置
  enable: true
  line_number: true
  auto_detect: false
  tab_replace:

# 首页的分页设置
# path: 博客首页的根路径. (default = '')
# per_page: 每页展示多少篇文章. (0 = 不分页)
# order_by: 文章排序顺序. (默认为日期倒序)

index_generator:
  path: ''
  per_page: 10
  order_by: -date

# 分类 & 标签
default_category: uncategorized  # 默认分类
category_map:                    # 分类别名
tag_map:                         # 标签别名

# 日期 / 时间格式
## Hexo 使用 Moment.js 来解析和显示时间
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD # 日期格式
time_format: HH:mm:ss   # 时间格式

# 分页
## 每页显示的文章量 (0 = 关闭分页功能)

per_page: 10
pagination_dir: page

# 扩展
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape       # 主题

# 部署
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type:
```

