# meituan-app

> My spectacular Nuxt.js project
> 使用 ssr+koa+mongodb 以服务端渲染的方式开发美团外卖项目

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# 搭建项目遇到问题及解决方法

1、当启动项目的时，报【'babel-node' 不是内部或外部命令，也不是可运行的程序】错误；

 执行cnpm i babel-core babel-preset-es2015 babel-cli 可以修复

 2、启动项目中出现如下报错，需要安装一下,并创建文件 .babelrc

 ```bash
import Koa from‘koa’

SyntaxError: Unexpected token import

语法错误：此处不应该出现import

执行：cnpm install --save-dev babel-preset-env babel-cli

新建一个.babelrc文件，并在里面写入：
{
  "presets":["es2015"]
}
```

3、项目运行成功时，报【 No ESLint configuration found】错误解决办法

执行：cnpm install eslint --save-dev 

创建eslint配置文件： .eslintrc.js

# 前期准备工作
一、redis准备工作： 

https://www.runoob.com/redis/redis-install.html

redis文档： https://www.php.cn/manual/view/16111.html

1、mac版

安装 redis : brew install redis(mac) 

启动 redis : redis-server

2、window版

1）下载redis https://www.runoob.com/redis/redis-install.html

2）解压redis 安装包

3）启动服务器  Win+R快捷键，输入CMD，进入CMD窗口，进入解压后文件所在路径，并输入以下指令：redis-server.exe redis.windows.conf

完成上面步骤就完成了window系统安装redis并启动

window 进入 redis 解压包 执行redis-server (使用cmd)

启动 redis-server

二、mongodb准备工作

安装 mongodb

启动 mongod --dbpath /Users/a/Desktop/meituan-app/data

(备注：‘/Users/a/Desktop/meituan-app/data’是你数据库存放地址，data就是数据库文件)

# passport  http://ju.outofmemory.cn/entry/99459


# 需要优化问题
1、新用户注册模块，邮箱验证码后天接口需要区分大小写，后期要修正为不需要区分大小写

2、登陆使用127.0.0.1:3000，不会获取用户的信息，所以获取不到用户的登陆信息，用localhost:3000就可以

# 需求分析（接口设计原则）

1、用户注册登录问题

/users/signup  //注册

/users/signin  //登陆

/users/verify  //验证码

/users/exit    //推出

/users/getUser //用户登陆信息


2、城市热门服务类接口设计

/geo/getPosition

/geo/province

/geo/province/:id

/geo/city

/geo/hostCity

/geo/menu

3、查询类服务接口设计

/search/top

/search/resultsByKeywords

/search/hotPlace

/search/products

/search/product/:id


4、数据库导入

1）首先在RoTo 3T中导入数据

2）执行命令：mongoimport -d dbs -c test pois.dat (数据表在哪就在哪文件下执行)

其中 dbs 是你的数据库名称，test 是在数据创建的数据表名， pois是集合名， pois.dat是对应的数据源文件。

  dbs:数据库

  test:数据结合

  pois.dat:数据源

3）项目中使用到的数据表都放在根目录下的dbs中


5、接口签名
axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)

${sign}:签名  

获取签名地址：http://cp-tools.cn/sign
